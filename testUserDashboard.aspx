<%@ Page Language="C#" AutoEventWireup="true" CodeFile="testUserDashboard.aspx.cs" Inherits="testUserDashboard" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <script type="text/javascript" src="JavaScript/form.js"></script>    
     <script src="JQuery/jquery.min.js"></script>
     <script type="text/javascript" src="testUserDashBoard.js"></script>
    <%--<script type="text/javascript" src="Jquerydashboard.js"></script>--%>
    <link rel="stylesheet" href="Styles/dashBoard.css" type="text/css" />
</head>
<body>
    <div id="menu">
                    <ul>
                        <li id="l1"onclick="addOrders();"><span id="uploadCatlog">Your orders</span></li>
                        <li><span onclick="makeAjax('itemsToUserDashboard.aspx', 'POST', '', itemsToDash);" id="clikTab">Ordered Items</span></li>
                    </ul>
                </div> 
            <div id="topBarDiv"></div>
     <div id="dashboard">
    <div id="mainDiv" style="display:none;">
        <div id="wrapperDiv">
           
         </div>
        
        <div id="LoaderImage" style="display:none;width:50px;margin: 0 auto;"><img id="loadimg" src="img/ajax-loaderpk.gif" /></div>
    </div>
         <div id="wrapperItems"style="display:none"><div id="itemsAjax"></div></div>
    <div id="details" style="display:none"></div>
        <div id="addresDisplay" style="display:none"></div>
        <div class="sum1"><div id="sum"></div></div>
         </div>
</body>
</html>
