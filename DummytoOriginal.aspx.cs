﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Threading;
using System.Text;
using System.Text.RegularExpressions;
using mango;
using System.Web.Script.Serialization;
using System.Collections.Specialized;
using System.IO;

public partial class DummytoOriginal : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var data = Request["sendeddata"];
        BsonArray p = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(data);
        MyDB db = new MyDB();

        string orgcollsess = Session["dedcolname"].ToString();
        var orgcoll = db.GetBColl(orgcollsess);

        string dumcollstr = orgcollsess + "dummy";
        var dumcoll = db.GetBColl(dumcollstr);
        foreach (BsonDocument bids in p)
        {
            BsonValue objid = bids.GetElement("_id").Value;
            orgcoll.Insert(bids);
            var dumquery = new QueryDocument("_id",ObjectId.Parse(objid.ToString()));
            dumcoll.Remove(dumquery);
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
        Response.Write("1");
        Response.End();
    }
}