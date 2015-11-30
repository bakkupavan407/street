﻿
var dash;
var dash3;
var dash2;
var objData;
var initind = 0;
var Items = [];
var Details1 = [];
var detailsind = 0;
var sortedArray = new Array();
var psum = 0;
var elm;
var text;
var text1;
var ordIndex;
var tItems = new Array();
var gfSortDescending = true;
var gfSortDescend = true;
var dateArray = [];
var selVal1
var ItemDates = [];
var elmOrd1;
var umVal;
var ddlj;
var pp407;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var orderIdArray = [];
var orderIdArray2 = [];

function getOrders() {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            dash = xmlhttp.responseText;
             
            dash2 = JSON.parse(dash);
            for (var i = 0; i < dash2.Prudhvi.length; i++) {

                for (var j = 0; j < dash2.Prudhvi[i].order.length; j++) {

                    for (var k = 0; k < dash2.Prudhvi[i].order[j].Items.length; k++) {
                        Items[initind++] = { "Name": dash2.Prudhvi[i].order[j].Items[k].Name, "Quantity": dash2.Prudhvi[i].order[j].Items[k].Quantity, "Price": dash2.Prudhvi[i].order[j].Items[k].Price };
                    }
                }
            }

            for (var i = 0; i < dash2.Prudhvi.length; i++) {
                for (var j = 0; j < dash2.Prudhvi[i].order.length; j++) {
                    objData = {
                        "Orders": [{
                            "Date": dash2.Prudhvi[i].order[j].OrderedDate, "DelivaryDate": dash2.Prudhvi[i].order[j].DelivaryDate, "items": Items
                        }]
                    };
                }
            }


            for (var q = 0; q < objData.Orders.length; q++) {
                for (p = 0; p < objData.Orders[q].items.length; p++) {
                    psum += parseFloat(objData.Orders[q].items[p].Price);
                }
            }
            var datearr = 0;
            for (di = 0; di < dash2.Prudhvi.length; di++) {
                for (diii = 0; diii < dash2.Prudhvi[di].order.length; diii++) {
                    dateArray[datearr++] = { "Date": dash2.Prudhvi[di].order[diii].OrderedDate, "id": datearr - 1, "UserName": dash2.Prudhvi[di].name, "delivaryDate": dash2.Prudhvi[di].order[diii].DelivaryDate, "mobile": dash2.Prudhvi[di].mobile, "orderId": dash2.Prudhvi[di].orderid, "orderStatus": dash2.Prudhvi[di].orderstatus };
                }
            }
        }
    }

    xmlhttp.open("POST", "OrderstoMerchant.aspx", true);
    xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

