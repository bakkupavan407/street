<%@ WebHandler Language="C#" Class="DedHandler" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.SessionState;
using mango;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;
using System.Web.Script.Serialization;
using System.Collections.Specialized;

public class DedHandler : IHttpHandler, IRequiresSessionState
{
    public void ProcessRequest (HttpContext context)
    {
        //string UserName = Convert.ToString(context.Session["aaa"]);
        string getoriginal = context.Session["dedcolname"].ToString(); //COLLECTION NAME FROM DASHBOARD.ASPX PAGE. Similarly we can get dummy collection name toooooo
        //string getoriginal = "bakkupavankumar7382476952";
        System.Collections.Specialized.NameValueCollection forms = context.Request.Form;
        string strOperation = forms.Get("oper");

        MongoConnect objMC = new MongoConnect();    //Helper Class
        var collectionEmployee = objMC.GetMongoCollection(getoriginal);     //Gets Employee Collection
        string strResponse = string.Empty;

        if (strOperation == null)
        {
           			var col_length = collectionEmployee.FindAllAs<BsonDocument>().Count();
			if (col_length <= 8971)
			{
				var jsonSerializer = new JavaScriptSerializer();
				context.Response.Write(jsonSerializer.Serialize(collectionEmployee.AsQueryable<Product>().ToList<Product>()));
			}
			else
			{
				var counter = 0;
				var jsonSerializer = new JavaScriptSerializer();
                string dispGrid;
                string disp2 = "";
				while (counter <= col_length)
				{
                    if (counter == 0)
                    {
                        dispGrid = jsonSerializer.Serialize(collectionEmployee.AsQueryable<Product>().Skip(counter).Take(8971).ToList<Product>());
                        disp2 += dispGrid;
                    }

                    else
                    {
                        dispGrid = jsonSerializer.Serialize(collectionEmployee.AsQueryable<Product>().Skip(counter).Take(8971).ToList<Product>());
                        dispGrid = dispGrid.Remove(0, 1);
                        disp2 = disp2.Remove(disp2.Length - 1, 1) + ",";
                        disp2 += dispGrid;
                    } 
                   
					counter = counter + 8971;

                }
                context.Response.Write(disp2);
            }
        }
        else if (strOperation == "del")
        {
            var query = Query.EQ("pid", forms.Get("pavan").ToString());
            collectionEmployee.Remove(query);
            strResponse = "record successfully removed";
            context.Response.Write(strResponse);
        }
        else
        {
            string strOut = string.Empty;
            AddEdit(forms, collectionEmployee, context);
            context.Response.Write(strOut);
        }
    }
 
    public bool IsReusable 
    {
        get 
        {
            return false;
        }
    }

    private void AddEdit(NameValueCollection forms, MongoCollection collectionEmployee, HttpContext context)
    {
        string strOperation = forms.Get("oper");


	 var pid2 = forms.Get("pid").ToString();
        var name1 = forms.Get("name").ToString();
        var type1 = forms.Get("type").ToString();
        var price1 = forms.Get("price").ToString();
        var quantity1 = forms.Get("quantity").ToString();
        var measures1 = forms.Get("measures").ToString();
        var unit1 = forms.Get("unit").ToString();
        var offer1 = forms.Get("offer").ToString();
        var promotion1 = forms.Get("promotion").ToString();





 if (pid2 != "" && name1 != "" && type1 != "" && price1 != "" && quantity1 != "" && measures1 != "" && unit1 != "" && offer1 != "" && promotion1 != "")

       {     
        if (strOperation == "add")
        {
            

            BsonDocument Prod = new BsonDocument();
            Prod.Add("pid", forms.Get("pid").ToString());
            Prod.Add("name", forms.Get("name").ToString());
            Prod.Add("type", forms.Get("type").ToString());
            Prod.Add("price", forms.Get("price").ToString());
            Prod.Add("quantity", forms.Get("quantity").ToString());
            Prod.Add("measures", forms.Get("measures").ToString());
            Prod.Add("unit", forms.Get("unit").ToString());
            Prod.Add("offer", forms.Get("offer").ToString());
            Prod.Add("promotion", forms.Get("promotion").ToString());

            var qry = Query.Or(Query.EQ("pid",forms.Get("pid").ToString()),Query.EQ("name",forms.Get("name").ToString()));
            var count = collectionEmployee.FindAs<BsonDocument>(qry).Count();

          if (count>0)
          {
           context.Response.Write("PRODUCT ID or NAME already existed");
          }
          else
          {
           collectionEmployee.Save(Prod);
           context.Response.Write("added successfully");
          }
        }
        else if (strOperation == "edit")
        {
            IMongoQuery query = Query.EQ("pid", forms.Get("pid"));

            IMongoUpdate update = Update.Set("name", forms.Get("name"))
                                        .Set("type", forms.Get("type"))
                                        .Set("price", forms.Get("price"))
                                        .Set("quantity", forms.Get("quantity"))
                                        .Set("measures", forms.Get("measures"))
                                        .Set("unit", forms.Get("unit"))
                                        .Set("offer", forms.Get("offer"))
                                        .Set("promotion", forms.Get("promotion"));
            var qry = Query.EQ("name",forms.Get("name").ToString());

            BsonValue pid1 = null;
            var count = collectionEmployee.FindAs<BsonDocument>(qry).Count();
            foreach(BsonDocument bd1 in collectionEmployee.FindAs<BsonDocument>(qry))
            {
               pid1 = bd1.GetElement("pid").Value;
            }
            if (count ==0 || pid1 == forms.Get("pid").ToString())
            {
               collectionEmployee.Update(query, update);
               context.Response.Write("Updated Successfully");
            }
            else
            {
               context.Response.Write("Name already existed");
            }
        }

	}

	else
        {
            context.Response.Write("Values cannot be EMPTY");
        }
	
    }
}