
var originalArray = [];
var dummyArray = [];
var ind = 0;
var ind1 = 0;

function makeAjax(urls, methods, sendeddatas, callbacks) {
    url = urls;
    method = methods;
    sendeddata = sendeddatas;
    callback = callbacks;
    loadAjax(url, method, sendeddata, callback);
}

function loadAjax(url, method, sendeddata, callback) {
    if (window.XMLHttpRequest) {
        xmlhttp2 = new XMLHttpRequest();
    }
    else {
        xmlhttp2 = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp2.onreadystatechange = function () {
        if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
            y = xmlhttp2.responseText;
           
            orgparse = JSON.parse(y);
            callback(orgparse);
        }
    }
    xmlhttp2.open(method, url, true);
    xmlhttp2.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xmlhttp2.send("sendeddata=" + sendeddata);
}

var orgdata;
var dummydata;
function pavan() {
    makeAjax("DedHandler.ashx", "POST", "", siva);
}

function siva(sparse) {
    orgdata = sparse;
    //alert(orgdata);
    makeAjax("JQGridHandler.ashx", "POST", "", siva2);
}

function siva2(dumparse) {
    var dummydata = dumparse;
    var originalData = orgdata;
   
    var dummyUniqValues = [];
    var ss2 = [];
    var insertedArray = [];
    var noNullValues = [];
    var dummyValues = [];
    $.each(dummydata, function (i, el) {
        
        if ($(dummydata).filter(function () { return (this.name == el.name || this.pid == el.pid) }).length == 1) {
            dummyUniqValues.push(el);
        }
    });
    if (dummyUniqValues.length<1) {
    document.getElementById("errorMsgDiv").style.display = "";
    document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Please check Name or Prduction Id is matching in the dummy grid";
    document.getElementById("errorMsgSpan").style.color = "red";
    document.getElementById("errorMsgSpan").style.fontSize = "14px";
    return false;
}
    else {
        $.each(dummyUniqValues, function (i, el) {
            if ($(dummyUniqValues).filter(function () { return (el.name == "" || el.pid == "" || el.type == "" || el.price == "" || el.quantity == "" || el.measures == "" || el.unit == "") }).length == 0) {
                noNullValues.push(el);
            }
            else {
                dummyValues.push(el);
            }
        });
        $.each(noNullValues, function (i, el) {
            if ($(originalData).filter(function () { return (this.name == el.name || this.pid == el.pid) }).length == 0) {
                insertedArray.push(el);
            }
        });

        if (insertedArray.length < 1) {
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Please check Edited Item Name or Prduction Id is Same in the Original Grid or No Null Values for Edited Item";
            document.getElementById("errorMsgSpan").style.color = "red";
            document.getElementById("errorMsgSpan").style.fontSize = "14px";
            return false;
        }
        else {
            var insertArray2 = JSON.stringify(insertedArray);
            makeAjax("DummytoOriginal.aspx", "POST", insertArray2, siva35);           
        }
    }
}
function siva35(ss34) {
    location.href = "UploadCatalog.html?s="+'catlog';
}
function clickTab(gg) {  
    if (gg == "catlog") {
        $('#clikTab').click();
        $("#dummycat").click();
    }
}