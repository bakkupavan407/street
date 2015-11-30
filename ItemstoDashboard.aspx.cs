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


public partial class ItemstoDashboard : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
	MyDB db = new MyDB();
        var storename = Session["storename"].ToString();
        var usersess = Session["objid"].ToString();
        var newcollstore = db.GetBColl("storecoll" + usersess);
        try
        {
           
            var coll = db.GetBColl("Test3");
            var storequery = Query.EQ("order.storeName", storename);
            List<BsonDocument> lstore = new List<BsonDocument>();
            if (coll.Find(storequery).Count() == 0) {
                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
                Response.Write("0");
                Response.End();
            }
            foreach (var ostr in coll.Find(storequery))
            {
                lstore.Add(ostr);
            }
            if (!(newcollstore.Exists()))
            {
                Session["forajax"] = 0;
                newcollstore.InsertBatch(lstore);
            }
            //var coll = db.GetBColl("saikiran8121417186");
            //var options = new MapReduceOptionsBuilder();
            //options.SetOutput(MapReduceOutput.Inline);
            //options.SetQuery(Query.EQ("OrderedDate", "15 April 2014"));

            BsonDocument bids = new BsonDocument();
            //bids.Add("date", new DateTime())


            //        for (var idx = 0; idx < this.length; idx++) {
            //           var key = this[idx].name;
            //           var value = {
            //           count: 1,
            //           //name: this.order[1].Items[idx].Name,
            //           qty: parseFloat(this[idx].quantity),
            //           price:parseFloat(this[idx].price),
            //           //orderdate: new Date(this.OrderedDate)
            //           };
            //           emit(key, value);
            //           }
            //           }";           

            var mapFunction2 = @"function() {
         for (var idx = 0; idx < this.order[0].Items.length; idx++) {
         var key = this.order[0].Items[idx].Name;
         var value = {
         count: 1,
         //name: this.order[1].Items[idx].Name,
         qty: parseFloat(this.order[0].Items[idx].Quantity),
         price:parseFloat(this.order[0].Items[idx].Price),
         //orderdate: new Date(this.OrderedDate)
         };
         emit(key, value);
         }
         }";

            var reduceFunction2 = @"function(keySKU, countObjVals) {
         reducedVal = { count: 0, qty: 0, price: 0};
         for (var idx = 0; idx < countObjVals.length; idx++) {
         reducedVal.count += countObjVals[idx].count;
         reducedVal.qty += countObjVals[idx].qty;
         reducedVal.price += countObjVals[idx].price;
         //reducedVal.OrderedDate = countObjVals[idx].OrderedDate;
         }
         //reducedVal.price.toFixed(2);
         return reducedVal;
         }";

            var mr = newcollstore.MapReduce(mapFunction2, reduceFunction2);
            //newcollstore.Drop();
            // 76 0-20 20-40 

            //var query = from item in mr.GetResults().ToArray()
            //            orderby item.ToBsonDocument().GetElement("value[0].qty") descending
            //            select item;

            var linq = from docs in mr.GetResults()
                       orderby docs.GetElement("value").Value.ToBsonDocument().GetElement("qty").Value descending
                       select docs;

            string finalString = "";

            foreach (var document in linq)
            {
                string str = document.ToJson();

                finalString += str + ",";
                //Response.Write(document[0] + " " + document[1]);
                //Response.Write("<br />");
            }
            var count = mr.GetResults().Count();
            var finalString1 = "{\"Prudhvi\":[" + finalString.Remove(finalString.Length - 1, 1) + "]}";
            Response.Clear();
            Response.CacheControl = "no-cache";
            Response.ContentType = "application/json";
            Response.Write(finalString1);
            Response.End();
        }
        catch (Exception e4)
        {

        }
        finally
        {
            //newcollstore.Drop();
        }
    }
}