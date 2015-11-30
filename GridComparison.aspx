<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GridComparison.aspx.cs" Inherits="GridComparison" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    
        <script src="js/jquery.min.js"></script>
    <script type="text/javascript" src="JavaScript/form.js"></script>
<script type="text/javascript">
    makeAjax('UPloadCatalogAction5.aspx', 'POST', '', GridComp);
    function GridComp(ss) {
        //alert(ss);
        var ssdata = JSON.parse(ss);
        var uploadedCSV = ssdata.csvdata;
        var originalCSV = ssdata.orginaldata;
        var uploadedCSV1 = JSON.parse(uploadedCSV);
        
        var noNullValues = [];
        var dummyValues = [];
        var uniqCsvValues = [];
        var uniqueOrignalsBoth = [];
        var uniqueFinalarray = [];
        if (originalCSV.length < 1) {
            //alert("ok");
            $.each(uploadedCSV1, function (i, el) {
                
                if ($(uploadedCSV1).filter(function () { return (this.name == el.name || this.pid == el.pid) }).length == 1) {
                    //alert("ok");
                    uniqCsvValues.push(el);
                
                }
                else {
                    dummyValues.push(el);
                }
            });
           

            $.each(uniqCsvValues, function (i, el) {
                //alert(i+""+el);
                if ($(uniqCsvValues).filter(function () { return (el.name == "" || el.pid == "" || el.type == "" || el.price == "" || el.quantity == "" || el.measures == "") }).length == 0) {
                    //alert("ok");
                    noNullValues.push(el);
                 
                }
                else {
                    dummyValues.push(el);
                }
            });
            alert(JSON.stringify(dummyValues));

            var json = {
                originalGridData: noNullValues,
                dummyGridData: dummyValues    
            };
            var originalDummyData = JSON.stringify(json);
            alert(originalDummyData);
            makeAjax('UPloadCatalogAction3.aspx', 'POST', originalDummyData, Redirect);
            function Redirect(aaa) {
                //alert(aaa);
                location.href = "UploadCatalog.html?s=" + 'catlog';
            }
        }
    
        else {
            var originalCSV1 = JSON.parse(originalCSV);
            $.each(uploadedCSV1, function (i, el) {
                //alert(i+""+el);
                if ($(uploadedCSV1).filter(function () { return (this.name == el.name || this.pid == el.pid) }).length == 1) {
                    //alert("ok");
                    uniqCsvValues.push(el);
                    
                }
                else {
                    dummyValues.push(el);
                }
            });

            $.each(uniqCsvValues, function (i, el) {
                //alert(i+""+el);
                if ($(uniqCsvValues).filter(function () { return (el.name == "" || el.pid == "" || el.type == "" || el.price == "" || el.quantity == "" || el.measures == "") }).length == 0) {
                    //alert("ok");
                    noNullValues.push(el);
                }
                else {
                    dummyValues.push(el);
                }
            });
           



            $.each(originalCSV1, function (i, el) {
         //alert(i+""+el);
                if ($(noNullValues).filter(function () { return (this.name == el.name || this.pid == el.pid) }).length == 0) {
                    //alert("ok");
                    uniqueOrignalsBoth.push(el);
                    //alert(JSON.stringify(uniqueOrignalsBoth));
                    //alert(JSON.stringify(a));	
                }
                //else {
                //    uniqueFinalarray.push(el);
                //}
            });
            //alert(JSON.stringify(originalCSV1));
            //alert(JSON.stringify(uniqueOrignalsBoth));
            $.each(uniqueOrignalsBoth, function (i, el) {
                if ($(uniqueOrignalsBoth).filter(function () { return (this.name == el.name || this.pid == el.pid) }).length == 1) {
                    noNullValues.push(el);
                }
            });

            var json = {
                originalGridData: noNullValues,
                dummyGridData: dummyValues
            };
            var originalDummyData = JSON.stringify(json);
            makeAjax('UPloadCatalogAction3.aspx', 'POST', originalDummyData, Redirect);
            //alert(JSON.stringify(noNullValues));
            //alert(JSON.stringify(dummyValues));
            function Redirect(aaa) {
                //alert(aaa);
                location.href = "UploadCatalog.html?s=" + 'catlog';
            }
       }
      
    }
   
    
    </script>
</head>
<body>
   
    <div>
     Loading Your Catalog Please Wait......
    </div>
    
</body>
</html>
