using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

/// <summary>
/// Summary description for GetUrl
/// </summary>
/// 
namespace myurl
{
    public class GetUrl
    {
        public GetUrl()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public static string GetFullRootUrl()
        {
            HttpRequest request = HttpContext.Current.Request;

            string url = ConfigurationManager.AppSettings["VirtualDirectory"].ToString();
            int index = request.Url.AbsoluteUri.IndexOf(request.Url.AbsolutePath);
            return request.Url.AbsoluteUri.Substring(0, index) + url;
        }
    }
}