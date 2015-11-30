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
using System.Threading;

public partial class RegisterAction : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            var tempOrders = Session["order"];
            var json = Request["reqdata"];
            BsonDocument p = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(json);
            BsonValue typeofuser = p.GetElement("type").Value;
            BsonValue stname = p.GetElement("sn").Value;
            BsonValue Name = p.GetElement("Name").Value;
            BsonValue Mobile = p.GetElement("mobileNo").Value;
            BsonValue Email = p.GetElement("email").Value;
            BsonValue Password = p.GetElement("passWord").Value;
            BsonValue Address = p.GetElement("address").Value;
            BsonValue State = p.GetElement("state").Value;
            BsonValue City = p.GetElement("city").Value;
            BsonValue Pincode = p.GetElement("pincode").Value;
            string dedcolname = Name + Mobile.ToString();
            MyDB md = new MyDB();
            var registration = md.GetBColl("registration");
            
            myEncryption me = new myEncryption();
            string PASSWORD = me.getMD5Hash(Password.ToString());
            BsonDocument document = new BsonDocument();
            document.Add("name", Name);
            document.Add("mobile", Convert.ToInt64(Mobile));
            document.Add("email", Email);
            document.Add("password", PASSWORD);
            document.Add("address", Address);
            document.Add("state", State);
            document.Add("city", City);
            document.Add("pincode", Pincode);
            document.Add("status", 0);
            document.Add("type", typeofuser);
            document.Add("storename", stname);
            document.Add("colname", dedcolname);
            registration.Insert(document);
            registration.Save(document);
            BsonElement bid = document.GetElement("_id");
            

                    string ActivationUrl = Server.HtmlEncode("http://118.139.160.32/sivanstreet.com/activateusers.aspx");
                    SmtpClient sc = new SmtpClient();
                    sc.Credentials = new NetworkCredential("bakkupavankumar@gmail.com", "9885139782"); //from address and password
                    sc.Port = 587;
                    sc.Host = "smtp.gmail.com";
                    sc.EnableSsl = true;
		    
                    MailMessage mm = new MailMessage();
                    mm.From = new MailAddress("bakkupavankumar@gmail.com", "Confirmation", System.Text.Encoding.UTF8);
                    mm.To.Add(Email.ToString());
		    mm.IsBodyHtml = true;
                    mm.Subject = "Confirmation";
                    mm.Body = "Welcome to SivanStreet<br/>" + "Hi " + Name +"<br/>Please <a href=" + ActivationUrl + ">click here to Activate your Account</a> <br/>\nEnjoy Shopping in SivanStreet :)<br/><br/>With Regards,<br/>SivanStreet.com.";
                    mm.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
                    sc.Send(mm);

	   if (tempOrders != null)
            {
                string ordersend = "[" + tempOrders + "]";
                var res = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(ordersend.ToString());
                var temporder = md.GetBColl("temporders");
                BsonDocument btemp = new BsonDocument();
                btemp.Add("regtoship", "yes");
                btemp.Add("user", bid.Value.ToString());
                btemp.Add("order", res);
                temporder.Insert(btemp);
                temporder.Save(btemp);
            }
        }
        catch (ThreadAbortException ee) { }
        catch (Exception eee)
        {
            Response.Clear();
            Response.CacheControl = "no-cache";
            Response.ContentType = "application/json";
            Response.Write("exception"+eee.Message);  //Valid User
            Response.End();
        }        
    }
}
