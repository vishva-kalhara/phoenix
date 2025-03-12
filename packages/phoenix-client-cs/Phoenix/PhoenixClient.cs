using System;
using System.Diagnostics; // Add this namespace
using System.Threading.Tasks;
using Phoenix.Util;

namespace Phoenix
{
    public class PhoenixClient
    {
        private readonly string _apiKey;
        private readonly string _appSecret;
        private readonly HardwareInfo _hardwareInfo;
        private readonly RequestHandler _requestHandler;

        /// <summary>
        /// Initializes a new instance of the <see cref="PhoenixClient"/> class with the provided API key and application secret.
        /// </summary>
        /// <param name="apiKey">The API key used for authentication.</param>
        /// <param name="appSecret">The application secret key.</param>
        public PhoenixClient(string apiKey, string appSecret)
        {
            _apiKey = apiKey ?? throw new ArgumentNullException(nameof(apiKey));
            _appSecret = appSecret ?? throw new ArgumentNullException(nameof(appSecret));
            _hardwareInfo = new HardwareInfo();
            _requestHandler = new RequestHandler(_apiKey);
        }

        /// <summary>
        /// Protects the application by verifying the subscription status using the Phoenix API.
        /// </summary>
        /// <exception cref="PhoenixException">Thrown if an error occurs while communicating with the API.</exception>
        public async Task ProtectAsync()
        {
            string reqBody = $"{{\"appSecret\": \"{_appSecret}\", \"clientId\": \"{_hardwareInfo.Get()}\"}}";
            await _requestHandler.SendAsync("/subscriptions/has-subscription", reqBody);
        }

        /// <summary>
        /// Generates a Stripe checkout link and opens it in the default web browser.
        /// </summary>
        /// <param name="stripeSecret">The Stripe secret key used for generating the checkout link.</param>
        /// <exception cref="PhoenixException">
        /// Thrown if an error occurs, including:
        /// <list type="bullet">
        ///     <item>Browser is not supported or cannot be detected.</item>
        ///     <item>HTTP request failures (e.g., invalid API key, invalid app secret).</item>
        ///     <item>Malformed response from the API.</item>
        ///     <item>Issues opening the URL in the browser.</item>
        /// </list>
        /// </exception>
        public async Task GetCheckoutLinkAsync(string stripeSecret)
        {
            if (!IsBrowserSupported())
            {
                throw new PhoenixException("Cannot detect the default browser.");
            }

            string reqBody = $"{{\"appSecret\": \"{_appSecret}\", \"stripeSecret\": \"{stripeSecret}\", \"clientId\": \"{_hardwareInfo.Get()}\"}}";
            string resBody = await _requestHandler.SendAsync("/payments/create-checkout-link", reqBody);

            string[] linkParts = resBody.Split('"');
            if (linkParts.Length < 4)
            {
                throw new PhoenixException("Malformed response from the API.");
            }

            string checkoutLink = linkParts[3];

            try
            {
                OpenBrowser(checkoutLink);
            }
            catch (Exception ex)
            {
                throw new PhoenixException($"Failed to open the checkout link: {ex.Message}");
            }
        }

        /// <summary>
        /// Checks if the platform supports opening a browser.
        /// </summary>
        /// <returns><c>true</c> if the platform supports opening a browser; otherwise, <c>false</c>.</returns>
        private static bool IsBrowserSupported()
        {
            try
            {
                OpenBrowser("http://example.com");
                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Opens the specified URL in the default browser.
        /// </summary>
        /// <param name="url">The URL to open.</param>
        private static void OpenBrowser(string url)
        {
            try
            {
                Process.Start(new ProcessStartInfo(url) { UseShellExecute = true });
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to open the URL: {ex.Message}");
            }
        }
    }
}