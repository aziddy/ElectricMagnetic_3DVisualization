
//https://www.youtube.com/watch?v=RkuBWEkBrZA

function setup() {
  createCanvas(800, 400, WEBGL);
  //setAttributes('antialias', true);
  fill(237, 34, 93);
  stroke(245, 50, 200);
  textSize(width / 3);
  textAlign(CENTER, CENTER);
  
 // strokeWeight(3);
}

function draw() {
  scale(1.5,1.5,-1.5); 
  background(200);
  //rotateY(2.7);
//  rotateX(1.25);
  animate3D();

 
  EMFV.partSphere(50, 0, (((Math.PI*2)/1)*1), 0, Math.PI/2)
  //EMFV.partRadiusSphere(25, 50, 0, (((Math.PI*2)/8)*6), 0, Math.PI)
  axis();
  
}

function animate3D(){
  rotateY(2.7);
  rotateX(frameCount * 0.01);
 // rotateZ(frameCount * 0.01);
}

function mouseClicked() {
  beginShape();
  strokeWeight(3);
  stroke(0);
  vertex(0,0,0);
  vertex(0,200,200);  
  endShape();
}

function axis(){
  beginShape();
  strokeWeight(3);
  stroke(0);
  vertex(0,0,0);
  vertex(0,200,0);  
  endShape();
  
  beginShape();
  strokeWeight(3);
  stroke(0,255,0);
  vertex(0,0,0);
  vertex(200,0,0);  
  endShape();
  
  beginShape();
  strokeWeight(3);
  stroke(0,0,255);
  vertex(0,0,0);
  vertex(0,0,200);  
  endShape();
   
  text('p5.jssadsaasdasdadsadasdsadsadasdasdasdsadas', 0, 0);
}

function sph(radius) {

  //beginShape(TRIANGLE_STRIP);
  beginShape();
  stroke(245, 50, 200);
  
  var r = radius
  var total = 50;
  for(var i = 0; i < total; i++) {
    var lon = map(i, 0, total, 0, Math.PI*2);
    for (var j = 0; j < total; j++) {
      var lat = map(j,0,total,-(Math.PI/2),(Math.PI/2))
      var px = r * sin(lon) * cos(lat)
      var py = r * sin(lon) * sin(lat)
      var pz = r * cos(lon)
      vertex(px, py, pz);
    }
  }
  endShape();
}


function cyl() {
  var pz = 0;
  beginShape();
  for(var g = 0; g < 40; g+=1) {
  for (var i = 0; i < 40; i++) {
    //angle = TWO_PI / n * i;
    px = 70 * sin( ((Math.PI*2)/40)*i);
    py = 70 *cos( ((Math.PI*2)/40)*i);
    vertex(px, py, pz);
  }
    pz = g;
  }
  endShape();
}



class EMFV {
  constructor() {
  }
  
  static fullSphere(){
    
  }
  
  static partSphere(radius, startingPhi, endingPhi, startingTheta, endingTheta){

   // var total = 50;
    var numberOfDiscretePoints = 40;
    
    var vectorArray = new Array(numberOfDiscretePoints);
    for (var x = 0; x < vectorArray.length; x++) {
      vectorArray[x] = new Array(numberOfDiscretePoints);
    }

    
    //beginShape(TRIANGLE_STRIP);
  //  beginShape();
    strokeWeight(1);
    stroke(245, 50, 200);
    //stroke(150);

    var r = radius
    for(var i = 0; i < numberOfDiscretePoints; i++) {
      var theta = map(i, 0, numberOfDiscretePoints, startingTheta, endingTheta);
      for (var j = 0; j < numberOfDiscretePoints; j++) {
        var phi = map(j, 0, numberOfDiscretePoints, startingPhi, endingPhi)
        
        var px = r * sin(theta) * cos(phi)
        var py = r * sin(theta) * sin(phi)
        var pz = r * cos(theta)
        
        var temp = [px, py, pz];
        vectorArray[i][j] = temp;
        
       // vertex(px, py, pz);
        
      }
    }
    
    for(var i = 0; i < numberOfDiscretePoints; i++) {
      beginShape();
      //beginShape(TRIANGLE_STRIP);
      
      for (var j = 0; j < numberOfDiscretePoints; j++) {
        
        var v1 = vectorArray[i][j];
        strokeWeight(2);
        vertex(v1[0], v1[1], v1[2]);
                
        var v2 = vectorArray[i][j];
     //   strokeWeight(2);
      //  vertex(v2[0], v2[1], v2[2]);

      }
      endShape();
    }
    
    //endShape();
  }
  
  
    static partRadiusSphere(radiusStart, endRadius, startingPhi, endingPhi, startingTheta, endingTheta){

    //beginShape(TRIANGLE_STRIP);
    beginShape();
    strokeWeight(1);
    //stroke(245, 50, 200);
    stroke(150);
      
    var r = radiusStart
    var total = 50;
      
    
    for(var i = 0; i < total; i++) {
      var theta = map(i, 0, total, startingTheta, endingTheta);
      for (var j = 0; j < total; j++) {
        var phi = map(j,0,total, startingPhi, endingPhi)
        
        var px = r * sin(theta) * cos(phi)
        var py = r * sin(theta) * sin(phi)
        var pz = r * cos(theta)
        vertex(px, py, pz);
      }
    }
      
      
      

    r = endRadius

    for(var i = 0; i < total; i++) {
      var theta = map(i, 0, total, startingTheta, endingTheta);
      for (var j = 0; j < total; j++) {
        var phi = map(j,0,total, startingPhi, endingPhi)
        
        var px = r * sin(theta) * cos(phi)
        var py = r * sin(theta) * sin(phi)
        var pz = r * cos(theta)
        vertex(px, py, pz);
      }
    }
    endShape();
  }
  
  
  
}