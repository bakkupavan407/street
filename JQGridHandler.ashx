<%@ WebHandler Language="C#" Class="JQGridDemo.JQGridHandler" %>

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

namespace JQGridDemo
{
    /// <summary>
    /// Summary description for JQGridHandler
    /// </summary>
    public class JQGridHandler : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            string getdummydata = context.Session["dummycol"].ToString(); //COLLECTION NAME FROM DASHBOARD.ASPX PAGE. Similarly we can get dummy collection name toooooo
            //string getdummydata = "bakkupavankumar7382476952dummy";
            System.Collections.Specialized.NameValueCollection forms = context.Request.Form;
            string strOperation = forms.Get("oper");
            
            //context.Session["check"] = forms;
                        
            MongoConnect objMC = new MongoConnect();    //Helper Class
            var collectionEmployee = objMC.GetMongoCollection(getdummydata);     //Gets Dummy Collection
            string strResponse = string.Empty;

            if (strOperation == null)
            {
                var jsonSerializer = new JavaScriptSerializer();
                context.Response.Write(jsonSerializer.Serialize(collectionEmployee.AsQueryable<Product>().ToList<Product>()));
            }
            else if (strOperation == "del")
            {
                long snosno = Convert.ToInt64(forms.Get("pavan"));
                var query = Query.EQ("sno", snosno);
                collectionEmployee.Remove(query);
              
            }
            else
            {
                string strOut = string.Empty;
                AddEdit(forms, collectionEmployee,context);
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

        private void AddEdit(NameValueCollection forms, MongoCollection collectionEmployee,HttpContext context)
        {
            string strOperation = forms.Get("oper");


            if (strOperation == "add")
            {
                context.Response.Write("Items won't be added in dummy grid");
            }
            else if (strOperation == "edit")
            {
                long snosno =  Convert.ToInt64(forms.Get("pavan"));
                IMongoQuery im = Query.EQ("sno", snosno);

                IMongoUpdate up = Update.Set("pid", forms.Get("pid").ToString())
                                        .Set("name", forms.Get("name").ToString())
                                        .Set("type", forms.Get("type").ToString())
                                        .Set("price", forms.Get("price").ToString())
                                        .Set("quantity", forms.Get("quantity").ToString())
                                        .Set("measures", forms.Get("measures").ToString())
                                        .Set("unit", forms.Get("unit").ToString())
                                        .Set("offer", forms.Get("offer").ToString())
                                        .Set("promotion", forms.Get("promotion").ToString());
                WriteConcernResult wcr = collectionEmployee.Update(im, up);

            }
        }
    }
}