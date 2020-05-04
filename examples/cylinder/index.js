
//https://www.youtube.com/watch?v=RkuBWEkBrZA

let pg;
var zoom = 2.5

var pg2;
var movement_speed = 0.3;

let myFont;
function preload() {
  myFont = loadFont('/assets/IndieFlower-Regular.ttf');
}

function setup() {
  createCanvas(800, 500, WEBGL);
  //setAttributes('antialias', true);
  fill(237, 34, 93);
  stroke(245, 50, 200);
  textSize(width / 3);
  textAlign(CENTER, CENTER);
  
   pg2 =  createGraphics(120, 50);
    pg2.textSize(30 * zoom);

    EM3DV.setupInit();

    EM3DV.setCameraAngle(EM3DV.ISOMETRIC);
	EM3DV.zoom = 2.5;

}

function draw() {
    //EM3DV.animateCamera(EM3DV.ROTATE_AZIMUTH);
    EM3DV.runCamera();
    
	background(200);
	

	textSize(32);
	textFont(myFont);
	
	/*push();
	rotateX(Math.PI);
	rotateZ(Math.PI);
	fill(50);
	text('A', 0, 0);
	fill(0, 102, 153);
	text('ABC', 10, 60);
	fill(0, 102, 153, 51);
	text('C', 10, 90);
	pop();*/

  //animate3D();
  
	push()
	scale(-zoom,zoom,-zoom);
	strokeWeight(0);
	fill(50);
	textSize(10);
	text('Y', 0, 0);
	rotateZ(-(Math.PI*2)*mouseX/700) 
	text(EM3DV.toDegrees(((Math.PI*2)*mouseX/700)).toFixed(0) +'Φ', 0, 35);
	//texture(pg2);
	// rect(0, 40, 40, 40);
	pop()
 

  //EM3DV.partSphere(50, 0, (Math.PI*2)*mouseX/1000, 0, Math.PI*mouseY/600)
    EM3DV.cylinder(40, Math.PI/3, (Math.PI*2)*mouseX/700, 40/(mouseY/100));

  EM3DV.showAxis();
  EM3DV.showCylindricalAngles();
}

function animate3D(){
  rotateX(2);
  rotateZ(frameCount * 0.03);
}

function mouseClicked() {

}

function keyPressed() {
  if (key === 'q') {
    EM3DV.zoom-=0.2
  } else if (key === 'e') {
    EM3DV.zoom+=0.2
  } else if (key === 'w'){
    EM3DV.rotate_Y -= movement_speed;
  } else if (key === 'a'){
      EM3DV.rotate_X -= movement_speed;
    }
    else if (key === 's'){
        EM3DV.rotate_Y += movement_speed;
    }
    else if (key === 'd'){
        EM3DV.rotate_X += movement_speed;
    }
}





