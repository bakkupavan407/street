using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB;
using MongoDB.Bson;
using MongoDB.Driver;
using mango;
using System.Configuration;
/// <summary>
/// Summary description for MyDB
/// </summary>
/// 
namespace mango
{
    public class MyDB
    {
        public MyDB()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public MongoDatabase GetDB()
        {
            MongoUrl url = new MongoUrl(ConfigurationManager.ConnectionStrings["ssdbcon"].ConnectionString);
            MongoClient mc = new MongoClient(url);
            MongoServer server = mc.GetServer();
            MongoDatabase db = server.GetDatabase("SSDB");
            return db;
        }

        public MongoCollection<BsonDocument> GetBColl(string colname)
        {
            MongoDatabase mydb = GetDB();
            MongoCollection<BsonDocument> coll = mydb.GetCollection<BsonDocument>(colname);
            return coll;
        }
    }
}