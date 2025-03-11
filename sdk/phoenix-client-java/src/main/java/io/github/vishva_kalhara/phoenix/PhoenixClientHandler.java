package io.github.vishva_kalhara.phoenix;

import io.github.vishva_kalhara.phoenix.util.*;

/**
 * A handler class responsible for managing the lifecycle of a {@link PhoenixClient} instance.
 * <p>
 * This class initializes a {@link PhoenixClient} with the provided API key and app ID, attempts to protect the client
 * using the {@code protect()} method, and handles exceptions related to subscriptions and API calls.
 * It also supports fallback logic in case of a subscription issue.
 * </p>
 */
public class PhoenixClientHandler {

    private final PhoenixClient client;
    private final String STRIPE_SECRET;
    private final PhoenixExceptionHandler exceptionHandler;
    private final Object lock = new Object();

    /**
     * Constructs a {@code PhoenixClientHandler} with specified parameters.
     * <p>
     * This constructor initializes the {@link PhoenixClient} instance and attempts to protect it.
     * If the client cannot be protected due to an invalid subscription, the fallback logic is triggered.
     * </p>
     *
     * @param API_KEY          The API key for authentication with the Phoenix service.
     * @param APP_ID           The application ID for the Phoenix service.
     * @param STRIPE_SECRET    The Stripe secret key used for payment processing.
     * @param fallback         A {@link PhoenixFallbackHandler} that provides fallback logic in case of subscription issues.
     * @param exceptionHandler A {@link PhoenixExceptionHandler} that handles exceptions thrown by the Phoenix client.
     */
    public PhoenixClientHandler(String API_KEY,
                                String APP_ID,
                                String STRIPE_SECRET,
                                PhoenixFallbackHandler fallback,
                                PhoenixExceptionHandler exceptionHandler) {

        this.client = new PhoenixClient(API_KEY, APP_ID);
        this.STRIPE_SECRET = STRIPE_SECRET;
        this.exceptionHandler = exceptionHandler;

        this.validateSubscription(fallback);
    }


    /**
     * Constructs a {@code PhoenixClientHandler} with a default exception handler.
     * <p>
     * This constructor uses a default exception handler that prints stack traces for {@link PhoenixException}.
     * </p>
     *
     * @param API_KEY       The API key for authentication with the Phoenix service.
     * @param APP_ID        The application ID for the Phoenix service.
     * @param STRIPE_SECRET The Stripe secret key used for payment processing.
     * @param fallback      A {@link PhoenixFallbackHandler} that provides fallback logic in case of subscription issues.
     */
    public PhoenixClientHandler(String API_KEY,
                                String APP_ID,
                                String STRIPE_SECRET,
                                PhoenixFallbackHandler fallback) {

        this(API_KEY, APP_ID, STRIPE_SECRET, fallback, (e) -> {
            // Default exception handler: print stack trace
            e.printStackTrace();
        });
    }

    /**
     * Validates the subscription status in a separate thread.
     *
     * @param fallback Fallback handler in case subscription validation fails.
     */
    private void validateSubscription(PhoenixFallbackHandler fallback) {
        new Thread(() -> {
            try {
                // Attempt to protect the client by verifying subscription
                client.protect();

                synchronized (lock) {
                    lock.notifyAll(); // Notify the main thread properly
                }

            } catch (NoValidSubscriptionException e) {
                // If subscription is invalid, handle fallback logic
                handleLinkGeneration(fallback);

            } catch (PhoenixException e) {
                // Handle any other PhoenixException
                this.exceptionHandler.handle(e);
            }
        }, "phoenix-client").start();

        synchronized (lock) {
            try {
                lock.wait(); // Main thread waits here
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt(); // Restore interrupted status
                throw new RuntimeException(e);
            }
        }
    }


    /**
     * Handles the fallback process for subscription issues.
     * <p>
     * If the fallback handler allows it, this method will generate a checkout link using the {@link PhoenixClient}.
     * If the fallback is not allowed, the application will exit.
     * </p>
     *
     * @param phoenixFallbackHandler A {@link PhoenixFallbackHandler} to decide whether to trigger fallback logic.
     */
    private void handleLinkGeneration(PhoenixFallbackHandler phoenixFallbackHandler) {

        // Check if fallback should be executed
        if (phoenixFallbackHandler.fallback()) {
            try {
                // Attempt to generate the checkout link
                client.getCheckoutLink(this.STRIPE_SECRET);

            } catch (PhoenixException e) {
                // Handle any exceptions thrown during checkout link generation
                exceptionHandler.handle(e);
            }
        } else {
            // Exit the application if fallback is not allowed
            System.exit(0);
        }
    }
}
