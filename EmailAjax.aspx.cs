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

public partial class NameAjax : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            var useremail = Request["reqdata"];

            MyDB md = new MyDB();

            var collection = md.GetBColl("registration");

            var emailquery = new QueryDocument("email", useremail);
            foreach (BsonDocument items in collection.Find(emailquery))
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