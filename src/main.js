class EM3DV {


static ISOMETRIC = 0;
static TOP = 1; static Y_X = 1;
static X_Z= 2;

static CARTESIAN = 0;
static SPHERICAL = 1;
static CYLINDRICAL = 2;

static ROTATE_AZIMUTH = 0;
static ROTATE_POLAR_ANGLE = 1;

static rotate_X = 0;
static rotate_Y = 0;
static rotate_Z = 0;

static zoom = 1;

  /* Place in the Sketch's setup function */
  static setupInit() {

  }


  static setCameraAngle(x, y, z) {
    rotateY(y);
    rotateX(x);
    rotateZ(z);
  }


  static setCameraAngle(presetAngle) {
    
    if(presetAngle == this.ISOMETRIC){
      this.rotate_X = Math.PI;
      this.rotate_Y = (Math.PI/8)*3;
      this.rotate_Z = Math.PI/4;

    } else if(presetAngle == this.TOP || presetAngle == this.Y_X){
      this.rotate_X = Math.PI;
      this.rotate_Y = 0;
      this.rotate_Z = Math.PI/2;

    } else if(presetAngle == this.X_Z){
     this.rotate_Y = Math.PI/2;
     this.rotate_Z = Math.PI;

    }
  }

  static runCamera() {
    scale(this.zoom,this.zoom,-this.zoom); 
    rotateY(this.rotate_X);
    rotateX(this.rotate_Y);
    rotateZ(this.rotate_Z);
  }


  static animateCamera(preset){
    if(preset == this.ROTATE_AZIMUTH){
      this.rotate_Z += 0.03;
    } else if(preset == this.ROTATE_POLAR_ANGLE){
      // NOT WORKING
    } 
  }




  static planeVectorField(){
    strokeWeight(0);
    fill(20, 34, 255);
    stroke(0,255,255);

    for(var a = -50; a < 50; a+=10){
      for(var b = -50; b < 50; b+=10){
        push()
        translate(a, 0, b);
        cone(2, 4);
        translate(0, -3, 0);
        cylinder(1, 3);
        pop()
      }
    }
  }


  static diverganceVectorField(){
    strokeWeight(0);
    fill(20, 34, 255);
    stroke(0,255,255);

    for(var j = 0; j < 10; j++) {
      var phi = map(j, 0, 10, 0, Math.PI*2);
    for(var i = 0; i < 10; i++) {
      var theta = map(i, 0, 10, 0, Math.PI);

      push()
      scale(1.0,1.0,1.0)
      rotateZ(-phi)
      rotateX(theta-Math.PI/2);
      translate(0, 60, 0);
      cone(2, 4);
      translate(0, -3, 0);
      cylinder(1, 3);
      pop()

    }
  }
  }





  static showSphericalAngles(){

    beginShape();
    strokeWeight(3);
    noFill();
    stroke(0,255,255);
    for(var i = 0; i < 50; i++){
      var angle = map(i, 0, 50, 0, (Math.PI*2)*mouseX/1000);
      var x = 70 * cos(angle)
      var y = 70 * sin(angle)
      vertex(x,y,0);
    }
    endShape();
  
    push()
    scale(1,-1,1); 
    beginShape();
    rotateX(Math.PI)
    rotateY(Math.PI/2)
    strokeWeight(3);
    noFill();
    stroke(255,225,0);

    for(var i = 0; i < 50; i++){
      var angle = map(i, 0, 50, 0, (Math.PI)*mouseY/600);
      var x = 70 * cos(angle)
      var y = 70 * sin(angle)
      vertex(x,y,0);
    }
    endShape();
    pop()
  }



  static showCylindricalAngles(){
    beginShape();
    strokeWeight(3);
    noFill();
    stroke(0,255,255);
    for(var i = 0; i < 50; i++){
      var angle = map(i, 0, 50, Math.PI/3, (Math.PI*2)*mouseX/700);
      var x = 70 * cos(angle)
      var y = 70 * sin(angle)
      vertex(x,y,0);
    }
    endShape();

    beginShape();
    strokeWeight(3);
    stroke(255,225,0);

    vertex(0,70,0);
    vertex(0,70,40/(mouseY/100));

    endShape();
  }



  static toDegrees (angle) {
    return angle * (180 / Math.PI);
  }



  static partSphere(radius, startingPhi, endingPhi, startingTheta, endingTheta){
    var numberOfDiscretePoints = 30;
    fill(237, 34, 93);
    
    var vectorArray = new Array(numberOfDiscretePoints);
    for (var x = 0; x < vectorArray.length; x++) {
      vectorArray[x] = new Array(numberOfDiscretePoints);
    }

    strokeWeight(1);
    stroke(245, 50, 200);

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
      }
    }
    
    for(var i = 0; i < numberOfDiscretePoints-1; i++) {
      beginShape();
      vertex(0,0,0); // needed to fill inside
      for (var j = 0; j < numberOfDiscretePoints; j++) {
        
        var v1 = vectorArray[i][j];
        strokeWeight(2);
        vertex(v1[0], v1[1], v1[2]);
                
        var v2 = vectorArray[i+1][j];
        vertex(v2[0], v2[1], v2[2]);

      }
      endShape();
    }
  }

