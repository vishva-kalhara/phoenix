package io.github.wishva.phoenix.util;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

/**
 * Handles HTTP requests to the Phoenix API.
 */
public class RequestHandler {

    private final String API_URL = "https://phoenix-by-wishva-f9071d88ccd0.herokuapp.com/api/v1";

    private final String apiKey;

    /**
     * Constructs a new RequestHandler with the provided API key.
     *
     * @param apiKey The API key used for authentication.
     */
    public RequestHandler(String apiKey){
        this.apiKey = apiKey;
    }

    /**
     * Sends an HTTP POST request to the specified API endpoint with the given request body.
     *
     * @param urlPath The relative path of the API endpoint (e.g., "/subscriptions/has-subscription").
     * @param reqBody The JSON request body to be sent.
     * @return The response body as a String if the request is successful.
     * @throws PhoenixException If an error occurs during the request, including:
     *                          <ul>
     *                              <li>400 - Invalid request body</li>
     *                              <li>401 - Unauthorized (invalid API key)</li>
     *                              <li>403 - No valid subscription found</li>
     *                              <li>404 - Invalid or deleted app ID</li>
     *                              <li>500 - Unhandled server error</li>
     *                              <li>Other exceptions related to network issues</li>
     *                          </ul>
     */
    public String send(String urlPath, String reqBody) throws PhoenixException {

        HttpClient httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_2)
                .connectTimeout(Duration.ofSeconds(10))
                .build();

        HttpRequest req = HttpRequest.newBuilder()
                .uri(URI.create( API_URL + urlPath))
                .header("Content-Type", "application/json") // Set Content-Type header
                .header("Authorization", "Bearer " + this.apiKey) // Set Authorization header
                .POST(HttpRequest.BodyPublishers.ofString(reqBody)) // Set request body
                .build();

        try {

            HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
            return switch (res.statusCode()) {
                case 200 -> res.body();
                case 400 -> throw new PhoenixException("Invalid request body. Please refer the docs.");
                case 401 -> throw new PhoenixException("Unauthorized: API key is invalid!");
                case 403 -> throw new NoValidSubscriptionException("No Valid Subscription Found!");
                case 404 -> throw new PhoenixException("App Id is invalid or App is deleted.");
                case 500 -> throw new PhoenixException("Unhandled Exception Occurred!");
                default -> throw new PhoenixException(res.body());
            };

        } catch (IOException | InterruptedException e) {
            throw new PhoenixException("Please check your internet connection and try restart the application.");
        }
    }
}
