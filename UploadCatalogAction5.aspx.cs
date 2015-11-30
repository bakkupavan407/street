using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Threading;
using System.Text;
using System.Text.RegularExpressions;
using MongoDB.Bson;
using MongoDB.Driver;
using mango;

public partial class UploadCatalogAction5 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string filetoread = Session["filename"].ToString();
        string mypath = Server.MapPath("~/Files/") + filetoread;
        StreamReader sr;
        sr = new StreamReader(mypath);
        string line = sr.ReadLine();

        var columnNames = Regex.Split(line, ",");
        string jsonstr = "";
        while ((line = sr.ReadLine()) != null)
        {
            string[] cols = Regex.Split(line, ",");

            BsonDocument mybson = new BsonDocument();
            for (int i = 0; i <= columnNames.Length - 1; i++)
            {
                mybson.Add(columnNames[i], cols[i]);
            }
            jsonstr += mybson + ",";
        }
        BsonDocument bboth = new BsonDocument();

        bboth.Add("csvdata", "[" + jsonstr.Remove(jsonstr.Length - 1, 1) + "]");
        
        string dedcoll = Session["dedcolname"].ToString();
        MyDB db = new MyDB();
        var coll = db.GetBColl(dedcoll);
        var countdocs = coll.Count();
        if (coll.Exists() && countdocs > 0)
        {
            var orgjson = "";
            foreach (BsonDocument bibi in coll.FindAll())
            {
                bibi.Remove("_id");
                orgjson += bibi + ",";
            }
            bboth.Add("orginaldata", "[" + orgjson.Remove(orgjson.Length - 1, 1) + "]");
        }
        else 
        {
            bboth.Add("orginaldata", "");
        }

        Response.Clear();
        Response.CacheControl = "no-cache";
        Response.ContentType = "application/json";
        Response.Write(bboth);
        Response.End();
    }
}