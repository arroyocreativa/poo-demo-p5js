class Circulo extends Figura {
  _drawShape() {
    ellipse(this.x, this.y, this.tam);
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
