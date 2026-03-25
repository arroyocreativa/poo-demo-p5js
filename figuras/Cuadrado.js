class Cuadrado extends Figura {
  _drawShape() {
    rectMode(CENTER);
    rect(this.x, this.y, this.tam, this.tam);
    rectMode(CORNER);
  }

  display() {
    fill(this.col);
    stroke(0);
    strokeWeight(1.5);
    this._drawShape();
  }

  displayOutline() {
    noFill();
    stroke(this.col);
    strokeWeight(1.5);
    this._drawShape();
  }
}
