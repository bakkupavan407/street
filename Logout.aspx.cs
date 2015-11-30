using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using mango;

public partial class Logout : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        MyDB db = new MyDB();
        //var storesession = Session["storename"].ToString();
        var usersess = Session["objid"].ToString();

        var getcoll = db.GetBColl("Test4" + usersess);
        var newcollstore = db.GetBColl("storecoll" + usersess);
        var newcoll = db.GetBColl("collstore" + usersess); //.InsertBatch(coll.Find(userq));

        var userItems = db.GetBColl("useritems1" + usersess);
        
        getcoll.Drop();
        newcollstore.Drop();
        newcoll.Drop();
        userItems.Drop();
        Session.Abandon();
        Session.Clear();
        Response.Redirect("~/index.html");
    }
}