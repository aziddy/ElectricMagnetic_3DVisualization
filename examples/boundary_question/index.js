
//https://www.youtube.com/watch?v=RkuBWEkBrZA

let pg;
var zoom = 2.5

var pg2;

var movement_speed = 0.3;


function setup() {
  createCanvas(800, 500, WEBGL);
  //setAttributes('antialias', true);
  fill(237, 34, 93);
  stroke(245, 50, 200);
  textSize(width / 3);
  textAlign(CENTER, CENTER);
  
   pg2 =  createGraphics(120, 50);
    pg2.textSize(30 * zoom);

    EM3DV.setCameraAngle(EM3DV.Y_X);
    EM3DV.zoom = 2.5;
}

function draw() {
    //EM3DV.animateCamera(EM3DV.ROTATE_AZIMUTH);
    EM3DV.runCamera();
    background(200);

  EM3DV.partSphere(50, 0, (Math.PI*2.075), 0, Math.PI)
  //EM3DV.cylinder(40, Math.PI/3, (Math.PI*2)*mouseX/700, 40/(mouseY/100));

  EM3DV.showAxis();

  EM3DV.boundary_question(EM3DV.Y_X);

  //EM3DV.showSphericalAngles();

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





