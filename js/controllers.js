'use strict';

/* Controllers */

function ssprodListCtrl($scope, Product, $filter, Offer, OfferItems) {
    $scope.object1 = [];
    OfferItems.getallOffers(function (Data1) {
        $scope.offerData = Data1;

        $scope.products = Product.query(); 

        $scope.orderProp = '';

        $scope.totalPrice = 0.00;
        $scope.shoppingList = [
        {
            "name": "Bag1", "deliveryDate": "", "price": 0.00, "items": [
            { "name": "", "quantity": 1, "price": 0.00, "unit": "", "isActive": "active" }
            ]
        }];

        Offer.getOffers(function (data) {
        
            $scope.foo = data;
        
            if ($scope.foo !== "1") {
        
                for (var i = 0; i < $scope.foo.length; i++) {
                    $scope.foo[i].price = $scope.foo[i].price / $scope.foo[i].quantity;
                    if ($scope.shoppingList[0].name === "Bag1") {

                        $scope.shoppingList[0].items.push($scope.foo[i]);
        
                    }
                    $scope.setPrice();
                }
                $scope.shoppingList[0].items.splice(0, 1);
                $scope.shoppingList[0].items.push({
                    "name": "",
                    "quantity": 1,
                    "price": 0.00
                });
            }
        
        });

        $scope.productList = [];
        $scope.suggetionsList = [];
        $scope.measuresList = [];
        $scope.bagsList = ["Bag1"];
        $scope.tempItem = { "name": "", "price": 0, "unit": "" };
        $scope.setAllDeliveryDates = function (date) {
            for (var i = 0; i < $scope.shoppingList.length; i++) {
                $scope.shoppingList[i].deliveryDate = date;
        
            }
        }
        
        $scope.setDeliveryDate = function (arr) {
            for (var i = 0; i < arr.length; i++) {
                var found = $filter('getBagByName')($scope.shoppingList, arr[i].name);
                if (found) {
                    found.deliveryDate = arr[i].date;
                }
            }
        }


        $scope.addItem = function (bag,val) {
        
            for (var jj = 0; jj < $scope.shoppingList[0].items.length; jj++) {
                if ($scope.shoppingList[0].items[jj].name != null && ($scope.shoppingList[0].items[jj].name).length < 3) {
                    return;
                }
            }

            for (var i = 0; i < $scope.shoppingList.length; i++) {

                if ($scope.shoppingList[i].name === bag) {

                    $scope.shoppingList[i].items.push({
                        "name": "",
                        "quantity": 1,
                        "price": 0.00,
                        "unit": "",
                        "isActive": "none"
                    });
                    //$scope.readItems();
                }
            }
		if (val == 0) {
                document.getElementById("overlay").style.display = "none";
                document.getElementById("modal").style.display = "none";
            }
            if (val == 2) {
                document.getElementById("overlay1").style.display = "none";
                document.getElementById("modal1").style.display = "none";
            }
              if ($scope.shoppingList[0].items.length > 1) {
                document.getElementById("sel").disabled = false;
                document.getElementById("sel").style.cursor = "pointer";
             
            }

        };

        $scope.removeItem = function (index) {
            for (var i = 0; i < $scope.shoppingList[0].items.length; i++) {
                if ($scope.shoppingList[0].items[i].name == null || $scope.shoppingList[0].items[i].quantity == 0 || $scope.shoppingList[0].items[i].price == 0) {
                    $scope.shoppingList[0].items.splice(index, 1);
                }
            }
            $scope.setPrice();
           if ($scope.shoppingList[0].items.length == 1) {
                document.getElementById("sel").value = "";
                document.getElementById("sel").disabled = true;
                document.getElementById("sel").style.cursor = "";
                document.getElementById("margrgt").disabled = true;
                document.getElementById("margrgt").style.backgroundColor = "#848485";
            }
        }

        $scope.addBag = function () {
            $scope.shoppingList.push({
                "name": "Bag" + ($scope.shoppingList.length + 1),
                "deliveryDate": "",
                "price": 0.00,
                "items": [
                { "name": "", "quantity": 1, "price": 0.00, "unit": "", "isActive": "none" }
                ]
            });
            $scope.getBagsList();
            //$scope.$apply();
        }



        $scope.getSuggestions = function (q) {
            var matchedItem;
            $scope.suggetionsList = [];

            for (var i = 0; i < $scope.products.length; i++) {
                for (var j = 0; j < $scope.products[i].items.length; j++) {
                    matchedItem = $scope.products[i].items[j].name.substr(0, q.length);
                    if (matchedItem.toLowerCase() === q.toLowerCase()) {
                        $scope.suggetionsList.push($scope.products[i].items[j]);
                    }
                }
            }
        }

        $scope.getMeasuresList = function (q) {
            var matchedItem;
            $scope.measuresList = [];
            for (var i = 0; i < $scope.products.length; i++) {
                for (var j = 0; j < $scope.products[i].items.length; j++) {
                    matchedItem = $scope.products[i].items[j];
                    if (matchedItem.name === q) {
                        for (var k = 0; k < matchedItem.measures.length; k++) {
                            $scope.measuresList.push(matchedItem.measures[k]);
                        }
                        break;
                    }
                }
            }
        }
        $scope.getBagsList = function () {
            $scope.bagsList = [];
            for (var i = 0; i < $scope.shoppingList.length; i++) {
                if ($scope.shoppingList.deliveryDate !== '') {
                    $scope.bagsList.push($scope.shoppingList[i].name);
                }
            }
            console.log($scope.bagsList);
        }
        $scope.selectBag = function (bag) {
            for (var i = 0; i < $scope.shoppingList.length; i++) {
                var sItems = $scope.shoppingList[i].items;
                if ($scope.shoppingList[i].name === bag) {
                    $scope.setCurrentFiled(sItems[sItems.length - 1]);
                    $scope.addToList($scope.tempItem.name, $scope.tempItem.price, $scope.tempItem.unit, 1);
                    $("#ss-bagSelect").hide();
                    break;
                }
            }
        }
        $scope.setCurrentFiled = function (item,val) {
	if (val == 0) {
                document.getElementById("overlay").style.display = "none";
                document.getElementById("modal").style.display = "none";
            }
            if (val == 2) {
                document.getElementById("overlay1").style.display = "none";
                document.getElementById("modal1").style.display = "none";
            }

            for (var i = 0; i < $scope.shoppingList.length; i++) {
                var sItems = $scope.shoppingList[i].items;
                for (var j = 0; j < sItems.length; j++) {
                    if (sItems[j] === item) {
                        sItems[j].isActive = "active";
                    } else {
                        sItems[j].isActive = "none";
                    }
                }
            }
        }
        $scope.addToTemp = function (name, price, unit, offer,temp) {
            if (offer == 1) {
                var offerPrice = price - ((price * offer) / 100);
                if ($scope.shoppingList.length > 1) {

                    $scope.tempItem.name = name;
                    $scope.tempItem.price = price + ((price * offer) / 100);
                    $scope.tempItem.unit = unit;
                } else {
                    $scope.tempItem.name = "";
                    $scope.tempItem.price = 0.00;
                    $scope.tempItem.unit = '';
                    $scope.addToList(name, offerPrice, unit, 1,temp);
                }
            } else {
                if ($scope.shoppingList.length > 1) {
                    $scope.tempItem.name = name;
                    $scope.tempItem.price = price + ((price * offer) / 100);
                    $scope.tempItem.unit = unit;
                } else {
                    $scope.tempItem.name = "";
                    $scope.tempItem.price = 0.00;
                    $scope.tempItem.unit = '';
                    $scope.addToList(name, price, unit, 1,temp);
                }
            }
        }
        $scope.addToList = function (name, price, unit, isFromCart,temp1) {

            var found = $filter('getByName')($scope.shoppingList, name);
            var active = $filter('getActiveItem')($scope.shoppingList);
            //console.log(active);
            if (found) {
                //active.item.name = '';
                //active.item.price = 0.00;
                //active.item.quantity = 1;
                //active.item.unit = "";
                $scope.setCurrentFiled(found,temp1);
            } else {
                active.item.name = name;
                active.item.price = price;
                active.item.unit = unit;
                if (active.isLast) {
                    $scope.addItem(active.bag,temp1);
                }
            }
            $("#ss-prodSuggest").hide();
            $scope.setPrice();
            setTimeout(function () {
                $(".ss-itemList .active").focus();
            }, 1);
            $("#setDeliveryBtn").show();
        }
        /*$scope.addToList = function(name,price,isFromCart){
        var ind;
        for(var i=0; i<$scope.shoppingList.length; i++){
        var sItems = $scope.shoppingList[i].items;
        for(var j=0; j<sItems.length; j++){
        if(sItems[j].isActive === "active"){
        ind = j;
        console.log(ind+"...active");
        sItems[j].name = name;
        sItems[j].price = price;
        if(isFromCart){
        if(sItems[j+1] === undefined){
        $scope.addItem($scope.shoppingList[i].name);
        //$(".ss-itemList input").last().focus();
        }
        }
        //$scope.setCurrentFiled(sItems[j+1]);
        //$(".ss-itemList .active").focus();
        //console.log(document.activeElement);
        //break;
        }else{
        if(sItems[j].name === name){
        sItems[j].quantity ++;
        console.log(ind);
        if(sItems[ind] != undefined){
        console.log(sItems[ind]);
        sItems[ind].name = '';
        sItems[ind].qunatity = 1;
        sItems[ind].price = 0.00;
        }
        $scope.setCurrentFiled(sItems[j]);
        //$(".ss-itemList .active").focus();
        //break;
        //$scope.$apply();
        }
        }
        }
        }
        $("#ss-prodSuggest").hide();
        $scope.setPrice();
        setTimeout(function(){
        //console.log($(".ss-itemList .active"));
        $(".ss-itemList .active").focus();
        },1);
        }*/
        $scope.updateQuantity = function (q) {
            var activeEle = $(".ss-itemList .active");
            var nxtEle = $(activeEle).parent().nextAll().find(".itemName:last")
            for (var i = 0; i < activeEle.length; i++) {
                if ($(activeEle[i]).hasClass("itemUnits")) {
                    angular.element($(activeEle[i])).scope().item.quantity = parseFloat(q);
                    break;
                }
            }
            $("#ss-unitSuggest").hide();
            $scope.setPrice();
            $(nxtEle).focus();
        }
        $scope.addToBag = function (name, price) {
            $scope.shoppingList[$scope.shoppingList.length - 1].items.push({
                "name": name,
                "quantity": 1,
                "price": price,
                "unit": "",
                "isActive": "none"
            });
            $scope.setPrice();
        }
        $scope.setPrice = function () {
            var total = 0, bagPrice = 0;
            var itemprice = 0;
            for (var i = 0; i < $scope.shoppingList.length; i++) {
                bagPrice = 0;
                var sItems = $scope.shoppingList[i].items;
                for (var j = 0; j < sItems.length; j++) {
                    //console.info(sItems[j].price+"..."+sItems[j].quantity);
                    bagPrice += (parseFloat(sItems[j].price) * parseFloat(sItems[j].quantity));
                    itemprice = parseFloat(sItems[j].price);
                }
                $scope.shoppingList[i].price = bagPrice;
                total += bagPrice;
            }
            $scope.totalPrice = total;
        }


        $scope.checkItem = function (item) {
            for (var i = 0; i < $scope.suggetionsList.length; i++) {
                if ($scope.suggetionsList[i].name.toLowerCase() === item.name.toLowerCase()) {
                    item.price = $scope.suggetionsList[i].price;
                    //$(".hideEle").hide();
                    $(".ss-itemList .active").focus();
                    break;
                } else {
                    item.price = 0.00;
                    item.quantity = 1;
                    item.unit = '';
                }
            }

            $scope.setPrice();
        }

    });

}
