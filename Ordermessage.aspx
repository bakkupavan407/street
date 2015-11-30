<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Ordermessage.aspx.cs" Inherits="Oredermessage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>

	<script type="text/javascript" src="JavaScript/noBack.js"></script>

	 <link rel="shortcut icon" 
		  media="screen,print" 
		  href="images/S icon.ico" />

	<%--<script src="dashboard1.js" type="text/javascript" ></script>--%>
	<script src="JavaScript/form.js" type="text/javascript" ></script>
	<link rel="stylesheet" type="text/css" href="Styles/StyleSheet.css"/>
	<title>Success Message</title>
</head>
<body onload="ntv();">
<div id="black-strip">
<div class="pull-right2">
<span onclick="locRed();" id="g_visiblespan">Sign In</span>
<span id="logout" onclick="logout();">Logout</span>
<span onclick="Dash_Redirct()" class="last">My Dashboard</span>
	<a href="www.sivanstreet.com" >Contact Us:info@sivanstreet.com</a>


</div>
</div>
	<header>
		<div class="top-container">
			<span class="ss-logo" title="HOME" onclick="home_sivan();"></span>
			<span class="ss-user pull-right">
				
			</span>
		</div>

	<%--
		<span class="ss-user pull-right" id="g_visiblespan"><span onclick="btags();" id="loginspan">LogIn</span>
			&nbsp;&nbsp;|&nbsp;&nbsp;<span onclick="Dash_Redirct();">My Dashboard</span>
		</span>
	<span class="ss-user pull-right" id="g_order"><a class="anchcolor" href="Logout.aspx">LogOut</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a class="anchcolor" href="dashBoard.aspx">My Dashboard</a></span>--%>
  </header>
	<div id="errorMsgDiv" class="errorMsgDisp" style="display:none"><span id="errorMsgSpan"></span></div>
  <%--<section id="ss-merchant"></section>
  <section id="ss-subMerchant"></section>--%> 
	<div id="main">
	<div class="main-height">
	<form id="form2">
	   <%-- <p id="orderMsg"><h3>Your order is placed successfully!</h3></p>--%>
		<%--<input type="button" name="btndashuser" value="MY DASHBOARD" onclick="ohmyGod()"  />--%>
		<%--<div style="text-align:center">
			<input type="button" onclick="Dash_Redirct();" value="My Dashboard" />
		</div>--%>
   </form>

<div id="guestHide"> 
	<div class="loginFormClass">
	<form name="form1" id="form123"> 
		<div class="Registerclass">
				<div>
					<h3>Create a new account</h3>
				</div>
				<span id="success"></span>

		<div class="rBlock1">
				<div>
					<label>Name</label> <span id="regName" class="errorSpan"></span>
					<span class="dispBlok"><input  type="text" name="name" id="Name" placeholder="Name" maxlength="20" /></span>
				</div>
				<div>
				<label>Mobile</label> <span id="regMob" class="errorSpan"></span>
			   <span class="dispBlok"><input type="text" name="mob" id="mob" placeholder="Mobile" maxlength="10" onblur="test(this.value);" onkeypress="return isNumberKey(event)" />
					</span><span id="x3"></span>
				</div>
				<div>
				<label>E-Mail</label> <span id="regEmail" class="errorSpan"></span>
				<span class="dispBlok"><input type="text" name="email" id="email" placeholder="E-Mail" onblur="test2(this.value)" maxlength="20"/></span>
					<span id="x5"></span>
				</div>
				<div>
				<label>Password</label> <span id="regPwd" class="errorSpan"></span>
			   <span class="dispBlok"> <input type="password" name="pwd" id="pwd" placeholder="Password" maxlength="20"/></span>
				</div>
				<div>
						<label>User Type</label>
					   <span class="dispBlok"> <input type="radio" name="myrad" id="Customer"checked onchange="hiding();" value="customer" />Customer 
						<input type="radio" name="myrad" id="mer1" onchange="hiding();" value="merchant"/>Merchant</span>
				 </div>
				<div class="storHide" id="storediv"> <span id="regStor" class="errorSpan"></span>
						<label for="Store Name">Store Name</label>
						<span class="dispBlok"> <input type="text" name="mystorename" id="merch" value="" placeholder="Store Name" maxlength="20"/></span>
						<span id="msn"></span>
				</div>
			</div>
			
		<div class="rBlock2">
				<div>
				<label id="lbladd">Address</label> <span id="regAdrs" class="errorSpan"></span>
				<span class="dispBlok"><textarea class="textArea" name="adl1" placeholder="Address" id="address" maxlength="200"></textarea></span>
				</div>							
				<div>
					<label for='city'>City</label> <span id="regCity" class="errorSpan"></span>
						<span class="dispBlok"><select name="city" id='city' class="selectBox">
						<option value='empty' id='o1'>  --Select Your City--  </option>
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
					<span id="x8"></span>						
					</div>
				<div>
					<label for='state'>State</label> <span id="regState" class="errorSpan"></span>
						<span class="dispBlok"><select id='state' name="state" class="selectBox">
						<option>Select your State</option>
						<option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
						<option value="Andhra Pradesh" selected="selected">Andhra Pradesh</option>
						<option value="Arunachal Pradesh">Arunachal Pradesh</option>
						<option value="Assam">Assam</option>
						<option value="Bihar">Bihar</option>
						<option value="Chandigarh">Chandigarh</option>
						<option value="Chhattisgarh">Chhattisgarh</option>
						<option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
						<option value="Daman and Diu">Daman and Diu</option>
						<option value="Delhi">Delhi</option>
						<option value="Goa">Goa</option>
						<option value="Gujarat">Gujarat</option>
						<option value="Haryana">Haryana</option>
						<option value="Himachal Pradesh">Himachal Pradesh</option>
						<option value="Jammu and Kashmir">Jammu and Kashmir</option>
						<option value="Jharkhand">Jharkhand</option>
						<option value="Karnataka">Karnataka</option>
						<option value="Kerala">Kerala</option>
						<option value="Lakshadweep">Lakshadweep</option>
						<option value="Madhya Pradesh">Madhya Pradesh</option>
						<option value="Maharashtra">Maharashtra</option>
						<option value="Manipur">Manipur</option>
						<option value="Meghalaya">Meghalaya</option>
						<option value="Mizoram">Mizoram</option>
						<option value="Nagaland">Nagaland</option>
						<option value="Orissa">Orissa</option>
						<option value="Pondicherry">Pondicherry</option>
						<option value="Punjab">Punjab</option>
						<option value="Rajasthan">Rajasthan</option>
						<option value="Sikkim">Sikkim</option>
						<option value="Tamil Nadu">Tamil Nadu</option>
						<option value="Tripura">Tripura</option>
						<option value="Uttaranchal">Uttaranchal</option>
						<option value="Uttar Pradesh">Uttar Pradesh</option>
						<option value="West Bengal">West Bengal</option>
						</select></span>
				</div>
				<div>
				<label>Pin Code</label> <span id="regPin" class="errorSpan"></span>
				<span class="dispBlok"><input type="text" name="pin" id="pin" placeholder="" onkeypress="return isPinNo(event);" maxlength="6"/></span>
				</div>
				<div><input class="loginbutton" type="button" value="Register" onclick="validateForm();" /></div>
			</div>

			</div>
		 </form>
		</div>
			</div>
	
	</div>	

 </div>
	<div class="footer">
		Copyrights &copy; 2014 SivanStreet.com
	</div>
	

</body>
</html>

