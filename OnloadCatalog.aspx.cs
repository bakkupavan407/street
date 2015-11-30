using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using MongoDB.Bson;
using MongoDB.Driver;
using mango;
using System.Threading;

public partial class OnloadCatalog : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            var selectedStore = Request["val"];
            Session["selstore"] = selectedStore;
            MyDB db = new MyDB();
            var coll = db.GetBColl("registration");
            var query = new QueryDocument("storename", selectedStore);
            BsonElement bmerchantcollname = null;
            BsonValue bmerchantcollnamevalue = null;
            foreach (BsonDocument bcat in coll.Find(query))
            {
                bmerchantcollname = bcat.GetElement("colname");
                bmerchantcollnamevalue = bmerchantcollname.Value;
            }
            //var merchcol = db.GetBColl("bakkupavankumar7382476952");
            var merchcol = db.GetBColl(bmerchantcollnamevalue.ToString());
            IEnumerable<BsonValue> typesregex = merchcol.Distinct("type");
            var outjson = "";
            var outjsonconcat = "";
            var varjson = "";
            BsonElement btype = null;
            BsonValue btypevalue = null;
            BsonElement bmeasures = null;
            BsonElement boffer = null;
            string dums = null;
            var jsonoffer = "";
            foreach (string str in typesregex)
            {
                dums = null;
                var query1 = new QueryDocument("type", str);
                foreach (BsonDocument docs in merchcol.Find(query1))
                {
                    btype = docs.GetElement("type");
                    btypevalue = btype.Value;
                    boffer = docs.GetElement("offer");
                    var offervalue = boffer.Value;

                    bmeasures = docs.GetElement("measures");
                    string bmes = bmeasures.ToString();
                    var s = bmes.Replace(";", "\",\"");
                    var squareconcat = "[\"" + "1" + "\",\"" + "1.5" + "\",\"" + "2" + "\",\"" + "2.5" + "\",\"" + "3" + "\",\"" + "5" + "\",\"" + "10" + "\"]";
                    var addtobson = squareconcat;

                    docs.Remove("_id");
                    docs.Remove("measures");
                    docs.Add("measures", addtobson);
                    varjson = docs.ToJson();
                    jsonoffer = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(varjson.ToString()).ToString();
                    dums += jsonoffer.ToString() + ",";
                }
                outjsonconcat += "{\"category\":" + "\"" + btypevalue + "\"" + ",\"items\":[" + dums.Remove(dums.Length - 1, 1) + "]}" + ",";
                outjson = outjsonconcat;
            }
            var stringremove = "[" + outjson.Remove(outjson.Length - 1, 1) + "]";
            outjson.Remove(outjson.Length - 1, 1);

            FileInfo fi = new FileInfo(Server.MapPath("inventory/" + selectedStore + ".json"));
            if (!File.Exists(Server.MapPath("inventory/" + selectedStore + ".json").ToString()))
            {
                File.Create(Server.MapPath("inventory/" + selectedStore + ".json").ToString());
                using (TextWriter tw = new StreamWriter(fi.Open(FileMode.Truncate)))
                {
                    tw.Write(stringremove);
                    //fi.Refresh();
                }
            }
            else //if (File.Exists(Server.MapPath("inventory/" + selectedStore + ".json").ToString()))
            {
                using (TextWriter tw = new StreamWriter(fi.Open(FileMode.Truncate)))
                {
                    tw.Write(stringremove);
                    //fi.Refresh();
                }
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