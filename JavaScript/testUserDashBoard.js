var dash;
var dash3;
var dash2;
var dash4;
var dash5;
var si = 20;
var li = 20;
var clt;
var mi1 = 20;
var mi = 0;
var dateArray = new Array();
var ordersArray = new Array();
var ItemDates = new Array();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var gfSortDescending = true;
var gfSortDescend = true;
var tItems = new Array();
var $contentLoadTriggered;
var ordDiv;
var psum = 0;
var elmOrd1;
var ordIndex;
var selVal1;
var dashItems;

function loadTime() {
    ordDiv = document.createElement("div");
    ordDiv.id = "ordDiv1";
}

$(document).ready(function () {
    $("#mainDiv").scroll(
                                function () {
                                    if ($("#mainDiv").scrollTop() >= ($("#wrapperDiv").height() - $("#mainDiv").height()) && $contentLoadTriggered == false) {
                                        if (!gfSortDescend) {
                                            Descend();
                                        }
                                        if ($('#mySelect option:selected').val() == "Year" && $('#mySelect11 option:selected').val() == "Month") {
                                            getData();
                                        }

                                    }
                                    //if (($("#mainDiv").scrollTop() + ($("#mainDiv").height()) > ($("#wrapperDiv").height())-100) && $contentLoadTriggered == false) {
                                    //    getData();
                                    //    //alert($("#wrapperDiv").height());

                                    //}
                                }
                            );

    function getData() {
        $contentLoadTriggered = true;
        si += 20;
        li += 20;
        var json = {
            si1: si,
            li1: li
        };
        $('#LoaderImage').show();
        $('#topBarDiv').hide();
        var json2 = JSON.stringify(json);
        $.ajax(
                    {
                        type: "POST",
                        url: "ordersToUserDashBoard.aspx?reqdata=" + json2,
                        data: "{}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: true,
                        cache: false,
                        success: function (result) {

                            $('#LoaderImage').hide();
                            $('#topBarDiv').show();
                            if (result.obj) {
                                dash4 = JSON.parse(result.obj);
                                clt = JSON.parse(result.resp);
                            }
                            else {
                                dash4 = result;
                            }
                            for (var i = 0; i < dash4.orders.length; i++) {
                                ordersArray.push(dash4.orders[i]);
                            }
                            dash3 = "{\"Prudhvi\":" + JSON.stringify(ordersArray) + "}";

                            dash2 = JSON.parse(dash3);
                            mi = mi + 20;
                            var length;
                            if (clt > 0) {
                                length = clt;
                                $contentLoadTriggered = true;
                                $('#LoaderImage').hide();
                            }
                            else {
                                length = dash2.Prudhvi.length;
                                $contentLoadTriggered = false;
                            }
                            for (di = mi1; di < length; di++) {
                                for (diii = 0; diii < dash2.Prudhvi[di].order.length; diii++) {
                                    dateArray[mi1++] = { "Date": dash2.Prudhvi[di].order[diii].OrderedDate, "id": mi1 - 1, "UserName": dash2.Prudhvi[di].name, "delivaryDate": dash2.Prudhvi[di].order[diii].DelivaryDate, "mobile": dash2.Prudhvi[di].mobile, "orderId": dash2.Prudhvi[di].orderid, "orderStatus": dash2.Prudhvi[di].orderstatus, "shippingAdress": dash2.Prudhvi[di].shipadd, "storeName": dash2.Prudhvi[di].order[diii].storeName };
                                }
                            }
                            var ordDiv = document.getElementById("ordDiv1");
                            for (var dii = mi; dii < dateArray.length; dii++) {
                                elmOrd = document.createElement("div");
                                ordSpan = document.createElement("span");
                                ordSpan.title = dateArray[dii].UserName;
                                dateSpan = document.createElement("span");
                                var mobSpan = document.createElement("span");
                                var ordDate = document.createElement("span");
                                var storeSpan = document.createElement("span");
                                dateSpan.style.display = "block";
                                ordSpan.className = "spanItem1";
                                mobSpan.id = "spanItemMobile";
                                dateSpan.className = "spanItem";
                                ordDate.className = "spanItem";
                                storeSpan.className = "spanItem";
                                elmOrd.id = dateArray[dii].id;
                                elmOrd.className = "day";
                                var checkSpan = document.createElement("div");
                                checkSpan.style.display = "inline";
                                checkSpan.style.width = "100px";
                                elmOrd.setAttribute("onclick", "details(" + dateArray[dii].id + ")");
                                textOrd = document.createTextNode(dateArray[dii].UserName + " - " + " ");
                                dateText = document.createTextNode("Delivary Date : " + dateArray[dii].delivaryDate);
                                var odtext = document.createTextNode("Ordered Date : " + (dateArray[dii].Date));
                                txtMob = document.createTextNode(" " + dateArray[dii].mobile);
                                var storeText = document.createTextNode("Store:" + " " + dateArray[dii].storeName);
                                ordSpan.appendChild(textOrd);
                                ordDate.appendChild(odtext);
                                mobSpan.appendChild(txtMob);
                                dateSpan.appendChild(dateText);
                                storeSpan.appendChild(storeText);
                                elmOrd.appendChild(ordSpan);
                                elmOrd.appendChild(txtMob);
                                elmOrd.appendChild(ordDate);
                                elmOrd.appendChild(dateSpan);
                                elmOrd.appendChild(storeSpan);
                                ordDiv.appendChild(elmOrd);
                            }
                        },
                        error: function (x, e) {
                            alert("End of Data!");
                        }
                    }
                );
    }
});

