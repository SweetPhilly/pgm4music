let freq;
let ampsin;
let amptri;
let sine = new p5.Oscillator('sine');
let tri = new p5.Oscillator('triangle');
let live;
//effects proceesses
let verb = new p5.Reverb();
let verbgate = false;
let dly = new p5.Delay();
let dlygate = false;
//sound feature variables
let colour = {
reda: 0,
redb: 0,
redc: 0,
grna:0,
grnb:0,
grnc:0,
blua:0,
blub:0,
bluc:0};
//colour feature variables
let waves = []; 
//image array
let constrainval = {
  xmin: 1,
  xmax: 128,
  //object for canvas constraint parameters
}
let waveobj = {
x: 64,
constx: 0,
  //object for waveimage values
}

function preload() {
  for (let i=1; i <= 128; i++)
  {
  waves[i] =loadImage('wave/wav-'+ i + '.png')
  //preloading the array of images to cycle through
  }
}
function setup() {
  let canvas = createCanvas(400, 400);
   canvas.mousePressed(playOscillator);
  verb.process(sine, 5, 2);
  verb.process(tri, 5, 2);
  dly.process(sine, 0.2, 0.7)
  dly.process(tri, 0.2, 0.7)
  noStroke();
}
function draw() {
background(255);
  
  //start variables for sound parameters
   freq = constrain(map(mouseY, 0, width, 1000, 100), 100, 1000);
  ampsin = constrain(map(mouseX, height, 0, 0, 0.7), 0, 1);
  amptri = constrain(map(mouseX, height, 0, 0.7, 0), 0, 1);
//end variables for sound parameters
  colour.reda = constrain(map(mouseY,0,width,0,255),0, 255);
   colour.grna = constrain(map(mouseX,0,width,0,255),0, 255);
     colour.blua =constrain(map(mouseX+mouseY,0,width,255,0),0, 255);
  colour.redb = constrain(map(mouseX,0,width,0,255),0, 255);
  colour.grnb =constrain(map(mouseX+mouseY,0,width,255,0),0, 255);
  colour.blub = constrain(map(mouseY,0,width,0,255),0, 255);
  colour.redc =constrain(map(mouseX+mouseY,0,width,255,0),0, 255);
  colour.grnc = constrain(map(mouseY,0,width,0,255),0, 255);
  colour.bluc = constrain(map(mouseX,0,width,0,255),0, 255);
  
  
  fill(colour.reda, colour.grna, colour.blua, 85); 
  ellipse(150,225,200,200);
    
  fill(colour.redb, colour.grnb, colour.blub, 85);
   ellipse(200,150,200,200);
    
   fill(colour.redc, colour.grnc, colour.bluc, 85);
  ellipse(250,225,200,200);
  
  //dly toggle function
  if (dlygate) {
    fill(0,200,100);
  } else {
    fill(255,0,0);
  }  
    rect(170,340,100,50);
  fill(255);
  textSize(12)
  if(dlygate){
  text('delay on', 198,370);
    dly.drywet(1)
  } else {
    text('delay off', 198,370);
    dly.drywet(0)
  }
 
//reverb toggle function
   if (verbgate) {
    fill(0,200,100);
  } else {
    fill(255,0,0);
  }
    rect(290,340,100,50);
  fill(255);
  textSize(12)
  if(verbgate){
  text('reverb on', 315,370);
    verb.drywet(1)
  } else {
    text('reverb off', 315,370);
    verb.drywet(0)
  } 
  //end reverb toggle function
  
  
  
  if (live) {
    // smooth the transitions by 0.1 seconds
    sine.freq(freq, 0.1);
   tri.freq(freq, 0.1);
    sine.amp(ampsin, 0.1);
   tri.amp(amptri,0.1);
  }

  waveobj.x = (((mouseX - 0) * (128 - 1)) / (400 - 0)) + 1 
waveobj.constx = constrain(waveobj.x, constrainval.xmin, constrainval.xmax);
//convert mousex value to a range between 1-128 and constrain it to the canvas
  
fill(0,0,0);
textFont('roboto');
textSize(12);
text('x = ' + int(waveobj.constx), 20, 40);
text('y = placeholder', 20, 60);
text('freq: ' + int(freq), 20, 80);
textSize(18);
text('press to activate sound',100,20);
  
  image(waves[int(waveobj.constx)],50,50,300,300);
  //render wave from array between range 1-128 depending on mouse position
  
 }

function playOscillator() {
  sine.start();
  tri.start();
  live = true;
}
function mousePressed() {
  if (mouseX >= 290 && mouseX <= 390 && mouseY >= 340 && mouseY <= 370) {
    verbgate = !verbgate;
  }
   if (mouseX >= 170 && mouseX <= 270 && mouseY >= 340 && mouseY <= 370) {
    dlygate = !dlygate;
  }
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
 tri.amp(0, 0.5);
  sine.amp(0, 0.5);
 live = false;
}
