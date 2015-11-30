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
using System.IO;
using System.Text.RegularExpressions;
using System.Threading;

public partial class OfferJson : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // var resp = Request["data"];
        MyDB db = new MyDB();
        //string f_dedcoll = Session["dedcolname"].ToString();
        string f_dedcoll = "bakkupavankumar7382476952";
        var f_coll = db.GetBColl(f_dedcoll);
        
        string offerlist = "";
        var offerquery = Query<Product>.EQ(x => x.offer, "1");
        foreach (BsonDocument bdoff in f_coll.Find(offerquery))
        {
            bdoff.Remove("_id");
            string offerlist1 = bdoff.ToString();
            offerlist = offerlist + offerlist1 + ",";
        }

        string offrlist3 = offerlist.Remove(offerlist.Length - 1, 1);
        string offerlist3 = "[{" + "\"items\":[" + offrlist3 + "]" + "}]";

        Response.Clear();
        Response.CacheControl = "no-cache";
        Response.ContentType = "application/json";
        Response.Write(offerlist3);  //Valid User
        Response.End();
    }
}