function addOrders() {
    document.getElementById("uploadCatlog").style.textDecoration = "underline";
    document.getElementById("clikTab").style.textDecoration = "none";
    document.getElementById("wrapperItems").style.display = "none";
    document.getElementById("addresDisplay").style.display = "none";
    document.getElementById("details").style.display = "none";
    document.getElementById("mainDiv").style.display = "";
    document.getElementById("wrapperDiv").innerHTML = "";
    var topDiv = document.getElementById("topBarDiv");
    topDiv.innerHTML = "";
    document.getElementById("sum").innerHTML = "";
    var tag = document.getElementById("order");
    document.getElementById("addresDisplay").style.display = "none";
    var inputOrd = document.createElement("input");
    var select = document.createElement("select");
    select.setAttribute("name", "mySelect");
    select.setAttribute("id", "mySelect");
    select.style.width = "80px";
    option = document.createElement("option");
    option.setAttribute("value", "Year");
    option.innerHTML = "Year";
    select.appendChild(option);
    option = document.createElement("option");
    option.setAttribute("value", "2012");
    option.innerHTML = "2012";
    select.appendChild(option);
    option = document.createElement("option");
    option.setAttribute("value", "2013");
    option.innerHTML = "2013";
    select.appendChild(option);
    option = document.createElement("option");
    option.setAttribute("value", "2014");
    option.innerHTML = "2014";
    select.appendChild(option);
    select.setAttribute("onchange", "seleInd()");
    topDiv.appendChild(select);
    var select11 = document.createElement("select");
    select11.setAttribute("name", "mySelect11");
    select11.setAttribute("id", "mySelect11");
    option = document.createElement("option");
    option.setAttribute("value", "Month");
    option.innerHTML = "Month";
    select11.appendChild(option);
    for (jj = 0; jj < months.length; jj++) {
        option1 = document.createElement("option");
        option1.setAttribute("value", jj + 1);
        option1.innerHTML = months[jj];
        select11.appendChild(option1);
        select11.setAttribute("onchange", "seleInd()");
    }
    topDiv.appendChild(select11);
    var sid11 = document.getElementById("mySelect11");
    var imgOrd = document.createElement("img");
    imgOrd.setAttribute("src", "sort.jpg");
    imgOrd.setAttribute("alt", "Sort");
    imgOrd.setAttribute("width", "25px");
    imgOrd.setAttribute("height", "25px");
    imgOrd.setAttribute("onclick", "Descend()");
    imgOrd.id = "imgASc";
    topDiv.appendChild(imgOrd);
    $contentLoadTriggered = true;
    si = 20;
    li = 20;
    var json = {
        si1: si,
        li1: li
    };
    if (dateArray.length == 0) {
        $('#topBarDiv').hide();
        $('#LoaderImage').show();
        var json1 = JSON.stringify(json);
        $.ajax(
                    {
                        type: "POST",
                        url: "ordersToUserDashBoard.aspx?reqdata=" + json1,
                        data: "{}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: true,
                        cache: false,
                        success: function (result) {
                            $('#LoaderImage').hide();
                            $('#topBarDiv').show();
                            if (result.obj) {
                                dash4 = JSON.parse(result.obj);
                                clt = JSON.parse(result.resp);
                            }
                            else {
                                dash4 = result;
                            }
                            if (dash4 == 0) {
                                document.getElementById("mainDiv").style.display = "none";
                                document.getElementById("topBarDiv").style.display = "none";
                                document.getElementById("errorMsgDiv").style.display = "";
                                document.getElementById("errorMsgSpan").innerHTML = "You have no orders to display";
                            }
                            for (var i = 0; i < dash4.orders.length; i++) {
                                ordersArray.push(dash4.orders[i]);
                            }
                            dash3 = "{\"Prudhvi\":" + JSON.stringify(ordersArray) + "}";

                            dash2 = JSON.parse(dash3);
                            var datearr = 0;
                            var length;
                            if (clt > 0) {
                                length = clt;
                                $contentLoadTriggered = true;
                                $('#LoaderImage').hide();
                            }
                            else {
                                length = dash2.Prudhvi.length;
                                $contentLoadTriggered = false;
                            }
                            for (di = 0; di < length; di++) {
                                for (diii = 0; diii < dash2.Prudhvi[di].order.length; diii++) {
                                    dateArray[datearr++] = { "Date": dash2.Prudhvi[di].order[diii].OrderedDate, "id": datearr - 1, "UserName": dash2.Prudhvi[di].name, "delivaryDate": dash2.Prudhvi[di].order[diii].DelivaryDate, "mobile": dash2.Prudhvi[di].mobile, "orderId": dash2.Prudhvi[di].orderid, "orderStatus": dash2.Prudhvi[di].orderstatus, "shippingAdress": dash2.Prudhvi[di].shipadd, "storeName": dash2.Prudhvi[di].order[diii].storeName };
                                }
                            }
                            displayOrders();
                        },
                        error: function (x, e) {
                            alert("End of Data!");
                        }
                    });
    }
    else {
        displayOrders();
    }
}
function displayOrders() {
    ordDiv.innerHTML = "";
    for (var dii = 0; dii < dateArray.length; dii++) {
        elmOrd = document.createElement("div");
        ordSpan = document.createElement("span");
        ordSpan.title = dateArray[dii].UserName;
        dateSpan = document.createElement("span");
        var mobSpan = document.createElement("span");
        var ordDate = document.createElement("span");
        var storeSpan = document.createElement("span");
        dateSpan.style.display = "block";
        ordSpan.className = "spanItem1";
        mobSpan.id = "spanItemMobile";
        dateSpan.className = "spanItem";
        ordDate.className = "spanItem";
        storeSpan.className = "spanItem";
        elmOrd.id = dateArray[dii].id;
        elmOrd.className = "day";
        elmOrd.setAttribute("onclick", "details(" + dateArray[dii].id + ")");
        var textOrd = document.createTextNode(dateArray[dii].UserName + " - " + " ");
        var dateText = document.createTextNode("Delivary Date : " + dateArray[dii].delivaryDate);
        var odtext = document.createTextNode("Ordered Date : " + (dateArray[dii].Date));
        var txtMob = document.createTextNode(" " + dateArray[dii].mobile);
        var storeText = document.createTextNode("Store:" + " " + dateArray[dii].storeName);
        ordSpan.appendChild(textOrd);
        ordDate.appendChild(odtext);
        mobSpan.appendChild(txtMob);
        dateSpan.appendChild(dateText);
        storeSpan.appendChild(storeText);
        elmOrd.appendChild(ordSpan);
        elmOrd.appendChild(txtMob);
        elmOrd.appendChild(ordDate);
        elmOrd.appendChild(dateSpan);
        elmOrd.appendChild(storeSpan);
        ordDiv.appendChild(elmOrd);
    }
    $("#wrapperDiv").append(ordDiv);
    if (clt > 0) {
        $contentLoadTriggered = true;
    }
    else {
        $contentLoadTriggered = false;
    }
    document.getElementById("mainDiv").style.overflowY = "auto";
    document.getElementById("mainDiv").style.overflowX = "hidden";
}

