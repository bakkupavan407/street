jQuery("#dummy").jqGrid({
    url: 'http://118.139.160.32/sivanstreet.com/JQGridHandler.ashx',
    datatype: "json",
    colNames: ['S.No', 'PRODUCT ID', 'NAME', 'TYPE', 'PRICE', 'QUANTITY', 'MEASURE', 'UNIT', 'OFFER', 'PROMOTION'],
    colModel: [
                { name: 'sno', index: 'sno', width: 50, stype: 'text', editable:false},
                { name: 'pid', index: 'pid', width: 70, stype: 'text', editable: true },
                { name: 'name', index: 'name', width: 150, stype: 'text', sortable: true, editable: true },
                { name: 'type', index: 'type', width: 150, editable: true },
                { name: 'price', index: 'price', width: 70, editable: true },
                { name: 'quantity', index: 'quantity', width: 70, editable: true },
                //{ name: 'image', index: 'image', width: 200, editable: true },
                { name: 'measures', index: 'measures', width: 150, editable: true },
                { name: 'unit', index: 'unit', width: 50, editable: true },
                { name: 'offer', index: 'offer', width: 70, editable: true },
                { name: 'promotion', index: 'promotion', width: 70, editable: true }
    ],
    rowNum: 10,
    mtype: 'GET',
    loadonce: true,
    rowList: [5, 10, 20, 30],
    pager: '#pager',
    sortname: '_id',
    viewrecords: true,
    sortorder: 'asc',
    caption: "DUMMY COLLECTION",
    editurl: 'http://118.139.160.32/sivanstreet.com/JQGridHandler.ashx'
});

$('#dummy').jqGrid('navGrid', '#pager',
     {
         edit: true,
         add: false,
         del: true,
         search: true,
         searchtext: "Search",
         //addtext: "Add",
         edittext: "Edit",
         deltext: "Delete"
     },

     {   
         closeOnEscape: true,//Closes the popup on pressing escape key
         reloadAfterSubmit: true,
         drag: true,
	 closeAfterEdit: true,
         afterSubmit: function (response, postdata) {
             if (response.responseText == "") {
                 $(this).jqGrid('setGridParam',
                   { datatype: 'json' }).trigger('reloadGrid');//Reloads the grid after edit
                 return [true, '']
             }
             else {
                 $(this).jqGrid('setGridParam',
                   { datatype: 'json' }).trigger('reloadGrid'); //Reloads the grid after edit
                 var sel_id = $('#dummy').jqGrid('getGridParam', 'selrow');
                 var value = $('#dummy').jqGrid('getCell', sel_id, 'sno');
                 return [false, response.responseText]
             }
         },
         editData: {
             pavan: function () {
                 var sel_id = $('#dummy').jqGrid('getGridParam', 'selrow');
                 var value = $('#dummy').jqGrid('getCell', sel_id, 'sno');
                 return value;
             }
         }
     },

     {//ADD portion
         closeAfterAdd: true,//Closes the add window after add
         afterSubmit: function (response, postdata) {
             if (response.responseText == "") {
                 $(this).jqGrid('setGridParam',
                   { datatype: 'json' }).trigger('reloadGrid')//Reloads the grid after Add
                 return [true, '']
             }
             else {
                 $(this).jqGrid('setGridParam',
                   { datatype: 'json' }).trigger('reloadGrid')//Reloads the grid after Add
                 return [false, response.responseText]
             }
         }
     },
     //code
     {   //DELETE
         closeOnEscape: true,
         closeAfterDelete: true,
         reloadAfterSubmit: true,
         closeOnEscape: true,
         drag: true,
         afterSubmit: function (response, postdata) {
             if (response.responseText == "") {
                 $("#dummy").trigger("reloadGrid", [{ current: true }]);
                 return [true, response.responseText]
             }
             else {
                 $(this).jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid')
                 return [false, response.responseText]
             }
         },
         delData: {
             pavan: function () {
                 var sel_id = $('#dummy').jqGrid('getGridParam', 'selrow');
                 //alert(sel_id);
                 var value = $('#dummy').jqGrid('getCell', sel_id, 'sno');
                 //alert(value);
                 return value;
             }
         }
     },
     {//SEARCH
         closeOnEscape: true
     }
 );