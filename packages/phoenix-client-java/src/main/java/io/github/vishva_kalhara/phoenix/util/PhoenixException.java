package io.github.vishva_kalhara.phoenix.util;

/**
 * Custom exception class for handling errors within the Phoenix client.
 * <p>
 * This exception is used to encapsulate various errors that may occur
 * during API requests, network failures, or application logic errors.
 * </p>
 */
public class PhoenixException extends Exception {

    /**
     * Constructs a new {@code PhoenixException} with the specified error message.
     *
     * @param message The error message describing the cause of the exception.
     */
    public PhoenixException(String message) {
        super(message);
    }

    /**
     * Constructs a new {@code PhoenixException} with the specified cause.
     *
     * @param cause The underlying throwable that caused this exception.
     */
    public PhoenixException(Throwable cause) {

        super(cause);
    }
}
