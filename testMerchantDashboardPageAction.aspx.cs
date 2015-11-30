using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;
using MongoDB.Bson.IO;
using mango;

public partial class testMerchantDashboardPageAction : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

       var loginjson = Request["reqdata"];
        BsonDocument t = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(loginjson);
        int startindex = Convert.ToInt32(t.GetElement("si1").Value);
        int limitindex = Convert.ToInt32(t.GetElement("li1").Value);
        var storesession = Session["storename"].ToString();
        var usersess = Session["objid"].ToString();
        var gquery = Query.EQ("order.storeName", storesession);

        int restartindex = startindex - 20;
        MyDB db = new MyDB();
        var coll = db.GetBColl("Test3");
        var coll3 = db.GetBColl("Test4" + usersess);
        if (restartindex == 0&& !(coll3.Exists())){
            if (coll.Find(gquery).Count() > 0)
            {
                coll3.InsertBatch(coll.Find(gquery));
            }
        }
        var totalorders = coll3.Count();
        var totalorders1 = totalorders - 1;
        if (totalorders == 0) {
            Response.Clear();
            Response.CacheControl = "no-cache";
            Response.ContentType = "application/json";
            Response.Write("0");
            Response.End();
        }
        var query = from person in coll3.FindAll()
                    orderby person.ToBsonDocument().GetElement("ISODate") descending
                    select person;
        var mc = query.ToArray();
        var obj = "";
        var obj1 = "";
        BsonElement my_id = null;
        for (int i = restartindex; i < limitindex; i++)
        {
            if (i < totalorders) // 60 61
            {
                var tobson = mc[i].ToBsonDocument();
                my_id = tobson.GetElement("_id");
                tobson.Add("orderid", my_id.ToString().Substring(4));
                tobson.Remove("ISODate");
                tobson.Remove("_id");
                BsonElement bmob = tobson.GetElement("mobile");
                tobson.Remove("mobile");
                tobson.Add("mobile", Convert.ToDouble(bmob.Value));
                var myf = tobson.ToJson();
                if (i == totalorders1)
                {
                    var jsonoffer = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(myf.ToString());
                    obj += jsonoffer.ToString();
                    obj1 = obj;
                    var obj22 = obj1;
                    var finalString1 = "{\"orders\":[" + obj22 + "]}";
                    BsonDocument bie = new BsonDocument();
                    bie.Add("obj", finalString1);
                    bie.Add("resp", Convert.ToDouble(totalorders));
                    var myresp = bie.ToJson();
                    var lastresp = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(myresp.ToString());
                    Response.Clear();
                    Response.CacheControl = "no-cache";
                    Response.ContentType = "application/json";
                    Response.Write(lastresp.ToString());
                    Response.End();
                }
                else
                {
                    var jsonoffer = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(myf.ToString());
                    obj += jsonoffer.ToString() + ",";
                    obj1 = obj;
                }
            }
        }
        var obj2 = obj1;
        var objrem = obj2.Remove(obj2.Length - 1, 1);
        var finalString = "{\"orders\":[" + objrem + "]}";
        Response.Clear();
        Response.CacheControl = "no-cache";
        Response.ContentType = "application/json";
        Response.Write(finalString);
        Response.End();
    }
}

