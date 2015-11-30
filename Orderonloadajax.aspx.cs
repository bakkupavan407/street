using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Threading;

public partial class Orderonloadajax : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (Session["objid"] != null)
            {
                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
                Response.Write("1"); //User logged in
                Response.End();
            }
            else
            {
                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
                Response.Write("0");  ////User logged off
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