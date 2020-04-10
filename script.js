//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

jQuery.validator.addMethod("customEmail", function(value, element) {
    return this.optional(element) || /^[a-zA-Z0-9._-]+@[unal.edu.co]{11}$/i.test(value);
}, "Please enter valid emaildd address!");

$(".next").click(function() {
    $('#msform').validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            // fnames: "required",
            // lnames: "required",
            // email: {
            //     required: true,
            //     // Specify that email should be validated
            //     // by the built-in "email" rule
            //     email: false,
            //     customEmail: true
            // },
            // phone1: {
            //     required: true,
            //     digits: true
            // },
            // ident: "required",
            // identType: {
            //     required: true
            // },
            // procedencia: "required",
            // departamento: "required",
            // ciudad: "required",
            // lat: "required",
            // long: "required",
            // direccion: "required",

        },
        // Specify validation error messages
        messages: {
            fnames: "Introduce tus nombres",
            lnames: "Introduce tus apellidos",
            email: "Introduce tu correo institucional",
            phone1: "Introduce tu teléfono principal",
            phone2: "Introduce tu teléfono secundario",
            ident: "Introduce tu documento de indetificación",
            identType: "Escoge tu tipo de documento",
            procedencia: "Escoge tu lugar de procedencia",
            departamento: "Escoge el departamento donde te encuentras",
            ciudad: "Escribe la ciudad donde te encuentras",
            lat: "Ubiquese en el mapa",
            long: "Ubiquese en el mapa",
            direccion: "Introduce tu dirección",
        },

    });
    if (!$('#msform').valid()) {
        return false;
    }
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    $(window).scrollTop(0);
    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1;
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
        duration: 600,
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
    $(window).scrollTop(0);
    //de-activate current step on progressbar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    $(window).scrollTop(0);
    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 1;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({ 'left': left });
            previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
        },
        duration: 600,
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
var lat = 4.634771;
var long = -74.081599;
mymap.on('click', function(ev) {
    var coordinates = mymap.mouseEventToLatLng(ev.originalEvent);
    console.log(coordinates.lat + ', ' + coordinates.lng);
    document.getElementById('lat').value = coordinates.lat;
    document.getElementById('long').value = coordinates.lng;
    lat = coordinates.lat;
    long = coordinates.lng;
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
    var field7 = $("#identType option:selected").text() == "Seleccione" ? '' : $("#identType option:selected").text();
    var field8 = $("#procedencia option:selected").text() == "Seleccione" ? '' : $("#procedencia option:selected").text();
    var field9 = $("#departamento option:selected").text() == "Seleccione" ? '' : $("#departamento option:selected").text();
    var field10 = $("#ciudad").val();
    var field11 = $("#viajar option:selected").text() == "Seleccione" ? '' : $("#viajar option:selected").text();
    var field12 = $("#calOnlyDate").val();
    var field13 = lat;
    var field14 = long;
    var field15 = $("#direccion").val();
    var field16 = $("#direccion2").val();
    var field17 = $("#desplazado option:selected").text() == "Seleccione" ? '' : $("#desplazado option:selected").text();
    var field18 = $("#fnaturales option:selected").text() == "Seleccione" ? '' : $("#fnaturales option:selected").text();
    var field19 = $("#discapacidad option:selected").text() == "Seleccione" ? '' : $("#discapacidad option:selected").text();
    var field20 = $("#certificada option:selected").text() == "Seleccione" ? '' : $("#certificada option:selected").text();
    var field21 = $("#hijos option:selected").text() == "Seleccione" ? '' : $("#hijos option:selected").text();
    var field22 = $("#embarazo option:selected").text() == "Seleccione" ? '' : $("#embarazo option:selected").text();
    var field23 = $("#grupoe option:selected").text() == "Seleccione" ? '' : $("#grupoe option:selected").text();
    var field24 = s1;
    var field25 = s2;
    var field26 = s3;
    var field27 = s4;
    var field28 = s5;
    var field29 = s6;
    var field30 = s7;
    var field31 = s8;
    var field32 = ingresos;
    var field33 = s11;
    var field34 = s22;
    var field35 = s33;
    var field36 = s44;
    var field37 = s55;
    var field38 = s66;
    var field39 = s77;
    var field40 = s88;
    var field41 = $("#convive option:selected").text() == "Seleccione" ? '' : $("#convive option:selected").text();
    var field42 = $("#situacion option:selected").text() == "Seleccione" ? '' : $("#situacion option:selected").text();
    var field43 = $("#dificultades option:selected").text() == "Seleccione" ? '' : $("#dificultades option:selected").text();
    var field44 = acueducto;
    var field45 = alcant;
    var field46 = elect;
    var field47 = gas;
    var field48 = comp;
    var field49 = acces;
    var field50 = estf;
    var field51 = nev;
    var field52 = cong;
    var field53 = horn;
    var field54 = licuad;
    var field55 = ollap;
    var field56 = gasto;
    var field57 = biebog;
    var field58 = biefac;
    var field59 = sedepre;
    var field60 = ofcenl;
    var field61 = inicest;
    var field62 = inicdoc;
    var field63 = inicegr;
    var field64 = $("#apoyos option:selected").text() == "Seleccione" ? '' : $("#apoyos option:selected").text();
    var field65 = $("#apoyos2 option:selected").text() == "Seleccione" ? '' : $("#apoyos2 option:selected").text();
    var field652 = $("#nombreOrg").val();
    var field66 = $("#SISBEN option:selected").text() == "Seleccione" ? '' : $("#SISBEN option:selected").text();
    var field67 = puntSISB;
    var field68 = $("#EPS").val();
    var field69 = $("#portabilidad option:selected").text() == "Seleccione" ? '' : $("#portabilidad option:selected").text();
    var field70 = $("#consumidor option:selected").text() == "Seleccione" ? '' : $("#consumidor option:selected").text();
    var field71 = $("#consumo option:selected").text() == "Seleccione" ? '' : $("#consumo option:selected").text();
    var field72 = $("#apoyoc option:selected").text() == "Seleccione" ? '' : $("#apoyoc option:selected").text();
    var field73 = durmiendo;
    var field74 = $("#descanso option:selected").text() == "Seleccione" ? '' : $("#descanso option:selected").text();
    var field75 = $("#tristeza option:selected").text() == "Seleccione" ? '' : $("#tristeza option:selected").text();
    var field76 = $("#Aislamiento option:selected").text() == "Seleccione" ? '' : $("#Aislamiento option:selected").text();
    var field77 = $("#desesperanza option:selected").text() == "Seleccione" ? '' : $("#desesperanza option:selected").text();
    var field78 = $("#enojo option:selected").text() == "Seleccione" ? '' : $("#enojo option:selected").text();
    var field79 = $("#ansiedad option:selected").text() == "Seleccione" ? '' : $("#ansiedad option:selected").text();
    var field80 = $("#deseos option:selected").text() == "Seleccione" ? '' : $("#deseos option:selected").text();
    var field81 = $("#suicidas option:selected").text() == "Seleccione" ? '' : $("#suicidas option:selected").text();
    var field82 = $("#Dolor option:selected").text() == "Seleccione" ? '' : $("#Dolor option:selected").text();
    var field83 = $("#agotamiento option:selected").text() == "Seleccione" ? '' : $("#agotamiento option:selected").text();
    var field84 = $("#apetito option:selected").text() == "Seleccione" ? '' : $("#apetito option:selected").text();
    var field85 = $("#digestivos option:selected").text() == "Seleccione" ? '' : $("#digestivos option:selected").text();
    var field86 = $("#sueo option:selected").text() == "Seleccione" ? '' : $("#sueo option:selected").text();
    var field87 = $("#emergencia option:selected").text() == "Seleccione" ? '' : $("#emergencia option:selected").text();
    var field88 = $("#recibiendo option:selected").text() == "Seleccione" ? '' : $("#recibiendo option:selected").text();
    var field89 = $("#necesita option:selected").text() == "Seleccione" ? '' : $("#necesita option:selected").text();
    var field899 = $("#atenciónssssx option:selected").text() == "Seleccione" ? '' : $("#atenciónssssx option:selected").text();
    var field90 = EPOC;
    var field901 = Asma;
    var field902 = Hiper;
    var field903 = Diabetes;
    var field904 = Cncer;
    var field905 = fermeda;
    var field906 = lter;
    var field907 = Otra;
    var field9071 = $("#otracroncxx").val();
    var field908 = Ninguna;
    var field91 = $("#medicado option:selected").text() == "Seleccione" ? '' : $("#medicado option:selected").text();
    var field92 = $("#bueno option:selected").text() == "Seleccione" ? '' : $("#bueno option:selected").text();
    var field93 = $("#conoce option:selected").text() == "Seleccione" ? '' : $("#conoce option:selected").text();
    var field94 = $("#gente option:selected").text() == "Seleccione" ? '' : $("#gente option:selected").text();
    var field95 = $("#expresar option:selected").text() == "Seleccione" ? '' : $("#expresar option:selected").text();
    var field96 = $("#libre option:selected").text() == "Seleccione" ? '' : $("#libre option:selected").text();
    var field961 = Familia;
    var field962 = Amigos;
    var field963 = Universidad;
    var field964 = Docentes;
    var field965 = Administrativos;
    var field966 = Vecinos;
    var field967 = Organizaciones;
    var field968 = Ninguno;
    var field97 = $("#sentimientos option:selected").text() == "Seleccione" ? '' : $("#sentimientos option:selected").text();
    var field98 = $("#afectivas option:selected").text() == "Seleccione" ? '' : $("#afectivas option:selected").text();
    var field99 = $("#vida option:selected").text() == "Seleccione" ? '' : $("#vida option:selected").text();
    var field100 = $("#tnico option:selected").text() == "Seleccione" ? '' : $("#tnico option:selected").text();
    var field101 = $("#origens option:selected").text() == "Seleccione" ? '' : $("#origens option:selected").text();
    var field102 = $("#conflictos option:selected").text() == "Seleccione" ? '' : $("#conflictos option:selected").text();
    var field103 = $("#Gnero option:selected").text() == "Seleccione" ? '' : $("#Gnero option:selected").text();
    var field104 = $("#sexuals option:selected").text() == "Seleccione" ? '' : $("#sexuals option:selected").text();
    var field105 = $("#Otraxc option:selected").text() == "Seleccione" ? '' : $("#Otraxc option:selected").text();
    var field106 = $("#otrra").val();
    var field107 = avance;
    var field108 = contenidos;
    var field109 = metodologia;
    var field110 = activida;
    var field111 = $("#dificultadessss option:selected").text() == "Seleccione" ? '' : $("#dificultadessss option:selected").text();
    var field112 = $("#textos option:selected").text() == "Seleccione" ? '' : $("#textos option:selected").text();
    var field113 = $("#tiempo option:selected").text() == "Seleccione" ? '' : $("#tiempo option:selected").text();
    var field114 = $("#otrosxc option:selected").text() == "Seleccione" ? '' : $("#otrosxc option:selected").text();
    var field115 = $("#operacionesx option:selected").text() == "Seleccione" ? '' : $("#operacionesx option:selected").text();
    var field116 = $("#momentoss option:selected").text() == "Seleccione" ? '' : $("#momentoss option:selected").text();
    var field117 = $("#deporte option:selected").text() == "Seleccione" ? '' : $("#deporte option:selected").text();
    var field118 = $("#principalxxx option:selected").text() == "Seleccione" ? '' : $("#principalxxx option:selected").text();
    var field119 = $("#residesss option:selected").text() == "Seleccione" ? '' : $("#residesss option:selected").text();
    var field120 = $("#culturalsss option:selected").text() == "Seleccione" ? '' : $("#culturalsss option:selected").text();
    var field121 = $("#practicabaxx option:selected").text() == "Seleccione" ? '' : $("#practicabaxx option:selected").text();
    var field122 = $("#actividadscss option:selected").text() == "Seleccione" ? '' : $("#actividadscss option:selected").text();
    var field123 = $("#Comentariosxx").val();


    $.ajax({
        url: "https://docs.google.com/forms/d/e/1FAIpQLSfzvMaSrQ3av-zHwDbgsiuNo01Vvo4Zl6nnwhsx1Y67oG-L9w/formResponse?",
        data: {
            "entry.63239375": field1,
            "entry.1657029345": field2,
            "entry.2116409393": field3,
            "entry.1488905014": field4,
            "entry.625134310": field5,
            "entry.296721696": field6,
            "entry.1783679049": field7,
            "entry.572159507": field8,
            "entry.949462633": field9,
            "entry.993142050": field10,
            "entry.1357354671": field11,
            "entry.244694180": field12,
            "entry.1746041750": field13 + "," + field14,
            "entry.1296630800": field15,
            "entry.1192925202": field16,
            "entry.270039355": field17,
            "entry.1890282427": field18,
            "entry.1075300217": field19,
            "entry.1935229610": field20,
            "entry.939462389": field21,
            "entry.198443173": field22,
            "entry.1186600724": field23,
            "entry.1578912813": field24,
            "entry.1884854998": field25,
            "entry.557155323": field26,
            "entry.397859611": field27,
            "entry.202719196": field28,
            "entry.652175737": field29,
            "entry.1934925109": field30,
            "entry.2084707201": field31,
            "entry.33009119": field32,
            "entry.546445831": field33,
            "entry.1643167239": field34,
            "entry.2131812851": field35,
            "entry.690253575": field36,
            "entry.1410830964": field37,
            "entry.835326598": field38,
            "entry.449338845": field39,
            "entry.1510232298": field40,
            "entry.876190699": field41,
            "entry.1780490293": field42,
            "entry.1216315286": field43,
            "entry.1872084796": field44,
            "entry.1808827953": field45,
            "entry.1987616593": field46,
            "entry.182456937": field47,
            "entry.175054468": field48,
            "entry.551781470": field49,
            "entry.1953301116": field50,
            "entry.1488842576": field51,
            "entry.235626117": field52,
            "entry.267851069": field53,
            "entry.312527539": field54,
            "entry.734447041": field55,
            "entry.1736797025": field56,
            "entry.1132064888": field57,
            "entry.741842804": field58,
            "entry.280634950": field59,
            "entry.641818861": field60,
            "entry.245314995": field61,
            "entry.1241573090": field62,
            "entry.1041653785": field63,
            "entry.666783339": field64,
            "entry.1232687743": field65,
            "entry.1240816135": field652,
            "entry.1031260405": field66,
            "entry.2071298946": field67,
            "entry.1885844296": field68,
            "entry.1040836054": field69,
            "entry.736246518": field70,
            "entry.1690344826": field71,
            "entry.1216340233": field72,
            "entry.1583336159": field73,
            "entry.1470948377": field74,
            "entry.237743306": field75,
            "entry.633088828": field76,
            "entry.370629063": field77,
            "entry.599395758": field78,
            "entry.2006398351": field79,
            "entry.754804040": field80,
            "entry.1032834224": field81,
            "entry.2054972484": field82,
            "entry.2012718046": field83,
            "entry.459287686": field84,
            "entry.92958207": field85,
            "entry.1062334295": field86,
            "entry.1119522594": field87,
            "entry.1505427679": field88,
            "entry.638904233": field89,
            "entry.1049260498": field899,
            "entry.848595781": field90,
            "entry.973541792": field901,
            "entry.1838340259": field902,
            "entry.791358865": field903,
            "entry.1929832113": field904,
            "entry.891379331": field905,
            "entry.310545802": field906,
            "entry.1618015468": field907,
            "entry.1611815189": field9071,
            "entry.17735485": field908,
            "entry.26211303": field91,
            "entry.1005258058": field92,
            "entry.1916481191": field93,
            "entry.946705736": field94,
            "entry.560763160": field95,
            "entry.2140856534": field96,
            "entry.1967738068": field961,
            "entry.1677701240": field962,
            "entry.128622296": field963,
            "entry.880475679": field964,
            "entry.1620525830": field965,
            "entry.382780459": field966,
            "entry.722534779": field967,
            "entry.1602932697": field968,
            "entry.1940773056": field97,
            "entry.317011737": field98,
            "entry.705130837": field99,
            "entry.701580189": field100,
            "entry.1361834887": field101,
            "entry.412699393": field102,
            "entry.2100127934": field103,
            "entry.1718266099": field104,
            "entry.1579842858": field105,
            "entry.657673320": field106,
            "entry.887329038": field107,
            "entry.2073018581": field108,
            "entry.1269299118": field109,
            "entry.334425939": field110,
            "entry.1850576392": field111,
            "entry.462370468": field112,
            "entry.1212104280": field113,
            "entry.1691713046": field114,
            "entry.128028503": field115,
            "entry.1558555179": field116,
            "entry.1556264042": field117,
            "entry.487711132": field118,
            "entry.1771198517": field119,
            "entry.2131863278": field120,
            "entry.1321957669": field121,
            "entry.385170939": field122,
            "entry.811313855": field123
        },
        type: "GET",
        dataType: "jsonp",
        success: function(d) {
            alert("Formulario enviado con exito");

        },
        error: function(x, y, z) {
            //document.getElementById("dadaada").innerHTML = "Tiempo en responder el formulario: " + seconds + " segundos.";
            console.log("ESO");

        }
    });
    $("#myModal2").modal('show');
    return false;
}


function showDiv(divId, element) {
    document.getElementById(divId).style.display = element.value == 2 ? 'block' : 'none';
}

function showDiv2(divId, element) {
    document.getElementById(divId).style.display = element.value != 1 ? 'block' : 'none';
}

function showDiv3(divId, element) {
    document.getElementById(divId).style.display = element.value == 1 ? 'block' : 'none';
}

function showDiv4(divId, element) {
    document.getElementById(divId).style.display = element.value == 0 ? 'block' : 'none';
}


function showDiv6(divId, element) {
    var control1 = $("#emergencia option:selected").val();
    var control2 = $("#recibiendo option:selected").val();
    total = parseInt(control1 + control2);
    console.log(total);
    document.getElementById(divId).style.display = total != 0 ? 'block' : 'none';
    //mi solucion, un funcion que sume todos los select si != 0, mostrarlo
}

function showDiv7(divId, element) {
    document.getElementById(divId).style.display = element.value == 3 ? 'block' : 'none';
}

function showDiv8(divId, element) {
    document.getElementById(divId).style.display = element.value == 2 ? 'block' : 'none';
}

function showDiv9(divId, element) {
    document.getElementById(divId).style.display = element.value == 2 ? 'block' : 'none';
}

function showDiv10(divId, element) {
    document.getElementById(divId).style.display = element.value == 4 ? 'block' : 'none';
}

function showDiv11(divId, element) {
    document.getElementById(divId).style.display = element.value == 1 ? 'block' : 'none';
}

function showDiv22(divId, element) {
    document.getElementById(divId).style.display = element.value == 1 ? 'block' : 'none';
}


function showDiv12(divId, element) {
    var control1 = $("#tristeza option:selected").val();
    var control2 = $("#Aislamiento option:selected").val();
    var control3 = $("#desesperanza option:selected").val();
    var control4 = $("#enojo option:selected").val();
    var control5 = $("#ansiedad option:selected").val();
    var control6 = $("#deseos option:selected").val();
    var control7 = $("#suicidas option:selected").val();
    total = parseInt(control1 + control2 + control3 + control4 + control5 + control6 + control7);
    console.log(total);
    document.getElementById(divId).style.display = total != 0 ? 'block' : 'none';
    //mi solucion, un funcion que sume todos los select si != 0, mostrarlo
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
    if (percentage > 100) {
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
    if (parseFloat($(this).val()) > 100) {
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
    if (parseFloat($(this).val()) > 100) {
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
    if (parseFloat($(this).val()) > 100) {
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
    if (parseFloat($(this).val()) > 100) {
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
    if (parseFloat($(this).val()) > 100) {
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
    if (parseFloat($(this).val()) > 100) {
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
    if (parseFloat($(this).val()) > 100) {
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
    if (parseFloat($(this).val()) > 100) {
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

var s11 = 0;
var s22 = 0;
var s33 = 0;
var s44 = 0;
var s55 = 0;
var s66 = 0;
var s77 = 0;
var s88 = 0;
$("#s11").bind("change paste keyup", function() {
    if (parseFloat($(this).val()) > 100) {
        alert(">100");
        $("#s11").val("");
        s11 = 0;
    } else {
        if ($(this).val() == "") {
            s11 = 0;
        } else {
            s11 = $(this).val();
        }
    }

});
$("#s22").bind("change paste keyup", function() {
    if (parseFloat($(this).val()) > 100) {
        alert(">100");
        $("#s22").val("");
        s22 = 0;
    } else {
        if ($(this).val() == "") {
            s22 = 0;
        } else {
            s22 = $(this).val();
        }
    }
});
$("#s33").bind("change paste keyup", function() {
    if (parseFloat($(this).val()) > 100) {
        alert(">100");
        $("#s33").val("");
        s33 = 0;
    } else {
        if ($(this).val() == "") {
            s33 = 0;
        } else {
            s33 = $(this).val();
        }
    }
});
$("#s44").bind("change paste keyup", function() {
    if (parseFloat($(this).val()) > 100) {
        alert(">100");
        $("#s44").val("");
        s44 = 0;
    } else {
        if ($(this).val() == "") {
            s44 = 0;
        } else {
            s44 = $(this).val();
        }
    }
});
$("#s55").bind("change paste keyup", function() {
    if (parseFloat($(this).val()) > 100) {
        alert(">100");
        $("#s55").val("");
        s55 = 0;
    } else {
        if ($(this).val() == "") {
            s55 = 0;
        } else {
            s55 = $(this).val();
        }
    }
});
$("#s66").bind("change paste keyup", function() {
    if (parseFloat($(this).val()) > 100) {
        alert(">100");
        $("#s66").val("");
        s66 = 0;
    } else {
        if ($(this).val() == "") {
            s66 = 0;
        } else {
            s66 = $(this).val();
        }
    }
});
$("#s77").bind("change paste keyup", function() {
    if (parseFloat($(this).val()) > 100) {
        alert(">100");
        $("#s77").val("");
        s77 = 0;
    } else {
        if ($(this).val() == "") {
            s77 = 0;
        } else {
            s77 = $(this).val();
        }
    }
});
$("#s88").bind("change paste keyup", function() {
    if (parseFloat($(this).val()) > 100) {
        alert(">100");
        $("#s8").val("");
        s88 = 0;
    } else {
        if ($(this).val() == "") {
            s88 = 0;
        } else {
            s88 = $(this).val();
        }
    }
});

$(function() {
    $('.my-select').selectpicker();
});
var acueducto = "No";
var alcant = "No";
var elect = "No";
var gas = "No";
var comp = "No";
var acces = "No";

function servicios() {
    selected = $("#servicios option:selected").text();
    console.log($("#servicios option:selected").text());
    if (selected.includes("Acueducto (Agua)")) {
        acueducto = "Si";
    } else {
        acueducto = "No";
    }
    if (selected.includes("Alcantarillado")) {
        alcant = "Si";
    } else {
        alcant = "No";
    }
    if (selected.includes("Electricidad")) {
        elect = "Si";
    } else {
        elect = "No";
    }
    if (selected.includes("Gas natural")) {
        gas = "Si";
    } else {
        gas = "No";
    }
    if (selected.includes("Computador")) {
        comp = "Si";
    } else {
        comp = "No";
    }
    if (selected.includes("Acceso a internet")) {
        acces = "Si";
    } else {
        acces = "No";
    }
}

var estf = "No";
var nev = "No";
var cong = "No";
var horn = "No";
var licuad = "No";
var ollap = "No";

function electrod() {
    selected = $("#electrodo option:selected").text();
    console.log($("#electrodo option:selected").text());
    if (selected.includes("Estufa")) {
        estf = "Si";
    } else {
        estf = "No";
    }
    if (selected.includes("Nevera o refrigerador")) {
        nev = "Si";
    } else {
        nev = "No";
    }
    if (selected.includes("Congelador")) {
        cong = "Si";
    } else {
        cong = "No";
    }
    if (selected.includes("Horno microondas")) {
        horn = "Si";
    } else {
        horn = "No";
    }
    if (selected.includes("Licuadora")) {
        licuad = "Si";
    } else {
        licuad = "No";
    }
    if (selected.includes("Olla a presión")) {
        ollap = "Si";
    } else {
        ollap = "No";
    }
    console.log(estf + nev + cong + horn + licuad + ollap);
}

var biebog = "No";
var biefac = "No";
var sedepre = "No";
var ofcenl = "No";
var inicest = "No";
var inicdoc = "No";
var inicegr = "No";

function apoyosxd() {
    selected = $("#apoyosx option:selected").text();
    console.log($("#apoyosx option:selected").text());
    if (selected.includes("Bienestar de Sede Bogota")) {
        biebog = "Si";
    } else {
        biebog = "No";
    }
    if (selected.includes("Bienestar de Facultad")) {
        biefac = "Si";
    } else {
        biefac = "No";
    }
    if (selected.includes("Sede de Presencia Nacional")) {
        sedepre = "Si";
    } else {
        sedepre = "No";
    }
    if (selected.includes("Oficina de Enlace")) {
        ofcenl = "Si";
    } else {
        ofcenl = "No";
    }
    if (selected.includes("Iniciativas estudiantiles")) {
        inicest = "Si";
    } else {
        inicest = "No";
    }
    if (selected.includes("Iniciativas docentes")) {
        inicdoc = "Si";
    } else {
        inicdoc = "No";
    }
    if (selected.includes("Iniciativas de egresados")) {
        inicegr = "Si";
    } else {
        inicegr = "No";
    }
    console.log(biebog + biefac + sedepre + ofcenl + inicest + inicdoc + inicegr);
}

var contenidos = "No";
var metodologia = "No";
var activida = "No";
var nna = "No";

function dificcc() {
    selected = $("#difccs option:selected").text();
    console.log($("#difccs option:selected").text());
    if (selected.includes("Ninguna")) {
        $('.my-select3').selectpicker('deselectAll');
        nna = "Si";
    } else {
        nna = "No";
    }
    if (selected.includes("Los contenidos de las asignaturas que curso")) {
        contenidos = "Si";
    } else {
        contenidos = "No";
    }
    if (selected.includes("La metodología de las asignaturas que curso")) {
        metodologia = "Si";
    } else {
        metodologia = "No";
    }
    if (selected.includes("Actividades evaluables")) {
        activida = "Si";
    } else {
        activida = "No";
    }
    console.log(contenidos + metodologia + activida);
}
var seconds = 0;
var EPOC = "No";
var Asma = "No";
var Hiper = "No";
var Diabetes = "No";
var Cncer = "No";
var fermeda = "No";
var lter = "No";
var Otra = "No";
var Ninguna = "No";

function crnicax(divId, element) {
    selected = $("#crnica option:selected").text();
    console.log($("#crnica option:selected").text());
    if (selected.includes("Ninguna")) {
        $('.my-select1').selectpicker('deselectAll');
        $('.my-select1').selectpicker('val', 'Ninguna');
        Ninguna = "Si";
    } else {
        Ninguna = "No";
    }
    if (selected.includes("Otra")) {
        document.getElementById(divId).style.display = 'block';
        Otra = "Si";
    } else {
        document.getElementById(divId).style.display = 'none';
        Otra = "No";
    }
    if (selected.includes("EPOC- Enfermedad Pulmonar Obstructiva Crónica")) {
        EPOC = "Si";
    } else {
        EPOC = "No";
    }
    if (selected.includes("Asma")) {
        Asma = "Si";
    } else {
        Asma = "No";
    }
    if (selected.includes("Hipertensión arterial")) {
        Hiper = "Si";
    } else {
        Hiper = "No";
    }
    if (selected.includes("Diabetes")) {
        Diabetes = "Si";
    } else {
        Diabetes = "No";
    }
    if (selected.includes("Cáncer")) {
        Cncer = "Si";
    } else {
        Cncer = "No";
    }
    if (selected.includes("Enfermedades autoinmunes")) {
        fermeda = "Si";
    } else {
        fermeda = "No";
    }
    if (selected.includes("Alteraciones inmunológicas")) {
        lter = "Si";
    } else {
        lter = "No";
    }
}
var Familia = "No";
var Amigos = "No";
var Universidad = "No";
var Docentes = "No";
var Administrativos = "No";
var Vecinos = "No";
var Organizaciones = "No";
var Ninguno = "No";

function apoyosper() {
    selected = $("#apoyospersonalll option:selected").text();
    console.log($("#apoyospersonalll option:selected").text());
    if (selected.includes("Ninguno")) {
        $('.my-select2').selectpicker('deselectAll');
        Ninguno = "Si";
    } else {
        Ninguno = "No";
    }
    if (selected.includes("Familia")) {
        Familia = "Si";
    } else {
        Familia = "No";
    }
    if (selected.includes("Amigos y/o pareja")) {
        Amigos = "Si";
    } else {
        Amigos = "No";
    }
    if (selected.includes("Compañeros de Universidad")) {
        Universidad = "Si";
    } else {
        Universidad = "No";
    }
    if (selected.includes("Docentes")) {
        Docentes = "Si";
    } else {
        Docentes = "No";
    }
    if (selected.includes("Administrativos")) {
        Administrativos = "Si";
    } else {
        Administrativos = "No";
    }
    if (selected.includes("Vecinos autoinmunes")) {
        Vecinos = "Si";
    } else {
        Vecinos = "No";
    }
    if (selected.includes("Organizaciones")) {
        Organizaciones = "Si";
    } else {
        Organizaciones = "No";
    }

}
window.setInterval((function() {
    var start = Date.now();
    return function() {
        seconds = Math.floor((Date.now() - start) / 1000);
    };
}()), 1000);

$(document).ready(function() {
    $("#myModal").modal('show');

});
$(document).on("wheel", "input[type=number]", function(e) {
    $(this).blur();
});
$('#direccion').change(function() {
    if (!($(this).val().includes("#") || $(this).val().includes("-"))) {
        alert("Su dirección debe contener los carácteres # y/o -");
        $("#direccion").val("");
        s8 = 0;
    }
});
var durmiendo = 0;
$('#durmiendo').change(function() {
    if (!(parseInt($(this).val()) >= 0 && parseInt($(this).val()) <= 24)) {
        alert("Debe introducir un valor entre 0 y 24");
        $("#durmiendo").val("");
        durmiendo = 0;
    } else if ($(this).val().includes(".") || $(this).val().includes(",") || $(this).val().includes("-")) {
        alert("Solo debe ingresar numeros enteros positivos");
        $("#durmiendo").val("");
        durmiendo = 0;
    } else {
        durmiendo = $(this).val();
    }
});
var puntSISB = "";
$('#puntajeSISBEN').change(function() {
    if (!(parseInt($(this).val()) >= 0 && parseInt($(this).val()) <= 100)) {
        alert("El valor debe estar entre 0 y 100");
        $("#puntajeSISBEN").val("");
        puntSISB = "";
    } else {
        puntSISB = $(this).val();
    }
});
var avance = "";
$('#avance').change(function() {
    if (!(parseInt($(this).val()) >= 0 && parseInt($(this).val()) < 100)) {
        alert("El valor debe estar entre 0 y menor que 100");
        $("#avance").val("");
        avance = 0;
    } else if ($(this).val().includes("%")) {
        alert("No incluya el simbolo %");
        $("#avance").val("");
        avance = 0;
    } else {
        avance = $(this).val();
    }
});
var ingresos = "";
$('#ingresos').change(function() {
    if ($(this).val().includes(".") || $(this).val().includes(",") || $(this).val().includes("-") || $(this).val().includes("$")) {
        alert("Solo introduzca valores enteros");
        $("#ingresos").val("");
    } else {
        ingresos = $(this).val();
    }
});
var gasto = "";
$('#gasto').change(function() {
    if ($(this).val().includes(".") || $(this).val().includes(",") || $(this).val().includes("-") || $(this).val().includes("$")) {
        alert("Solo introduzca valores enteros");
        $("#gasto").val("");
    } else {
        gasto = $(this).val();
    }
});
$("#calOnlyDate").datetimepicker({
    minDate: new Date(),
    maxDate: '2020-06-01',
    format: 'DD/MM/YYYY'
});


$(document).keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        event.preventDefault();
        return false;
    }
});