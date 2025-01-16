let port;
let connectAr;
let val;
let data =[];
let potX;
let potY;
let mapPotX;
let mapPotY;

let birdsong;
let panning;
let vol;
let cnv;
let vehicles = [] ;
let x,y;


function preload(){
  birdsong = loadSound('sound/birdsong2.mp3');
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed();

  // connect to arduino
  port = createSerial();
  connectAr = createButton('Connect to Arduino');
  connectAr.position(20, 20);
  connectAr.mousePressed(connectArClick);

  for (let i = 0; i < 300; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }
}

function draw() {
  background(255);

  // //draw cloud background with noise
  let t = frameCount * 0.002;
  noStroke();
  for (let i = 0; i < windowWidth; i += 10) {
    for (let j = 0; j < windowHeight; j += 10) {
      var n = noise(i * 0.005, j * 0.005 - t, t);
      fill(n*230, n*240, n * 250, 90);
      rect(i, j, 10);
    }
  }
  
  val = port.readUntil("\n"); //read each line of serial
  // //ignore NaN, split data into two arrays
  if(val != NaN){
  data = split(val,",");
  console.log("data: " + data);
  console.log("X: "+ data[0]);
  console.log("Y: "+data[1]);
  potX = data[0];
  // potX = map(data[0], 0, 521, 0, windowWidth);
  potY = data[1];
  // potY = map(data[1], 0, 521, 0, windowHeight);
}

// //does not work to log NaN data
//   if (data.length > 0) {
// console.log("X: "+ data[0]);
// console.log("Y: "+data[1]);
// potX = data[0];
// potY = data[1];
//   }

// //draw noisePoint
  // let noiseLevel = 500; //aka canvas size
  let noiseScale = 0.005;
  let nt = noiseScale * frameCount;
   x = windowWidth * noise(nt);
   y = windowHeight * noise(nt + 10000);
  fill(250, 99);
  noStroke();
  circle(x, y, 10);

  // //potentiaometer seek point
  // mapPotX = map(potX, 0, 1023, 0, windowWidth);
  // mapPotY = map(potY, 0, 1023, 0, windowHeight);
  fill(150, 200);
  stroke(39, 39, 196);
  // circle(mapPotX, mapPotY, 10);
  circle(potX, potY, 10);
  

  // //set pan based on noisePoint
  // //can't get potentiometer to work right
  panning = map(x, 0, windowWidth, -1, 1);
  // panning = map(potX, 0, windowWidth, -1, 1);
  birdsong.pan(panning);

  // //set volume based on noisePoint
  // //can't get potentiometer to work right
  vol = map(y, 0, windowHeight, 1, 0.2);
  // vol = map(potY, 0, windowHeight, 1, 0.5);
  birdsong.setVolume(vol);
  // console.log(panning, vol);
  
  // //draw vehicles (ref vehilce.js)
    for (let v of vehicles) {
    v.applyBehaviors(vehicles);
    v.update();
    v.edges();
    v.show();
  }
}

// //play/pause birdsong audio
function mousePressed() {
  if (!birdsong.isPlaying()) {
    birdsong.play();
 } else {
   birdsong.pause();
}
}

// //connect to arduino
function connectArClick() {
  if (!port.opened()) {
    port.open('Arduino', 9600);

  } else {
    port.close();
  }
}