using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using mango;
using MongoDB;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System.Threading;
using System.Text.RegularExpressions;
using System.Web.SessionState;
using MongoDB.Driver.Linq;
using System.Web.Script.Serialization;
using System.Collections.Specialized;
using System.IO;

public partial class MerchantCatalogTest : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        MyDB db = new MyDB();
        string f_store = Session["storename"].ToString();
        string f_dedcoll = Session["dedcolname"].ToString();
        var f_coll = db.GetBColl(f_dedcoll);
        IEnumerable<BsonValue> typesregex = f_coll.Distinct("type");
        var outjson = "";
        var outjsonconcat = "";
        var varjson = "";
        BsonElement btype = null;
        BsonValue btypevalue = null;
        BsonElement bmeasures = null;
        string dums = null;
        var jsonoffer = "";
        foreach (string str in typesregex)
        {
            dums = null;
            var query = new QueryDocument("type", str);
            foreach (BsonDocument docs in f_coll.Find(query))
            {
                btype = docs.GetElement("type");
                btypevalue = btype.Value;
                bmeasures = docs.GetElement("measures");
                string bmes = bmeasures.ToString();
                var s = bmes.Replace(";", "\",\"");
                var squareconcat = "[" + "\"" + s.Substring(9) + "\"" + "]";
                var addtobson = squareconcat;
                docs.Remove("_id");
                docs.Remove("measures");
                docs.Add("measures", addtobson);
                varjson = docs.ToJson();
                jsonoffer = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(varjson.ToString()).ToString();
                dums += jsonoffer.ToString() + ",";
            }
            outjsonconcat = "{\"category\":" + "\"" + btypevalue + "\"" + ",\"items\":[" + dums.Remove(dums.Length - 1, 1) + "]}" + ",";
            outjson += outjsonconcat;
        }
        var stringremove = "[" + outjson.Remove(outjson.Length - 1, 1) + "]";

        string path = @"F:\UGADHI\SS8\inventory\" + f_store + ".json";
        if (!File.Exists(path))
        {
            File.Create(path);
            TextWriter tw = new StreamWriter(path);
            tw.WriteLine(stringremove.ToArray());
            tw.Close();
        }
        else if (File.Exists(path))
        {
            TextWriter tw = new StreamWriter(path, false); //false here to "Replace" the file content, instead of appending it.
            tw.WriteLine(stringremove.ToArray());
            tw.Close();
        }
    }
}