function addOrders() {
    if (dateArray.length < 1) {
        document.getElementById("errorMsgDiv").style.display = "";
        document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "You have No orders to display";
        document.getElementById("errorMsgSpan").style.color = "red";
        document.getElementById("errorMsgSpan").style.fontSize = "14px";
        return false;
    }
    var topDiv = document.getElementById("topBarDiv");
    topDiv.innerHTML = "";
    document.getElementById("order").style.visibility = "visible";
    document.getElementById("order").innerHTML = "";
    document.getElementById("details").style.visibility = "hidden";
    document.getElementById("details").innerHTML = "";
    document.getElementById("sum").innerHTML = "";
    document.getElementById("addresDisplay").style.display = "none";
    var tag = document.getElementById("order");
    topDiv = document.getElementById("topBarDiv");
    var inputOrd=document.createElement("input");

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
    for (mi = 0; mi < months.length; mi++) {
        option1 = document.createElement("option");
        option1.setAttribute("value", mi + 1);
        option1.innerHTML = months[mi];
        select11.appendChild(option1);
        select11.setAttribute("onchange", "seleInd()");

    }
    topDiv.appendChild(select11);
    var SearchBox = document.createElement("input");
    SearchBox.setAttribute("type", "text");
    SearchBox.setAttribute("Value", "");
    SearchBox.setAttribute('onkeyup', 'userSearch()');
    SearchBox.setAttribute("placeholder", "Search By User");
    SearchBox.id = "User1";
    topDiv.appendChild(SearchBox);

    var deliverButon = document.createElement("input");
    deliverButon.setAttribute("type", "button");
    deliverButon.setAttribute("Value", "deliverItems");
    deliverButon.setAttribute('onclick', 'deliveredItems()');
    deliverButon.id = "delItems";
    topDiv.appendChild(deliverButon);

    var deliverButon2 = document.createElement("input");
    deliverButon2.setAttribute("type", "button");
    deliverButon2.setAttribute("Value", "UndeliverItems");
    deliverButon2.setAttribute('onclick', 'deliveredItems2()');
    deliverButon2.id = "delItems2";
    topDiv.appendChild(deliverButon2);

    var sid11 = document.getElementById("mySelect11");
    var imgOrd = document.createElement("img");
    imgOrd.setAttribute("src", "sort.jpg");
    imgOrd.setAttribute("alt", "Sort");
    imgOrd.setAttribute("width", "25px");
    imgOrd.setAttribute("height", "25px");
    imgOrd.setAttribute("onclick", "Descend()");
    imgOrd.id = "imgASc";
    topDiv.appendChild(imgOrd);
    dateArray.sort(compareDate);

    var divMain = document.createElement("div");
    divMain.id = "divMain";
    var ordDiv = document.createElement("div");
    ordDiv.id = "ordDiv1";
    tag.innerHTML = "<h3 class=subhead>Orders List</h3>"
    
    for (var dii = 0; dii < dateArray.length; dii++) {
        elmOrd = document.createElement("div");
        ordSpan = document.createElement("span");
        ordSpan.title = dateArray[dii].UserName;
        dateSpan = document.createElement("span");
        var mobSpan = document.createElement("span");
        var ordDate = document.createElement("span");
        dateSpan.style.display = "block";
        ordSpan.className = "spanItem1";

        mobSpan.id = "spanItemMobile";
        dateSpan.className = "spanItem";
        ordDate.className = "spanItem";
        elmOrd.id = dateArray[dii].id;
        elmOrd.className = "day";
        var checkSpan = document.createElement("div");
        checkSpan.style.display = "inline";
        checkSpan.style.width = "100px";
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "name";
        checkbox.value = "value";
        checkbox.id = "CheckBox";
        checkbox.style.display = "none";
        if (dateArray[dii].orderStatus != "delivered") {

            checkbox.style.display = "";
        }
        checkbox.className = "checkClass";
        var zzid = dateArray[dii].id;
        checkbox.onclick = function (e) {
            orderDeliveryChek(e);
        };

        var chekText = document.createElement("span");
        var delText = document.createTextNode("delivered");
        chekText.className = "checkClass2";
        chekText.appendChild(delText);

        var checkbox2 = document.createElement('input');
        checkbox2.type = "checkbox";
        checkbox2.id = "CheckBox2";
        checkbox2.className = "checkboxclass2";
        checkbox2.style.display = "none";
        checkbox2.onclick = function (e) {
            orderDeliveryChek2(e);
        };
        if (dateArray[dii].orderStatus == "delivered") {
            checkbox2.style.display = "";
        }
        var chekText2 = document.createElement("span");
        var delText2 = document.createTextNode("Un delivered");
        chekText2.appendChild(delText2);
        chekText2.className = "checkClass4";
        elmOrd.setAttribute("onclick", "details(" + dateArray[dii].id + ")");

        textOrd = document.createTextNode(dateArray[dii].UserName + " - " + " ");

        dateText = document.createTextNode("D.D : " + dateArray[dii].delivaryDate);
        var odtext = document.createTextNode("O.D : " + (dateArray[dii].Date));
        txtMob = document.createTextNode(" " + dateArray[dii].mobile);
        ordSpan.appendChild(textOrd);
        ordDate.appendChild(odtext);
        mobSpan.appendChild(txtMob);
        dateSpan.appendChild(dateText);
        elmOrd.appendChild(ordSpan);
        elmOrd.appendChild(txtMob);
        elmOrd.appendChild(ordDate);
        elmOrd.appendChild(dateSpan);
        checkSpan.appendChild(checkbox);
        checkSpan.appendChild(chekText);
        checkSpan.appendChild(chekText2);
        checkSpan.appendChild(checkbox2);
        elmOrd.appendChild(checkSpan);

        ordDiv.appendChild(elmOrd);
        divMain.appendChild(ordDiv);
    }
    tag.appendChild(divMain);
}

