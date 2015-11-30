using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using myurl;
using System.IO;

public partial class TestingPath : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
            string stringremove = "bakkupavankumarsonofapparao";
            string path = Server.MapPath(string.Format("~/inventory/{0}.json", "lastfile"));            
            if (!File.Exists(path))
            {
                FileStream fs = new FileStream(path, FileMode.OpenOrCreate);
                StreamWriter str11 = new StreamWriter(fs);
                str11.WriteLine(stringremove);
                str11.Flush();
                str11.Close();
                fs.Dispose();
                fs.Close();
            }
            else if (File.Exists(path))
            {
                FileStream fs = new FileStream(path, FileMode.Open);
                StreamWriter str12 = new StreamWriter(fs);
                str12.WriteLine(stringremove);
                str12.Flush();
                str12.Close();
                fs.Dispose();
                fs.Close();
            }

        Response.Clear();
        Response.CacheControl = "no-cache";
        Response.ContentType = "application/json";
        Response.Write("hi" + path);
        Response.End();
    }
}