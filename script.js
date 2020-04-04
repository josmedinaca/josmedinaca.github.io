//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

jQuery.validator.addMethod("customEmail", function(value, element) {
    return this.optional(element) || /^[a-zA-Z0-9._-]+@[unal.edu.co]{11}$/i.test(value);
}, "Please enter valid emaildd address!");
jQuery.validator.addMethod("customDroplist", function(value, element) {
    return this.optional(element) || /^[1-3]{1}$/i.test(value);
}, "Please enter valid emaildd address!");
$(".next").click(function() {
    // $('#msform').validate({
    //     // Specify validation rules
    //     rules: {
    //         // The key name on the left side is the name attribute
    //         // of an input field. Validation rules are defined
    //         // on the right side
    //         fnames: "required",
    //         lnames: "required",
    //         email: {
    //             required: true,
    //             // Specify that email should be validated
    //             // by the built-in "email" rule
    //             email: false,
    //             customEmail: true
    //         },
    //         phone1: {
    //             required: true,
    //             digits: true
    //         },
    //         phone2: {
    //             required: true,
    //             digits: true
    //         },
    //         ident: "required",
    //         identType: {
    //             required: true
    //         }

    //     },
    //     // Specify validation error messages
    //     messages: {
    //         fnames: "Introduce tus nombres",
    //         lnames: "Introduce tus apellidos",
    //         email: "Introduce tu correo institucional",
    //         phone1: "Introduce tu teléfono principal",
    //         phone2: "Introduce tu teléfono secundario",
    //         ident: "Introduce tu documento de indetificación",
    //         identType: "Escoge tu tipo de documento"
    //     },

    // });
    // if (!$('#msform').valid()) {
    //     return false;
    // }
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({ 'left': left, 'opacity': opacity });
        },
        duration: 800,
        complete: function() {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
    mymap.invalidateSize();
});

