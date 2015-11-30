'use strict';

/* Filters */

angular.module('ssFilters', []).
filter('getByName', function() {
  return function(input, name) {	  
    var i=0, len=input.length, allItems, iLen=0;
    for (; i<len; i++) {
	  allItems = input[i].items;	  
	  iLen = allItems.length;
	  for(var j=0; j<iLen; j++){		  		
		  if (allItems[j].name.toLowerCase() == name.toLowerCase()) {
			return allItems[j];
		  }
	  }
    }
    return null;
  }
})
.filter('getActiveItem',function(){
	return function(input) {	  
		var i=0, len=input.length, allItems, iLen=0, last=0;		
		for (; i<len; i++) {		  	
		  allItems = input[i].items;	  
		  iLen = allItems.length;		  
		  for(var j=0; j<iLen; j++){			  		  		
			  if (allItems[j].isActive == "active") {
				if(allItems[j+1] === undefined){last=1}  
				return {"bag":input[i].name,"item":allItems[j],"isLast":last};
			  }
		  }
		}
		return null;
	}
})
.filter('getBagByName',function(){
	return function(input, name) {	  
    var i=0, len=input.length;
    for (; i<len; i++) {	  		  		
	  if (input[i].name.toLowerCase() == name.toLowerCase()) {
		return input[i];
	  }	 
    }
    return null;
  }
})
