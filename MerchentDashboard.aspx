<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MerchentDashboard.aspx.cs" Inherits="MerchentDashboard" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>DashBoard</title>
    <link rel="shortcut icon"
        media="screen,print"
        href="images/S icon.ico" />
    <link rel="stylesheet" type="text/css" href="Styles/StyleSheet.css" />
    <script type="text/javascript" src="JavaScript/form.js"></script>
    <script src="JQuery/jquery.min.js"></script>
    <script type="text/javascript" src="JavaScript/testDashboard.js"></script>
    <%--<script type="text/javascript" src="Jquerydashboard.js"></script>--%>
    <link rel="stylesheet" href="Styles/dashBoard.css" type="text/css" />
</head>
<body onload="loadTime()">
    <div id="black-strip">
        <div class="pull-right2">
            <span id="logout" onclick="logout();">Logout</span>
            <a href="www.sivanstreet.com">Contact Us:info@sivanstreet.com</a>
        </div>
    </div>
    <header>
        <div class="top-container">
            <span class="ss-logo" title="HOME" onclick="home_sivan();"></span>
            <span class="ss-user pull-right"></span>
        </div>
    </header>
    <div id="errorMsgDiv" class="errorMsgDisp" style="display: none"><span id="errorMsgSpan"></span></div>
    <div id="siva"></div>
    <div id="menu">
        <ul>
            <li id="l1" onclick="addOrders();"><span id="uploadCatlog">User orders</span></li>
            <li><span onclick="viewItems()" id="clikTab">Total Items</span></li>
            <li id="l3"><span><a id="redi" href="UploadCatalog.html">Click to Upload CSV</a></span></li>
        </ul>
    </div>
    <div id="topBarDiv"></div>
    <div id="dashboard">
        <div id="mainDiv" style="display: none;">
            <div id="wrapperDiv">
            </div>

            <div id="LoaderImage" style="display: none; width: 50px; margin: 0 auto;">
                <img id="loadimg" src="img/ajax-loaderpk.gif" /></div>
        </div>
        <div id="wrapperItems" style="display: none">          
            <div id="itemsAjax"></div>
        </div>
        <div id="details" style="display: none"></div>
        <div id="addresDisplay" style="display: none"></div>
        <div class="sum1">
            <div id="sum"></div>
        </div>
    </div>
<div class="footer">
                    ©2013-2014 All Rights Reserved, SivanStreet Pvt Ltd
                </div>
</body>
</html>