//var response1 ;
//var response;
//var totalres;
//var OfferedItems = [];
//var ind = 0;
//var totalObj = [];

//function onloaditems() {
//    //alert('how are u ra bakkupeta');
    
//    if (window.XMLHttpRequest) {
//        xmlhttp = new XMLHttpRequest();
//    }
//    else {
//        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//    }
//    xmlhttp.onreadystatechange = function () {
//        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//            response = xmlhttp.responseText;
//            //alert(response);
//            response1 = "{ \"totalitems\":" + response + " }";
//            //dash3 = "{" + "\"Prudhvi\" :[" + dash + "]" + "}";
//            totalres = JSON.parse(response1);
//            //alert(totalres.totalitems[0].category);
//            //for (var i = 0; i < totalres.totalitems.length; i++) {
//            //    for (var j = 0; j < totalres.totalitems[i].items.length; j++) {
//            //        if (totalres.totalitems[i].items[j].offer != 0) {
//            //            OfferedItems = {
//            //                "category": totalres.totalitems[i].category, "items": [{
//            //                "sno": totalres.totalitems[i].items[j].sno, "name": totalres.totalitems[i].items[j].name, "pid": totalres.totalitems[i].items[j].pid, "type": totalres.totalitems[i].items[j].type, "price": totalres.totalitems[i].items[j].price, "image": totalres.totalitems[i].items[j].image, "quantity": totalres.totalitems[i].items[j].quantity, "unit": totalres.totalitems[i].items[j].unit, "offer": totalres.totalitems[i].items[j].offer, "promotion": totalres.totalitems[i].items[j].promotion, "measures": ["1", "1.5", "2", "2.5", "3", "5", "10"]
//            //            }]
//            //            };
//            //        }
//            //    }
//            //}
            
            
//        }
//    }

//    xmlhttp.open("POST", "OfferJson2.aspx", true);
//    xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
//    xmlhttp.send();
//}


function ItemsFunction($scope) {
    //alert("hi");
}


var ogj= {"prudhvi":[{"USER":"528dbbe26448761c2c601abe","ORDERS":
[{ "user" : "528dbbe26448761c2c601abe", "order" : 
[{ "OrderedDate" : "2013-12-06T05:47:22.205Z", "Items" : 
[{ "Name" : "Aubergine", "Quantity" : 1, "Price" : 25 }, 
{ "Name" : "Sprouts", "Quantity" : 1, "Price" : 24 }], "DelivaryDate" : "2013-12-26" }] }]}]}


var img={"ORDERS":[{ "user" : "528dbbe26448761c2c601abe", "order" : [{ "OrderedDate" : "2013-12-06T05:47:22.205Z", "Items" : [{ "Name" : "Aubergine", "Quantity" : 1, "Price" : 25 }, { "Name" : "Sprouts", "Quantity" : 1, "Price" : 24 }], "DelivaryDate" : "2013-12-26" }] }]}






