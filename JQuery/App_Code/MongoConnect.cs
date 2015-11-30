using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Configuration;
/// <summary>
/// Summary description for MongoConnect
/// </summary>
/// 
namespace mango
{
    public class MongoConnect
    {
        public MongoDatabase GetConnectedToMongo()
        {
            MongoUrl url = new MongoUrl(ConfigurationManager.ConnectionStrings["ssdbcon"].ConnectionString);
            MongoClient client = new MongoClient(url);
            MongoServer server = client.GetServer();
            MongoDatabase mdb = server.GetDatabase("SSDB");
            return mdb;
        }
        /// <summary>
        /// Function which returns  data from collection
        /// </summary>
        /// <param name="strCollectionName">Name of the Collection to be returned</param>
        /// <returns></returns>
        public MongoCollection GetMongoCollection(string strCollectionName)
        {
            ///Establish Connection
            MongoDatabase mdb = GetConnectedToMongo();
            ///Get The Collection in which you have to insert the record
            MongoCollection collection = mdb.GetCollection<Product>(strCollectionName);
            return collection;
        }
    }
}