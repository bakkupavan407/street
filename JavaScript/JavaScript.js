//var frmRef
//var mer;
//var cust;
//var i;
//var j;
//var k;
//var l;
//var m;
//var n;
//var o;
//var p;
//var q;
//var r;
//var s;
//var t;
//var u;
//var v;
//var w;
//var y;
//var n_pat = /^[a-z]{3,}$/i;
//var e_pat = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//var p_pat = /(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*/;
//var m_pat = /^[7-9][0-9]{9}$/;
//var pin_pat = /^\d+$/;
//var zz;
//var aa;
//var bb;
//var cc;
//var dd;
//var aaa, bbb, ccc;
//var hash1;
//var ss11;
//var ss123;
//var dash;
////var hash212;
//function validateForm() {
//    //alert('entered');
//    frmRef = document.getElementById('form1');
//    i = frmRef.name.value;
//    k = frmRef.mob.value;
//    l = frmRef.pwd.value;

//    var merText = frmRef.mystorename.value;
//    // alert(merText)
//    //r1 = frmRef.mystorename.value;
//    //alert()
//    m = frmRef.email.value;
//    n = frmRef.adl1.value;
//    p = document.getElementById('city');
//    q = frmRef.pin.value;
//    s = document.getElementById('state');


//    //var sName = document.getElementById('merchant');

//    var spanRef1 = document.getElementById('x1');
//    var spanRef3 = document.getElementById('x3');
//    var spanRef4 = document.getElementById('x4');
//    var spanRef5 = document.getElementById('x5');
//    var spanRef6 = document.getElementById('x6');
//    var spanRef8 = document.getElementById('x8');
//    var spanRef9 = document.getElementById('x9');
//    var msn = document.getElementById('msn');

//    clear1 = document.getElementById('x1');
//    clear3 = document.getElementById('x3');
//    clear4 = document.getElementById('x4');
//    clear5 = document.getElementById('x5');
//    clear6 = document.getElementById('x6');
//    clear8 = document.getElementById('x8');
//    clear9 = document.getElementById('x9');

//    clear1.innerHTML = "";
//    clear3.innerHTML = "";
//    clear4.innerHTML = "";
//    clear5.innerHTML = "";
//    clear6.innerHTML = "";
//    clear8.innerHTML = "";
//    clear9.innerHTML = "";

//    //if (document.getElementById('Customer').checked) {
//    //    var cust = document.getElementById('Customer').value;
//    //} else {
//    //    var mer = document.getElementById('mer1').value;
//    //}



//    if (!n_pat.test(i)) {
//        spanRef1.innerHTML = "*Invalid Name";
//        frmRef.name.focus();
//        return false;
//    }

//    if (!m_pat.test(k)) {
//        spanRef3.innerHTML = "*Invalid Mobile No";
//        frmRef.mob.focus();
//        return false;

//    }

//    if (!pin_pat.test(k)) {
//        spanRef3.innerHTML = "*Enter numbers only";
//        frmRef.mob.focus();
//        return false;
//    }

//    if (!e_pat.test(m)) {
//        spanRef5.innerHTML = '*Invalid Email Address';
//        frmRef.email.focus();
//        return false;
//    }

//    if (l == null || l == '') {
//        spanRef4.innerHTML = 'Invalid Password';
//        frmRef.pwd.focus();
//        return false;
//    }

//    if (merText == null || merText == '' && document.getElementById('mer1').checked) {

//        msn.innerHTML = '*Please Enter Store Name';
//        frmRef.pwd.focus();
//        return false;
//    }



//    if (n == null || n == '') {
//        spanRef6.innerHTML = "*Enter Your Address";
//        frmRef.adl1.focus();
//        return false;

//    }

//    if (p.options[p.selectedIndex].value == "empty") {
//        spanRef8.innerHTML = "*Please Select Your City Name";
//        frmRef.city.focus();
//        return false;

//    }
//    if (q.length != 6 || q.charCodeAt(0) != 53) {
//        spanRef9.innerHTML = "*Invalid PIN No";
//        frmRef.pin.focus();
//        return false;

//    }

