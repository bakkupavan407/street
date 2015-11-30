using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using mango;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

public partial class ActivateUsers : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string mob = Request.QueryString["UserID"];
        //string email = Request.QueryString["Email"];

        MyDB md = new MyDB();
        var col = md.GetBColl("registration");

        IMongoQuery qd = new QueryDocument("mobile", Convert.ToInt64(mob));
        IMongoUpdate ud = Update.Set("status", 1);
        col.Update(qd, ud);
    }
}