function details(ordIndex) {
    document.getElementById("sum").style.visibility = "visible";
    var tag = document.getElementById("details");
    tag.style.display = "";
    var shipAdd = document.getElementById("addresDisplay");
    shipAdd.style.display = "";
    tag.innerHTML = "";
    tag.innerHTML = "<h3 class=subhead>Item Details:" + dash2.Prudhvi[ordIndex].name + "</h3>";
    shipAdd.innerHTML = "<h3 class=subhead>Shipping Address</h3>";
    adresDiv = document.createElement("div");
    adresDiv.className = "addresDiv";
    adresDivText = document.createTextNode(dash2.Prudhvi[ordIndex].shipadd);
    adresDiv.appendChild(adresDivText);
    shipAdd.appendChild(adresDiv);
    var MDiv = document.createElement("div");
    MDiv.id = "MainDivSpan"
    var divDisp1 = document.createElement("div");
    divDisp1.className = "SPin"
    for (var k = 0; k < dash2.Prudhvi[ordIndex].order.length; k++) {
        for (var k1 = 0; k1 < dash2.Prudhvi[ordIndex].order[k].Items.length; k1++) {
            var divDisp = document.createElement("div");
            divDisp.className = "day2"
            var SpanName = document.createElement("span");
            var text1 = document.createTextNode("Item :" + " " + dash2.Prudhvi[ordIndex].order[k].Items[k1].Name);
            SpanName.style.display = "block";
            var SpanQuan = document.createElement("span");
            SpanQuan.className = "spanclass";
            var text2 = document.createTextNode("Quantity : " + dash2.Prudhvi[ordIndex].order[k].Items[k1].Quantity + " kg");
            var SpanPrice = document.createElement("span");
            SpanPrice.className = "spanclass2";
            var text3 = document.createTextNode("Price:" + " ₹ " + (dash2.Prudhvi[ordIndex].order[k].Items[k1].Price));
            SpanName.appendChild(text1);
            SpanQuan.appendChild(text2);
            SpanPrice.appendChild(text3);
            divDisp.appendChild(SpanName);
            divDisp.appendChild(SpanQuan);
            divDisp.appendChild(SpanPrice);
            MDiv.appendChild(divDisp);
            MDiv.appendChild(divDisp1);
            tag.appendChild(MDiv);
        }
    }

    clrArray = document.getElementById("ordDiv1");
    var len = clrArray.childNodes;
    for (leni = 0; leni < len.length; leni++) {
        len[leni].style.backgroundColor = "whitesmoke";
    }
    document.getElementById(ordIndex).style.backgroundColor = "skyblue";
    var text3 = 0;

    for (var k = 0; k < dash2.Prudhvi[ordIndex].order.length; k++) {
        for (var k1 = 0; k1 < dash2.Prudhvi[ordIndex].order[k].Items.length; k1++) {

            text3 += parseFloat(dash2.Prudhvi[ordIndex].order[k].Items[k1].Price);
        }
    }

    document.getElementById("sum").innerHTML = ("<div>Total Amount Spent For This Order : ₹ " + text3.toFixed(2)); //+ "</div>" + "<div>Total Amount Spent For This System is :" + psum.toFixed(2) + "</div>");
}

