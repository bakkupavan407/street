var objData;
var dash1, dash2, dash3;
var xmlhttp;
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
var selVal1;
var ItemDates = [];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var umVal;
var ddlj;
var pp407;
function omedash() {
    ddlj = window.location.search.substring(5);
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            dash = xmlhttp.responseText;
            
           if (dash == 0) {
                alert("You have to place minimum one order to view your dashboard");
                location.href = "index.html";
            }
                   
                    dash3 = "{" + "\"Prudhvi\" :[" + dash + "]" + "}";
                    dash2 = JSON.parse(dash3);
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
                            psum +=parseFloat( objData.Orders[q].items[p].Price);
                        }
                    }
                    var datearr = 0;
                    for (di = 0; di < dash2.Prudhvi.length; di++) {
                        for (diii = 0; diii < dash2.Prudhvi[di].order.length; diii++) {
                            dateArray[datearr++] = { "Date": (dash2.Prudhvi[di].order[diii].OrderedDate), "id": datearr - 1, "UserName": dash2.Prudhvi[di].mobile };
                        }
                    }
                }
        }
    
        xmlhttp.open("POST", "UserDashboardAction.aspx", true);
        xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xmlhttp.send();
    
}

function addOrders() {
    var topDiv = document.getElementById("topBarDiv");
    topDiv.innerHTML = "";
    document.getElementById("order").style.visibility = "visible";
    document.getElementById("details").style.visibility = "hidden";
    document.getElementById("order").innerHTML = "";
    document.getElementById("details").innerHTML = "";
    document.getElementById("sum").innerHTML = "";
    var tag = document.getElementById("order");
    var topDiv = document.getElementById("topBarDiv");
    var select = document.createElement("select");
    select.setAttribute("name", "mySelect");
    select.setAttribute("id", "mySelect");
    select.style.width = "100px";
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

        topDiv.appendChild(select11);
    }
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

    tag.innerHTML="<h3 class=subhead>Your Orders</h3>"
    var divMain = document.createElement("div");
    divMain.id = "divMain";
    var ordDiv = document.createElement("div");
    ordDiv.id = "ordDiv1";

    for (var dii = 0; dii < dateArray.length; dii++) {
        elmOrd = document.createElement("div");
        ordSpan = document.createElement("span");
        dateSpan = document.createElement("span");
        dateSpan.style.display = "block";
        ordSpan.className = "spanItem1";
        dateSpan.className = "spanItem";
        elmOrd.id = dateArray[dii].id;
        elmOrd.className = "day";
        elmOrd.setAttribute("onclick", "details(" + dateArray[dii].id + ")");
        textOrd = document.createTextNode("Order");
        dateText = document.createTextNode((dateArray[dii].Date));
        ordSpan.appendChild(textOrd);
        dateSpan.appendChild(dateText);
        elmOrd.appendChild(dateSpan);
        elmOrd.appendChild(ordSpan);
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
    ordSpan1.className = "spanItem";
    dateSpan1.className = "spanItem";
    elmOrd1.className = "day";
    elmOrd1.setAttribute("onclick", "details(" + dateArray[dii].id + ")");
    textOrd1 = document.createTextNode("Order");
    dateText1 = document.createTextNode((dateArray[dii].Date));
    ordSpan1.appendChild(textOrd1);
    dateSpan1.appendChild(dateText1);
    elmOrd1.appendChild(ordSpan1);
    elmOrd1.appendChild(dateSpan1);
    ordDiv1.appendChild(elmOrd1);
}

