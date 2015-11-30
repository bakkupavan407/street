'use strict';

/* Services */
var selVal1;
var selValue2 = document.getElementById("soreIds");
function selectedstore() {
    
    var sid = document.getElementById("indexSelect");
    selVal1 = sid.options[sid.selectedIndex].value;
    
    selValue2.innerHTML = sid.options[sid.selectedIndex].value;

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            dash = xmlhttp.responseText;
        }
    }
    
    xmlhttp.open("POST", "OnloadCatalog.aspx", true);
    xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("val=" + selVal1);
    location.href = "index.html?snme="+selVal1; 
}
angular.module('ssServices', ['ngResource']).factory('Product', function ($resource) {
    return $resource('inventory/:mId.json', {}, {
        query: { method: 'GET', params: { mId: 'SSStores'}, isArray: true }
    });

    /*
    return $resource('inventory/:mId.json', {}, {
            queryByCategory: { method: 'GET', params: { mId: 'vijetha' }, isArray: true }
    });
    */
}).

    factory('Offer', ['$http', function ($http) {
        return {

            getOffers: function (callback) {
      
                var object1 = [];
                var apiPath = 'PlacedOrder.aspx';
                $http.get(apiPath).success(callback);

            }

        }

    }]).
factory('OfferItems', ['$http', function ($http) {

    return {
        getallOffers: function (offerItems) {
            var path = "OfferJson.aspx"
            $http.get(path).success(offerItems);

        }

    }

}]);

