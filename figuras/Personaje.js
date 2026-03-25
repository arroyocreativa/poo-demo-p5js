// Ejemplo de figura compleja
class Personaje extends Figura {
  _drawShape() {
    push();

    translate(this.x, this.y);

    const s = this.tam / 150;
    scale(s);

    translate(-320, -200);

    fill("yellow");
    stroke(0);
    strokeWeight(2);
    triangle(320, 100, 220, 250, 420, 250);

    strokeWeight(4);
    line(280, 250, 250, 300);
    line(250, 300, 280, 340);
    line(280, 340, 260, 350);

    line(360, 250, 370, 340);
    line(370, 340, 390, 340);

    fill(0);
    triangle(320, 220, 300, 210, 300, 230);
    triangle(320, 220, 340, 210, 340, 230);

    fill("white");
    strokeWeight(1);
    circle(320, 170, 50);
    fill(0);
    ellipse(320, 170, 10, 30);

    pop();
  }

  display() {
    this._drawShape();
    noStroke();
  }

  displayOutline() {
    push();
    stroke(this.col);
    strokeWeight(2);
    noFill();
    this._drawShape();
    pop();
  }
}
