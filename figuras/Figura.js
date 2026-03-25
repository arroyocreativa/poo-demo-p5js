// Clase base para todas las figuras
class Figura {
  constructor(x, y, tam, col, tipo) {
    this.x = x;
    this.y = y;
    this.tam = tam;
    this.col = col;
    this.tipo = tipo;
  }

  display() {}
  displayOutline() {}

  isClicked(mx, my) {
    return dist(mx, my, this.x, this.y) < this.tam / 2;
  }
}