/*  */
  static boundary_question(plane){

    noFill();

    if(plane == this.Y_X){
      push()
      translate(0,0,50)
       circle(0, 0, 50);
       circle(0, 0, 75);

       beginShape()
       stroke(200,140,200)
        vertex(0,0,0)
        vertex(18,18,0)
       endShape()

       beginShape()
       stroke(200,0,200)
        vertex(18,18,0)
        vertex(27,27,0)
       endShape()

       beginShape()
       stroke(20,200,255)
        vertex(27,27,0)
        vertex(50,50,0)
       endShape()

        fill(0, 102, 153);
       pop();
    } else if (plane == this.X_Z){

       
    }
  }

  static cylinder(radius, startingTheta, endingTheta, height) {
    var numberOfDiscretePoints = 36;

    fill(237, 34, 93);
    strokeWeight(1);
    stroke(245, 50, 200);
    
    // First Inside of Cylinder
    beginShape();
    vertex(0, 0, 0);
    vertex(0, 0, height );
    vertex(radius*cos(startingTheta), radius*sin(startingTheta), height );
    vertex(radius*cos(startingTheta), radius*sin(startingTheta), 0 );
    endShape(CLOSE);

    // Second Inside of Cylinder
    beginShape();
    vertex(0, 0, 0);
    vertex(0, 0, height );
    vertex(radius*cos(endingTheta), radius*sin(endingTheta), height );
    vertex(radius*cos(endingTheta), radius*sin(endingTheta), 0 );
    endShape(CLOSE);

    for ( var i = 0; i < numberOfDiscretePoints; i++) {

      var theta = map(i, 0, numberOfDiscretePoints, startingTheta, endingTheta);
      var theta1 = map(i+1, 0, numberOfDiscretePoints, startingTheta, endingTheta);

      // Top of Cylinder
      beginShape();
      vertex(radius*cos(theta), radius*sin(theta), height );
      vertex(radius*cos(theta1), radius*sin(theta1), height );
      vertex(0, 0, height);
      endShape(CLOSE);
      
      // Bottom of Cylinder
      beginShape();
      vertex(radius*cos(theta), radius*sin(theta), 0 );
      vertex(radius*cos(theta1), radius*sin(theta1), 0 );
      vertex(0, 0, 0);
      endShape(CLOSE);

      // Side of Cylinder
      beginShape();
      vertex(radius*cos(theta), radius*sin(theta), 0 );
      vertex(radius*cos(theta), radius*sin(theta), height );
      vertex(radius*cos(theta1), radius*sin(theta1), height );
      vertex(radius*cos(theta1), radius*sin(theta1), 0 );
      endShape(CLOSE);

    }
  }


  static showAxis() {

    beginShape();
    strokeWeight(3);
    // +y black
    stroke(0);
    vertex(0,0,0);
    vertex(0,200,0);  
    endShape();

    // -y black
    stroke(100,100,100);
    vertex(0,0,0);
    vertex(0,-200,0);  
    endShape();
    
    // +x green
    beginShape();
    strokeWeight(3);stroke(0,200,0);
    vertex(0,0,0); vertex(200,0,0); 
    endShape();

    // -x green
    beginShape();
    strokeWeight(3);stroke(0,255,0);
    vertex(0,0,0); vertex(-200,0,0); 
    endShape();
    
    // +z blue
    beginShape();
    strokeWeight(3); stroke(0,0,255);
    vertex(0,0,0); vertex(0,0,200); 
    endShape();

    // -z blue
    beginShape();
    strokeWeight(3); stroke(0,0,150);
    vertex(0,0,0); vertex(0,0,-200); 
    endShape();
    
  }
}