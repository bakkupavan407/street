using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MongoDB.Bson;
using MongoDB.Driver;
using mango;
using System.Net;
using System.Net.Mail;
using System.Threading;

public partial class User_ForgotPassword : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            var forgot = Request["forgotEmail"];
            MyDB db = new MyDB();
            var regcoll = db.GetBColl("registration");
            var query = new QueryDocument("email", forgot);

            var count = regcoll.Find(query).Count();

            if (count > 0)
            {
                foreach (BsonDocument buns in regcoll.Find(query))
                {
                    //string ActivationUrl = Server.HtmlEncode("http://localhost:25585/User/ResetPassword.html?Email=" + forgot);

                    string ActivationUrl = Server.HtmlEncode("http://118.139.160.32/sivanstreet.com/ResetPassword.html");
                    SmtpClient sc = new SmtpClient();
                    sc.Credentials = new NetworkCredential("bakkupavankumar@gmail.com", "9885139782"); //from address and password
                    sc.Port = 587;
                    sc.Host = "smtp.gmail.com";
                    sc.EnableSsl = true;

                    MailMessage mm = new MailMessage();
                    mm.From = new MailAddress("bakkupavankumar@gmail.com", "Confirmation", System.Text.Encoding.UTF8);
                    mm.To.Add(forgot.ToString());
                    mm.Subject = "SivanStreet User Activation link";
                    mm.Body = "Welcome to N B T C private limited<br/>" + "Hi " + forgot + "<br/>Please <a href=" + ActivationUrl + ">click here to reset your password</a> <br/>\nThanks!";
                    //mm.Body = "<a  href=\"" + ActivationUrl + "\"";
                    mm.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
                    sc.Send(mm);

                    Session["resetEmail"] = forgot;
                }
            }
            else
            {
                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/text";
                Response.Write(0);
                Response.End();
            }
        }
        catch (ThreadAbortException te) { }
        catch (Exception ee)
        {
            Response.Clear();
            Response.CacheControl = "no-cache";
            Response.ContentType = "application/text";
            Response.Write(2);
            Response.End();
        }
    }
}