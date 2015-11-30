<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GuestUser.aspx.cs" Inherits="GuestUser" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Shipping Address</title>

    <script type="text/javascript" src="JavaScript/noBack.js"></script>

    <script src="JavaScript/form.js" type="text/javascript" ></script>
    <link rel="stylesheet" type="text/css" href="Styles/StyleSheet.css"/>
</head>
<body onload="makeAjax('GuestOrder.aspx', 'POST','', GuestOrderLoad);">
    <div id="black-strip">
    <div class="pull-right2">
<span onclick="btags();" id="loginspan">Sign In</span>
<span onclick="Dash_Redirct();" class="last">My Dashboard</span>
<a href="www.sivanstreet.com" >Contact Us:info@sivanstreet.com</a>


</div>
</div>
    <header>
        <div class="top-container">
  	        <span class="ss-logo" title="HOME" onclick="home_sivan();"></span>
            <span class="ss-user pull-right"></span>
        </div>
  </header>

<div id="errorMsgDiv" class="errorMsgDisp" style="display:none"><span id="errorMsgSpan"></span></div>
  <%--<section id="ss-merchant"></section>  
  <section id="ss-subMerchant"> </section>--%> 
  <div id="main">  
     <div class="addressContainer">
    <form id="gform">
    <div><h3>Shipping Address</h3></div>

    <div>
        <label for='name'>Name</label> <span id="gustName" class="errorSpan"></span>
        <span class="dispBlok"><input type="text" name="gtxtname" id="gtxtname" placeholder="Enter Your Name" value="" maxlength="20"/></span><%--<span class="errorSpan" id="Span3"></span>--%>       
    </div>

    <div>
        <label for='mobile'>Mobile No</label><span id="asmob" class="errorSpan"></span>
        <span class="dispBlok"><input type="text" name="gtxtmob" id="gtxtmob" placeholder="Enter Mobile No" value="" maxlength="10" onkeypress="return isNumberKeymob(event);"/></span>
        
       <%-- <span id="gustMob" class="errorSpan"></span>--%>
    </div>

    <div>
        <label for='address'>Address</label><span id="gustAdl" class="errorSpan"></span>
        <span class="dispBlok"><textarea class="textArea" name="gtxtadd" id="gtxtadd" placeholder="enter your alternate address" maxlength="200"></textarea></span>
    </div>
        <div class="sgborderDiv"id="sgborderDiv"></div>

    <input type="button" class="rightButton" id="gsubmit" value="Place Order" onclick="guestpage();" />
        </form>
</div>
<div class="editOrder" id='orderEdit'><h3>Your Order</h3></div>
</div>

    
     <div class="footer">
        Copyrights &copy; 2014 SivanStreet.com
    </div>
</body>
</html>
