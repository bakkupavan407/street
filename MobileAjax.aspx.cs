using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Threading;
using System.Web.UI.WebControls;
using MongoDB.Driver;
using MongoDB.Bson;
using mango;

public partial class MobileAjax : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            var usermobile = Request["reqdata"];
            MyDB md = new MyDB();
            var collection = md.GetBColl("registration");
            var mobilequery = new QueryDocument("mobile", Convert.ToInt64(usermobile));
            foreach (BsonDocument items in collection.Find(mobilequery))
            {
                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
                Response.Write("0");
                Response.End();
                goto hi;
            }
            Response.Clear();
            Response.CacheControl = "no-cache";
            Response.ContentType = "application/json";
            Response.Write("1");
            Response.End();
        hi:
            string dummy = null;
        }
        catch (ThreadAbortException)
        { }
        catch (Exception e3) 
        {
            Response.Clear();
            Response.CacheControl = "no-cache";
            Response.ContentType = "application/json";
            Response.Write("INVALID MOBILE");
            Response.End();
        }
    }
}