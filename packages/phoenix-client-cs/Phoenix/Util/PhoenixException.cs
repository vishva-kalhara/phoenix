using System;

namespace Phoenix.Util
{
    public class PhoenixException : Exception
    {
        public PhoenixException(string message) : base(message)
        {
        }

        public PhoenixException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}