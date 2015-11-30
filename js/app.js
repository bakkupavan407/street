'use strict';

/* App Module */

angular.module('shivanstreet', ['ssFilters', 'ssServices']).
  config(['$routeProvider', function ($routeProvider) {
      
  $routeProvider.
      when('/widget', {templateUrl: 'partials/widget.html',   controller: ssprodListCtrl}).
      //when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
      otherwise({redirectTo: '/widget'});
}]).
directive('input', function() {
    return {
        restrict: 'E',
        require: 'ngModel',
        link: function(scope, elm, attr, ngModelCtrl) {
            if (attr.type === 'radio' || attr.type === 'checkbox') return;
            
            //elm.unbind('input').unbind('keydown').unbind('change');
            elm.bind('keyup', function(e) {
				var ele = this;
				if(ele.parentNode.parentNode.className.indexOf("ss-itemList") !== -1){
					setTimeout(function(){										
						scope.$apply(function(){
							if(e.keyCode !== 27 && e.keyCode !== 40 && e.keyCode !== 38 && e.keyCode !== 37 && e.keyCode !== 39){												
								// Add another input element if this is the last item of the bag
								//console.info(this.parentNode.nextElementSibling);																						
								if(ele.parentNode.nextElementSibling === null){
									//scope.addItem(this.parentNode.previousElementSibling.innerHTML);
									scope.addItem(scope.bags.name);
								}
								if(ele.className.indexOf("itemName") !== -1){
									$("#ss-unitSuggest").hide();															
									// Populate suggetionsList array based on the input
									scope.getSuggestions(elm.val());						
									// Show suggestion list						
									if(scope.suggetionsList.length > 0 && elm.val().length > 0){
										var position = $(elm).position();
										//console.log(position.left+"..."+position.top+"..."+$(document).height());
										$("#ss-prodSuggest").show();
										$("#ss-prodSuggest").css("left",position.left);
										if(position.top < ($(document).height()/2)){
											$("#ss-prodSuggest").css("top",(position.top+30));
										}else{
											$("#ss-prodSuggest").css("top",(position.top-210));
										}
									}else{
										$("#ss-prodSuggest").hide();
									}
									$("#ss-prodSuggest li").removeClass("active");
								}else{
									//alert('foo'+".."+scope.item.name);
									$("#ss-prodSuggest").hide();						
								}
							}
						});
					},1);
				}				
            });
			elm.bind('keydown', function(e) {
				if(this.parentNode.parentNode.className === 'ss-itemList'){
					//console.log(e.keyCode);
					if(e.keyCode === 40 || e.keyCode === 38){
						if(this.className.indexOf("itemName") !== -1){					
							$("#ss-prodSuggest li:first-child").focus();
							$("#ss-prodSuggest li:first-child").addClass("active");
						}else if(this.className.indexOf("itemUnits") !== -1){
							$("#ss-unitSuggest li:first-child").focus();
							$("#ss-unitSuggest li:first-child").addClass("active");
						}
					}else if(e.keyCode === 27 || e.keyCode === 9){	
						if(this.className.indexOf("itemName") !== -1){					
							$("#ss-prodSuggest").hide();
						}else if(this.className.indexOf("itemUnits") !== -1){
							$("#ss-unitSuggest").hide();
						}
					}else if(e.keyCode === 13){
						if(this.className.indexOf("itemName") !== -1){
							$("#ss-prodSuggest li:first-child").focus();
							$("#ss-prodSuggest li:first-child").addClass("active");
							$("#ss-prodSuggest li:first-child").click();
						}else if(this.className.indexOf("itemUnits") !== -1){
							$("#ss-unitSuggest li:first-child").focus();
							$("#ss-unitSuggest li:first-child").addClass("active");
							$("#ss-unitSuggest li:first-child").click();
						}
					}
				}
			});
			elm.bind('focus', function(e) {
				var ele = this;
				if(ele.parentNode.parentNode.className === 'ss-itemList'){															
					setTimeout(function(){
						scope.$apply(function(){
							//console.info(scope.item);
							// Indicates the input field currently in focus
							scope.setCurrentFiled(scope.item);
							if(ele.className.indexOf("itemUnits") !== -1){											
								$("#ss-prodSuggest").hide();
								scope.getMeasuresList(scope.item.name);
								if(scope.measuresList.length > 0 ){
									var position = $(elm).position();
									//console.log(position.left+"..."+position.top+"..."+$(document).height());
									$("#ss-unitSuggest").show();
									$("#ss-unitSuggest").css("left",position.left);
									if(position.top < ($(document).height()/2)){
										$("#ss-unitSuggest").css("top",(position.top+30));
									}else{
										$("#ss-unitSuggest").css("top",(position.top-210));
									}
									$("#ss-unitSuggest li").removeClass("active");
								}
							}else{
								$("#ss-unitSuggest").hide();
							}	
						});
					},1);
				}
            });
			elm.bind('blur', function(e) {				
				/*if(this.className.indexOf("itemUnits") !== -1){
					$("#ss-unitSuggest").hide();
				}else if(this.className.indexOf("itemName") !== -1){
					$("#ss-prodSuggest").hide();
				}*/
            });
        }
    };
});