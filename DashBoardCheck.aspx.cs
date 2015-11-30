using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using mango;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading;

public partial class DashBoardCheck : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (Session["objid"] != null)
            {
                var ordercheck = Session["objid"].ToString();
                var db = new MyDB();
                var regcol = db.GetBColl("registration");
                var merchantquery = new QueryDocument("_id", ObjectId.Parse(ordercheck));
                if (Session["storename"] != null)
                {
                    foreach (BsonDocument b in regcol.Find(merchantquery))
                    {
                        Response.Clear();
                        Response.CacheControl = "no-cache";
                        Response.ContentType = "application/json";
                        Response.Write("12");  // For Merchant
                        Response.End();
                    }
                }
                var col = db.GetBColl("orders");
                var queryorders = new QueryDocument("user", ordercheck);
                foreach (BsonDocument b in col.Find(queryorders))
                {
                    Response.Clear();
                    Response.CacheControl = "no-cache";
                    Response.ContentType = "application/json";
                    Response.Write("11");
                    Response.End();
                }
                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
                Response.Write("1");
                Response.End();
            }
            else
            {
                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
                Response.Write("0");
                Session["pleaselogin"] = "newlogin";
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