function repeat() {
    elmOrd1 = document.createElement("div");
    elmOrd1.id = dateArray[dii].id;
    ordSpan1 = document.createElement("span");
    dateSpan1 = document.createElement("span");
    var ddatespan1 = document.createElement("span");
    var namespan = document.createElement("span");
    ddatespan1.className = "spanItem";
    ordSpan1.className = "spanItem";
    dateSpan1.className = "spanItem";
    dateSpan1.id = "displaying";
    namespan.className = "spanItem";
    elmOrd1.className = "day";
    var checkSpan = document.createElement("div");
    checkSpan.style.display = "inline";
    checkSpan.style.width = "100px";
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "name";
    checkbox.value = "value";
    checkbox.id = "CheckBox";
    checkbox.style.display = "none";
    if (dateArray[dii].orderStatus != "delivered") {

        checkbox.style.display = "";
    }
    checkbox.className = "checkClass";
    var zzid = dateArray[dii].id;
    checkbox.onclick = function (e) {
        orderDeliveryChek(e);
    };
    var chekText = document.createElement("span");
    var delText = document.createTextNode("delivered");
    chekText.className = "checkClass2";
    chekText.appendChild(delText);

    var checkbox2 = document.createElement('input');
    checkbox2.type = "checkbox";
    checkbox2.id = "CheckBox2";
    checkbox2.className = "checkboxclass2";
    checkbox2.style.display = "none";
    checkbox2.onclick = function (e) {
        orderDeliveryChek2(e);
    };
    if (dateArray[dii].orderStatus == "delivered") {
        checkbox2.style.display = "";
    }
    var chekText2 = document.createElement("span");
    var delText2 = document.createTextNode("Un delivered");
    chekText2.appendChild(delText2);
    chekText2.className = "checkClass4";
    elmOrd1.setAttribute("onclick", "details(" + dateArray[dii].id +")");
    textOrd1 = document.createTextNode(dateArray[dii].UserName + " - " + dateArray[dii].mobile);
    dateText1 = document.createTextNode(" O.D :"+(dateArray[dii].Date));
    var ddate=document.createTextNode(" D.D :"+dateArray[dii].delivaryDate)
    ordSpan1.appendChild(textOrd1);
    dateSpan1.appendChild(dateText1);
    ddatespan1.appendChild(ddate);
    elmOrd1.appendChild(ordSpan1);
    elmOrd1.appendChild(namespan);
    elmOrd1.appendChild(dateSpan1);
    elmOrd1.appendChild(ddatespan1);
    checkSpan.appendChild(checkbox);
    checkSpan.appendChild(chekText);
    checkSpan.appendChild(chekText2);
    checkSpan.appendChild(checkbox2);
    elmOrd1.appendChild(checkSpan);
    ordDiv1.appendChild(elmOrd1);
}

