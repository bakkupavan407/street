using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using mango;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System.Threading;

public partial class GuestAction : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
	    var offset = TimeZoneInfo.Local.GetUtcOffset(DateTime.UtcNow);
            DateTime dt = DateTime.Now;
            var dateto = dt;

            var gj = Request["reqdata"];
            string gorder = Session["order"].ToString();
            string ordersend = "[" + gorder + "]";
            MyDB md = new MyDB();
            var gcol = md.GetBColl("guests");
            BsonDocument bd = new BsonDocument();
            BsonDocument desjson = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(gj);
            var desorder = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(ordersend);

            BsonValue gname = desjson.GetElement("gname").Value;
            BsonValue gmobile = desjson.GetElement("gmobile").Value;
            BsonValue gaddress = desjson.GetElement("gaddress").Value;

            //bd.Add("gshipadd", desjson);
            bd.Add("name", gname);
            bd.Add("mobile", gmobile);
	    bd.Add("ISODate", dateto);
            bd.Add("shipadd", gaddress);
            bd.Add("order", desorder);
            bd.Add("orderstatus", "undelivered");
            gcol.Insert(bd);
            gcol.Save(bd);

            Response.Clear();
            Response.CacheControl = "no-cache";
            Response.ContentType = "application/json";
            Session.Remove("order");
            Response.Write("1");
            Response.End();
        }
        catch (ThreadAbortException ee) { }
        catch (Exception eee)
        {
            Response.Clear();
            Response.CacheControl = "no-cache";
            Response.ContentType = "application/json";
            Response.Write("exception");  //Valid User
            Response.End();
        }
    }
}