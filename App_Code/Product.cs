using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Bson.Serialization.Attributes;

/// <summary>
/// Summary description for Product
/// </summary>
/// 
namespace mango
{
    public class Product
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }

        public int sno { get; set; }
        public string pid { get; set; }
        public string name { get; set; }
        public string type { get; set; }

        public string image { get; set; }

        [BsonRepresentation(BsonType.Int32)]
        public string price { get; set; }
        [BsonRepresentation(BsonType.Int32)]
        public string quantity { get; set; }

        public string unit { get; set; }
        public string measures { get; set; }

        public string offer { get; set; }
        public string promotion { get; set; }
    }
}