//------------------------------------------------------------Items Display Code--------------------------------------------------------------

function viewItems() {
    document.getElementById("wrapperItems").style.display = "";
    document.getElementById("wrapperItems").innerHTML = "";
    document.getElementById("uploadCatlog").style.textDecoration = "none";
    document.getElementById("clikTab").style.textDecoration = "underline";
    document.getElementById("mainDiv").style.display = "none";
    document.getElementById("sum").innerHTML = "";
    document.getElementById("details").style.display = "none";
    document.getElementById("addresDisplay").style.display = "none";
    var loaderImg = document.createElement("img");
    loaderImg.setAttribute("src", "img/ajax-loaderpk.gif");
    loaderImg.setAttribute("alt", "Loading");
    loaderImg.setAttribute("width", "30px");
    loaderImg.setAttribute("align", "middle");
    loaderImg.style.margin = "0px 135px";
    loaderImg.id = "loaderImg2";
    document.getElementById("wrapperItems").appendChild(loaderImg);
    var topDiv = document.getElementById("topBarDiv");
    topDiv.innerHTML = "";
    $('#topBarDiv').show();
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("value", "");
    input.setAttribute("placeholder", "Search By Item");
    input.id = "input1";
    input.setAttribute('onkeyup', 'subSearch()');
    topDiv.appendChild(input);
    var inputValue = document.getElementById("input1").value;
    var imgAsc = document.createElement("img");
    imgAsc.setAttribute("src", "sort.jpg");
    imgAsc.setAttribute("alt", "Sort");
    imgAsc.setAttribute("width", "25px");
    imgAsc.setAttribute("height", "25px");
    imgAsc.setAttribute("onclick", "Ascend()");
    imgAsc.id = "imgASc";
    topDiv.appendChild(imgAsc);
    if (tItems.length == 0) {
        makeAjax('itemsToUserDashboard.aspx', 'POST', '', itemsToDash);
    }
    else {
        displayItems();
    }
}
function itemsToDash(itd) {
    var data1 = itd;
    dashItems = JSON.parse(data1);
    if (dashItems == 0) {
        document.getElementById("wrapperItems").style.display = "none";
        document.getElementById("topBarDiv").style.display = "none";
        document.getElementById("errorMsgDiv").style.display = "";
        document.getElementById("errorMsgSpan").innerHTML = "You have no items to display";
    }
    var ind = 0;
    for (q1 = 0; q1 < dashItems.Prudhvi.length; q1++) {
        tItems[ind++] = { "Name": dashItems.Prudhvi[q1]._id, "Quantity": dashItems.Prudhvi[q1].value.qty, "id": ind - 1, "Price": parseFloat(dashItems.Prudhvi[q1].value.price), "Image": dashItems.Prudhvi[q1]._id }//, "Date": dash2.Prudhvi[q1].order[p1].OrderedDate, "Image": dash2.Prudhvi[q1].order[p1].Items[r1].Name, "userName": dash2.Prudhvi[q1].user };
    }
    displayItems();
}

