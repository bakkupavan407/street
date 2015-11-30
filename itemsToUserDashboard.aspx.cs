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

public partial class itemsToUserDashboard : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        MyDB db = new MyDB();
        //var usersess = "52ca747eeb12480278147796";
        var usersess = Session["objid"].ToString();
        var userq = Query.EQ("user", usersess);
        var coll = db.GetBColl("Test3");
        var newcoll = db.GetBColl("useritems1" + usersess); //.InsertBatch(coll.Find(userq));
        List<BsonDocument> lord = new List<BsonDocument>();
        var cord = coll.Find(userq).Count();
        if (cord == 0)
        {
            Response.Clear();
            Response.CacheControl = "no-cache";
            Response.ContentType = "application/json";
            Response.Write("0");
            Response.End();
        }
        foreach (var objord in coll.Find(userq)) 
        {
            lord.Add(objord);
        }
        if (!(newcoll.Exists()))
        {
            newcoll.InsertBatch(lord);
        }
        BsonDocument bids = new BsonDocument();
        var mapFunction2 = @"function() {
         for (var idx = 0; idx < this.order[0].Items.length; idx++) {
         var key = this.order[0].Items[idx].Name;
         var value = {
         count: 1,
         //name: this.order[1].Items[idx].Name,
         qty: parseFloat(this.order[0].Items[idx].Quantity),
         price:parseFloat(this.order[0].Items[idx].Price),
         //user : this.user,
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
         //reducedVal.user = countObjVals[idx].user;
         }
         //reducedVal.price.toFixed(2);
         return reducedVal;
         }";

        var mr = newcoll.MapReduce(mapFunction2, reduceFunction2);
        //foreach (var v99 in mr.GetResults())
        //{
        //    var vv4 = v99.ToJson();
        //    var vv5 = v99.ToBsonDocument();
        //}
        var linq = from docs in mr.GetResults()
                   orderby docs.GetElement("value").Value.ToBsonDocument().GetElement("qty").Value descending
                   //where docs.GetElement("value").Value.ToBsonDocument().GetElement("user").Value == usersess
                   select docs;

        var linqcount = linq.Count();
        string finalString = "";
        foreach (var document in linq)
        {
            string str = document.ToJson();
            finalString += str + ",";
        }
        var count = mr.GetResults().Count();
        var finalString1 = "{\"Prudhvi\":[" + finalString.Remove(finalString.Length - 1, 1) + "]}";
        Response.Clear();
        Response.CacheControl = "no-cache";
        Response.ContentType = "application/json";
        Response.Write(finalString1);
        Response.End();
    }
}