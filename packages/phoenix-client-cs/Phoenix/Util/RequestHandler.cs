using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Phoenix.Util
{
    public class RequestHandler
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public RequestHandler(string apiKey)
        {
            _apiKey = apiKey ?? throw new ArgumentNullException(nameof(apiKey));
            _httpClient = new HttpClient
            {
                BaseAddress = new Uri("https://phoenix-by-wishva-f9071d88ccd0.herokuapp.com/api/v1"),
                Timeout = TimeSpan.FromSeconds(10)
            };
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");
            _httpClient.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
        }

        public async Task<string> SendAsync(string urlPath, string reqBody)
        {
            try
            {
                var content = new StringContent(reqBody, Encoding.UTF8, "application/json");
                var response = await _httpClient.PostAsync(urlPath, content);

                return response.StatusCode switch
                {
                    System.Net.HttpStatusCode.OK => await response.Content.ReadAsStringAsync(),
                    System.Net.HttpStatusCode.BadRequest => throw new PhoenixException("Invalid request body. Please refer to the docs."),
                    System.Net.HttpStatusCode.Unauthorized => throw new PhoenixException("Unauthorized: API key is invalid!"),
                    System.Net.HttpStatusCode.Forbidden => throw new NoValidSubscriptionException("No Valid Subscription Found!"),
                    System.Net.HttpStatusCode.NotFound => throw new PhoenixException("App ID is invalid or the app is deleted."),
                    System.Net.HttpStatusCode.InternalServerError => throw new PhoenixException("Unhandled Exception Occurred!"),
                    _ => throw new PhoenixException(await response.Content.ReadAsStringAsync())
                };
            }
            catch (HttpRequestException ex)
            {
                throw new PhoenixException("Please check your internet connection and try restarting the application.", ex);
            }
            catch (TaskCanceledException ex)
            {
                throw new PhoenixException("The request timed out. Please check your internet connection.", ex);
            }
            catch (Exception ex)
            {
                throw new PhoenixException("An unexpected error occurred.", ex);
            }
        }
    }
}