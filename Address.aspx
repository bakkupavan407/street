<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Address.aspx.cs" Inherits="Address" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Shipping Address</title>
    <script type="text/javascript" src="JavaScript/noBack.js"></script> <%--To stop the user to go back by clicking back button of the browser.--%>

    <script type="text/javascript" src="../JQuery/jquery.min.js"></script> <%-- Importing JQuery--%>
    <script type="text/javascript" src="../JQuery/Bind.js"></script> <%-- Binding Enter key--%>
    <script type="text/javascript"> //Prompting the user before placing the order
        //function prompt() {
            
        //    window.onbeforeunload = function () {
        //        return "You are going to place the order!";
        //    };
        //}
        //prompt();
    </script>

    <link rel="shortcut icon" 
          media="screen,print" 
          href="images/S icon.ico" />
    <script type="text/javascript" src="JavaScript/form.js"></script>
    <script type="text/javascript" src="JacaScript/dashboard1.js"></script>
    <script src='JavaScript/form.js' type='text/javascript' language='javascript'></script>

    <link rel="stylesheet" type="text/css" href="Styles/StyleSheet.css"/>
    <link href="Styles/address.css" type="css" rel="stylesheet"/>
</head>
<body onload="makeAjax('AddressAction.aspx', 'POST','', loadAddres);">
    <div id="black-strip">
<div class="pull-right2">

<span id="logout" onclick="logout();">Logout</span>
     <a href="www.sivanstreet.com" >Contact Us:info@sivanstreet.com</a>

<%--<span onclick="addtodash();"> My Dashboard</span>--%>

</div>
</div>

    <header>
        <div class="top-container">
  	    <span class="ss-logo" title="HOME" onclick="home_sivan();"></span>
            <span class="ss-user pull-right">
                
            </span>
        </div>
  </header>
    <div id="errorMsgDiv" class="errorMsgDisp" style="display:none"><span id="errorMsgSpan"></span></div>
  <%--<section id="ss-merchant"></section>  
  <section id="ss-subMerchant"> </section>--%> 

    <div id="main">
        <div class="addressContainer">
            <form name="aform1" id="aform1">
  
            <div><h3>Shipping Address</h3></div>
<div>
    <span class="dispBlok">
        <span class="textArea" id="amob"></span>
    </span>
</div>

<%--<div class="login_divs">
<label>Pincode<span class="sp_ship">:</span></label>
<span id="apin"></span>
</div>--%>
                <div class="sgborderDiv" id="exlinediv"></div>
    <div id="orderdiv">
        <input type="button" id="btnplace" class="rightButton" value="Place Order" onclick="endPage();" /> 
    </div>       

<div class="span_address" id="totalHideDiv">
<input type="checkbox" name="box" id='chek' onclick="dohide();"/><span>Enter Your alternative Address</span>
</div>
      
<div id='hide' style="display:none">
    
    <div><h3>Alternate Shipping Address</h3></div>
<div>
<label for='adl3'>Address Line1</label><span class="errorSpan" id="asadd"></span>
<span class="dispBlok"><textarea class="textArea" name="adl3" id="aadl3" maxlength="200" placeholder="enter your alternate address" ></textarea></span>
</div>

<div>
<label for='city'>City</label><span id="ascity" class="errorSpan"></span>
<span class="dispBlok">
<select name="city" id='acity2' class="selectBox">
<option value='empty' id='Option1'>Select Your City</option>
<option value="Adilabad">Adilabad</option>
<option value="Ananthapur">Ananthapur</option>
<option value="Chittoor">Chittoor</option>
<option value="Cuddapah">Cuddapah</option>
<option value="Eluru">Eluru</option>
<option value="Guntur">Guntur</option>
<option value="Hyderabad">Hyderabad</option>
<option value="Kakinada">Kakinada</option>
<option value="Karimnagar">Karimnagar</option>
<option value="Khammam">Khammam</option>
<option value="Kurnool">Kurnool</option>
<option value="Machiapatnam">Machiapatnam</option>
<option value="Mahaboobnagar">Mahaboobnagar</option>
<option value="Nalgonda">Nalgonda</option>
<option value="Nellore">Nellore</option>
<option value="Nizamabad">Nizamabad</option>
<option value="Ongole">Ongole</option>
<option value="Sangareddy">Sangareddy</option>
<option value="Srikakulam">Srikakulam</option>
<option value="Vijayawada">Vijayawada</option>
<option value="Vishakapatnam">Vishakapatnam</option>
<option value="Viziangaram">Viziangaram</option>
<option value="Warangal">Warangal</option>
</select></span>
<span id="Span1" class="txtvalidation" ></span>
</div>
<div>
<label for='mob2'>Mobile No</label><span id="asmob" class="errorSpan"></span>
    <span class="dispBlok"><input type="text" name="mob2" id="amob2" placeholder="enter your another no" value="" maxlength="10" onkeypress="return isNumberKeymob(event);"/></span>
   <%-- <span id="x13" class="errorSpan"></span>--%>
</div>

<div>
<label for='pin'>PIN Code</label><span id="aspin" class="errorSpan"></span><%--<span id="Span2" class="errorSpan"></span>--%>

 <span class="dispBlok"><input class="logintext" type="text" name="apin" id="apin2" placeholder="enter your pin code" value="" maxlength="6" onkeypress="return isNumberKeypin(event);"/></span>
</div>
    <div class="sgborderDiv"></div>
<input type="button" id="submit" value="Place Order" class="rightButton" onclick="anotherAddress();" />
 
    </div>
</form>
        </div>
     <div class="editOrder" id='orderEdit'><h3>Your Order</h3>
        
     </div>
   
</div>
   
     <div class="footer">
        Copyrights &copy; 2014 SivanStreet.com
    </div>

</body>
</html>