function seleInd() {
    document.getElementById("details").innerHTML = "";
    document.getElementById("details").style.visibility = "hidden";
    document.getElementById("addresDisplay").style.display = "none";
    document.getElementById("sum").innerHTML = "";
    var sid = document.getElementById("mySelect11");
    var selVal1 = sid.options[sid.selectedIndex].value;
    var sid11 = document.getElementById("mySelect");
    var yerVal = sid11.options[sid11.selectedIndex].value;
    ordDiv1 = document.getElementById("ordDiv1");
    ordDiv1.innerHTML = "";
    if (yerVal == "Year" && selVal1 == "Month") {
        addOrders();
    }
    for (dii = 0; dii < dateArray.length; dii++) {
       // alert(dateArray[dii].Date);
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

function Descend() {
    gfSortDescend = !gfSortDescend;
    document.getElementById("details").innerHTML = "";
    document.getElementById("sum").innerHTML = "";
    addOrders();
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


function details(ordIndex) {
    document.getElementById("sum").style.visibility = "visible";
    var tag = document.getElementById("details");
    document.getElementById("details").style.visibility = "visible";
    tag.innerHTML = "";

    tag.innerHTML = "<h3 class=subhead>Item Details:" + dash2.Prudhvi[ordIndex].name + "</h3>";
    var shipAdd = document.getElementById("addresDisplay");
    shipAdd.style.display = "";
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
            var text1 = document.createTextNode("Item : " + dash2.Prudhvi[ordIndex].order[k].Items[k1].Name);
            SpanName.style.display = "block";
            SpanName.style.height = "40px";
            var SpanQuan = document.createElement("span");
            SpanQuan.className = "spanclass";
            var text2 = document.createTextNode("Quantity : " + dash2.Prudhvi[ordIndex].order[k].Items[k1].Quantity);
            var SpanPrice = document.createElement("span");
            SpanPrice.className = "spanclass2";
            var text3 = document.createTextNode("Price : " + dash2.Prudhvi[ordIndex].order[k].Items[k1].Price);
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
    var text2 = 0;

    for (var k = 0; k < dash2.Prudhvi[ordIndex].order.length; k++) {
        for (var k1 = 0; k1 < dash2.Prudhvi[ordIndex].order[k].Items.length; k1++) {

            text2 += parseFloat(dash2.Prudhvi[ordIndex].order[k].Items[k1].Price);
        }
    }

    document.getElementById("sum").innerHTML = ("<div>Total Amount Spent For This Order : " + text2.toFixed(2) + "</div>" + "<div>Total Amount Spent For This System is :" + psum.toFixed(2) + "</div>");

    var sid11 = document.getElementById("mySelect");
    var yerVal = sid11.options[sid11.selectedIndex].value;
    var sid = document.getElementById("mySelect11");
    var selVal1 = sid.options[sid.selectedIndex].value;
    if (yerVal == 'Year' && selVal1 == 'Month') {

        clrArray = document.getElementById("ordDiv1");
        var len = clrArray.childNodes;
        for (leni = 0; leni < len.length; leni++) {
            len[leni].style.backgroundColor = "whitesmoke";
        }
        document.getElementById(ordIndex).style.backgroundColor = "skyblue";
    }
    else {
        clrArray2 = document.getElementById("ordDiv1");
        var len2 = clrArray2.childNodes;
        for (lenii = 0; lenii < len2.length; lenii++) {
            len2[lenii].style.backgroundColor = "whitesmoke";
        }
        document.getElementById(ordIndex).style.backgroundColor = "skyblue";
    }
}

function compare(a, b) {
    if (a.Name > b.Name)
        return 1;
    if (a.Name < b.Name)
        return -1;
    return 0;
}

function Ascend() {
    gfSortDescending = !gfSortDescending;
    viewItems();
}

function compare11(a, b) {
    if (!gfSortDescending) {
        var t = a; a = b; b = t; // swap the parms
    }
    if (a.Quantity > b.Quantity)
        return -1;
    if (a.Quantity < b.Quantity)
        return 1;
    return 0;
}

var prudhvi1 = 0;
var p1, q1;
var itr, itd, itd1, itemQuantity;
var array11 = new Array();
var arr = 0;

function viewItems() {
    if (dateArray.length < 1) {
        document.getElementById("errorMsgDiv").style.display = "";
        document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "You have No orders to display";
        document.getElementById("errorMsgSpan").style.color = "red";
        document.getElementById("errorMsgSpan").style.fontSize = "14px";
        return false;
    }
    document.getElementById("addresDisplay").style.display = "none";
    var topDiv = document.getElementById("topBarDiv");
    topDiv.innerHTML = "";
    document.getElementById("order").style.visibility = "visible";
    document.getElementById("details").style.visibility = "hidden";
    document.getElementById("sum").style.visibility = "visible";
    document.getElementById("details").innerHTML = "";

    document.getElementById("sum").innerHTML = "";

    var tag11 = document.getElementById("order");
    tag11.innerHTML = "<h3 class=subhead>Item List</h3>";
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
    var ind = 0;
    for (q1 = 0; q1 < dash2.Prudhvi.length; q1++) {
        for (var p1 = 0; p1 < dash2.Prudhvi[q1].order.length; p1++) {
            for (var r1 = 0; r1 < dash2.Prudhvi[q1].order[p1].Items.length; r1++) {
                tItems[ind++] = { "Name": dash2.Prudhvi[q1].order[p1].Items[r1].Name, "Quantity": dash2.Prudhvi[q1].order[p1].Items[r1].Quantity, "Price": parseFloat(dash2.Prudhvi[q1].order[p1].Items[r1].Price), "Date": dash2.Prudhvi[q1].order[p1].OrderedDate, "Image": dash2.Prudhvi[q1].order[p1].Items[r1].Name, "userName": dash2.Prudhvi[q1].user };
            }
        }
    }
    tItems.sort(compare);
    for (tp = 0; tp < tItems.length; tp++) {
        tItems[tp].Price = (tItems[tp].Price);
    }
    for (var ii = 0; ii < tItems.length; ii++) {
        for (var i1 = 0; i1 < tItems.length - 1; i1++) {
            if (tItems[i1].Name == tItems[i1 + 1].Name) {
                tItems[i1 + 1].Quantity = parseFloat(tItems[i1 + 1].Quantity);
                tItems[i1].Quantity = parseFloat(tItems[i1].Quantity);
                tItems[i1 + 1].Quantity += tItems[i1].Quantity;

                tItems[i1 + 1].Price += tItems[i1].Price;

                tItems.splice(i1, 1);
            }
        }
    }

    tItems.sort(compare11);
    var divItem = document.createElement("div");
    divItem.className = 'divItem';
    divItem.id = "itemDiv";
    for (var q1 = 0; q1 < tItems.length; q1++) {
        itr = document.createElement("div");
        itr.id = q1;
        itr.style.backgroundImage = "url(images/" + tItems[q1].Image + ".jpg)";
        itr.style.backgroundSize = "50% 50%";
        itr.className = "itemsList";
        itr.setAttribute("onclick", "itemsByDate(" + q1 + ")");
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

        prudhvi1 = document.createTextNode("Name:" + tItems[q1].Name);
        itd.style.display = "block";
        itd1.style.display = "block";

        itemQuantity = document.createTextNode("Quantity:" + tItems[q1].Quantity);
        var itemTotalPrice = document.createTextNode("Price:" + tItems[q1].Price);
        itd.appendChild(prudhvi1);
        itd1.appendChild(itemQuantity);
        itd2.appendChild(itemTotalPrice);
        opacityDiv.appendChild(itd);
        opacityDiv.appendChild(itd1);
        opacityDiv.appendChild(itd2);
        itr.appendChild(opacityDiv);
        divItem.appendChild(itr);
        tag11.appendChild(divItem);
    }
}

function subSearch() {
    document.getElementById("details").style.visibility = "hidden";
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
function itemsByDate(itemind) {
    document.getElementById("details").style.visibility = "visible";
    document.getElementById("addresDisplay").style.display = "none";
    var itmind = 0;
    for (q1 = 0; q1 < dash2.Prudhvi.length; q1++) {

        for (var p1 = 0; p1 < dash2.Prudhvi[q1].order.length; p1++) {
            for (var r1 = 0; r1 < dash2.Prudhvi[q1].order[p1].Items.length; r1++) {

                ItemDates[itmind++] = { "ItemName": dash2.Prudhvi[q1].order[p1].Items[r1].Name, "Quantity": dash2.Prudhvi[q1].order[p1].Items[r1].Quantity, "Price": dash2.Prudhvi[q1].order[p1].Items[r1].Price, "Date": dash2.Prudhvi[q1].order[p1].OrderedDate, "userName": dash2.Prudhvi[q1].name };
            }
        }
    }
    ItemDates.sort(compare11);
    var tag = document.getElementById("details");
    tag.innerHTML = "<h3 class=subhead>Item Details </h3>";
    var TotalAmount = 0;
    ItemDates.sort(compareDate);
    var IMdiv = document.createElement("div");
    var divDisp1 = document.createElement("div");
    divDisp1.className = "SPin"
    for (var i = 0; i < ItemDates.length; i++) {
        if (tItems[itemind].Name == ItemDates[i].ItemName) {
            TotalAmount += parseFloat(ItemDates[i].Price);
            var Disdiv = document.createElement("div");
            Disdiv.className= "day2";
            var DateSpan = document.createElement("span");
            DateSpan.style.display = "block";
            DateSpan.style.height = "40px";
            var QuanSpan = document.createElement("span");
            QuanSpan.className = "spanclass";
            var PriceSpan = document.createElement("span");
            PriceSpan.className = "spanclass2";
            var totalAmnt = document.createElement("span");
            totalAmnt.style.padding = "5px";
            var dateText = document.createTextNode(ItemDates[i].userName);
            var QuanText = document.createTextNode(ItemDates[i].Quantity);
            var PriceText = document.createTextNode(ItemDates[i].Price);
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
        l[li].style.border = "1px solid grey";
    }
    document.getElementById(itemind).style.border = "2px solid blue";
    document.getElementById("sum").innerHTML = ("<div>Total Amount Spent On This Item : " + TotalAmount.toFixed(2) + "</div>" + "<div>Total Amount Spent For This System is :" + psum.toFixed(2) + "</div>");

}

function changeDashBoard() {
    umDiv = document.getElementById("umdiv");
    umVal = umDiv.options[umDiv.selectedIndex].value;
    document.getElementById("user").style.visibility = "hidden";
    document.getElementById("details").style.visibility = "hidden";
    document.getElementById("order").style.visibility = "hidden";
    document.getElementById("sum").style.visibility = "hidden";
    var elms = document.getElementById("user");
    var chils = new Array();
    chils = elms.childNodes;
    if (umVal != "Select Type") {
        if (umVal == "User") {
            chils[1].innerHTML = "User";
            document.getElementById("user").style.visibility = "visible";
        }
        else {
            chils[1].innerHTML = "Merchant";
            document.getElementById("user").style.visibility = "visible";
        }
    }
    else {
        alert("Please Select Option");
    }
}

function userSearch() {
    document.getElementById("details").innerHTML = "";
    document.getElementById("details").style.visibility = "hidden";
    document.getElementById("addresDisplay").style.display = "none";
    document.getElementById("sum").innerHTML = "";
    var useSearch = document.getElementById("User1").value;
    useSearch = useSearch.toLowerCase();
    var a1 = document.getElementsByClassName("spanItem1");
    for (var subs = 0; subs < dateArray.length; subs++) {
        if (a1[subs].getAttribute("title").toLowerCase().lastIndexOf(useSearch) == -1) {
            a1[subs].parentNode.style.display = "none";
        }
        else {
            a1[subs].parentNode.style.display = "";
        }
    }
}


function addtodash() {
    pp407 = window.location.search.substring(4);
    location.href = "dashboard.aspx?etv=" + pp407;
}

var newChekBoxAray = [];
var newChekBoxAray2 = [];
var objDivId = [];
var objDivId2 = [];
function orderDeliveryChek(e) {
    if (e.target.checked === true) {

        var objId = e.target.parentNode.parentNode.id;
        objDivId.push(objId);
        orderIdArray[(orderIdArray.length)++] = dash2.Prudhvi[objId].orderid;

        newChekBoxAray.push(e.target.parentNode);
    }
    else {
        var objId4 = e.target.parentNode.parentNode.id;
        newChekBoxAray.splice(newChekBoxAray.indexOf(e.target.parentNode), 1);
        orderIdArray.splice(orderIdArray.indexOf(dash2.Prudhvi[objId4].orderid), 1);
        objDivId.splice(objDivId.indexOf(objId4), 1);
    }
}

function orderDeliveryChek2(e) {
    if (e.target.checked === true) {
        var objId2 = e.target.parentNode.parentNode.id;
        objDivId2.push(objId2);
        orderIdArray2[(orderIdArray2.length)++] = dash2.Prudhvi[objId2].orderid;
        newChekBoxAray2.push(e.target.parentNode);
    }
    else {
        var objId3 = e.target.parentNode.parentNode.id;
        newChekBoxAray2.splice(newChekBoxAray2.indexOf(e.target.parentNode), 1);
        orderIdArray2.splice(orderIdArray2.indexOf(dash2.Prudhvi[objId3].orderid), 1);
        objDivId2.splice(objDivId2.indexOf(objId3), 1);
    }
}


function deliveredItems() {
    if (orderIdArray.length < 1) {
        alert("Please Check the Orders Delivered");
        return;
    }
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            y = xmlhttp.responseText;
            for (i = 0; i < newChekBoxAray.length; i++) {
                newChekBoxAray[i].childNodes[0].style.display = "none";
                newChekBoxAray[i].childNodes[3].style.display = "";
            }
            getOrders();
        }
    }
    xmlhttp.open("POST", "deliverOrders.aspx", true);
    xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("z=" + orderIdArray);
}

function deliveredItems2() {
    if (orderIdArray2.length < 1) {
        alert("Please Check the Orders Undelivered");
        return;
    }

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            y = xmlhttp.responseText;

            for (i = 0; i < newChekBoxAray2.length; i++) {
                
                newChekBoxAray2[i].childNodes[3].style.display = "none";
                newChekBoxAray2[i].childNodes[0].style.display = "";
            }
            getOrders();
        }
    }
    xmlhttp.open("POST", "undeliverOrders.aspx", true);
    xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("z=" + orderIdArray2);
}
