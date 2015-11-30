<%@ WebHandler Language="C#" Class="OfferJsonHandler" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.SessionState;
using mango;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;
using System.Web.Script.Serialization;
using System.Collections.Specialized;

public class OfferJsonHandler : IHttpHandler 
{
    public void ProcessRequest (HttpContext context) 
    {
        ////context.Response.ContentType = "text/plain";
        ////context.Response.Write("Hello World");
        //MyDB db = new MyDB();
        //var coll = db.GetBColl("bakkupavankumar7382476952");
        //BsonElement boffer = null;
        //var varjson = "";
        //var varjson2 = "";
        //foreach (BsonDocument docs in coll.FindAll())
        //{
        //    boffer = docs.GetElement("offer");
        //    var offervalue = boffer.Value;
        //    if (offervalue != "0" && offervalue != null)
        //    {
        //        varjson = docs.ToJson();
        //        var jsonoffer = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(varjson.ToString());
        //        varjson2 += jsonoffer + ",";
        //    }
        //}
        //context.Response.Write(varjson2);
    }
 
    public bool IsReusable 
    {
        get 
        {
            return false;
        }
    }

}