function displayItems() {
    var wItems = document.getElementById("wrapperItems");
    wItems.innerHTML = "";
    var divItem = document.createElement("div");
    divItem.className = 'divItem';
    divItem.id = "itemDiv";
    for (var q1 = 0; q1 < tItems.length; q1++) {
        var itr = document.createElement("div");
        itr.id = "i" + q1;
        itr.style.backgroundImage = "url(images/" + tItems[q1].Image + ".jpg)";
        itr.style.backgroundSize = "50% 50%";
        itr.className = "itemsList";
        itr.setAttribute("title", tItems[q1].Name);
        itr.setAttribute("onclick", "itemsByDate(" + tItems[q1].id + ")");
        itd = document.createElement("span");
        itd1 = document.createElement("span1");
        itd1.style.opacity = "1.0";
        itd2 = document.createElement("span2");
        var opacityDiv = document.createElement("div");
        opacityDiv.className = "OpacityImg";
        var opacitydiv2 = document.createElement("div");
        opacitydiv2.className = "opacityImg2";
        itd.title = tItems[q1].Name;
        itr.appendChild(opacitydiv2);
        itd.className = "spanItem5";
        itd1.className = "spanItem";
        itd2.className = "spanItem";
        prudhvi1 = document.createTextNode("Name:" + " " + tItems[q1].Name);
        itd.style.display = "block";
        itd1.style.display = "block";
        itemQuantity = document.createTextNode("Quantity:" + " " + tItems[q1].Quantity + " kg");
        var itemTotalPrice = document.createTextNode("Price:" + " ₹ " + tItems[q1].Price.toFixed(2));
        itd.appendChild(prudhvi1);
        itd1.appendChild(itemQuantity);
        itd2.appendChild(itemTotalPrice);
        opacityDiv.appendChild(itd);
        opacityDiv.appendChild(itd1);
        opacityDiv.appendChild(itd2);
        itr.appendChild(opacityDiv);
        divItem.appendChild(itr);
        $("#wrapperItems").append(divItem);
    }
}

