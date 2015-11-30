using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MongoDB.Bson;
using MongoDB.Driver;
using mango;
using System.Threading;

public partial class Indexonloadajax : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            //MyDB db = new MyDB();
            //var coll = db.GetBColl("registration");
            //string sss = "";
            BsonDocument bson = new BsonDocument();
            //BsonElement bstorename = null;
            //var queryformerch = new QueryDocument("type", "merchant");
            //foreach (BsonDocument bmerchs in coll.Find(queryformerch))
            //{
                //bstorename = bmerchs.GetElement("storename");
                //sss += "\"" + bstorename.Value + "\"" + ",";
            //}

            if (Session["order"] != null)
            {
                var myorder = Session["order"].ToString();
                bson.Add("myorder", myorder);
            }

            //string ss1 = "[ " + sss.Remove(sss.Length - 1, 1) + "]";
            //bson.Add("stores", ss1);
            if (Session["objid"] != null)
            {
                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
                bson.Add("response", "1");
                Response.Write(bson); //User logged in
                Response.End();
            }
            else
            {
                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
                bson.Add("response", "0");
                Response.Write(bson);  ////User logged off
                Response.End();
            }
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