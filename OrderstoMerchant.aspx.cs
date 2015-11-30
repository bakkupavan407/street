using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using mango;
using MongoDB;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System.Threading;

public partial class OrderstoMerchant : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
         try
        {
            MyDB md = new MyDB();
            var gcoll = md.GetBColl("guests");
            string gdums = null;
            var gjson = "";
            var gjsonconcat = "";
            var storesession = Session["storename"].ToString();
            //var gquery = new QueryDocument("order.storeName", storesession);
            var gquery = Query.EQ("order.storeName", storesession);
            var mc = gcoll.Find(gquery).ToArray();
            for (var i = 0; i < mc.Count(); i++) 
            {
                BsonDocument bgdoc = mc[i].ToBsonDocument();
                BsonElement objectid = bgdoc.GetElement("_id");
                bgdoc.Add("orderid", objectid.Value.ToString());
                bgdoc.Remove("_id");
                gjson = bgdoc.ToJson();
                var jsonoffer = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(gjson.ToString());
                gdums += jsonoffer.ToString() + ",";
            }
            gjsonconcat = gdums;
            var gstringremove = gjsonconcat;
            
            string dums = null;
            var outjson = "";
            var outjsonconcat = "";
            var varjson = "";
            var coll = md.GetBColl("orders");
            BsonElement buser = null;
            BsonValue buservalue = null;
            BsonElement bcname = null;
            BsonElement bmob = null;
            BsonValue busernamevalue = null;
            BsonElement my_id = null;
            dums = null;
            var mcord = coll.Find(gquery).ToArray();
            for (var j = 0; j < mcord.Count(); j++)
            {
                BsonDocument bids = mcord[j].ToBsonDocument();
                my_id = bids.GetElement("_id");
                bids.Add("orderid", my_id.ToString().Substring(4));
                buser = bids.GetElement("user");
                buservalue = buser.Value;
                bmob = bids.GetElement("mobile");
                bids.Remove("mobile");
                var regcoll = md.GetBColl("registration");
                var query1 = new QueryDocument("_id", ObjectId.Parse(buservalue.ToString()));
                foreach (BsonDocument bc in regcoll.Find(query1))
                {
                    bcname = bc.GetElement("name");
                }
                busernamevalue = bcname.Value;
                bids.Add("mobile", Convert.ToDouble(bmob.Value));
                bids.Add("name", busernamevalue);
                bids.Remove("_id");
                //bids.Remove("shipadd");
                bids.Remove("user");
                varjson = bids.ToJson();
                var jsonoffer = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(varjson.ToString());
                dums += jsonoffer.ToString() + ",";
            }         
            outjsonconcat = dums + gstringremove;

            outjson += outjsonconcat;
            var finalString = "\"Prudhvi\":[" + outjson.Remove(outjson.Length - 1, 1) + "]}" + ",";
            var stringremove = "{" + finalString.Remove(finalString.Length - 1, 1);
            //var stringremove = "{Prudhvi:[" + outjson.Remove(outjson.Length - 1, 1) + "]}";

            Response.Clear();
            Response.CacheControl = "no-cache";
            Response.ContentType = "application/json";
            Response.Write(stringremove.ToString());
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