function itemsByDate(itemind) {
    var ItemDates = new Array();
    document.getElementById("details").style.display = "";
    document.getElementById("addresDisplay").style.display = "none";
    var tag = document.getElementById("details");
    tag.innerHTML = "<h3 class=subhead>Item Details </h3>";
    var ssg = dashItems.Prudhvi[itemind]._id;
    var loaderImg2 = document.createElement("img");
    loaderImg2.setAttribute("src", "img/ajax-loaderpk.gif");
    loaderImg2.setAttribute("alt", "Loading");
    loaderImg2.setAttribute("width", "30px");
    loaderImg2.setAttribute("align", "middle");
    loaderImg2.style.margin = "0px 135px";
    loaderImg2.id = "loaderImg3";
    tag.appendChild(loaderImg2);
    makeAjax('itemDetailsToUserDashBoard.aspx', 'POST', ssg, itemsToUser);    
    document.getElementById("sum").innerHTML = ("<div>Total Amount Spent For This Item : ₹ " + dashItems.Prudhvi[itemind].value.price.toFixed(2));
    function itemsToUser(grt) {
        document.getElementById("loaderImg3").style.display = "none";
        var itmDetails = JSON.parse(grt);
        var itmind = 0;
        var IMdiv = document.createElement("div");
        var divDisp1 = document.createElement("div");
        divDisp1.className = "SPin";
        for (var i = 0; i < itmDetails.Prudhvi.length; i++) {
            var Disdiv = document.createElement("div");
            Disdiv.className = "day2";
            var DateSpan = document.createElement("span");
            DateSpan.style.display = "block";
            DateSpan.style.height = "40px";
            DateSpan.style.display = "block";
            var QuanSpan = document.createElement("span");
            QuanSpan.className = "spanclass";
            var PriceSpan = document.createElement("span");
            PriceSpan.className = "spanclass2";
            var totalAmnt = document.createElement("span");
            totalAmnt.style.padding = "5px";
            var dateText = document.createTextNode(itmDetails.Prudhvi[i].Name + " - " + itmDetails.Prudhvi[i].OrderedDate);
            var QuanText = document.createTextNode("Quantity:" + " " + itmDetails.Prudhvi[i].Quantity + " kg");
            var PriceText = document.createTextNode("Price:" + " ₹ " + (itmDetails.Prudhvi[i].Price));
            DateSpan.appendChild(dateText);
            QuanSpan.appendChild(QuanText);
            PriceSpan.appendChild(PriceText);
            Disdiv.appendChild(DateSpan);
            Disdiv.appendChild(QuanSpan);
            Disdiv.appendChild(PriceSpan);
            IMdiv.appendChild(Disdiv);
            IMdiv.appendChild(divDisp1);
            tag.appendChild(IMdiv);
        }

        
    }
    clrArays = document.getElementById("itemDiv");
    var l = clrArays.childNodes;
    for (li = 0; li < l.length; li++) {
        if (l[li].getAttribute("title") == ssg) {
            l[li].style.border = "2px solid blue";
        }
        else {
            l[li].style.border = "1px solid grey";
        }
    }

}

//-----------------------------------------------------------Orders Div Top bar Code------------------------------------------------------------

function seleInd() {
    document.getElementById("details").innerHTML = "";
    document.getElementById("details").style.display = "none";
    document.getElementById("addresDisplay").style.display = "none";
    document.getElementById("sum").innerHTML = "";
    var sid = document.getElementById("mySelect11");
    var selVal1 = sid.options[sid.selectedIndex].value;
    var sid11 = document.getElementById("mySelect");
    var yerVal = sid11.options[sid11.selectedIndex].value;
    ordDiv1 = document.getElementById("ordDiv1");
    ordDiv1.innerHTML = "";
    if (yerVal == "Year" && selVal1 == "Month") {
        displayOrders();
    }
    for (dii = 0; dii < dateArray.length; dii++) {
        var datestring = new Date(dateArray[dii].Date);
        if (yerVal != "Year" && dateArray[dii].Date.lastIndexOf(yerVal) != -1) {
            if (selVal1 == "Month") {
                repeat();
            }
            else {
                var selectedMonth = dateArray[dii].Date.substring(3, 5);
                if (dateArray[dii].Date.lastIndexOf(yerVal) != -1 && (datestring.getMonth() + 1) == selVal1) {
                    repeat();
                }
            }
        }
        else {
            if (yerVal == "Year" && (datestring.getMonth() + 1) == selVal1) {
                repeat();
            }
        }
    }
}

