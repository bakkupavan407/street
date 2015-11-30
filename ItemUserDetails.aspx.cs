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

public partial class ItemUserDetails : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
       var s = Convert.ToInt32(Session["forajax"]);
        
        MyDB db = new MyDB();
        var usersess = Session["objid"].ToString();
        var collstorecoll = db.GetBColl("collstore" + usersess);
        try
        {
            var itemname = Request["reqdata"];
            var storesession = Session["storename"].ToString();
            
            var gquery = Query.EQ("order.storeName", storesession);
            var coll = db.GetBColl("Test3");
            //var collstore = coll.Find(gquery);
            if (s == 0)
            {
                collstorecoll.InsertBatch(coll.Find(gquery));
            }
            //var options = new MapReduceOptionsBuilder();
            //options.SetOutput(MapReduceOutput.Inline);
            //options.SetQuery(Query.EQ("OrderedDate", "15 April 2014"));
            //var itemname = "Acorn";
            //var query = new QueryDocument("order[0].Items[0].Name",itemname);

            //foreach (BsonDocument bids in coll.FindAll()) 
            //{
            //    BsonArray docs = bids.GetElement("order");
            //    var items = docs.AsBsonDocument.GetElement("Name").Value;
            //}

            //BsonDocument bids = new BsonDocument();
            //bids.Add("date", new DateTime())

            var mapFunction2 = @"function() {
                       for (var idx = 0; idx < this.order[0].Items.length; idx++) {
                                var key = this.order[0].Items[idx].Name+'_'+this.name;
                                var value = {
                                         count: 1,
                                         qty: parseFloat(this.order[0].Items[idx].Quantity),
                                         price: parseFloat(this.order[0].Items[idx].Price),
                                         odate: this.order[0].OrderedDate,
                                         name: this.name
                                       };
                                emit(key, value);
                       }
                    }";

            var reduceFunction2 = @"function(keySKU, countObjVals) {
                     reducedVal = { count: 0, qty: 0, price: 0, odate: 0, name: 0};

                     for (var idx = 0; idx < countObjVals.length; idx++) {
                         reducedVal.count += countObjVals[idx].count;
                         reducedVal.qty += countObjVals[idx].qty;
                         reducedVal.price += countObjVals[idx].price;
                         reducedVal.odate = countObjVals[idx].odate;
                         reducedVal.name = countObjVals[idx].name;
                     }
                     return reducedVal;
                  }";

            var mr = collstorecoll.MapReduce(mapFunction2, reduceFunction2);
            string finalstr = "";
            string mystr = "";
            foreach (var document in mr.GetResults())
            {
                string str = document.ToJson();
                BsonDocument p1 = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(str);
                string i1 = p1.GetElement("_id").Value.ToString();

                string[] words = i1.ToString().Split('_');
                string nameee = words[0];
                if (nameee == itemname)
                {
                    mystr = document.ToJson();
                    finalstr += mystr + ",";
                    //Response.Write("_id=" + words[1].Replace(" ", "") + " " + p2.GetElement("value"));
                }
                //Response.Write(document[0] + " " + document[1]);
                //Response.Write("<br />");
            }

            var finalString1 = "{\"Prudhvi\":[" + finalstr.Remove(finalstr.Length - 1, 1) + "]}";
            
            Session["forajax"] = 1;
            Response.Clear();
            Response.CacheControl = "no-cache";
            Response.ContentType = "application/json";
           // collstorecoll.Drop();
            Response.Write(finalString1);
            Response.End();
        }
        catch (Exception e1)
        {

        }
        finally 
        {
            //collstorecoll.Drop();
        }
    }
}