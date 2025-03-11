package io.github.vishva_kalhara.phoenix.util;

/**
 * Functional interface for handling {@link PhoenixException} occurrences.
 * <p>
 * This interface allows implementing custom exception-handling logic
 * for errors that arise within the Phoenix client.
 * </p>
 */
public interface PhoenixExceptionHandler {

    /**
     * Handles a {@link PhoenixException}.
     *
     * @param e The exception to be handled.
     */
    void handle(PhoenixException e);
}
