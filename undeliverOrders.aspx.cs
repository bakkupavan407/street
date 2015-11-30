using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MongoDB.Bson;
using MongoDB.Driver;
using mango;
using MongoDB.Driver.Builders;
using System.Threading;

public partial class undeliverOrders : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
         try
        {
            var orderesarray = Request["z"];
            if (orderesarray != "")
            {
                string[] ord = orderesarray.Split(',');

                var x = (from a in ord
                         group a by a into groups
                         where groups.Count() == 1 || groups.Count() == 3 || groups.Count() == 5 || groups.Count() == 7 || groups.Count() == 9 || groups.Count() == 11 || groups.Count() == 13
                         select groups.Key
                           ).ToArray();

                MyDB db = new MyDB();
                var orderscoll = db.GetBColl("orders");
                var guestcoll = db.GetBColl("guests");
                foreach (var ids in x)
                {
                    IMongoQuery qd = new QueryDocument("_id", ObjectId.Parse(ids.ToString()));
                    IMongoUpdate ud = Update.Set("orderstatus", "undelivered");
                    var count = orderscoll.Find(qd).Count();
                    if (count > 0)
                    {
                        orderscoll.Update(qd, ud);
                    }
                    else
                    {
                        guestcoll.Update(qd, ud);
                    }
                }
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