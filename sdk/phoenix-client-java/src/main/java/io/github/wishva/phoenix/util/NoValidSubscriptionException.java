package io.github.wishva.phoenix.util;

/**
 * Exception thrown when a valid subscription is not found.
 */
public class NoValidSubscriptionException extends PhoenixException {

    /**
     * Constructs a new NoValidSubscriptionException with the specified message.
     *
     * @param message The error message describing the exception.
     */
    public NoValidSubscriptionException(String message) {
        super(message);
    }
}
