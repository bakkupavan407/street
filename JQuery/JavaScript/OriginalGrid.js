jQuery("#dedtab").jqGrid({
    url: 'http://118.139.160.32/sivanstreet.com/DedHandler.ashx',
    datatype: "json",
    colNames: ['PRODUCT ID', 'NAME', 'TYPE', 'PRICE', 'QUANTITY', 'MEASURE', 'UNIT', 'OFFER', 'PROMOTION'],
    colModel: [
                //{ name: 'sno', index: 'sno', width: 200, stype: 'text' },
                { name: 'pid', index: 'pid', width: 100, stype: 'text', editable: true },
                { name: 'name', index: 'name', width: 150, stype: 'text', sortable: true, editable: true },
                { name: 'type', index: 'type', width: 150, editable: true },
                { name: 'price', index: 'price', width: 70, editable: true },
                { name: 'quantity', index: 'quantity', width: 70, editable: true },
                //{ name: 'image', index: 'image', width: 200, editable: true },
                { name: 'measures', index: 'measures', width: 150, editable: true },
                { name: 'unit', index: 'unit', width: 70, editable: true },
                { name: 'offer', index: 'offer', width: 70, editable: true },
                { name: 'promotion', index: 'promotion', width: 70, editable: true }
    ],
    rowNum: 10,
    mtype: 'GET',
    loadonce: true,
    rowList: [5, 10, 20, 30],
    pager: '#dedpager',
    sortname: '_id',
    viewrecords: true,
    sortorder: 'asc',
    caption: "ORIGINAL COLLECTION",
    editurl: 'http://118.139.160.32/sivanstreet.com/DedHandler.ashx'
});

$('#dedtab').jqGrid('navGrid', '#dedpager',
     {
         edit: true,
         add: true,
         del: true,
         search: true,
         searchtext: "Search",
         addtext: "Add",
         edittext: "Edit",
         deltext: "Delete"
     },

     {   
         closeOnEscape: true,//Closes the popup on pressing escape key
         reloadAfterSubmit: true,
         drag: true,
         afterSubmit: function (response, postdata) {
             if (response.responseText == "") {
                 $(this).jqGrid('setGridParam',
                   { datatype: 'json' }).trigger('reloadGrid');//Reloads the grid after edit
                 return [true, '']
             }
             else {
                 $(this).jqGrid('setGridParam',
                   { datatype: 'json' }).trigger('reloadGrid'); //Reloads the grid after edit
                 //alert(response.responseText);
                 return [false, response.responseText]
                 //Captures and displays the response text on th Edit window
             }
         },
         editData: {
             pavan: function () {
                 var sel_id = $('#dedtab').jqGrid('getGridParam', 'selrow');
                 var value = $('#dedtab').jqGrid('getCell', sel_id, 'pid');
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
                 $("#dedtab").trigger("reloadGrid", [{ current: true }]);
                 return [true, response.responseText]
             }
             else {
                 $(this).jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid')
                 return [false, response.responseText]
             }
         },
         delData: {
             pavan: function () {
                 var sel_id = $('#dedtab').jqGrid('getGridParam', 'selrow');
                 //alert(sel_id);
                 var value = $('#dedtab').jqGrid('getCell', sel_id, 'pid');
                 //alert(value);
                 return value;
             }
         }
     },
     {//SEARCH
         closeOnEscape: true
     }
 );