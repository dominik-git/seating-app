using Newtonsoft.Json.Linq;
using System.Net;
using System.Text;

namespace BookingApp.Identity
{
    public class Certificates
    {        
        public byte[][] GetCertBytes()
        {
            // The request will be made to the authentication server.
            WebRequest request = WebRequest.Create(
                "https://www.googleapis.com/oauth2/v3/certs"
            );
            

            StreamReader reader = new StreamReader(request.GetResponse().GetResponseStream());

            string responseFromServer = reader.ReadToEnd();

            JObject joResponse = JObject.Parse(responseFromServer);
            JObject ojObject = (JObject)joResponse["keys"];
            JArray array = (JArray)ojObject["chats"];

            String[] split = responseFromServer.Split(':');

            // There are n number of certificates returned from Google
            int numberOfCerts = (split.Length - 1) <= 1 ? 1 : split.Length - 1;
            byte[][] certBytes = new byte[numberOfCerts][];
            int index = 0;
            UTF8Encoding utf8 = new UTF8Encoding();
            /*for (int i = 0; i < split.Length; i++)
            {
                if (split[i].IndexOf(beginCert) > 0)
                {
                    int startSub = split[i].IndexOf(beginCert);
                    int endSub = split[i].IndexOf(endCert) + endCert.Length;
                    certBytes[index] = utf8.GetBytes(split[i].Substring(startSub, endSub).Replace("\\n", "\n"));
                    index++;
                }
            }
            */
            return certBytes;
        }
    }
}
