class Mariposa extends Figura {
  constructor(x, y, tam, tipo) {
    super(x, y, tam, tipo);
    this.col = "#ffffff";
  }

  _drawShape() {
    push();

    translate(this.x, this.y);

    const s = this.tam / 100;
    scale(s);

    translate(-200, -200);

    fill(255, 255, 255);
    stroke(0);
    strokeWeight(1);

    // centro
    ellipse(200, 200, 20, 20);

    // 1 petalo
    ellipse(200, 145, 32, 80);

    // 2 petalo
    rotate(4 / 6);
    ellipse(292, -65, 70, 150);

    // 3 petalo
    rotate(-4 / 6);
    ellipse(200, 255, 32, 80);

    // 4 petalo
    rotate(-5 / 6);
    ellipse(-22, 200, 70, 150);

    // 5 petalo
    rotate(2 / 6);
    ellipse(100, 338, 55, 110);

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