//    if (!pin_pat.test(q)) {
//        spanRef9.innerHTML = "*Enter numbers only";
//        frmRef.pin.focus();
//        return false;
//    }
//    //for (var rs = 0; rs < frmRef.myrad.length; rs++) {
//    //    if (frmRef.myrad[rs].checked) {
//    //        cust = document.myrad[rs].value;
//    //        alert(cust)
//    //        break;
//    //    }
//    //}

//    //if ((form1.myrad[0].checked == false) && (frmRef.myrad[1].checked == false)) {
//    //    alert("Please choose Type");
//    //    return false;
//    //}

 
//}
var n_pat = /^[a-z]{3,}$/i;
var e_pat = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var p_pat = /(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*/;
var m_pat = /^[7-9][0-9]{9}$/;
var pin_pat = /^\d+$/;
function validateForm() {
    frmRef = document.getElementById('form1');
    //alert("ok");
    
    frmRef = document.getElementById('form1');
    //alert(frmRef.name.value);
    i = frmRef.name.value;
    k = frmRef.mob.value;
    //alert(frmRef.mob.value);
        l = frmRef.pwd.value;

        var merText = frmRef.mystorename.value;
        // alert(merText)
        //r1 = frmRef.mystorename.value;
        //alert()
        m = frmRef.email.value;
        n = frmRef.adl1.value;
        p = document.getElementById('city');
        q = frmRef.pin.value;
        s = document.getElementById('state');
        if (!n_pat.test(i)) {
            //alert("user name")
            document.getElementById("Name").style.borderColor = "#FF0000"
            frmRef.name.focus();
            return false;
        }
        if (!m_pat.test(k)) {
            //alert("*Invalid Mobile No");
            document.getElementById("mob").style.borderColor = "#FF0000"
            frmRef.mob.focus();
            return false;
    
        }
    
        if (!pin_pat.test(k)) {
            //alert("*Enter numbers only");
            document.getElementById("mob").style.borderColor = "#FF0000"
            frmRef.mob.focus();
            return false;
        }
    
        if (!e_pat.test(m)) {
            //alert('*Invalid Email Address');
            document.getElementById("email").style.borderColor = "#FF0000"
            frmRef.email.focus();
            return false;
        }
    
        if (l == null || l == '') {
            //alert('Invalid Password');
            document.getElementById("pwd").style.borderColor = "#FF0000"
            frmRef.pwd.focus();
            return false;
        }
    
        if (merText == null || merText == '' && document.getElementById('mer1').checked) {
    
          //  alert("*Please Enter Store Name");
            document.getElementById("merch").style.borderColor = "#FF0000"
        frmRef.pwd.focus();
        return false;
    }
    
    
    
    if (n == null || n == '') {
        //alert("*Enter Your Address");
        frmRef.adl1.focus();
        return false;
    
    }
    
    if (p.options[p.selectedIndex].value == "empty") {
        //alert("*Please Select Your City Name");
        frmRef.city.focus();
        return false;
    
    }
    if (q.length != 6 || q.charCodeAt(0) != 53) {
        //alert("*Invalid PIN No");
        document.getElementById("pin").style.borderColor = "#FF0000"
        frmRef.pin.focus();
        return false;
    
    }
    
    if (!pin_pat.test(q)) {
        //alert("*Enter numbers only");
        document.getElementById("pin").style.borderColor = "#FF0000"
        frmRef.pin.focus();
        return false;
    }
    ajaxReq();
}


function hiding() {
    if (document.getElementById('Customer').checked) {

        document.getElementById("storediv").style.visibility = "hidden";
    } else if (document.getElementById('mer1').checked) {
        document.getElementById("storediv").style.visibility = "visible";

    }

}

function validateLogin() {
    //alert("ok")
    frmRef = document.getElementById('form1');
    var k1 = frmRef.mob1.value;
    var l1 = frmRef.pwd1.value;
    if (!m_pat.test(k1)) {

        //alert("*Invalid Mobile No");
        document.getElementById("mob1").style.borderColor = "#FF0000"
        frmLog.mob.focus();
        return false;
    }

    if (l1 == null || l1 == '') {
        //alert('*Invalid Password');
        document.getElementById("pwd1").style.borderColor = "#FF0000"
        frmLog.pwd.focus();
        return false;
    }
    
    ajaxlogin();
}