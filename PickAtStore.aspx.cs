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
using MongoDB.Driver.Builders;
using System.Threading;

public partial class PickAtStore : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
	var offset = TimeZoneInfo.Local.GetUtcOffset(DateTime.UtcNow);
            DateTime dt = DateTime.Now;
            var dateto = dt;

            string objectidvalue = Session["objid"].ToString();
            MyDB md = new MyDB();
            var registration = md.GetBColl("registration");
            var orders = md.GetBColl("Test3");
            var temporders = md.GetBColl("temporders");
            var queryid = new QueryDocument("_id", ObjectId.Parse(objectidvalue));
            var queryidwithvalue = new QueryDocument("user", objectidvalue);
            var sss = Session["order"];
            BsonElement bshipmobformer = null;
            foreach (BsonDocument borg in registration.Find(queryid))
            {
                bshipmobformer = borg.GetElement("mobile");
            }

            if (sss == null)
            {
                BsonDocument bd1 = new BsonDocument();
                foreach (BsonDocument bits in temporders.Find(queryidwithvalue))
                {
                    bits.Remove("regtoship");
                    string username = Session["username"].ToString();
                    bits.Add("name", username);
                    bits.Add("user", objectidvalue);
                    bits.Add("ISODate", dateto);
                    bits.Add("mobile", bshipmobformer.Value);
                    bits.Add("shipadd", "Pick at Store");
                    bits.Add("orderstatus", "undeliver");
                    orders.Insert(bits);
                    orders.Save(bits);
                    temporders.Remove(queryidwithvalue);
                }
                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
                Session["order"] = null;
                Session.Remove("order");
                Response.Write(1.ToString());  //Valid User
                Response.End();
            }
            else
            {
                string orderdet = Session["order"].ToString();
                string omedet = "[" + orderdet + "]";
                var res = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(omedet);
                BsonDocument bd = new BsonDocument();

                bd.Add("user", objectidvalue);
                string username = Session["username"].ToString();
                bd.Add("name", username);
                bd.Add("ISODate", dateto);
                bd.Add("mobile", bshipmobformer.Value);
                bd.Add("shipadd", "Pick at Store");
                bd.Add("orderstatus", "undeliver");
                bd.Add("order", res);
                orders.Insert(bd);
                orders.Save(bd);

                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
                Session["order"] = null;
                Session.Remove("order");
                Response.Write(1.ToString());  //Valid User
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