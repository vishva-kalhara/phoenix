package io.github.vishva_kalhara.phoenix.util;

/**
 * Functional interface for handling fallback logic.
 * <p>
 * This interface defines a mechanism for providing fallback behavior
 * when certain conditions in the Phoenix client are not met, such as
 * network issues or failure to retrieve data.
 * </p>
 */
public interface PhoenixFallbackHandler {

    /**
     * Determines whether a fallback should be triggered.
     *
     * @return {@code true} if the fallback should be executed,
     *         {@code false} otherwise.
     */
    boolean fallback();
}