/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.wishva.phoenix;

import com.formdev.flatlaf.themes.FlatMacLightLaf;
import com.wishva.phoenix.utils.ClientData;
import com.wishva.phoenix.utils.PhoenixException;
import com.wishva.phoenix.utils.PhoenixNoSubscriptionException;
import com.wishva.phoenix.views.FrmNoSubscription;
import com.wishva.phoenix.views.FrmVerifying;
import java.awt.Desktop;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import javax.swing.JFrame;

/**
 *
 * @author vishv
 */
public class Phoenix {

    private JFrame currentFrame = null;

    private String stripeSecret = null;
    private String appSecret = null;
    private String apiKey = null;

    public Phoenix(String apiKey, String appSecret, String stripeSecret) throws PhoenixException {

        FlatMacLightLaf.registerCustomDefaultsSource("com.wishva.phoenix.styles");
        FlatMacLightLaf.setup();

        currentFrame = new FrmVerifying();
        currentFrame.setVisible(true);

        try {

            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        validateParams(apiKey, appSecret, stripeSecret);

        this.apiKey = apiKey;
        this.appSecret = appSecret;
        this.stripeSecret = stripeSecret;
    }

    private void validateParams(String apiKey, String appSecret, String stripeSecret) throws IllegalArgumentException {

        if (apiKey == null) {
            throw new IllegalArgumentException("API key is null");
        }
        if (appSecret == null) {
            throw new IllegalArgumentException("App secret is null");
        }
        if (stripeSecret == null) {
            throw new IllegalArgumentException("Stripe secret is null");
        }
    }

    public void protect() throws PhoenixException, PhoenixNoSubscriptionException {

        boolean hasAccess = this.hasValidSubscription();
        currentFrame.dispose();
        if (!hasAccess) {

            new FrmNoSubscription(this.apiKey, this.appSecret, this.stripeSecret).setVisible(true);
            throw new PhoenixNoSubscriptionException("No Subscription Found.");
        }
    }

    private boolean hasValidSubscription() throws PhoenixException {

        HttpURLConnection connection = null;

        try {

            URL apiUrl = new URL("http://localhost:3000/api/v1/subscriptions/has-subscription");

            connection = (HttpURLConnection) apiUrl.openConnection();

            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Authorization", "Bearer " + this.apiKey);
            connection.setDoOutput(true); // Enable sending request body

            // Prepare JSON body
            String jsonInputString = "{"
                    + "\"appSecret\":\"" + this.appSecret + "\","
                    + "\"clientId\":\"" + new ClientData().getClientId() + "\""
                    + "}";

            // Write JSON data to request body
            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            int responseCode = connection.getResponseCode();
            switch (responseCode) {

                case HttpURLConnection.HTTP_UNAUTHORIZED:
                    throw new PhoenixException("Unauthorized!");
                case HttpURLConnection.HTTP_NOT_FOUND:
                    throw new PhoenixException("App Not Found!");
                case HttpURLConnection.HTTP_OK:
                    return true;
                case HttpURLConnection.HTTP_BAD_REQUEST:
                    throw new PhoenixException("appSecret, clientId and stripeSecret key required");
                case HttpURLConnection.HTTP_FORBIDDEN:
                    return false;
                default:
                    throw new PhoenixException("Unhandled Exception Occured! Status Code: " + responseCode);
            }

        } catch (Exception e) {
            
            if (e.getMessage().equals("Connection refused: connect")) {
                throw new PhoenixException("Please check your internet connection and try again.");
            }
            throw new PhoenixException(e.getMessage());
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }
}
