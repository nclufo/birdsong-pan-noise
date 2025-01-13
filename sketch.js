let birdsong;
let panning;
let vol;

function preload(){
  birdsong = loadSound('birdsong.mp3');
}

function setup() {
  let cnv = createCanvas(500, 500);
  cnv.mousePressed();
}

function draw() {
  background(255);
  
  let noiseLevel = 500;
  let noiseScale = 0.005;

  let nt = noiseScale * frameCount;

  let x = noiseLevel * noise(nt);
  let y = noiseLevel * noise(nt + 10000);

  fill(255);
  strokeWeight(15);
  point(x, y);
  
  panning = map(x, 0, 500, -1, 1);
  birdsong.pan(panning);


  
  vol = map(y, 0, 500, 1, 0);
  birdsong.setVolume(vol);
  console.log(panning, vol);
}

function mousePressed() {
  if (!birdsong.isPlaying()) {
    birdsong.play();
 } else {
   birdsong.pause();
}
}