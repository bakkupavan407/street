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

public partial class UserDashboardAction : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (Session["objid"] != null)
            {
                string type_user = Session["typeofuser"].ToString();
                string objectidvalue = Session["objid"].ToString();
                MyDB md = new MyDB();
                var orders = md.GetBColl("orders");
                var queryid = new QueryDocument("user", objectidvalue);
                BsonDocument borders = new BsonDocument();
                string str1 = null; string str2 = null; string str3 = null;
                bool val = Convert.ToBoolean(orders.Find(queryid).Count());

                string strusertomer = Session["mertouser"].ToString();
                if (strusertomer == "205")
                {
                    foreach (BsonDocument bit in orders.Find(queryid))
                    {
                        borders = null;
                        borders = new BsonDocument();
                        borders.Add("mobile", bit.GetElement("mobile").Value.ToDouble());
                        borders.Add("order", bit.GetElement("order").Value);
                        str2 += borders.ToJson() + ",";
                        str3 = str2;
                    }
                    if (str2 != null)
                    {
                        str1 = str2.Remove(str2.Length - 1, 1);
                        Response.Clear();
                        Response.CacheControl = "no-cache";
                        Response.ContentType = "application/json";
                        Response.Write(str1);
                        Session["mertouser"] = "experiment";
                        Response.End();
                    }
                    else
                    {
                        Response.Clear();
                        Response.CacheControl = "no-cache";
                        Response.ContentType = "application/json";
                        Response.Write("407");
                        Session["mertouser"] = "experiment";
                        Response.End();
                    }
                }
                if (type_user == "merchant")
                {

                    Response.Write("105");
                    Response.End();
                    //goto letsgo;
                }

                if (val)
                {
                    foreach (BsonDocument bit in orders.Find(queryid))
                    {
                        borders = null;
                        borders = new BsonDocument();
                        borders.Add("mobile", bit.GetElement("mobile").Value.ToDouble());
                        borders.Add("order", bit.GetElement("order").Value);
                        str2 += borders.ToJson() + ",";
                        str3 = str2;
                    }
                    str1 = str2.Remove(str2.Length - 1, 1);
                    Response.Clear();
                    Response.CacheControl = "no-cache";
                    Response.ContentType = "application/json";
                    Response.Write(str1);
                    Response.End();
                }

                else
                {

                    Response.Clear();
                    Response.CacheControl = "no-cache";
                    Response.ContentType = "application/json";
                    Response.Write("0");
                    Response.End();
                }
            }
            else
            {
                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
                Response.Write("77");
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