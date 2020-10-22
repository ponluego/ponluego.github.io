// RENDERER
{
  var renderer = new THREE.WebGLRenderer();
  document.body.appendChild(renderer.domElement);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  window.addEventListener("resize", onResize, false);
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

var scene = new THREE.Scene();
var sol;
var spath;
var analema;
var shadowCamera;

var directionalLight;

// LUCES
{
  // add spotlight for the shadows
  var light = new THREE.DirectionalLight(0xffffff, 1, 100);
  light.position.set(0, 100, 100); //default; light shining from top
  light.castShadow = true; // default false
  scene.add(light);

  // add subtle ambient lighting
  var ambienLight = new THREE.AmbientLight(0x353535);
  scene.add(ambienLight);
}
// CAMARA
{
  var camera = new THREE.PerspectiveCamera(
    45,
    (1 * window.innerWidth) / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(-0, 150, 150);
  camera.rotateY = Math.pi;
  camera.lookAt(scene.position);
}

var axes = new THREE.AxesHelper(20);
scene.add(axes);
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// OBJETO-PANEL
function ppanel() {
  var geometry = new THREE.BoxGeometry(20, 1, 20);
  var texture = new THREE.TextureLoader().load("../images/paneltextura.png", bucle);
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  var material = new THREE.MeshLambertMaterial({
    map: texture,
    transparent: true,
    opacity: 0.9,
  });
  // var cubeMaterial = new THREE.MeshLambertMaterial();
  material.transparent = true;
  // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  panel = new THREE.Mesh(geometry, material);
  panel.castShadow = true;
  panel.position.set(0, 0, 0);
  scene.add(panel);
}
ppanel();

let date = new Date();
var Radius = 50;
// Latitude = localStorage.Latitude || 50
Latitude = 0;
var Longitude = localStorage.Longitude || 20;
var Timezone = localStorage.Timezone || 0;

// analema

function dateFromDay(year, day, hour) {
  let date = new Date(year, 0);
  date = new Date(date.setDate(day));
  return new Date(date.setHours(hour));
}

let material = new THREE.LineDashedMaterial({
  color: 0x0000ff,
  linewidth: 0.5,
});
let geometry = new THREE.Geometry();
analema = new THREE.LineLoop(geometry, material);

for (let t = 0; t < 24; t++) {
  for (let i = 0; i < 365; i++) {
    let date = dateFromDay(2018, i, t);
    if (date.getTimezoneOffset() / 60 != 3)
      date = new Date(date.setHours(t + 1));
    let sunPos = SunCalc.getPosition(date, Latitude, Longitude);
    let x = Radius * Math.cos(sunPos.altitude) * Math.cos(sunPos.azimuth);
    let z = Radius * Math.cos(sunPos.altitude) * Math.sin(sunPos.azimuth);
    let y = Radius * Math.sin(sunPos.altitude);
    let vector = new THREE.Vector3(x, y, z);
    geometry.vertices.push(vector);
  }
}
scene.add(analema);

// solsticion verano
let datesv = new Date(2020, 05, 21);
var svgeometry = new THREE.Geometry();
var svmaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
let svpath = new THREE.LineLoop(svgeometry, svmaterial);

for (let i = 0; i <= 24; i++) {
  datesv = new Date(datesv.setHours(i, 0));
  if (datesv.getTimezoneOffset() / 60 !== 3)
    datesv = new Date(datesv.setHours(i + 1));
  let sunPos = SunCalc.getPosition(datesv, Latitude, Longitude);
  let x = Radius * Math.cos(sunPos.altitude) * Math.cos(sunPos.azimuth);
  let z = Radius * Math.cos(sunPos.altitude) * Math.sin(sunPos.azimuth);
  let y = Radius * Math.sin(sunPos.altitude);
  let vector = new THREE.Vector3(x, y, z);
  svgeometry.vertices.push(vector);
}
scene.add(svpath);

// solsticion invierno
let datesi = new Date(2020, 013, 22);
// console.log(datesi)
var sigeometry = new THREE.Geometry();
var simaterial = new THREE.LineBasicMaterial({ color: 0xfea888 });
let sipath = new THREE.LineLoop(sigeometry, simaterial);

for (let i = 0; i <= 24; i++) {
  datesi = new Date(datesi.setHours(i, 0));
  if (datesi.getTimezoneOffset() / 60 !== 3)
    datesi = new Date(datesi.setHours(i + 1));
  let sunPos = SunCalc.getPosition(datesi, Latitude, Longitude);
  let x = Radius * Math.cos(sunPos.altitude) * Math.cos(sunPos.azimuth);
  let z = Radius * Math.cos(sunPos.altitude) * Math.sin(sunPos.azimuth);
  let y = Radius * Math.sin(sunPos.altitude);
  let vector = new THREE.Vector3(x, y, z);
  sigeometry.vertices.push(vector);
}
scene.add(sipath);

var solgeometry = new THREE.SphereBufferGeometry(3, 10, 10);
var solmaterial = new THREE.MeshLambertMaterial({
  color: 0xffff00,
  emissive: 0xffff00,
});
sol = new THREE.Mesh(solgeometry, solmaterial);

scene.add(sol);

function myFunction() {
  var x = document.createElement("INPUT");
  x.setAttribute("type", "date");
  x.setAttribute("value", "2014-02-09");
  document.body.appendChild(x);
}

function addAmbientLight(scene) {
  var ambientLight = new THREE.AmbientLight(0x332222);
  ambientLight.name = "ambientLight";
  scene.add(ambientLight);
}

function addDirectionalLight(scene) {
  directionalLight = new THREE.DirectionalLight();
  // directionalLight.position.copy(new THREE.Vector3(20, 40, -50));
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.visible = true;
  directionalLight.shadow.camera.near = 25;
  directionalLight.shadow.camera.far = 200;
  directionalLight.shadow.camera.left = -50;
  directionalLight.shadow.camera.right = 50;
  directionalLight.shadow.camera.top = 50;
  directionalLight.shadow.camera.bottom = -50;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;

  directionalLight.name = "dirLight";
  scene.add(directionalLight);
  // scene.background.setHex(0x0096ff);
  shadowCamera = new THREE.CameraHelper(directionalLight.shadow.camera);
}

function addFloor() {
  var floorGeometry = new THREE.PlaneGeometry(150, 150, 20, 20);
  var floorMaterial = new THREE.MeshLambertMaterial();

  // floorMaterial.map = THREE.ImageUtils.loadTexture("./textures/Brick-2399.jpg");
  // floorMaterial.bumpMap = THREE.ImageUtils.loadTexture("./textures/Brick-2399-bump-map.jpg");

  // floorMaterial.map.wrapS = floorMaterial.map.wrapT = THREE.RepeatWrapping;
  // floorMaterial.map.repeat.set(40, 40);
  // floorMaterial.bumpMap.wrapS = floorMaterial.bumpMap.wrapT = THREE.RepeatWrapping;
  // // floorMaterial.bumpMap.repeat.set(4, 4);
  // const floorMaterial = new THREE.MeshLambertMaterial({ color: 0xe1c3a4 });

  var floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
  floorMesh.receiveShadow = true;
  floorMesh.rotation.x = -0.5 * Math.PI;
  floorMesh.name = "floor";
  scene.add(floorMesh);
  floorMesh.material.color.setHex(0x008200);
}

scene.background = new THREE.Color(0x0096ff);

addFloor();

addDirectionalLight(scene);

var arrowDirection = new THREE.Vector3();
var arrowPosition1 = new THREE.Vector3();
var arrowPosition2 = new THREE.Vector3();
var arrowPosition3 = new THREE.Vector3();

arrowDirection
  .subVectors(scene.position, directionalLight.position)
  .normalize();
//
arrowPosition1.copy(directionalLight.position);
arrowHelper1 = new THREE.ArrowHelper(
  arrowDirection,
  arrowPosition1,
  Radius,
  0xffff00,
  10.25,
  3.08
);
scene.add(arrowHelper1);

arrowPosition2
  .copy(directionalLight.position)
  .add(new THREE.Vector3(0, 0.2, 0));
arrowHelper2 = new THREE.ArrowHelper(
  arrowDirection,
  arrowPosition2,
  0.9,
  0xffff00,
  0.25,
  0.08
);
scene.add(arrowHelper2);

arrowPosition3
  .copy(directionalLight.position)
  .add(new THREE.Vector3(0, -0.2, 0));
arrowHelper3 = new THREE.ArrowHelper(
  arrowDirection,
  arrowPosition3,
  0.9,
  0xffff00,
  0.25,
  0.08
);
scene.add(arrowHelper3);

// GUI
{
  var step = 0;
  // funciones
  var gi = new (function () {
    this.latitud = 44;
    this.inclinacion = 34;
    this.orientacion = 0;
    this.mes = 8;
    this.hora = 14;
    this.posiciona = function () {
      myFunction();
      // console.log(gi.inclinacion)
    };
    this.posicionaT = function () {
      // console.log(gi.inclinacion)
    };
    this.debug = false;
  })();
  //  panel
  var gui = new dat.GUI();
  gui.add(gi, "latitud", 0, 90).step(1);
  gui.add(gi, "inclinacion", 0, 90).step(1);
  gui.add(gi, "orientacion", -180, 180).step(1);
  gui.add(gi, "mes", 0, 12).step(1);
  gui.add(gi, "hora", 0, 24).step(1);
  gui.add(gi, "posiciona");
  // gui.add(gi, 'posicionaT');
  gui.add(gi, "debug").onChange(function (e) {
    e ? scene.add(shadowCamera) : scene.remove(shadowCamera);
  });
}

bucle();
function bucle() {
  // PANEL
  {
    panel.rotation.z = (gi.inclinacion * Math.PI) / 180;
    panel.rotation.y = ((-gi.orientacion - 180) * Math.PI) / 180;
  }

  // SOL
  {
    analema.rotation.z = ((-gi.latitud + 0) * Math.PI) / 180;
    svpath.rotation.z = ((-gi.latitud + 0) * Math.PI) / 180;
    sipath.rotation.z = ((-gi.latitud + 0) * Math.PI) / 180;
  }

  {
    let dia = new Date(2020, gi.mes, 22);
    dia = new Date(dia.setHours(gi.hora - 2, 0));
    sunPos = SunCalc.getPosition(dia, gi.latitud, Longitude);
    sol.position.x =
      Radius * Math.cos(sunPos.altitude) * Math.cos(sunPos.azimuth);
    sol.position.z =
      Radius * Math.cos(sunPos.altitude) * Math.sin(sunPos.azimuth);
    sol.position.y = Radius * Math.sin(sunPos.altitude);
  }

  var light = scene.getObjectByName("dirLight");

  light.position.x =
    Radius * 1 * Math.cos(sunPos.altitude) * Math.cos(sunPos.azimuth);
  light.position.z =
    Radius * 1 * Math.cos(sunPos.altitude) * Math.sin(sunPos.azimuth);
  light.position.y = Radius * 1 * Math.sin(sunPos.altitude);

  // light.position.x = x * Math.cos(control.rotSpeed) + z * Math.sin(control.rotSpeed);
  // light.position.z = z * Math.cos(control.rotSpeed) - x * Math.sin(control.rotSpeed);

  light.lookAt(scene.position);

  var floor = scene.getObjectByName("floor");
  floor.material.needsUpdate = true;

  // var directionalLight = scene.getObjectByName('dirLight');
  // directionalLight.castShadow = control.castShadow;
  // directionalLight.shadowCameraVisible = control.shadowCameraVisible;

  // scene.getObjectByName('dirLight').shadowCamera.updateProjectionMatrix();
  // arrowDirection.subVectors(scene.position, directionalLight.position).normalize();

  arrowHelper1.setDirection(arrowDirection);

  requestAnimationFrame(bucle);
  renderer.render(scene, camera);
}
