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
using myurl;

public partial class UPloadCatalogAction3 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            var obj = Request["reqdata"];
            BsonDocument t = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(obj);
            BsonValue objOrg = t.GetElement("originalGridData").Value;
            BsonValue objDummy = t.GetElement("dummyGridData").Value;
            MyDB db = new MyDB();
            string merchatsess = Session["dedcolname"].ToString();
            string merchdummycoll = Session["dummycol"].ToString();
            var coll = db.GetBColl(merchatsess);
            var dummycoll = db.GetBColl(merchdummycoll);

            if (coll.Count() > 0)
            {
                coll.Drop();
            }
            List<object> orgList = new List<object>();
            BsonDocument bexp = new BsonDocument();
            var coll77 = db.GetBColl(merchatsess);
            for (int i = 0; i <= objOrg.AsBsonArray.Count - 1; i++)
            {
               
                bexp = new BsonDocument();
                var bids = objOrg[i].AsBsonDocument;
                bexp.AddRange(bids);
                orgList.Add(bexp);
                bexp = null;
            }
            coll77.InsertBatch(orgList);
            BsonDocument bdums = new BsonDocument();
            BsonDocument bdums1 = new BsonDocument();

            var dummycount = dummycoll.Count();
            if (dummycoll.Exists() && dummycount > 0)
            {
                var maxsnosno = dummycoll.FindAll().SetSortOrder(SortBy.Descending("sno")).SetLimit(1).FirstOrDefault();
                var bsonsno = maxsnosno.GetElement("sno").Value;
                var longsno = Convert.ToInt64(bsonsno);

                for (int i = 0; i <= objDummy.AsBsonArray.Count - 1; i++)
                {
                    longsno++;
                    bdums = new BsonDocument();
                    Dictionary<string, long> dict = new Dictionary<string, long>();
                    dict.Add("sno", longsno);

                    var biddums = objDummy[i].AsBsonDocument;
                    bdums.AddRange(biddums);
                    bdums.AddRange(dict);

                    dummycoll.Insert(bdums);
                    bdums = null;
                }
            }
            else
            {
                var longsno1 = 0;
                for (int i = 0; i <= objDummy.AsBsonArray.Count - 1; i++)
                {
                    longsno1++;
                    bdums1 = new BsonDocument();
                    Dictionary<string, long> mydict = new Dictionary<string, long>();
                    mydict.Add("sno", longsno1);

                    var biddums1 = objDummy[i].AsBsonDocument;
                    bdums1.AddRange(biddums1);
                    bdums1.AddRange(mydict);

                    dummycoll.Insert(bdums1);
                    bdums1 = null;
                }
            }

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
		    var addtobson = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonValue>(squareconcat);
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
            string fstore = Session["storename"].ToString();
            string path = Server.MapPath("~/inventory/") + fstore + ".json";
          
            if (!File.Exists(path))
            {
                FileStream fs = new FileStream(path, FileMode.OpenOrCreate);
                StreamWriter str11 = new StreamWriter(fs);
                str11.WriteLine(stringremove.ToArray());
                str11.Flush();
                str11.Close();
                fs.Dispose();
                fs.Close();
            }
            else if (File.Exists(path))
            {
                FileStream fs = new FileStream(path, FileMode.Open);
                StreamWriter str12 = new StreamWriter(fs);
                str12.WriteLine(stringremove.ToArray());
                str12.Flush();
                str12.Close();
                fs.Dispose();
                fs.Close();
            }

            Response.Clear();
            Response.CacheControl = "no-cache";
            Response.ContentType = "application/json";
            Response.Write("777");
            Response.End();
        }
        catch (ThreadAbortException e4)
        {

        }
        catch (IOException e3) 
        {
            
        }
        catch (Exception e2)
        {
            Response.Clear();
            Response.CacheControl = "no-cache";
            Response.ContentType = "application/json";
            Response.Write("exception");
            Response.End();
        }
        finally 
        {
            
        }
    }
}