function repeat() {
    elmOrd1 = document.createElement("div");
    elmOrd1.id = dateArray[dii].id;
    ordSpan1 = document.createElement("span");
    ordSpan1.className = "spanItem1";
    ordSpan1.title = dateArray[dii].UserName;
    dateSpan1 = document.createElement("span");
    var ddatespan1 = document.createElement("span");
    var namespan = document.createElement("span");
    var storeSpan1 = document.createElement("span");
    ddatespan1.className = "spanItem";
    ordSpan1.className = "spanItem";
    dateSpan1.className = "spanItem";
    dateSpan1.id = "displaying";
    namespan.className = "spanItem";
    storeSpan1.className = "spanItem";
    elmOrd1.className = "day";
    elmOrd1.setAttribute("onclick", "details(" + dateArray[dii].id + ")");
    textOrd1 = document.createTextNode(dateArray[dii].UserName + " - " + dateArray[dii].mobile);
    dateText1 = document.createTextNode(" Ordered Date :" + (dateArray[dii].Date));
    var ddate = document.createTextNode(" Delivary Date :" + dateArray[dii].delivaryDate)
    var storeText1 = document.createTextNode("Store:" + " " + dateArray[dii].storeName);
    ordSpan1.appendChild(textOrd1);
    dateSpan1.appendChild(dateText1);
    ddatespan1.appendChild(ddate);
    storeSpan1.appendChild(storeText1);
    elmOrd1.appendChild(ordSpan1);
    elmOrd1.appendChild(namespan);
    elmOrd1.appendChild(dateSpan1);
    elmOrd1.appendChild(ddatespan1);
    elmOrd1.appendChild(storeSpan1);
    ordDiv1.appendChild(elmOrd1);
}

function userSearch() {
    document.getElementById("details").innerHTML = "";
    document.getElementById("details").style.display = "none";
    document.getElementById("addresDisplay").style.display = "none";
    document.getElementById("sum").innerHTML = "";
    var useSearch = document.getElementById("User1").value;
    useSearch = useSearch.toLowerCase();
    var ocnl = document.getElementById("ordDiv1").childNodes;
    var a1 = document.getElementsByClassName("spanItem1");
    if ($('#mySelect option:selected').val() == "Year" && $('#mySelect11 option:selected').val() == "Month") {
        for (var subs = 0; subs < dateArray.length; subs++) {
            if (a1[subs].getAttribute("title").toLowerCase().lastIndexOf(useSearch) == -1) {
                a1[subs].parentNode.style.display = "none";
            }
            else {
                a1[subs].parentNode.style.display = "";
            }
        }
    }
    else {
        for (var subs = 0; subs < ocnl.length; subs++) {
            if (ocnl[subs].childNodes[0].getAttribute("title").toLowerCase().lastIndexOf(useSearch) == -1) {
                ocnl[subs].childNodes[0].parentNode.style.display = "none";
            }
            else {
                ocnl[subs].childNodes[0].parentNode.style.display = "";
            }
        }

    }
}

function Descend() {
    $('#mySelect').val("Year");
    $('#mySelect11').val("Month");
    gfSortDescend = !gfSortDescend;
    document.getElementById("details").style.display = "none";
    document.getElementById("addresDisplay").style.display = "none";
    document.getElementById('ordDiv1').innerHTML = "";
    dateArray.sort(compareDate);
    displayOrders();
}

function compareDate(a, b) {
    if (gfSortDescend) {
        var s = a; a = b; b = s;
    }
    var dateA = new Date(a.Date); var dateB = new Date(b.Date);
    if (dateA > dateB) return 1;
    if (dateA < dateB) return -1;
    return 0;
}

function compare(a, b) {
    if (a.Name > b.Name)
        return 1;
    if (a.Name < b.Name)
        return -1;
    return 0;
}

function compare11(a, b) {
    if (!gfSortDescending) {
        var t = a; a = b; b = t;
    }
    if (a.Quantity > b.Quantity)
        return -1;
    if (a.Quantity < b.Quantity)
        return 1;
    return 0;
}

//-----------------------------------------------------------Items Div Top bar Code------------------------------------------------------------

function subSearch() {
    document.getElementById("details").style.display = "none";
    document.getElementById("details").innerHTML = "";
    document.getElementById("sum").innerHTML = "";
    var subSearch = document.getElementById("input1").value;
    subSearch = subSearch.toLowerCase();
    var a = document.getElementsByClassName("spanItem5");
    for (var subs = 0; subs < tItems.length; subs++) {
        if (a[subs].getAttribute("title").toLowerCase().lastIndexOf(subSearch) == -1) {
            a[subs].parentNode.parentNode.style.display = "none";
        }
        else {
            a[subs].parentNode.parentNode.style.display = "";
        }
    }
}

function Ascend() {
    gfSortDescending = !gfSortDescending;
    tItems.sort(compare11);
    displayItems();
}




