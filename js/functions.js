var ddate;

$(document).ready(function (e) {
	var bagListArr = [];		
	$(document).on("click","#ss-container",(function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		e.stopPropagation();
		var actEle = document.activeElementcheckItem
		if(!$(actEle).hasClass("itemUnits") && !$(actEle).hasClass("itemName")){				
			$(".hideEle").hide();
		}						
	}));
	$(document).on("click",".ss-cartProdList li a",function(e){
		e.preventDefault();
		e.stopImmediatePropagation();
		e.stopPropagation();							  
		var position = $(this).position();
		if($("#ss-bagSelect li").length > 1){
			$("#ss-bagSelect").css("left",position.left);
			$("#ss-bagSelect").css("top",(position.top+30));
			$("#ss-bagSelect").show();
		}
	});
	$(document).on("click","#showCart",(function(e) {
		$("#ss-shoppingCart").show();
	}));
	$(document).on("keydown","#ss-prodSuggest li",(function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		e.stopPropagation();
		if(e.keyCode === 40){
			$(this).removeClass("active");
			if($(this).next().length > 0){			
				$(this).next().focus();
				$(this).next().addClass("active");
			}else{
				$("#ss-prodSuggest li:first-child").focus();
				$("#ss-prodSuggest li:first-child").addClass("active");	
			}
		}else if(e.keyCode === 38){
			$(this).removeClass("active");
			if($(this).prev().length > 0){			
				$(this).prev().focus();
				$(this).prev().addClass("active");
			}else{
				$("#ss-prodSuggest li:last-child").focus();
				$("#ss-prodSuggest li:last-child").addClass("active");	
			}
		}else if(e.keyCode === 13){
			var angObj = angular.element($(this)).scope();
			angObj.addToList(angObj.listItem.name,angObj.listItem.price,angObj.listItem.unit,0);
			angObj.$apply();
		}else if(e.keyCode === 27){
			$(this).parents("#ss-prodSuggest").hide();
		}
	}));
	$(document).on("keydown","#ss-unitSuggest li",(function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		e.stopPropagation();
		if(e.keyCode === 40){
			$(this).removeClass("active");
			if($(this).next().length > 0){			
				$(this).next().focus();
				$(this).next().addClass("active");
			}else{
				$("#ss-unitSuggest li:first-child").focus();
				$("#ss-unitSuggest li:first-child").addClass("active");	
			}
		}else if(e.keyCode === 38){
			$(this).removeClass("active");
			if($(this).prev().length > 0){			
				$(this).prev().focus();
				$(this).prev().addClass("active");
			}else{
				$("#ss-unitSuggest li:last-child").focus();
				$("#ss-unitSuggest li:last-child").addClass("active");	
			}
		}else if(e.keyCode === 13){
			var angObj = angular.element($(this)).scope();
			console.log(angObj);
			angObj.updateQuantity(angObj.itemUnit);
			angObj.$apply();
		}else if(e.keyCode === 27){
			$(this).parents("#ss-unitSuggest").hide();
		}
	}));
	/*$(".ss-itemList input").on("focus",function(){
		$(this).attr("ng-model","query");
	});
	
	$(".ss-itemList input").on("blur",function(){
		$(this).removeAttr("ng-model");
	});*/
	$(document).on("change",".ddBag p .bname",function(e){		
		if($(this).val() === ''){
			deleteOtherOptions();
		}
	});
	$(document).on("click","#setDeliveryDate",function(e){
		bagListArr = [];
		var dd = $(".ddBag");		
		$(dd).each(function(index,element){
			var bname = $(element).find(".bname").val();
			ddate = $(element).find(".ddate").val();
			bagListArr.push({ "name": bname, "date": ddate });
		
		});		
		if(bagListArr[0].name === ''){			
			angular.element($(".ss-bag")).scope().setAllDeliveryDates(bagListArr[0].date);			
			setDeliveryView();
		}else{
			console.info(bagListArr);
			angular.element($(".ss-bag")).scope().setDeliveryDate(bagListArr);
			addNewDDSection();
		}
		angular.element($(".ss-bag")).scope().$apply();
	});
	function deleteOtherOptions(){
		var dd = $(".ddBag");		
		for(var i=1; i<dd.length; i++){
			$(dd[i]).remove();
		}
	}
	function addNewDDSection(){
	    if (bagListArr.length < angular.element($(".ss-bag")).scope().shoppingList.length) {
	        
			var form = $("#deliveryDate form");
			form.append($(document.createElement("section"))
					.attr({class:"ddBag"})
					 .append($(document.createElement("p"))
						.append($(document.createElement("label"))
						  .append("Delivery")					
						)
						.append($(document.createElement("select"))
						  .attr({"class":"bname"})					    						
							.append(appendOpts())						
						)
					 )
					 .append($(document.createElement("p"))
					   .append($(document.createElement("label"))
						  .append("On")
						)
						.append($(document.createElement("input"))
						  .attr({"type":"number","ng-model":"deliveryDate","placeholder":"Date/Month/Year","class":"ddate"})
						)
						.append($(document.createElement("span"))
						  .append("Example: 24/8/2013")
						)
					 )
			);
		}else{
			setDeliveryView();
		}
		//angular.element($("#deliveryDate form p select")).scope().$apply();
	}
	function setDeliveryView(){
		$("#deliveryDate").hide();
		$("#lean_overlay").hide();
		$(".deliveryOn").show();
		$("#buyNowBtn").show();
		$("#setDeliveryBtn a").text("Change delivery date");	
	}
	function isDDFixed(name){
		console.info(bagListArr);
		for(var i=0; i<bagListArr.length; i++){
			if(bagListArr[i].name.toLowerCase() === name.toLowerCase()){
				return true;
			}
		}
		return false;
	}
	function appendOpts(){
		var returnStr = '';
		$(".bagName").each(function(index, element) {
			var bname = isDDFixed($(element).text());
			if(!bname){			
            	returnStr += "<option value="+$(element).text()+">"+$(element).text()+"</option>";
			}
        });
		return returnStr;	
	}
	var objData ;
	var items = [];
	var ind = 0;
	
	$(document).on("click", "#buyNowBtn", function () {
       
            if (angular.element($(".ss-bag")).scope().shoppingList[0].items.length > 1) {
	            for (var i = 0; i < angular.element($(".ss-bag")).scope().shoppingList[0].items.length - 1; i++) {
	                if (angular.element($(".ss-bag")).scope().shoppingList[0].items[i].name == "" || angular.element($(".ss-bag")).scope().shoppingList[0].items[i].quantity == "" || angular.element($(".ss-bag")).scope().shoppingList[0].items[i].quantity == 0 || angular.element($(".ss-bag")).scope().shoppingList[0].items[i].price == 0) {
	                    document.getElementById("errorMsgDiv").style.display = "";
	                    document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Invalid Details Please check";
	                    return false;
	                }
	                else if (document.getElementById("sel").value == "" || document.getElementById("sel").value == null) {
	                    document.getElementById("errorMsgDiv").style.display = "";
	                    document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Please Place the Delivery Date to Continue";
	                    return false;
	                }
	            }
	        } else {
	                for (var i = 0; i < angular.element($(".ss-bag")).scope().shoppingList[0].items.length; i++) {
	                    if (angular.element($(".ss-bag")).scope().shoppingList[0].items[i].name == "" || angular.element($(".ss-bag")).scope().shoppingList[0].items[i].quantity == "" || angular.element($(".ss-bag")).scope().shoppingList[0].items[i].quantity == 0 || angular.element($(".ss-bag")).scope().shoppingList[0].items[i].price == 0) {
	                        document.getElementById("errorMsgDiv").style.display = "";
	                        document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Invalid Order Please check the Order to move Forward";
	                        return false;
	                    }
	                    else if (document.getElementById("sel").value == "" || document.getElementById("sel").value == null) {
	                        document.getElementById("errorMsgDiv").style.display = "";
	                        document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Please Place the Delivery Date to Continue";
	                        return false;
	                    }
	                }


	        }
	    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	    var orderedDate = new Date();
	    var dd = orderedDate.getDate();
	    var mm = orderedDate.getMonth();
	    var yyyy = orderedDate.getFullYear();
	    if (dd < 10) { dd = '0' + dd }

	    for (mi = 0; mi < months.length; mi++) {
	        if (mm == mi) {
	            mm = months[mi];
	        }
	    }
	    var today = dd + ' ' + mm + ' ' + yyyy; 
	    for (var i = 0; i < angular.element($(".ss-bag")).scope().shoppingList.length; i++) {
	        for (var j = 0; j < angular.element($(".ss-bag")).scope().shoppingList[i].items.length; j++) {
	            
	            items[ind++] = { "Name": angular.element($(".ss-bag")).scope().shoppingList[i].items[j].name, "Quantity": angular.element($(".ss-bag")).scope().shoppingList[i].items[j].quantity, "Price": ((angular.element($(".ss-bag")).scope().shoppingList[i].items[j].quantity) * (angular.element($(".ss-bag")).scope().shoppingList[i].items[j].price)).toFixed(2)};
	           
	            if (items[j].Name == "" || items[j].Quantity == 0) {
	                items.splice(j, 1)
	            }
               }
	    }
	    var itemJson3 = JSON.stringify(items);
	    var itemjson4 = itemJson3.replace("null,", "0,");
	    var itemjson5 = itemjson4.replace("null", "0");

	    var finaljson = JSON.parse(itemjson5);

	    for (var j = finaljson.length - 1; j >= 0; j--) {

	        if (finaljson[j] == 0) {
	            finaljson.splice(j, 1);

	        }
	    }
	    var delDate = document.getElementById("sel").value;
	    ItemsJson = { "OrderedDate": today, "Items": finaljson, "DelivaryDate": delDate, "storeName": "SriRama" }
	    objData = JSON.stringify(ItemsJson);
	    var loginstatus = document.getElementById('loginspan').innerHTML;
	   
	    if (window.XMLHttpRequest) {
	        xmlhttp = new XMLHttpRequest();
	    }
	    else {
	        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    xmlhttp.onreadystatechange = function () {
	        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	            y = xmlhttp.responseText;
	            //alert(parseInt(y));
	            if (y == 1) { 
	                location.href = 'LoginPage.aspx';
	            }
	            if (y == 0) {
	                location.href = 'Address.aspx';
	            }
	        }
	    }
	    xmlhttp.open("POST", "OrderSession.aspx", true);
	    xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	    xmlhttp.send("ome=" + objData);
        
	});
});  