function seleInd() {
    document.getElementById("details").style.visibility = "hidden";
    document.getElementById("details").innerHTML = "";
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
        var datestring = new Date(dateArray[dii].Date);
        if (yerVal != "Year" && dateArray[dii].Date.lastIndexOf(yerVal) != -1) {
            if (selVal1 == "Month") {
                repeat();
            }
            else {
                var selectedMonth = dateArray[dii].Date.substring(5, 7);
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
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
}

function details(ordIndex) {
    document.getElementById("sum").style.visibility = "visible";
    var tag = document.getElementById("details");
    document.getElementById("details").style.visibility = "visible";
    tag.innerHTML = "";
    tag.innerHTML = "<h3 class=subhead>Item Details:"+" "+dash2.Prudhvi[ordIndex].order[0].OrderedDate+"</h3>";
    var MDiv = document.createElement("div");
    MDiv.id = "MainDivSpan"
    var divDisp1 = document.createElement("div");
    divDisp1.className = "SPin";
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
            var cb = document.createElement('input');
            
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
    var topDiv = document.getElementById("topBarDiv");
    topDiv.innerHTML = "";
    document.getElementById("order").style.visibility = "visible";
    document.getElementById("details").style.visibility = "hidden";
    document.getElementById("sum").style.visibility = "visible";
    document.getElementById("details").innerHTML = "";
    var topDiv = document.getElementById("topBarDiv");
    document.getElementById("sum").innerHTML = "";

    var tag11 = document.getElementById("order");
    tag11.innerHTML = "<h3 class=subhead>Item List</h3>"
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
               
                tItems[ind++] = { "Name": dash2.Prudhvi[q1].order[p1].Items[r1].Name, "Quantity": dash2.Prudhvi[q1].order[p1].Items[r1].Quantity, "Price": parseFloat(dash2.Prudhvi[q1].order[p1].Items[r1].Price), "Date": dash2.Prudhvi[q1].order[p1].OrderedDate, "Image": dash2.Prudhvi[q1].order[p1].Items[r1].Name };
            }
        }
    }
    tItems.sort(compare);
    for (tp = 0; tp < tItems.length; tp++) {
        tItems[tp].Price = (tItems[tp].Price) ;
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

    var itmind = 0;
    for (q1 = 0; q1 < dash2.Prudhvi.length; q1++) {

        for (var p1 = 0; p1 < dash2.Prudhvi[q1].order.length; p1++) {
            for (var r1 = 0; r1 < dash2.Prudhvi[q1].order[p1].Items.length; r1++) {

                ItemDates[itmind++] = { "ItemName": dash2.Prudhvi[q1].order[p1].Items[r1].Name, "Quantity": dash2.Prudhvi[q1].order[p1].Items[r1].Quantity, "Price": dash2.Prudhvi[q1].order[p1].Items[r1].Price, "Date": dash2.Prudhvi[q1].order[p1].OrderedDate };
            }
        }
    }
    ItemDates.sort(compare11);
    var tag = document.getElementById("details");
    tag.style.visibility = "visible";
    tag.innerHTML = "<h3 class=subhead>Item Details</h3> ";
    var TotalAmount = 0;

    ItemDates.sort(compareDate);
    var IMdiv = document.createElement("div");
    var divDisp1 = document.createElement("div");
    divDisp1.className = "SPin"
    for (var i = 0; i < ItemDates.length; i++) {
        if (tItems[itemind].Name == ItemDates[i].ItemName) {
            TotalAmount += parseFloat(ItemDates[i].Price) ;
            var Disdiv = document.createElement("div");
            Disdiv.className = "day2";
            var DateSpan = document.createElement("span");
            DateSpan.style.display = "block";
            DateSpan.style.height = "40px";
            var QuanSpan = document.createElement("span");
            QuanSpan.className = "spanclass";
            var PriceSpan = document.createElement("span");
            PriceSpan.className = "spanclass2";
            var totalAmnt = document.createElement("span");
            totalAmnt.style.padding = "5px";
            var dateText = document.createTextNode((ItemDates[i].Date));
            var QuanText = document.createTextNode("Quantity :"+ ItemDates[i].Quantity);
            var PriceText = document.createTextNode("Price :"+ItemDates[i].Price);
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
    document.getElementById("sum").innerHTML = ("<div>Total Amount Spent On This Item : " + TotalAmount.toFixed(2) + "</div>" + "<div>Total Amount Spent For This System is :" + psum.toFixed(2) + "</div>");
    clrArays = document.getElementById("itemDiv");
    var l = clrArays.childNodes;
    for (li = 0; li < l.length; li++) {
        l[li].style.border = "1px solid grey";
    }
    document.getElementById(itemind).style.border = "2px solid blue";
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
    document.getElementById("details").style.visibility = "hidden";
    document.getElementById("details").innerHTML = "";
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