// let port;
// let connectAr;
// let valX = 0;
// let valY = 0;

let birdsong;
let panning;
let vol;
let cnv;
let vehicles = [] ;

function preload(){
  birdsong = loadSound('sound/birdsong2.mp3');
}

function setup() {
  cnv = createCanvas(500, 500);
  cnv.mousePressed();
  
    for (let i = 0; i < 50; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }

  // port = createSerial();
  // connectAr = createButton('Connect to Arduino');
  // connectAr.mousePressed(connectArClick);
}

function draw() {
  background(255);
      let t = frameCount * 0.002;
  noStroke();
  for (let i = 0; i < 500; i += 5) {
    for (let j = 0; j < 500; j += 5) {
      var n = noise(i * 0.005, j * 0.005 - t, t);
      fill(n*230, n*240, n * 250, 90);
      rect(i, j, 5);
    }
  }
  
  let noiseLevel = 500;
  let noiseScale = 0.005;

  let nt = noiseScale * frameCount;

  let x = noiseLevel * noise(nt);
  let y = noiseLevel * noise(nt + 10000);
  
  fill(15);
  noStroke();
  circle(x, y, 10);
  
  panning = map(x, 0, 500, -1, 1);
  birdsong.pan(panning);

  
  vol = map(y, 0, 500, 1, 0.2);
  birdsong.setVolume(vol);
  console.log(panning, vol);
  
  
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

// function connectArClick() {
//   if (!port.opened()) {
//     port.open('Arduino', 9600);
//   } else {
//     port.close();
//   }
// }