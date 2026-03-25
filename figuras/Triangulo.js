class Triangulo extends Figura {
  _drawShape() {
    triangle(
      this.x, this.y - this.tam / 2,
      this.x - this.tam / 2, this.y + this.tam / 2,
      this.x + this.tam / 2, this.y + this.tam / 2
    );
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
