using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using System.Net.Mail;
using mango;
using MongoDB;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System.Threading;

public partial class OrdermessageAction : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            var offset = TimeZoneInfo.Local.GetUtcOffset(DateTime.UtcNow);
            DateTime dt = DateTime.Now;
            var dateto = dt;

            string useraddress = Request["reqdata"];
            BsonDocument baddress = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(useraddress);
            BsonValue bpermmobile = baddress.GetElement("o1").Value.ToDouble();
            BsonValue bperaddress = baddress.GetElement("o2").Value;
            string objectidvalue = Session["objid"].ToString();
            MyDB md = new MyDB();
            var registration = md.GetBColl("registration");
            var orders = md.GetBColl("Test3");
            var temporders = md.GetBColl("temporders");
            var queryid = new QueryDocument("_id", ObjectId.Parse(objectidvalue));
            var queryidwithvalue = new QueryDocument("user", objectidvalue);
            var sss = Session["order"];
            if (sss == null)
            {
                BsonDocument bd1 = new BsonDocument();
                foreach (BsonDocument bits in temporders.Find(queryidwithvalue))
                {
                    bits.Remove("regtoship");

                    bits.Add("user", objectidvalue);
		            string username = Session["username"].ToString();
		            bits.Add("name", username);
                    bits.Add("ISODate", dateto);
                    bits.Add("mobile", bpermmobile);
                    bits.Add("shipadd", bperaddress);
                    bits.Add("orderstatus", "undeliver");
                    orders.Insert(bits);
                    orders.Save(bits);
                    temporders.Remove(queryidwithvalue);
                }
                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
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
                BsonElement bshipmobformer = null;
                BsonElement bshipaddformer = null;
                foreach (BsonDocument borg in registration.Find(queryid))
                {
                    bshipmobformer = borg.GetElement("mobile");
                    bshipaddformer = borg.GetElement("address");

                    bd.Add("user", objectidvalue);
                    string username = Session["username"].ToString();
		            bd.Add("name", username);
                    bd.Add("ISODate", dateto);
                    bd.Add("mobile", borg.GetElement("mobile").Value);
                    bd.Add("shipadd", borg.GetElement("address").Value);
                    bd.Add("orderstatus", "undeliver");
                }
                bd.Add("order", res);
                orders.Insert(bd);
                orders.Save(bd);
                Session.Remove("order");

                /*Get the object _id of the merchant to whom user is placing order. And then using that object _id retrieve merchant
                email to send what order the user is placed. For this case we have only one merchant so we have taken static email of 
                merchant i.e bakkupavan@gmail.com */

                string Email = "bakkupavan@gmail.com";
                SmtpClient sc = new SmtpClient();
                sc.Credentials = new NetworkCredential("bakkupavankumar@gmail.com", "9885139782"); //from address and password
                sc.Port = 587;
                sc.Host = "smtp.gmail.com";
                sc.EnableSsl = true;

                MailMessage mm = new MailMessage();
                mm.From = new MailAddress("bakkupavankumar@gmail.com", "Confirmation", System.Text.Encoding.UTF8);
                mm.To.Add(Email.ToString());
                mm.Subject = "ORDER";
                mm.Body += "Order from N B T C User " + "<br/>" + "Hi" + res;
                mm.Body += "<br/>";
                mm.Body += "SHIPPING ADDRESS";
                mm.Body += bshipmobformer.Value;
                mm.Body += bshipaddformer.Value;

                mm.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
                sc.Send(mm);

                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
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