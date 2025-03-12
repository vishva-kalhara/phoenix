namespace Phoenix.Util
{
    /// <summary>
    /// Delegate for handling fallback logic.
    /// <para>
    /// This delegate defines a mechanism for providing fallback behavior
    /// when certain conditions in the Phoenix client are not met, such as
    /// network issues or failure to retrieve data.
    /// </para>
    /// </summary>
    /// <returns>
    /// <c>true</c> if the fallback should be executed;
    /// <c>false</c> otherwise.
    /// </returns>
    public delegate bool PhoenixFallbackHandler();
}