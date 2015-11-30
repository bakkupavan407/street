
var divc1 = document.getElementById("c1");
var divc2 = document.getElementById("c2");

function funone() {
    divc1.style.display = "";
    divc2.style.display = "none";
    document.getElementById('clikTab').style.textDecoration = "none";
    document.getElementById('redi').style.textDecoration = "none";
    document.getElementById('uploadCatlog').style.textDecoration = "underline";
}
function funtwo() {
    divc2.style.display = "";
    divc1.style.display = "none";
    document.getElementById('redi').style.textDecoration = "none";
    document.getElementById('uploadCatlog').style.textDecoration = "none";
    document.getElementById('clikTab').style.textDecoration = "underline";
}

function loadOrgCatalog() {
    document.getElementById('deddiv').style.display = "";
    document.getElementById('dummygrid').style.display = "none";
    document.getElementById('btndumorg').style.display = "none";   
    document.getElementById('dummycat').style.textDecoration = "none";
    document.getElementById('orgcat').style.textDecoration = "underline";
    document.getElementById('dummycat').style.color = "";
    document.getElementById('orgcat').style.color = "#7d0083";
}
function loadBothCatalog() {
    
    document.getElementById('btndumorg').style.display = "";
    document.getElementById('deddiv').style.display = "";
    document.getElementById('dummygrid').style.display = "";
    document.getElementById('orgcat').style.textDecoration = "none";
    document.getElementById('dummycat').style.textDecoration = "underline";
    document.getElementById('orgcat').style.color = "";
    document.getElementById('dummycat').style.color = "#7d0083";
}