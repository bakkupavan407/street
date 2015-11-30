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

public partial class AddressAction : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            string objectidvalue = Session["objid"].ToString();
            string ordervalue = Session["order"].ToString();
            MyDB md = new MyDB();
            var col = md.GetBColl("registration");
            var queryid = new QueryDocument("_id", ObjectId.Parse(objectidvalue));
            BsonDocument baddress = new BsonDocument();
            foreach (BsonDocument bits in col.Find(queryid))
            {
                baddress.Add("mobileNo", bits.GetElement("mobile").Value.ToDouble());
                baddress.Add("address", bits.GetElement("address").Value.ToString());
                baddress.Add("city", bits.GetElement("city").Value.ToString());
                baddress.Add("pincode", bits.GetElement("pincode").Value.ToDouble());
                baddress.Add("order", ordervalue);
            }
            Response.Clear();
            Response.CacheControl = "no-cache";
            Response.ContentType = "application/json";
            Response.Write(baddress.ToString());  //Valid User
            Response.End();
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