namespace Phoenix.Util
{
    /// <summary>
    /// Delegate for handling <see cref="PhoenixException"/> occurrences.
    /// <para>
    /// This delegate allows implementing custom exception-handling logic
    /// for errors that arise within the Phoenix client.
    /// </para>
    /// </summary>
    /// <param name="e">The exception to be handled.</param>
    public delegate void PhoenixExceptionHandler(PhoenixException e);
}