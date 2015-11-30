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

public partial class loginUserChek : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            var userid = Request["reqdata"];
            MyDB db= new MyDB();
            var col = db.GetBColl("registration");
            QueryDocument foremail = new QueryDocument("email", userid.ToString());
            foreach (BsonDocument items in col.Find(foremail))
            {
                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
                Response.Write("1");   
                Response.End();
                goto hihi;
            }
            QueryDocument fordet = new QueryDocument("mobile", Convert.ToInt64(userid));
            foreach (BsonDocument items in col.Find(fordet))
            {
                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
                Response.Write("1");   
                Response.End();
            }
            Response.Clear();
            Response.CacheControl = "no-cache";
            Response.ContentType = "application/json";
            Response.Write("0");
            Response.End();
        hihi:
            string dummy = null;
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