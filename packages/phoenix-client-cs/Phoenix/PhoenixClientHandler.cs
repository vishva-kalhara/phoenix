using System;
using System.Threading;
using System.Threading.Tasks;
using Phoenix.Util;

namespace Phoenix
{
    /// <summary>
    /// A handler class responsible for managing the lifecycle of a <see cref="PhoenixClient"/> instance.
    /// <para>
    /// This class initializes a <see cref="PhoenixClient"/> with the provided API key and app ID, attempts to protect the client
    /// using the <see cref="PhoenixClient.ProtectAsync"/> method, and handles exceptions related to subscriptions and API calls.
    /// It also supports fallback logic in case of a subscription issue.
    /// </para>
    /// </summary>
    public class PhoenixClientHandler
    {
        private readonly PhoenixClient _client;
        private readonly string _stripeSecret;
        private readonly PhoenixExceptionHandler _exceptionHandler;
        private readonly object _lock = new object();

        /// <summary>
        /// Initializes a new instance of the <see cref="PhoenixClientHandler"/> class with specified parameters.
        /// <para>
        /// This constructor initializes the <see cref="PhoenixClient"/> instance and attempts to protect it.
        /// If the client cannot be protected due to an invalid subscription, the fallback logic is triggered.
        /// </para>
        /// </summary>
        /// <param name="apiKey">The API key for authentication with the Phoenix service.</param>
        /// <param name="appId">The application ID for the Phoenix service.</param>
        /// <param name="stripeSecret">The Stripe secret key used for payment processing.</param>
        /// <param name="fallback">A <see cref="PhoenixFallbackHandler"/> that provides fallback logic in case of subscription issues.</param>
        /// <param name="exceptionHandler">A <see cref="PhoenixExceptionHandler"/> that handles exceptions thrown by the Phoenix client.</param>
        public PhoenixClientHandler(string apiKey, string appId, string stripeSecret, PhoenixFallbackHandler fallback, PhoenixExceptionHandler exceptionHandler)
        {
            _client = new PhoenixClient(apiKey, appId);
            _stripeSecret = stripeSecret ?? throw new ArgumentNullException(nameof(stripeSecret));
            _exceptionHandler = exceptionHandler ?? throw new ArgumentNullException(nameof(exceptionHandler));

            ValidateSubscriptionAsync(fallback).ConfigureAwait(false);
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="PhoenixClientHandler"/> class with a default exception handler.
        /// <para>
        /// This constructor uses a default exception handler that prints stack traces for <see cref="PhoenixException"/>.
        /// </para>
        /// </summary>
        /// <param name="apiKey">The API key for authentication with the Phoenix service.</param>
        /// <param name="appId">The application ID for the Phoenix service.</param>
        /// <param name="stripeSecret">The Stripe secret key used for payment processing.</param>
        /// <param name="fallback">A <see cref="PhoenixFallbackHandler"/> that provides fallback logic in case of subscription issues.</param>
        public PhoenixClientHandler(string apiKey, string appId, string stripeSecret, PhoenixFallbackHandler fallback)
            : this(apiKey, appId, stripeSecret, fallback, (e) =>
            {
                // Default exception handler: print stack trace
                Console.Error.WriteLine(e);
            })
        {
        }

        /// <summary>
        /// Validates the subscription status asynchronously.
        /// </summary>
        /// <param name="fallback">Fallback handler in case subscription validation fails.</param>
        private async Task ValidateSubscriptionAsync(PhoenixFallbackHandler fallback)
        {
            try
            {
                // Attempt to protect the client by verifying subscription
                await _client.ProtectAsync();

                lock (_lock)
                {
                    Monitor.PulseAll(_lock); // Notify the main thread
                }
            }
            catch (NoValidSubscriptionException)
            {
                // If subscription is invalid, handle fallback logic
                HandleLinkGeneration(fallback);
            }
            catch (PhoenixException ex)
            {
                // Handle any other PhoenixException
                _exceptionHandler(ex);
            }
        }

        /// <summary>
        /// Handles the fallback process for subscription issues.
        /// <para>
        /// If the fallback handler allows it, this method will generate a checkout link using the <see cref="PhoenixClient"/>.
        /// If the fallback is not allowed, the application will exit.
        /// </para>
        /// </summary>
        /// <param name="fallbackHandler">A <see cref="PhoenixFallbackHandler"/> to decide whether to trigger fallback logic.</param>
        private void HandleLinkGeneration(PhoenixFallbackHandler fallbackHandler)
        {
            // Check if fallback should be executed
            if (fallbackHandler())
            {
                try
                {
                    // Attempt to generate the checkout link
                    _client.GetCheckoutLinkAsync(_stripeSecret).Wait();
                }
                catch (PhoenixException ex)
                {
                    // Handle any exceptions thrown during checkout link generation
                    _exceptionHandler(ex);
                }
            }
            else
            {
                // Exit the application if fallback is not allowed
                Environment.Exit(0);
            }
        }
    }
}