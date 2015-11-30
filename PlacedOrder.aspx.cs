using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System.Threading;

public partial class PlacedOrder : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            var OrderSession = Session["order"];
            if (OrderSession != null)
            {

                BsonDocument oS = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(OrderSession.ToString());
                oS.Remove("OrderedDate");
                oS.Remove("DelivaryDate");
                oS.Remove("storename");


                string oS1 = oS.ToString();
                string OrdItem = oS1.Remove(0, 12);
                string ordItem1 = OrdItem.Remove((OrdItem.Length) - 1, 1);
                string ItemKeyChange = ordItem1.Replace("Name", "name");
                string ItemKeyChange1 = ItemKeyChange.Replace("Quantity", "quantity");
                string ItemKeyChange2 = ItemKeyChange1.Replace("Price", "price");
                var ordSession = ItemKeyChange2;
                BsonArray oS2 = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(ordSession);


                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
                Response.Write(oS2);  ////User logged off
                Response.End();
            }
            else
            {
                Response.Clear();
                Response.CacheControl = "no-cache";
                Response.ContentType = "application/json";
                Response.Write(1);  ////User logged off
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