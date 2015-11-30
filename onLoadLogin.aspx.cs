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
using System.Threading;

public partial class onLoadLogin : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (Session["order"] != null)
            {
                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
                Response.Write(1);  //Registered User
                Response.End();
            }
            else {
                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
                Response.Write(0);  //Guest User
                Response.End();
            }
        }

        catch (ThreadAbortException ee) { }

        catch (Exception e3)
        {
            Response.Clear();
            Response.CacheControl = "no-cache";
            Response.ContentType = "application/json";
            Response.Write("exception");
            Response.End();
        }
    }
}