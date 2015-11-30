
$(document).ready(function () {

    // Login page Enter key binding!
    $(".bindlogin").on("keypress", function (e) {
        if (e.keyCode == 13) {
            $("#loginbtn").click();
            return false;
        }
    });

    // Registration page Enter key binding!
    $(".bindreg").on("keypress", function (e) {
        if (e.keyCode == 13) {
            $("#regbtn").click();
            return false;
        }
    });

    // Addresspage Checkbox is checked.
    $("#chek").on("click", function (e) {
        if (e.target.checked == true) {
            $("#hide").css('visibility', 'visible');
            $('#btnplace').css('display', 'none');
            $("#exlinediv").css('display', 'none');
        }
        else {
            $("#hide").css('visibility', 'hidden');
            $('#btnplace').css('display', '');
        }
     });
    
    // Address page checkbox binding with enter key event.
    $(document).on("keypress", function (e) {
        if (e.keyCode == 13) {
            if ($("#chek").is(':checked')) {
                $("#submit").click();
                return false;
            } else {
                $("#btnplace").click();
                return false;
            }
        }
    });

});