let port;
let connectAr;
let val;
let data =[];
let potX;
let potY;

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

  port = createSerial();
  connectAr = createButton('Connect to Arduino');
  connectAr.position(20, 20);
  connectAr.mousePressed(connectArClick);

  for (let i = 0; i < 200; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }


}

function draw() {
  background(255);
  // let t = frameCount * 0.002;
  // noStroke();
  // for (let i = 0; i < windowWidth; i += 10) {
  //   for (let j = 0; j < windowHeight; j += 10) {
  //     var n = noise(i * 0.005, j * 0.005 - t, t);
  //     fill(n*230, n*240, n * 250, 90);
  //     rect(i, j, 10);
  //   }
  // }
  val = port.readUntil("\n"); //read each line
 
  if(val != NaN){

  data = split(val,",");
  console.log("data: " + data);
  console.log("X: "+ data[0]);
console.log("Y: "+data[1]);
potX = data[0];
potY = data[1];
}
//   if (data.length > 0) {

// console.log("X: "+ data[0]);
// console.log("Y: "+data[1]);
// potX = data[0];
// potY = data[1];
//   }

  // let noiseLevel = 500;
  let noiseScale = 0.005;

  let nt = noiseScale * frameCount;

   x = windowWidth * noise(nt);
   y = windowHeight * noise(nt + 10000);
  
  fill(250);
  noStroke();
  circle(x, y, 10);
  
  panning = map(x, 0, windowWidth, -1, 1);
  birdsong.pan(panning);

  
  vol = map(y, 0, windowHeight, 1, 0.2);
  birdsong.setVolume(vol);
  // console.log(panning, vol);
  
  
    for (let v of vehicles) {
    v.applyBehaviors(vehicles);
    v.update();
    v.borders();
    v.show();
  }
}

function mousePressed() {
  if (!birdsong.isPlaying()) {
    birdsong.play();
 } else {
   birdsong.pause();
}
}

function connectArClick() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}