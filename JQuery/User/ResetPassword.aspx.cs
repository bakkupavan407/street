using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using mango;

public partial class User_ResetPassword : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            var valto = Request["forgotEmail"];
            //update this pwd in database and reidrect the user to login page and ask him to login with new password.
            MyDB db = new MyDB();
            var regcoll = db.GetBColl("registration");
            var email=Session["resetEmail"].ToString();

            IMongoQuery q = new QueryDocument("email",email);
            myEncryption enc=new myEncryption();
            var mdfhashpwd = enc.getMD5Hash(valto.ToString());
            IMongoUpdate u=Update.Set("password",mdfhashpwd);

            regcoll.Update(q,u);
        }
        catch
        { 
            
        }
    }
}