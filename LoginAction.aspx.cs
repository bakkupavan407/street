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

public partial class LoginAction : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            var loginjson = Request["reqdata"];
            BsonDocument t = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(loginjson);
            BsonValue mymob = t.GetElement("mobileno").Value;
            BsonValue mypwd = t.GetElement("password").Value;
            var ordersession = Session["order"];
            
            myEncryption me = new myEncryption();
            string ss = me.getMD5Hash(mypwd.ToString());
            MyDB md = new MyDB();
            var col = md.GetBColl("registration");
            var temporders = md.GetBColl("temporders");
            //IMongoQuery forboth = Query.Or(Query.EQ("mobile", Convert.ToInt64(mymob)), Query.EQ("email", mymob.ToString()));
            BsonElement bobjid = null;
            BsonElement bdedcol = null;
            BsonElement bname = null;
            BsonElement bmobile = null;
            BsonElement bpwd = null;
            BsonElement bstatus = null;
            BsonElement btype = null;
            QueryDocument foremail = new QueryDocument("email", mymob.ToString());
            foreach (BsonDocument items in col.Find(foremail))
            {
                bobjid = items.GetElement("_id");
                bdedcol = items.GetElement("colname");
                bname = items.GetElement("name");
                bmobile = items.GetElement("mobile");
                bpwd = items.GetElement("password");
                bstatus = items.GetElement("status");
                btype = items.GetElement("type");
                Session["username"] = bname.Value.ToString();
                Session["dedcolname"] = bdedcol.Value.ToString();
                goto hihi;
            }
            QueryDocument fordet = new QueryDocument("mobile", Convert.ToInt64(mymob));
            foreach (BsonDocument items in col.Find(fordet))
            {
                bobjid = items.GetElement("_id");
                bdedcol = items.GetElement("colname");
                bname = items.GetElement("name");
                bmobile = items.GetElement("mobile");
                bpwd = items.GetElement("password");
                bstatus = items.GetElement("status");
                btype = items.GetElement("type");
                Session["username"] = bname.Value.ToString();
                Session["dedcolname"] = bdedcol.Value.ToString();
            }
        hihi:
            Session["objid"] = bobjid.Value.ToString();
            Session["typeofuser"] = btype.Value.ToString();
            
            if (bmobile != null)
            {
                if (ss == bpwd.Value) 
                {
                    Session["mertouser"] = "experiment";
                    if (Session["typeofuser"] != null && Session["typeofuser"].ToString() == "merchant")
                    {
                        var merchantreg = md.GetBColl("registration");
                        var queryfor = new QueryDocument("_id", ObjectId.Parse(bobjid.Value.ToString()));
                        BsonElement bstore = null;
                        Session["dummycol"] = Session["dedcolname"] + "dummy";
                        foreach (var docss in merchantreg.Find(queryfor))
                        {
                            bstore = docss.GetElement("storename");
                            Session["storename"] = bstore.Value;
                        }
                        Response.Clear();
                        Response.CacheControl = "no-cache";
                        Response.ContentType = "application/json";
                        Response.Write("105");   //Invalid Credentials
                        Response.End();
                    }

                    string sessionforid = Session["objid"].ToString();
                    var queryregstatus = new QueryDocument("user", sessionforid);
                    BsonDocument bregstat = new BsonDocument();
                    BsonElement bs = null;
                    foreach (BsonDocument bregs in temporders.Find(queryregstatus))
                    {
                        bs = bregs.GetElement("regtoship");
                    }
                    BsonDocument loginres = new BsonDocument();
                    //loginres.Add("type",btype.Value.ToString());
                    //loginres.Add("orderstatus", orderstatus);
                    loginres.Add("type", btype.Value);
                    //var ordervalue = Session["order"];
                    if (Session["order"] != null)
                    {
                        string ordervalue = Session["order"].ToString();
                        loginres.Add("orderstatus", ordervalue);
                    }
                    if (bs != null)
                    {
                        loginres.Add("registeredtoship", bs.Value);
                    }
                    if (bstatus.Value == 1)
                    {

                        Response.Clear();
                        Response.CacheControl = "no-cache";
                        Response.ContentType = "application/json";
                        //Session["loggedin"] = "loggedin";
                        if (Session["pleaselogin"] != null)
                        {
                            Response.Write("100");  //new login
                        }
                        else
                        {
                            Response.Write(loginres.ToString());  //Valid User
                        }
                        Response.End();
                        //HttpContext.Current.ApplicationInstance.CompleteRequest();
                    }
                    else
                    {
                        Response.Clear();
                        Response.CacheControl = "no-cache";
                        Response.ContentType = "application/json";
                        Response.Write("2");   //Didnt activate your link
                        Response.End();
                        //HttpContext.Current.ApplicationInstance.CompleteRequest();
                    }
                }
                else
                {
                    Response.Clear();
                    Response.CacheControl = "no-cache";
                    Response.ContentType = "application/json";
                    Response.Write("0");   // no mobile INVALID PASSWORD LATEST
                    Response.End();
                }
            }
            else
            {
                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
                Response.Write("7");   // no mobile INVALID PASSWORD LATEST
                Response.End();
                //HttpContext.Current.ApplicationInstance.CompleteRequest();
            }
        }
        catch(ThreadAbortException)
        {}
        catch(Exception e4)
        {
            Response.Clear();
            Response.CacheControl = "no-cache";
            Response.ContentType = "application/json";
            Response.Write("exception");
            Response.End();
        }
    }
}