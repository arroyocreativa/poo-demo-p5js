// Plantilla para estudiantes: crear una figura nueva en archivo independiente.
class EjemploSubclase extends Figura {
  constructor(x, y, tam, tipo) {
    super(x, y, tam, tipo);
    this.col = "#a855f7";
  }

  _drawShape() {
    // Reemplazar por la forma que quieras
    ellipse(this.x, this.y, this.tam, this.tam * 0.6);
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

/*
Pasos para integrarla:
1) Incluir este archivo en index.html (antes de FiguraFactory.js).
2) Agregar un case en FiguraFactory.js, por ejemplo:
   case "ejemplo": return new EjemploSubclase(x, y, tam, tipo);
3) Agregar "ejemplo" al arreglo TIPOS en sketch.js.
*/
