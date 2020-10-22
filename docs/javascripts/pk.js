// insertar en el html
// ====================================================================
//
// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
// <script>      $SCRIPT_ROOT = {{ request.script_root|tojson|safe }};</script>
// <script src="js/dat.gui.js"></script>
// <script src="js/pk.js"></script>
//
//
//
//
// ====================================================================
//
// =======================================================
// =======================================================
// =======================================================

function ccargar(evt) {
  var files = evt.target.files; // FileList object

  // files is a FileList of File objects. List some properties.
  var output = [];
  for (var i = 0, f; (f = files[i]); i++) {
    // if (!f.type.match('*.kwm')) {
    //   continue;
    // }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function (theFile) {
      function actualizapanel() {
        text.Proyecto = json.Proyecto;
        gi.latitud = json.latitud;
        gi.orientacion = json.orientacion;
        gi.inclinacion = json.inclinacion;
      }
      return function (e) {
        console.log("e readAsText = ", e);
        console.log("e readAsText target = ", e.target);
        try {
          json = JSON.parse(e.target.result);
          // alert(
          //   "json global var has been set to parsed json of this file here it is unevaled = \n" +
          //     JSON.stringify(json)
          // );
          actualizapanel();
          setValue();
        } catch (ex) {
          alert("ex when trying to parse json = " + ex);
        }
      };
    })(f);
    reader.readAsText(f);
  }
}

// =======================================================
// =======================================================
// =======================================================
var x = document.getElementsByClassName("md-header-nav")[0];
var button = document.createElement("a");
button.type = "a";
button.id = "impresora";
button.innerHTML =
  '<a href=""> \
    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-printer-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> \
    <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5z"/> \
    <path fill-rule="evenodd" d="M11 9H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"/> \
    <path fill-rule="evenodd" d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/> \
  </svg> \
   </i></a>';
button.className = "md-content__button md-icon";
button.title = "Imprimir documento";
button.onclick = function () {
  window.print();
};
x.append(button);

// =======================================================
// =======================================================
// =======================================================
// var x =document.getElementsByClassName("md-header-nav")[0]
// var button2 = document.createElement("a");
// button2.type = "a";
// button2.innerHTML =
// '<a href=""> \
// <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-download" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> \
// <path fill-rule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/> \
// <path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/> \
// </svg> \
// </i></a>';
// button2.className = "md-content__button2 md-icon";
// button2.title = "Archivar Parametros";
// button2.onclick = function () {
//     aarchivar();
// };
// x.append(button2);

// var x =document.getElementsByClassName("md-header-nav")[0]
// var button3 = document.createElement("a");
// button3.type = "a";
// button3.innerHTML =
// '<a href=""> \
// <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-upload" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> \
// <path fill-rule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/> \
// <path fill-rule="evenodd" d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/> \
// </svg> \
// </i></a>';
// button3.className = "md-content__button3 md-icon";
// button3.title = "Leer Parametros ";
// button3.onclick = function () {
//     ii.click();
// };
// x.append(button3);

var xx = document.getElementsByClassName("md-sidebar md-sidebar--secondary")[0];
// var xx = document.getElementsByClassName("md-container")[0];
var data = document.createElement("p");
data.type = "p";
// data.innerHTML = "imprime";
// data.innerHTML = '<a href=""><i class = "fa fa-print"> </i></a>';
data.innerHTML = "<p>PROYECTO</p>";
data.className = "btn-styled";
data.title = "nombre del proyecto";
data.id = "data";
// var x =document.getElementsByClassName("md-header-nav")[0]

xx.prepend(data);

// =======================================================
// =======================================================
// =======================================================

function aarchivar() {
  var data = {
    Proyecto: text.Proyecto,
    latitud: gi.latitud,
    orientacion: gi.orientacion,
    inclinacion: gi.inclinacion,
  };
  var jsonData = JSON.stringify(data);
  // download(jsonData, "1kwm2.json", "text/plain");
  var file = new Blob([jsonData], { type: "text/plain" });
  saveAs(file, text.Proyecto + ".kwm");
}

// =======================================================
// === tit   =============================================
// =======================================================

var data = document.getElementById("data");
var text;

var sampleText = function () {
  this.Proyecto = "Proyecto ";
  this.color = "#0000ff";
  this.fontSize = 16;
  this.border = false;
  this.fontFamily = "sans-serif";
};

text = new sampleText();
data.innerHTML = text.Proyecto;
// var gui = new dat.GUI();
// gui.addColor(text, 'color').onChange(setValue);
// gui.add(text, 'fontSize', 6, 48).onChange(setValue);
// gui.add(text, 'border').onChange(setValue);
// gui.add(text, 'fontFamily',["sans-serif", "serif", "cursive", "ＭＳ 明朝", "monospace"]).onChange(setValue);

//設定更新処理
function setValue() {
  data.innerHTML = text.Proyecto;
  data.style.color = text.color;
  data.style.fontSize = text.fontSize + "px";
  data.style.fontFamily = text.fontFamily;
}
// =======================================================
// === G U I =============================================
// =======================================================

// =======================================================

var step = 0;
// funciones
gi = new (function () {
  this.latitud = 44;
  this.inclinacion = 34;
  this.orientacion = 0;
  this.IMPRIMIR = function () {
    window.print();
  };
  this.APLICAR = function () {
    fetchdata();
  };
  this.Archivar = function () {
    aarchivar();
  };
  this.Leer_Archivo = function () {
    ii.click();
  };
})();

// =======================================================

//
//  panel
var gui = new dat.GUI({ autoPlace: true });
// dat.GUI.toggleHide();
gui.closed = true;
document.getElementsByClassName("md-header")[0].appendChild(gui.domElement);
gui.add(text, "Proyecto").onChange(setValue).listen();
const gui1 = gui.addFolder("Posicion de los paneles FV");
gui1.add(gi, "latitud", 0, 90).step(1).listen().onFinishChange(fetchdata);
gui1
  .add(gi, "orientacion", -180, 180)
  .step(1)
  .listen()
  .onFinishChange(fetchdata);
gui1.add(gi, "inclinacion", 0, 90).step(1).listen().onFinishChange(fetchdata);
gui.add(gi, "Archivar");
gui.add(gi, "Leer_Archivo");
// =======================================================
// =======================================================
// =======================================================
var ii = document.createElement("input");
ii.type = "file";
ii.accept = ".kwm";
ii.id = "fileInput";
ii.addEventListener("change", ccargar, false);
//
//

// =======================================================
// === AJAX ==============================================
// =======================================================

function fetchdata() {
  // $.getJSON(
  console.log(gi.latitud, gi.orientacion, gi.inclinacion);
  //   $SCRIPT_ROOT + "/jjson",
  //   {
  //     latitud: gi.latitud,
  //   },
  //   function (data) {
  //     $("#x_aproximado").text(data.x_aproximado);
  //     $("#n_inversores").html(data.n_inversores);
  //     $("#model_plot").html(data.model_plot);
  //   }
  // );
}

// fetchdata();
