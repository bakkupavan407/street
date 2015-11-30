var frmRef
var mer;
var cust;
var i;
var j;
var k;
var l;
var m;
var n;
var o;
var p;
var q;
var r;
var s;
var t;
var u;
var v;
var w;
var y;
var n_pat = /^[a-z\. ]{3,}$/i;
var e_pat = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var p_pat = /(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*/;
var m_pat = /^[7-9][0-9]{9}$/;
var pin_pat = /^\d+$/;
var zz;
var aa;
var bb;
var cc;
var dd;
var aaa, bbb, ccc;
var hash1;
var ss11;
var ss123;
var dash;
var orderstatus;
var loginvar;
var gtelugu;
var baksorg;
var storedNamed;

function ss15() {
    ss11 = window.location.search.substring(1);
    ss11 = ss11.substr(5);
}

function isNumberKeymob(evt) {
    var clear3 = document.getElementById('asmob');
    clear3.innerHTML = "";
    var spanRef3 = document.getElementById('asmob');
    var charCodel = (evt.which) ? evt.which : event.keyCode;
    if (charCodel != 46 && charCodel > 31 && (charCodel < 48 || charCodel > 57)) {
        spanRef3.innerHTML = "*Enter Numbers Only";
        return false;
    }
    else {
        return true;
    }
}

function isNumberKeypin(evt) {
    var clear3 = document.getElementById('aspin');
    clear3.innerHTML = "";
    var spanRef3 = document.getElementById('aspin');
    var charCodel = (evt.which) ? evt.which : event.keyCode;
    if (charCodel != 46 && charCodel > 31 && (charCodel < 48 || charCodel > 57)) {
        spanRef3.innerHTML = "*Enter Numbers Only";
        return false;
    }
    else {
        return true;
    }
}
function anotherAddress() {
    document.getElementById("errorMsgDiv").style.display = "none";
    document.getElementById('asadd').innerHTML = "";
    document.getElementById('ascity').innerHTML = "";
    document.getElementById('asmob').innerHTML = "";
    document.getElementById('aspin').innerHTML = "";
    var aAdr = document.getElementById("aadl3").value;
   
    var aCity = document.getElementById("acity2").options[document.getElementById("acity2").selectedIndex].text;
    var citycity = document.getElementById("acity2");
    var aMob2 = document.getElementById("amob2").value;
    var aPin2 = document.getElementById("apin2").value;
    var origMob = hash1;
     baksorg = origMob;
    if (aAdr == "")
    {
        document.getElementById('asadd').innerHTML = '*Address Should not be Empty';
        document.getElementById("errorMsgDiv").style.display = "";
        document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + '*Address Should not be Empty';
        document.getElementById('aadl3').focus();
        return false;
    }
    if (citycity.options[citycity.selectedIndex].value == "empty")
    {
        document.getElementById('ascity').innerHTML = '*City selection required';
        document.getElementById("errorMsgDiv").style.display = "";
        document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + '*City selection required';
        document.getElementById('acity2').focus();
        return false;
    }
    if (aMob2 == "")
    {
        document.getElementById('asmob').innerHTML = '*Mobile No Should not Empty';
        document.getElementById("errorMsgDiv").style.display = "";
        document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + '*Mobile No Should not Empty';
        document.getElementById('amob2').focus();
        return false;
    }
    if (aMob2.length < 10) {
        document.getElementById('asmob').innerHTML = '*Mobile No Should be 10 digits';
        document.getElementById("errorMsgDiv").style.display = "";
        document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + '*Mobile No Should be 10 digits';
        document.getElementById('amob2').focus();
        return false;
    }
    if(!m_pat.test(aMob2)){
        document.getElementById('asmob').innerHTML = '*Mobile No Should Starts With 7,8 or 9';
        document.getElementById("errorMsgDiv").style.display = "";
        document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + '*Mobile No Should Starts With 7,8 or 9';
        document.getElementById('amob2').focus();
        return false;
    }
    if (aPin2 == "") {
        document.getElementById('aspin').innerHTML = '*PIN No Should not Empty';
        document.getElementById("errorMsgDiv").style.display = "";
        document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + '*PIN No Should not Empty';
        document.getElementById('apin2').focus();
        return false;
    }

    if (aPin2.length<6) {
        document.getElementById('aspin').innerHTML = '*PIN No Should not less than 6 digits';
        document.getElementById("errorMsgDiv").style.display = "";
        document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + '*PIN No Should not less than 6 digits';
        document.getElementById('apin2').focus();
        return false;
    }

    if (aPin2.charCodeAt(0) != 53) {
        document.getElementById("aspin").innerHTML = "*PIN Should Starts With '5' ";
        document.getElementById("errorMsgDiv").style.display = "";
        document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*PIN Should Starts With '5' ";
        document.getElementById('apin2').focus();
        return false;
    }
    if (!pin_pat.test(aPin2))
    {
        document.getElementById('aspin').innerHTML = '*Invalid Pincode';
        document.getElementById("errorMsgDiv").style.display = "";
        document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + '*Invalid Pincode';
        document.getElementById('apin2').focus();
        return false;
    }



    
    anotherAddressAjax(hash1);

    function anotherAddressAjax(hash1) {
        var json = {
            alternateAddress: aAdr,
            alternateMobileNo: aMob2,
            alternatecity: aCity,
            alternatePin: aPin2,
            orgMob:origMob
        };
        var alternateAddressData = JSON.stringify(json);
        makeAjax("Altaddaction.aspx", "POST", alternateAddressData, anotherFunc);
    }
}


function endPage() {
    var omobile = bbb;
    var oaddress = cc;
    var orderjson = {
        o1: omobile,
        o2: oaddress,
        o3:storedNamed
    };
    var outjson = JSON.stringify(orderjson);
    makeAjax('OrdermessageAction.aspx', 'POST', outjson, anotherFunc);
}

    function dohide() {
        var hidline = document.getElementById('exlinediv');

        if (document.getElementById('chek').checked) {
            var hidbut = document.getElementById('btnplace');
            hidbut.style.display = "none";
            hidline.style.display = "none";
            document.getElementById('hide').style.display = "";
        }
        else {
            var hidbut = document.getElementById('btnplace')
            hidbut.style.display = "";
            document.getElementById('hide').style.display = "none";
            hidline.style.display = "";
        }
    }
    function isNumberKey(evt) {
        var clear3 = document.getElementById('regMob');
       clear3.innerHTML = "";
        var spanRef3 = document.getElementById('regMob');
        var charCodel = (evt.which) ? evt.which : event.keyCode;
        if (charCodel != 46 && charCodel > 31 && (charCodel < 48 || charCodel > 57)) {
            spanRef3.innerHTML = "*Please Enter Numbers Only";
            return false;
        }
        else {
            return true;
        }
    }
    function isNumericLog(val) {

        var clear10 = document.getElementById('x10');
        clear10.innerHTML = "";
        var spanRef10 = document.getElementById('x10');

        for (i = 0; i < val.length; i++) {
            ascii = val.charCodeAt(i);
            if (ascii < 48 || ascii > 57) {
                spanRef10.innerHTML = '*Please Enter Numbers Only';
                return false;
            }
        }
    }
    var m1, p1;
       
    function validateForm() {
        document.getElementById("errorMsgDiv").style.display = "none";
        document.getElementById("errorMsgSpan").style.color = "red";
        document.getElementById("errorMsgSpan").style.fontSize = "14px";
        document.getElementById("regName").innerHTML = "";
        document.getElementById("regMob").innerHTML = "";
        document.getElementById("regEmail").innerHTML = "";
        document.getElementById("regPwd").innerHTML = "";
        document.getElementById("regStor").innerHTML = "";
        document.getElementById("regAdrs").innerHTML = "";
        document.getElementById("regCity").innerHTML = "";
        document.getElementById("regState").innerHTML = "";
        document.getElementById("regPin").innerHTML = "";

        frmRef = document.getElementById('form123');
        i = frmRef.name.value;
        k = frmRef.mob.value;
        l = frmRef.pwd.value;
        var merText = frmRef.mystorename.value;
        m = frmRef.email.value;
        n = frmRef.adl1.value;
        p = document.getElementById('city');
        q = frmRef.pin.value;
        s = document.getElementById('state');
        if (i == null || i == '') {
            document.getElementById("regName").innerHTML = "*Name Feild Should not be Empty";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*Name Feild Should not be Empty";
            frmRef.name.focus();
            return false;
        }
        if (i.length<3) {
            document.getElementById("regName").innerHTML = "*Name Feild Should have Minimum 3 Characters";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*Name Feild Should have Minimum 3 Characters";
            frmRef.name.focus();
            return false;
        }
        if (!n_pat.test(i)) {
            document.getElementById("regName").innerHTML = "*Name Should Contain Letters Only";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*Name Should Contain Letters Only";
            frmRef.name.focus();
            return false;
        }

        if (k == null || k == '') {
            document.getElementById("regMob").innerHTML = "*Mobile Feild Should not be Empty";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*Mobile Feild Should not be Empty";
            frmRef.mob.focus();
            return false;
        }
        if (!m_pat.test(k)) {
            document.getElementById("regMob").innerHTML = "*Invalid Mobile";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*Invalid Mobile";
            frmRef.mob.focus();
            return false;
        }
        if (m == null || m == '') {
            document.getElementById("regEmail").innerHTML = "*Email Feild Should not be Empty";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*Email Feild Should not be Empty";
            frmRef.email.focus();
            return false;
        }
        if (!e_pat.test(m)) {
            document.getElementById("regEmail").innerHTML = "*Invalid Email";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*Invalid Email";
            frmRef.email.focus();
            return false;
        }
        if (l == null || l == '') {
            document.getElementById("regPwd").innerHTML = "*Password Feild not Empty";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*Password Feild not Empty";
            frmRef.pwd.focus();
            return false;
        }

        if (l.length < 6) {
            document.getElementById("regPwd").innerHTML = "*Password Should Have Minimum 6 characters";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*Password Should Have Minimum 6 characters";
            frmRef.pwd.focus();
            return false;
        }

        if (merText == null || merText == '' && document.getElementById('mer1').checked) {
            document.getElementById("regStor").innerHTML = "*Store Name Should not Empty";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*Store Name Should not Empty";
            frmRef.mystorename.focus();
            return false;
        }
        if (n == null || n == '') {
            document.getElementById("regAdrs").innerHTML = "*Address Should not Empty";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*Address Should not Empty";
            frmRef.adl1.focus();
            return false;
        }
        if (p.options[p.selectedIndex].value == "empty") {
            document.getElementById("regCity").innerHTML = "*Please Select Your City";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*Please Select Your City";
            frmRef.city.focus();
            return false;
        }
        if (q == null || q == '') {
            document.getElementById("regPin").innerHTML = "*PIN No Should not Empty";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*PIN No Should not Empty";
            frmRef.pin.focus();
            return false;
        }
        if (q.length != 6) {
            document.getElementById("regPin").innerHTML = "*PIN Should Have 6 Digits";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*PIN Should Have 6 Digits";
            frmRef.pin.focus();
            return false;
        }
        if (q.charCodeAt(0) != 53) {
            document.getElementById("regPin").innerHTML = "*PIN Should Starts With '5' ";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*PIN Should Starts With '5' ";
            frmRef.pin.focus();
            return false;
        }
        ajaxReq();
    }

    function ajaxReq() {
        if (document.getElementById('Customer').checked) {
            cust = document.getElementById('Customer').value;
        }
        else {
            cust = document.getElementById("mer1").value;
        }
        var json
        json = {
            Name: i,
            mobileNo: k,
            passWord: l,
            email: m,
            type: cust,
            sn: document.getElementById('merch').value,
            state: (s.options[s.selectedIndex].text),
            address: n,
            city: (p.options[p.selectedIndex].text),
            pincode: q
        };
        var userData = JSON.stringify(json);
        var a = userData;
        makeAjax("RegisterAction.aspx", "POST", a, Register2);
    }

 
    function hiding() {
        if (document.getElementById('Customer').checked) {
            var vas ="none"
            document.getElementById("storediv").style.display = "none";
        }
        else {
            document.getElementById("storediv").style.display = "";
        }
    }

    function validateLogin() {
        document.getElementById('logMob').innerHTML="";
        document.getElementById('logPwd').innerHTML = "";
        document.getElementById("errorMsgDiv").style.display = "none";
        document.getElementById("errorMsgSpan").style.color = "red";
        document.getElementById("errorMsgSpan").style.fontSize = "14px";
        frmRef = document.getElementById('form123');
        var k1 = frmRef.mob1.value;
        var l1 = frmRef.pwd1.value;
      
        if (k1 == null || k1 == '') {
            document.getElementById("logMob").innerHTML = "Mobile/Email Should not be Empty";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Mobile/Email Should not be Empty";
            frmLog.mob1.focus();
            return false;
        }
        if (l1 == null || l1 == '') {
            document.getElementById("logPwd").innerHTML = "Password Should not be Empty";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Password Should not be Empty";
            frmLog.pwd1.focus();
            return false;
        }
        ajaxlogin();
    }

    function ajaxlogin() {
        m1 = document.getElementById('form123').mob1.value;

        p1 = document.getElementById('form123').pwd1.value;
        var json2 = {
            mobileno: m1,
            password: p1
        };
        var userData2 = JSON.stringify(json2);
        var v = userData2;
        makeAjax("LoginAction.aspx", "POST", v, login25);
    }
    
    function redirect2() {
        if (pmobile == "customer") {
            if (orederregtoship != null || orderstatus != null) {
                location.href = 'Address.aspx';
            }
            else {
                location.href = 'index.html?bn='+"iamlogin";
            }
        }
    }

    function guestpage() {
        document.getElementById("errorMsgDiv").style.display = "none";
        document.getElementById("asmob").innerHTML="";
        document.getElementById("gustName").innerHTML="";
        document.getElementById("gustAdl").innerHTML = "";
        var gname = document.getElementById('gtxtname').value;
        var gmob = document.getElementById('gtxtmob').value;
        var gadd = document.getElementById('gtxtadd').value;
        
        if (gname == null || gname == '') {
            document.getElementById("gustName").innerHTML = "*Name Feild Should not be Empty";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*Name Feild Should not be Empty";
            gname.focus();
            return false;
        }

        if (gname.length < 3) {
            document.getElementById("gustName").innerHTML = "*Name Should be 3 Characters";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*Name Should be 3 Characters";
            gname.focus();
            return false;
        }


        if (!n_pat.test(gname)) {
            document.getElementById("gustName").innerHTML = "Name Should Contain Alphabets Only";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Name Should Contain Alphabets Only";
            gname.focus();
            return false;
        }
        if (gmob == null || gmob == '') {
            document.getElementById("asmob").innerHTML = "*Mobile Feild Should not be Empty";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*Mobile Feild Should not be Empty";
            gmob.focus();
            return false;
        }

        if (gmob.length != 10) {
            document.getElementById("asmob").innerHTML = "*Mobile No Should Be 10 Digits";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "*Mobile No Should Be 10 Digits";
            gmob.focus();
            return false;
        }

        if (!m_pat.test(gmob)) {
            document.getElementById("asmob").innerHTML = "Mobile No Should Starts With 7,8 or 9";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Mobile No Should Starts With 7,8 or 9";
            gmob.focus();
            return false;
        }
        if (gadd == "") {
            document.getElementById("gustAdl").innerHTML = "Address Field Should not be Empty";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Address Field Should not be Empty";
            gadd.focus();
            return false;
        }
        
        var gjson = {
            gname: gname,
            gmobile: gmob,
            gaddress: gadd
        };
        var gsend = JSON.stringify(gjson);
        makeAjax('GuestAction.aspx', 'POST', gsend, anotherFunc);

    }

    function btags() {
        var bold = document.getElementById('loginspan');
        if (bold.innerHTML == "Sign In") {
            location.href = "LoginPage.aspx";
        }
        else {
            location.href = "index.html";
        }
    }
    function locRed() {
        location.href = "LoginPage.aspx";
    }
    function onloadindex() {
        document.getElementById("errorMsgDiv").style.display = "none";
        makeAjax('Indexonloadajax.aspx', 'POST', '', onloadResp);
    }

    function ntv() {
        document.getElementById("guestHide").style.display = "none";
        document.getElementById("errorMsgDiv").style.display = "";
        document.getElementById("errorMsgSpan").innerHTML = "Your order is placed successfully!" 
            document.getElementById("errorMsgSpan").style.color = "green";
            document.getElementById("errorMsgSpan").style.fontSize = "16px";
        makeAjax('Orderonloadajax.aspx', 'POST', '', ordermsgLoadResp);
    }

    function Dash_Redirct() {
        makeAjax('DashBoardCheck.aspx', 'POST', '', dashBoardLoad);

    }
    function home_sivan() {
        location.href = "index.html";
    }
    function guestunHide() {
        document.getElementById("guestHide").style.visibility="visible"
    }
  
    function store_data() {
        store_id = document.getElementById("storeId");
        store_name = store_id.options[store_id.selectedIndex].value;
        makeAjax('EmailAjax.aspx', 'POST', store_name, storeNameload);
        document.getElementById("ss-container").load(store_name);
    }

    function isPinNo(evt) {
        var clear3 = document.getElementById('pin');
        clear3.innerHTML = "";
        var spanRegPin = document.getElementById('regPin');
        var charCodel = (evt.which) ? evt.which : event.keyCode;
        if (charCodel != 46 && charCodel > 31 && (charCodel < 48 || charCodel > 57)) {
            spanRegPin.innerHTML = "*Enter Numbers Only";
            return false;
        }
        else {
            return true;
        }
    }

    function onLoadLogin() {
        document.getElementById("storediv").style.display = "none";
    }

    function editItems() {
        location.href = "index.html";
    }
    function getPassword() {
        var txtval = document.getElementById('txtReset').value;
        document.getElementById("errorMsgDiv").style.display = "none";
        document.getElementById("errorMsgSpan").style.color = "red";
        document.getElementById("errorMsgSpan").style.fontSize = "14px";
        if (txtval == "") {
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Please Enter Your Email";
            document.getElementById("errorMsgSpan").style.color = "red";
            document.getElementById("errorMsgSpan").style.fontSize = "14px";
        }
        else if(!e_pat.test(txtval)){
        
        document.getElementById("errorMsgDiv").style.display = "";
        document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Please Enter Email in Correct Format";
        document.getElementById("errorMsgSpan").style.color = "red";
        document.getElementById("errorMsgSpan").style.fontSize = "14px";   
        }
        else {
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            }
            else {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    y = xmlhttp.responseText;
                    if (y == 0) {
                        document.getElementById("errorMsgDiv").style.display = "";
                        document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Please Enter Your Valid Email";
                        document.getElementById("errorMsgSpan").style.color = "red";
                        document.getElementById("errorMsgSpan").style.fontSize = "14px";
                    } else if (y == 2) {
                        document.getElementById("errorMsgDiv").style.display = "";
                        document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Some problem occured with server.Please try after sometime.";
                        document.getElementById("errorMsgSpan").style.color = "red";
                        document.getElementById("errorMsgSpan").style.fontSize = "14px";
                    }
                    else {
                        document.getElementById("errorMsgDiv").style.display = "";
                        document.getElementById("errorMsgSpan").style.color = "green";
                        document.getElementById("errorMsgSpan").style.fontSize = "16px";
                        document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Email has been sent to your registered email id. Please check the link to reset your password.";
                    }
                }
            }
            xmlhttp.open("POST", "ForgotPassword.aspx", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("forgotEmail=" + txtval);
        }
    }

    function resetPassword() {
        var val = document.getElementById('txtreset1').value;
        document.getElementById("errorMsgDiv").style.display = "none";
        document.getElementById("errorMsgSpan").style.color = "red";
        document.getElementById("errorMsgSpan").style.fontSize = "14px";

        if (val == "") {
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Password feild Should not Empty";
            document.getElementById("errorMsgSpan").style.color = "red";
            document.getElementById("errorMsgSpan").style.fontSize = "14px";
        }
        else if (val.length < 6) {
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Password feild Should have Minimum 6 Digits";
            document.getElementById("errorMsgSpan").style.color = "red";
            document.getElementById("errorMsgSpan").style.fontSize = "14px";
        }
        else {
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            }
            else {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    y = xmlhttp.responseText;
                    location.href = "../Loginpage.aspx";
                }
            }
            xmlhttp.open("POST", "ResetPassword.aspx", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("forgotEmail=" + val);
        }
    }
        function pickStore() {
         var hidline1 = document.getElementById('pstoreButton');
        var totalHide = document.getElementById('totalHideDiv');
        var hidbut1 = document.getElementById('btnplace');
        var hiidde = document.getElementById('hide');
        document.getElementById('chek').checked = false;
        if (document.getElementById('pickChek').checked) {            
            hidbut1.style.display = "none";            
            totalHide.style.display = "none";
            hiidde.style.display = "none";
             document.getElementById('exlinediv').style.display = "none";
            hidline1.style.display = "";
            // alert(hidbut);
        }
        else {
            hidline1.style.display = "none";
            totalHide.style.display = "";
            hidbut1.style.display = "";
             document.getElementById('exlinediv').style.display = "";
            if (document.getElementById('chek').checked) {
               
                hidbut1.style.display = "none";               
            }
            else {
                hidbut1.style.display = "";
                document.getElementById('exlinediv').style.display = "";
                
            }
        }
       }
       function pickStoreContinue() {
       makeAjax('PickAtStore.aspx', 'POST', '', anotherFunc);
         }

       function pickGuestStore() {
       var hidline1 = document.getElementById('pstoreButton');
       var totalHide = document.getElementById('totalHideDiv'); gtxtadd
       var gsubmit = document.getElementById('gsubmit');
       var gtxtAdd = document.getElementById('gtxtadd');
       if (document.getElementById('pickChek').checked) {
           gsubmit.style.display = "none";
           hidline1.style.display = "";
           document.getElementById("sgborderDiv").style.display="none";
           gtxtAdd.value = "Pick At Store";
           // alert(hidbut);
           gtxtAdd.setAttribute("readonly", "readonly");
       }
       else {
           gsubmit.style.display = "";
           hidline1.style.display = "none";
           gtxtAdd.value = "";
           document.getElementById("sgborderDiv").style.display="";
           gtxtAdd.removeAttribute("readonly");
       }
   }



    function makeAjax(urls, methods, querystring, responses) {
        url = urls;
        method = methods;
        callback = responses;
        sendeddata = querystring;
        loadAjax(url, method, sendeddata, callback);
    }

    function loadAjax(url, method, sendeddata, callback) {
        if (window.XMLHttpRequest) {
            xml_http = new XMLHttpRequest();
        }
        else {
            xml_http = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xml_http.open(method, url, true);
        xml_http.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xml_http.send("reqdata=" + sendeddata);

        xml_http.onreadystatechange = function () {
            if (xml_http.readyState == 4 && xml_http.status == 200) {
                var str_respo = xml_http.responseText;
                callback(str_respo);
            }
        }
    }
    function login25(y) {
        if (parseInt(y) == 0) {
            document.getElementById("logPwd").innerHTML = "*Invalid Password";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Invalid Password";

        }
        else if (parseInt(y) == 2) {
            document.getElementById("logMob").innerHTML = "*You have not activated your link";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "You have not activated your link";
        } else if (parseInt(y) == 7) {
            document.getElementById("logMob").innerHTML = "*Invalid Mobile/Email";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Invalid Mobile/Email";
        }
        else if (parseInt(y) == 100) {
            location.href = 'dashBoard.aspx';
        } else if (parseInt(y) == 105) {
            location.href = 'MerchentDashboard.aspx';
        }
        else if (y == "exception") {
            document.getElementById("logMob").innerHTML = "*Invalid Mobile/E-mail";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Invalid Mobile/E-mail";
        }
        else {
            zz = JSON.parse(y);
            pmobile = zz.type;
            orderstatus = zz.orderstatus;
            orederregtoship = zz.registeredtoship;
            document.getElementById('form123').reset();
            redirect2();
        }
    }

    function Register2() {
        document.getElementById("errorMsgDiv").style.display = "";
        document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Registered Successfully !Please check your email to confirm link";
        document.getElementById("errorMsgSpan").style.color = "green";
        document.getElementById("errorMsgSpan").style.fontSize = "16px";
        frmRef.reset();
    }
    function anotherFunc() {
        location.href = 'Ordermessage.aspx';
    }
    function loadAddres(y) {
        var y10 = y;
        zzz = JSON.parse(y10);
        aa = zzz.Name;
        bbb = zzz.mobileNo;
        cc = zzz.address;
        dd = zzz.pincode;
        ee = zzz.city;
        ff = zzz.state;
        editOrd = zzz.order;
        document.getElementById('amob').innerHTML = bbb + '<br><br>'
        document.getElementById('amob').innerHTML += cc + '<br><br>'
        document.getElementById('amob').innerHTML += ee + '<br><br>'
        document.getElementById('amob').innerHTML += dd + '<br><br>';
        var shippingdiv = document.getElementById('orderEdit');
        var orderfinal = JSON.parse(editOrd);
        var editButton = document.createElement("a");
        editButton.setAttribute("href", "index.html");
        editButton.innerHTML = "Edit Order";
        editButton.style.cssFloat = "right";
        shippingdiv.childNodes[0].appendChild(editButton);

        var ItemDiv = document.createElement("div");
        ItemDiv.id = "maindiv";
        var itemhead = document.createElement("div");
        itemhead.className = "orderEditDiv";
        itemhead.style.fontWeight = "bold";
        var iname1 = document.createElement("div");
        iname1.className = "OrderEditAddress";
        var iQty1 = document.createElement("div");
        iQty1.className = "OrderEditAddress";
        var iPrice1 = document.createElement("div");
        iPrice1.className = "OrderEditAddress";
        var IName1 = document.createTextNode("Name");
        var IQty1 = document.createTextNode("Quantity");
        var IPrice1 = document.createTextNode("Price");
        iname1.appendChild(IName1);
        iQty1.appendChild(IQty1);
        iPrice1.appendChild(IPrice1);
        itemhead.appendChild(iname1);
        itemhead.appendChild(iQty1);
        itemhead.appendChild(iPrice1);
        ItemDiv.appendChild(itemhead);

        var priceSum = 0;
        for (var z = 0; z < orderfinal.Items.length; z++) {
            var fItem = document.createElement("div");
            fItem.className = "orderEditDiv";
            var fIName = document.createElement("div");
            fIName.className = "OrderEditAddress";
            var fIQty = document.createElement("div");
            fIQty.className = "OrderEditAddress";
            var fIPrice = document.createElement("div");
            fIPrice.className = "OrderEditAddress";
            var IName = document.createTextNode(orderfinal.Items[z].Name);
            var IQty = document.createTextNode(orderfinal.Items[z].Quantity);
            var IPrice = document.createTextNode(orderfinal.Items[z].Price);
            fIName.appendChild(IName);
            fIQty.appendChild(IQty);
            fIPrice.appendChild(IPrice);
            fItem.appendChild(fIName);
            fItem.appendChild(fIQty);
            fItem.appendChild(fIPrice);
            ItemDiv.appendChild(fItem);
            priceSum += parseFloat(orderfinal.Items[z].Price);
        }
        shippingdiv.appendChild(ItemDiv);
        var ordTotalDiv = document.createElement("div");
        ordTotalDiv.style.width = "508px";
        ordTotalDiv.style.height = "15px";
        ordTotalDiv.style.padding = "5px";
        ordTotalDiv.style.fontWeight = "bold";
        ordTotalDiv.style.border = "1px solid #cccccc";
        ordTotalDiv.style.marginTop="5px";
        var empty = document.createElement("div");
        empty.id = "boldtext";
        empty.style.cssFloat = "left";
        var emptytext = document.createTextNode("Total");
        empty.appendChild(emptytext);
        ordTotalDiv.appendChild(empty);

        var totalPriceDiv = document.createElement("div");
        totalPriceDiv.style.cssFloat = "right";
        totalPriceDiv.style.marginRight = "150px";
        var pricetext = document.createTextNode("Rs " + priceSum);
        totalPriceDiv.appendChild(pricetext);
        ordTotalDiv.appendChild(totalPriceDiv);
        shippingdiv.appendChild(ordTotalDiv);
        var pickAtStore = document.createElement("div");
        var pasRadio = document.createElement("input");
        pasRadio.type = "checkbox";
        pasRadio.id = "pickChek";
        pasRadio.setAttribute("onclick", "pickStore()");
        var pasSpan = document.createElement("span");
        var pasRadiotext = document.createTextNode("Pick At Store");
        pickAtStore.className = "PickStore";
        pasSpan.appendChild(pasRadiotext);
        pickAtStore.appendChild(pasRadio);
        pickAtStore.appendChild(pasSpan); 
        shippingdiv.appendChild(pickAtStore);
        var storeButton = document.createElement("input");
        storeButton.className = "rightButton";
        storeButton.style.display = "none";
        storeButton.id="pstoreButton"
        storeButton.setAttribute("type", "Button");
        storeButton.setAttribute("onclick", "pickStoreContinue()");
        storeButton.setAttribute("value", "Place Order");
        shippingdiv.appendChild(storeButton);
    }
    function mobileValid(y1) {
        document.getElementById("errorMsgDiv").style.display = "none";
        var clear3 = document.getElementById('regMob');
        clear3.innerHTML = "";
        if (parseInt(y1) == 0) {
            document.getElementById("regMob").innerHTML = "*Mobile Already Exists";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Mobile Already Exists";
            document.getElementById("errorMsgSpan").style.color = "red";
            document.getElementById("errorMsgSpan").style.fontSize = "14px";

        }
        else {
            document.getElementById("regMob").innerHTML = "";
            document.getElementById("errorMsgDiv").style.display = "none";
        }
    }
    function emailValid(y4) {
        document.getElementById("errorMsgDiv").style.display = "none";
        var clear5 = document.getElementById('regEmail');
        clear5.innerHTML = "";
        if (parseInt(y4) == 0) {
            document.getElementById("regEmail").innerHTML = "*Email Already Exists";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Mobile Already Exists";
            document.getElementById("errorMsgSpan").style.color = "red";
            document.getElementById("errorMsgSpan").style.fontSize = "14px";
            //emailfield.focus();
        }
        else {
            document.getElementById("regEmail").innerHTML = "";
            document.getElementById("errorMsgDiv").style.display = "none";
        }
    }
    function useridValid(rep_y54) {
        document.getElementById("errorMsgDiv").style.display = "none";
        if (parseInt(rep_y54) == 1) {
            document.getElementById('logMob').innerHTML = "";
        }
        else {
            document.getElementById('logMob').innerHTML = "Seems Invalid Email / Mobile";
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "Seems Invalid Email / Mobile";
            document.getElementById("errorMsgSpan").style.color = "red";
            document.getElementById("errorMsgSpan").style.fontSize = "14px";

        }
    }
    function onloadResp(rep_y) {
        var url = location.href;
        var urlno = url.lastIndexOf("/");
        var urlstore = url.substr(urlno + 1);
        var sname2 = document.getElementById("soreIds");
        var log_resp = JSON.parse(rep_y);
        var logResp = log_resp.response;
        var gOrder = log_resp.myorder;
        if (parseInt(logResp) == 1) {
            document.getElementById('logout').style.display = "";
            document.getElementById('loginspan').style.display = "none";
        }
        if (parseInt(logResp) == 0) {
            document.getElementById('logout').style.display = "none";
        }
        if (gOrder.length > 1) {
            var placedOrder = JSON.parse(gOrder);
            var DD = document.getElementById("sel");
            DD.value = placedOrder.DelivaryDate;
        }
        if (gOrder != "") {
            var placedOrder = JSON.parse(gOrder);
            var DD = document.getElementById("sel");
            var delDate = placedOrder.DelivaryDate;

            var deldstr1 = delDate.indexOf(" ");
            var deldstr3 = delDate.substr(0, deldstr1);
            var delystr1 = delDate.lastIndexOf(" ");
            var delystr3 = delDate.substr(delystr1 + 1);
            var delmstr3 = delDate.substring(deldstr1 + 1, delystr1);
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            for (mii = 0; mii <= months.length; mii++) {
                if (delmstr3 == months[mii]) {
                    delmstr3 = mii + 1;
                }
            }
            var ChDate = deldstr3 + "-" + delmstr3 + "-" + delystr3;
            DD.value = ChDate;
            document.getElementById("margrgt").disabled = false;
            document.getElementById("margrgt").style.backgroundColor = "#7d0083";
        }
        else {
            var DD = document.getElementById("sel");
            DD ="";
        }
    }
    function ordermsgLoadResp(rep_y4g) {
        if (parseInt(rep_y4g) == 0) {
            document.getElementById("guestHide").style.display = "";
            document.getElementById("storediv").style.display = "none";
            document.getElementById('g_visiblespan').style.display = "none";
            document.getElementById('logout').style.display = "none";

        }
        else {
            document.getElementById('g_visiblespan').style.display = "none";
            document.getElementById('logout').style.display = "none";
        }

    }
    function dashBoardLoad(rep_y4) {

        if (parseInt(rep_y4) == 11) {
            location.href = 'dashBoard.aspx';
        }
        else if (parseInt(rep_y4) == 1) {
            document.getElementById("errorMsgDiv").style.display = "";
            document.getElementById("errorMsgSpan").innerHTML = "*" + "  " + "You have No orders to display";
            document.getElementById("errorMsgSpan").style.color = "red";
            document.getElementById("errorMsgSpan").style.fontSize = "14px";
            return false;
        }
        else
            if (parseInt(rep_y4) == 12) {
                location.href = 'MerchentDashboard.aspx';
            }

            else {
                alert("Please Login to View dashboard");
                location.href = 'LoginPage.aspx';
            }
    }

 function GuestOrderLoad(grl) {
       //alert(grl);
       document.getElementById('gtxtadd').value="";
       var shippingdiv = document.getElementById('orderEdit');
       var orderfinal = JSON.parse(grl);
       var editButton = document.createElement("a");
        editButton.setAttribute("href", "index.html");
        editButton.innerHTML = "Edit Order";
        editButton.style.cssFloat = "right";
       shippingdiv.childNodes[0].appendChild(editButton);

       var ItemDiv = document.createElement("div");
       ItemDiv.id = "maindiv";
       var itemhead = document.createElement("div");
       itemhead.className = "orderEditDiv";
       itemhead.style.fontWeight = "bold";
       var iname1 = document.createElement("div");
       // iname1.style.width= "190px";
       iname1.className = "OrderEditAddress";
       var iQty1 = document.createElement("div");
       iQty1.className = "OrderEditAddress";
       //iQty1.style.width = "190px";
       var iPrice1 = document.createElement("div");
       //iPrice1.style.width = "190px";
       iPrice1.className = "OrderEditAddress";
       var IName1 = document.createTextNode("Name");
       var IQty1 = document.createTextNode("Quantity");
       var IPrice1 = document.createTextNode("Price");
       iname1.appendChild(IName1);
       iQty1.appendChild(IQty1);
       iPrice1.appendChild(IPrice1);
       itemhead.appendChild(iname1);
       itemhead.appendChild(iQty1);
       itemhead.appendChild(iPrice1);
       ItemDiv.appendChild(itemhead);

       var priceSum = 0;
       for (var z = 0; z < orderfinal.Items.length; z++) {
           var fItem = document.createElement("div");
           fItem.className = "orderEditDiv";
           var fIName = document.createElement("div");
           // fIName.style.width = "190px";
           fIName.className = "OrderEditAddress";
           var fIQty = document.createElement("div");
           //fIQty.style.width = "190px";
           fIQty.className = "OrderEditAddress";
           var fIPrice = document.createElement("div");
           //fIPrice.style.width = "190px";
           fIPrice.className = "OrderEditAddress";
           var IName = document.createTextNode(orderfinal.Items[z].Name);
           var IQty = document.createTextNode(orderfinal.Items[z].Quantity);
           var IPrice = document.createTextNode(orderfinal.Items[z].Price);
           fIName.appendChild(IName);
           fIQty.appendChild(IQty);
           fIPrice.appendChild(IPrice);
           fItem.appendChild(fIName);
           fItem.appendChild(fIQty);
           fItem.appendChild(fIPrice);
           ItemDiv.appendChild(fItem);
           priceSum += parseFloat(orderfinal.Items[z].Price);

       }
       var priceSum1 = priceSum.toFixed(2);
       shippingdiv.appendChild(ItemDiv);
       var ordTotalDiv = document.createElement("div");
       ordTotalDiv.style.width = "508px";
       ordTotalDiv.style.height = "15px";
       ordTotalDiv.style.padding = "5px";
       ordTotalDiv.style.fontWeight = "bold";
       ordTotalDiv.style.border = "1px solid #cccccc";
       ordTotalDiv.style.marginTop = "5px";
       var empty = document.createElement("div");
       // empty.className = "OrderEditAddress";
       empty.id = "boldtext";
       empty.style.cssFloat = "left";
       var emptytext = document.createTextNode("Total");
       empty.appendChild(emptytext);
       ordTotalDiv.appendChild(empty);
       var totalPriceDiv = document.createElement("div");
       //totalPriceDiv.className = "OrderEditAddress";
       totalPriceDiv.style.cssFloat = "right";
       totalPriceDiv.style.marginRight = "150px";
       var pricetext = document.createTextNode("Rs " + priceSum1);
       totalPriceDiv.appendChild(pricetext);
       ordTotalDiv.appendChild(totalPriceDiv);
       shippingdiv.appendChild(ordTotalDiv);
       var pickAtStore = document.createElement("div");
       var pasRadio = document.createElement("input");
       pasRadio.type = "checkbox";
       pasRadio.id = "pickChek";
       pasRadio.setAttribute("onclick", "pickGuestStore()");
       var pasSpan = document.createElement("span");
       var pasRadiotext = document.createTextNode("Pick At Store");
       pickAtStore.className = "PickStore";
       pasSpan.appendChild(pasRadiotext);
       pickAtStore.appendChild(pasRadio);
       pickAtStore.appendChild(pasSpan);
       shippingdiv.appendChild(pickAtStore);
       var storeButton = document.createElement("input");
       storeButton.className = "rightButton";
       storeButton.style.display = "none";
       storeButton.id = "pstoreButton"
       storeButton.setAttribute("type", "Button");
       storeButton.setAttribute("onclick", "guestpage()");
       storeButton.setAttribute("value", "Place Order");
       shippingdiv.appendChild(storeButton);
   }
    function onLoadLoginPage(oll) {
        //alert(oll);
        if (oll == 1) {
            document.getElementById('hiddendiv').style.display = "";
        }
        else {
            document.getElementById('hiddendiv').style.display = "none";
        }
    }
    function storeNameload() {
    }

    function logout() {
        location.href = 'Logout.aspx';
    }
