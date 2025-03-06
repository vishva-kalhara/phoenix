package io.github.wishva.phoenix;

import io.github.wishva.phoenix.util.HardwareInfo;
import io.github.wishva.phoenix.util.PhoenixException;
import io.github.wishva.phoenix.util.RequestHandler;

import java.awt.*;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

/**
 * PhoenixClient provides methods to interact with the Phoenix API, including subscription validation
 * and generating a checkout link for payments.
 */
public class PhoenixClient {

    private final String apiKey;
    private final String appSecret;

    /**
     * Constructs a PhoenixClient instance with the provided API key and application secret.
     *
     * @param apiKey    The API key used for authentication.
     * @param appSecret The application secret key.
     */
    public PhoenixClient(String apiKey, String appSecret) {
        this.apiKey = apiKey;
        this.appSecret = appSecret;
    }

    /**
     * Protects the application by verifying the subscription status using the Phoenix API.
     *
     * @throws PhoenixException If an error occurs while communicating with the API.
     */
    public void protect() throws PhoenixException {

        String reqBody = "{\"appSecret\": \""+ this.appSecret +"\", \"clientId\": \""+ HardwareInfo.get() +"\"}";

        new RequestHandler(apiKey)
                .send("/subscriptions/has-subscription", reqBody);

    }

    /**
     * Generates a Stripe checkout link and opens it in the default web browser.
     *
     * @param stripeSecret The Stripe secret key used for generating the checkout link.
     * @throws PhoenixException If an error occurs, including:
     *                          <ul>
     *                              <li>Browser is not supported or cannot be detected.</li>
     *                              <li>HTTP request failures (e.g., invalid API key, invalid app secret).</li>
     *                              <li>Malformed response from the API.</li>
     *                              <li>Issues opening the URL in the browser.</li>
     *                          </ul>
     */
    public void getCheckoutLink(String stripeSecret) throws PhoenixException {

        if (!Desktop.isDesktopSupported() || !Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
            throw new PhoenixException("Cannot detect the default browser.");
        }

        String reqBody = "{\"appSecret\": \""+ this.appSecret +"\", \"stripeSecret\": \"" + stripeSecret +"\", \"clientId\": \""+ HardwareInfo.get() +"\"}";
        String resBody = new RequestHandler(apiKey).send("/payments/create-checkout-link", reqBody);

        String[] link = resBody.split("\"");

        try {

            Desktop.getDesktop().browse(new URI(link[3]));

        } catch (URISyntaxException | IOException e){
            throw new PhoenixException(e.getMessage());
        }
    }
}
