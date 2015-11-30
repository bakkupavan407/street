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

public partial class UploadCatalogAction2 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        HttpFileCollection filecoll = Request.Files;
        HttpPostedFile FileUpload1 = filecoll[0];

        string filename = Path.GetFileName(FileUpload1.FileName);
        string mypath = Server.MapPath("~/Files/") + filename;
        Session["filename"] = filename;
        FileUpload1.SaveAs(mypath);

        Response.Clear();
        Response.CacheControl = "no-cache";
        Response.ContentType = "application/json";
        Response.Redirect("GridComparison.aspx");
        Response.End();
    }
}