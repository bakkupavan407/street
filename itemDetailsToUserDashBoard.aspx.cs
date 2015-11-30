using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.GridFS;
using MongoDB.Driver.Linq;
using mango;

public partial class itemDetailsToUserDashBoard : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //var itemname = "Apricot";
        var itemname = Request["reqdata"];
        //var userid = "52cd1e8977a74312d0203b49";
        var userid = Session["objid"].ToString();
        MyDB db = new MyDB();
        var coll = db.GetBColl("Test3");

        var userquery = Query.EQ("user", userid);
        var userres = coll.Find(userquery);

        var finalString = "";
        foreach (var obj in userres)
        {
            var objc = obj.Count();
            var order = obj.GetElement("order").Value; //.GetElement("Items");
            BsonArray p1 = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(order.ToJson());
            var odate = p1[0].ToBsonDocument().GetElement("OrderedDate").Value;
            var p1c = p1[0].ToBsonDocument().GetElement("Items").Value.AsBsonArray;
            var p1ccount = p1c.Count();

            for (int i = 0; i < p1c.Count(); i++)
            {
                var citem = p1c[i].ToBsonDocument().GetElement("Name").Value;
                if (citem == itemname)
                {
                    double cquan = Convert.ToDouble(p1c[i].ToBsonDocument().GetElement("Quantity").Value);
                    p1c[i].ToBsonDocument().Add("OrderedDate", odate);
                    finalString += p1c[i] + ",";
                    //Response.Write(p1c[i]);
                    //Response.Write("<br />");
                    //Response.Write("<br />");
                }
            }
        }
        var finalString1 = "{\"Prudhvi\":[" + finalString.Remove(finalString.Length - 1, 1) + "]}";
        Response.Clear();
        Response.CacheControl = "no-cache";
        Response.ContentType = "application/json";
        Response.Write(finalString1);
        Response.End();
    }
}