var objData = {
    "Orders": [{"UserName": "Prudhvi", "name": "Order1", "items": [{ "Name": "Apple", "Price": 25, "Quantity": 250, "Image": "Apple.jpg" },

														{ "Name": "Apricot", "Price": 30, "Quantity": 130, "Image": "Apricot.jpg" },

														{ "Name": "Okra", "Price": 10, "Quantity": 1050, "Image": "Okra.jpg" },

														{ "Name": "Beetroot", "Price": 10, "Quantity": 3540, "Image": "Beetroot.jpg" }

    ], "Date": "June 22, 2012"},

						    {
						        "UserName": "Sai", "name": "Order2", "items": [{ "Name": "Aubergine", "Price": 25, "Quantity": 150, "Image": "Aubergine.jpg" },

														{ "Name": "Beetroot", "Price": 10, "Quantity": 3540, "Image": "Beetroot.jpg" },

														{ "Name": "Apricot", "Price": 30, "Quantity": 130, "Image": "Apricot.jpg" },

														{ "Name": "Banana", "Price": 20, "Quantity": 600, "Image": "Banana.jpg" },
						                                { "Name": "Sprouts", "Price": 10, "Quantity": 3540, "Image": "Sprouts.jpg" },
                                                        { "Name": "Black sapote", "Price": 55, "Quantity": 400, "Image": "Blacksapote.jpg" },
                                                        { "Name": "Cauliflower", "Price": 30, "Quantity": 330, "Image": "Cauliflower.jpg" },

						        ], "Date": "September 20, 2012"
						    },
                                                        
							{
							    "UserName": "Murthy", "name": "Order3", "items": [{ "Name": "Banana", "Price": 40, "Quantity": 600, "Image": "Banana.jpg" },

														 { "Name": "Black sapote", "Price": 55, "Quantity": 400, "Image": "Blacksapote.jpg" },

														 { "Name": "Beetroot", "Price": 10, "Quantity": 3540, "Image": "Beetroot.jpg" }

							    ], "Date": "January 15, 2013"
							},

							{
							    "UserName": "Shiva", "name": "Order4", "items": [{ "Name": "Cauliflower", "Price": 30, "Quantity": 330, "Image": "Cauliflower.jpg" },

														 { "Name": "Okra", "Price": 10, "Quantity": 1050, "Image": "Okra.jpg" },

														 { "Name": "Apricot", "Price": 20, "Quantity": 130, "Image": "Apricot.jpg" },

														 { "Name": "Banana", "Price": 10, "Quantity": 600, "Image": "Banana.jpg" },

														 { "Name": "Beetroot", "Price": 10, "Quantity": 3540, "Image": "Beetroot.jpg" }

							    ], "Date": "July 10, 2013"},

							{
							    "UserName": "Pavan", "name": "Order5", "items": [{ "Name": "Aubergine", "Price": 25, "Quantity": 100, "Image": "Aubergine.jpg" },

														 { "Name": "Beetroot", "Price": 10, "Quantity": 200, "Image": "Beetroot.jpg" },

														 { "Name": "Blackyebeans", "Price": 30, "Quantity": 100, "Image": "Blackeyebeans.jpg" },

														 { "Name": "Broadbean", "Price": 15, "Quantity": 200, "Image": "Broadbean.jpg" },

														 { "Name":"Broccoli" , "Price":20,  "Quantity": 50, "Image": "Broccoli.jpg" } 

							    ], "Date":"August 20, 2013" },

							{
							    "UserName": "Prudhvi", "name": "Order6", "items": [{ "Name": "Cauliflower", "Price": 30, "Quantity": 300, "Image": "Cauliflower.jpg" },

														 { "Name": "Okra", "Price": 10, "Quantity": 150, "Image": "Okra.jpg" },

														 { "Name": "Onions", "Price": 28, "Quantity": 500, "Image": "Onions.jpg" },

														 { "Name": "Potato", "Price": 16, "Quantity": 300, "Image": "Potato.jpg" },

														 { "Name": "Pumpkin", "Price": 23, "Quantity": 50, "Image": "Pumpkin.jpg" }

							    ], "Date":"September 15, 2013"}, 						

							{
							    "UserName": "Pavan", "name": "Order7", "items": [{ "Name": "Broadbean", "Price": 15, "Quantity": 200, "Image": "Broadbean.jpg" },

													     { "Name": "Red bell pepper", "Price": 18, "Quantity": 50, "Image": "Red-bell-pepper.jpg" },

													     { "Name": "Red Cabbage", "Price": 36, "Quantity": 100, "Image": "Red-cabbage.jpg" },

													     { "Name": "Sprouts", "Price": 24, "Quantity": 25, "Image": "Sprouts.jpg" },

													     { "Name": "Tomato", "Price": 15, "Quantity": 500, "Image": "Tomato.jpg" }

							    ], "Date": "December 24, 2013"
							},
                            {
                                "UserName": "Murthy", "name": "Order8", "items": [{ "Name": "Quince", "Price": 15, "Quantity": 200, "Image": "Quince.jpg" },

                                                         { "Name": "Potato", "Price": 18, "Quantity": 50, "Image": "Potato.jpg" },

                                                         { "Name": "Orange", "Price": 36, "Quantity": 100, "Image": "Orange.jpg" },

                                                         { "Name": "Plum", "Price": 24, "Quantity": 25, "Image": "Plum.jpg" },

                                                         { "Name": "Radishes", "Price": 15, "Quantity": 500, "Image": "Radishes.jpg" }

                                ], "Date": "December 24, 2013"
                            }
                            
    ]
};



var o = { "siva": [{ "OrderedDate": "2014-01-06T08:47:13.153Z", "Items": [{ "Name": "Broadbean", "Quantity": 2.5, "Price": 37.5 }], "DelivaryDate": "13-1-2014" }] }

var arr = [,1,2,3,4];