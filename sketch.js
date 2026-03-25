// Updating pivot to match the centroid of the main triangle
// Coordinates: (320,100)-(220,250)-(420,250)
// Adjusting translate to keep the scaling behavior the same

function setup() {
    createCanvas(640, 480);
}

function draw() {
    background(200);
    translate(-320, -200); // centroid y=200
    // Drawing the triangle
    triangle(320, 100, 220, 250, 420, 250);
    // Draw additional elements as necessary
}