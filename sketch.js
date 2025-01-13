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
  let t = frameCount * 0.002;
  noStroke();
  for (let i = 0; i < 500; i += 5) {
    for (let j = 0; j < 500; j += 5) {
      var n = noise(i * 0.005, j * 0.005 - t, t);
      fill(n*230, n*240, n * 250, 80);
      rect(i, j, 5);
    }
  }
  let noiseLevel = 500;
  let noiseScale = 0.005;
  
  let nt = noiseScale * frameCount;
  
  let x = noiseLevel * noise(nt);
  let y = noiseLevel * noise(nt + 10000);
  
  fill(0);
  strokeWeight(15);
  rect(x, y, 10, 10);
  
  panning = map(x, 0, 500, -1, 1);
  birdsong.pan(panning);
  
  vol = map(y, 0, 500, 1, 0.2);
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