$(".previous").click(function() {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({ 'left': left });
            previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
        },
        duration: 800,
        complete: function() {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".submit").click(function() {
    return false;
})
var theMarker = {};
var mymap = L.map('mapid').setView([4.634771, -74.081599], 14);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">Johan</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);
newMarkerGroup = new L.LayerGroup();
mymap.on('click', addMarker);
mymap.on('zoomend', function(e) {

    console.log(e.target.getZoom());

})

mymap.on('click', function(ev) {
    var coordinates = mymap.mouseEventToLatLng(ev.originalEvent);
    console.log(coordinates.lat + ', ' + coordinates.lng);
    document.getElementById('lat').value = coordinates.lat;
    document.getElementById('long').value = coordinates.lng;
});
theMarker = new L.marker([4.634771, -74.081599]).addTo(mymap);

function addMarker(e) {
    // Add marker to map at click location; add popup window
    // var newMarker = new L.marker(e.latlng).addTo(map);
    if (theMarker != undefined) {
        mymap.removeLayer(theMarker);
    }

    //Add a marker to show where you clicked.


    theMarker = new L.marker(e.latlng).addTo(mymap);
}

function TEST() {
    console.log("TTT");
}

function postToGoogle() {
    console.log("Im in");
    var field1 = $("#fnames").val();
    var field2 = $("#lnames").val();
    var field3 = $("#email").val();
    var field4 = $("#phone1").val();
    var field5 = $("#phone2").val();
    var field6 = $("#ident").val();
    var field7 = $("#identType option:selected").text();
    var field8 = $("#situacion option:selected").text();
    var field9 = $("#direccion").val();
    var field10 = $("#direccion2").val();
    var field11 = $("#lat").val();
    var field12 = $("#long").val();






    $.ajax({
        url: "https://docs.google.com/forms/d/e/1FAIpQLSfuebwhfd5LMNlt1eTvs8KGb8XuBJWVsmn-pP4sXZWSqjz6EA/formResponse?",
        data: {
            "entry.2100967329": field1,
            "entry.1444468289": field2,
            "entry.1638540513": field3,
            "entry.2068810262": field4,
            "entry.1038298063": field5,
            "entry.2019579785": field6,
            "entry.2029993123": field7,
            "entry.1053065399": field8,
            "entry.1713232368": field9,
            "entry.130899294": field10,
            "entry.234973700": field11 + "," + field12
        },
        type: "GET",
        dataType: "jsonp",
        success: function(d) {
            //alert("Formulario enviado con exito");

        },
        error: function(x, y, z) {
            //alert("Formulario enviado con exito");

            console.log("ESO");

        }
    });
    $("#myModal2").modal('show');
    return false;
}
$(document).ready(function() {

    $('#calBothDateAndTime').datetimepicker({});
    $('#calOnlyDate').datetimepicker({ format: 'DD/MM/YYYY' });

});

function showDiv(divId, element) {
    document.getElementById(divId).style.display = element.value == 2 ? 'block' : 'none';
}

function showDiv2(divId, element) {
    document.getElementById(divId).style.display = element.value != 1 ? 'block' : 'none';
}

function showDiv3(divId, element) {
    document.getElementById(divId).style.display = element.value == 1 ? 'block' : 'none';
}

$('.alert').alert()

// total files
var s1 = 0;
var s2 = 0;
var s3 = 0;
var s4 = 0;
var s5 = 0;
var s6 = 0;
var s7 = 0;
var s8 = 0;
var percentage = 0;
// find progress bar
const progressBar = document.querySelector('.progress-bar[role="progressbar"]');



function onFileChange() {
    // calculate percentage
    percentage = parseFloat(s1) + parseFloat(s2) + parseFloat(s3) + parseFloat(s4) + parseFloat(s5) +
        parseFloat(s6) + parseFloat(s7) + parseFloat(s8);


    // apply percentage
    if (percentage >= 100) {
        $("#s1").val("");
        $("#s2").val("");
        $("#s3").val("");
        $("#s4").val("");
        $("#s5").val("");
        $("#s6").val("");
        $("#s7").val("");
        $("#s8").val("");
        s1 = 0;
        s2 = 0;
        s3 = 0;
        s4 = 0;
        s5 = 0;
        s6 = 0;
        s7 = 0;
        s8 = 0;

        percentage = 0;

        alert(">100");
    }
    progressBar.style.width = percentage + '%';
    progressBar.innerText = percentage + '%';


}







// simulate file change

$("#s1").bind("change paste keyup", function() {
    if (parseFloat($(this).val()) >= 100) {
        alert(">100");
        $("#s1").val("");
        s1 = 0;
    } else {
        if ($(this).val() == "") {
            s1 = 0;
        } else {
            s1 = $(this).val();
        }
    }



    onFileChange();
});
$("#s2").bind("change paste keyup", function() {
    if (parseFloat($(this).val()) >= 100) {
        alert(">100");
        $("#s2").val("");
        s2 = 0;
    } else {
        if ($(this).val() == "") {
            s2 = 0;
        } else {
            s2 = $(this).val();
        }
    }
    onFileChange();
});
$("#s3").bind("change paste keyup", function() {
    if (parseFloat($(this).val()) >= 100) {
        alert(">100");
        $("#s3").val("");
        s3 = 0;
    } else {
        if ($(this).val() == "") {
            s3 = 0;
        } else {
            s3 = $(this).val();
        }
    }
    onFileChange();
});
$("#s4").bind("change paste keyup", function() {
    if (parseFloat($(this).val()) >= 100) {
        alert(">100");
        $("#s4").val("");
        s4 = 0;
    } else {
        if ($(this).val() == "") {
            s4 = 0;
        } else {
            s4 = $(this).val();
        }
    }
    onFileChange();
});
$("#s5").bind("change paste keyup", function() {
    if (parseFloat($(this).val()) >= 100) {
        alert(">100");
        $("#s5").val("");
        s5 = 0;
    } else {
        if ($(this).val() == "") {
            s5 = 0;
        } else {
            s5 = $(this).val();
        }
    }
    onFileChange();
});
$("#s6").bind("change paste keyup", function() {
    if (parseFloat($(this).val()) >= 100) {
        alert(">100");
        $("#s6").val("");
        s6 = 0;
    } else {
        if ($(this).val() == "") {
            s6 = 0;
        } else {
            s6 = $(this).val();
        }
    }
    onFileChange();
});
$("#s7").bind("change paste keyup", function() {
    if (parseFloat($(this).val()) >= 100) {
        alert(">100");
        $("#s7").val("");
        s7 = 0;
    } else {
        if ($(this).val() == "") {
            s7 = 0;
        } else {
            s7 = $(this).val();
        }
    }
    onFileChange();
});
$("#s8").bind("change paste keyup", function() {
    if (parseFloat($(this).val()) >= 100) {
        alert(">100");
        $("#s8").val("");
        s8 = 0;
    } else {
        if ($(this).val() == "") {
            s8 = 0;
        } else {
            s8 = $(this).val();
        }
    }
    onFileChange();
});

$(function() {
    $('.my-select').selectpicker();
});
var selected;

function d() {
    selected = $("#multiple option:selected").text();
    console.log($("#multiple option:selected").text());
    if (selected.includes("Acueducto (Agua)")) {
        console.log("YESS");
    }
}

$(document).ready(function() {
    $("#myModal").modal('show');
});