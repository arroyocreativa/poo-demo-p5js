// =============================================
// Patrón Factory – Sistema de Dibujo Interactivo
// =============================================

// --- Clase base ---
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

// --- Subclases ---
class Circulo extends Figura {
  _drawShape() {
    ellipse(this.x, this.y, this.tam);
  }

  display() {
    fill(this.col);
    noStroke();
    this._drawShape();
  }

  displayOutline() {
    noFill();
    stroke(this.col);
    strokeWeight(1.5);
    this._drawShape();
  }
}

class Cuadrado extends Figura {
  _drawShape() {
    rectMode(CENTER);
    rect(this.x, this.y, this.tam, this.tam);
    rectMode(CORNER);
  }

  display() {
    fill(this.col);
    noStroke();
    this._drawShape();
  }

  displayOutline() {
    noFill();
    stroke(this.col);
    strokeWeight(1.5);
    this._drawShape();
  }
}

class Triangulo extends Figura {
  _drawShape() {
    triangle(
      this.x,                this.y - this.tam / 2,
      this.x - this.tam / 2, this.y + this.tam / 2,
      this.x + this.tam / 2, this.y + this.tam / 2
    );
  }

  display() {
    fill(this.col);
    noStroke();
    this._drawShape();
  }

  displayOutline() {
    noFill();
    stroke(this.col);
    strokeWeight(1.5);
    this._drawShape();
  }
}

// Personaje basado en el dibujo estático proporcionado.
// Pivote: centroide del triángulo (320,200) coincide con el puntero del mouse.
class Personaje extends Figura {
  _drawShape() {
    push();

    // 1) Puntero como origen
    translate(this.x, this.y);

    // 2) Escala proporcional (150px aprox de alto del triángulo original)
    const s = this.tam / 150;
    scale(s);

    // 3) Pivote al centro del triángulo:
    // triángulo: (320,100)-(220,250)-(420,250)
    // centroide = ((320+220+420)/3, (100+250+250)/3) = (320,200)
    translate(-320, -200);

    // === Cabeza/triángulo ===
    fill("yellow");
    stroke(0);
    strokeWeight(2);
    triangle(320, 100, 220, 250, 420, 250);

    // === Piernas ===
    strokeWeight(4);
    // pierna izquierda
    line(280, 250, 250, 300);
    line(250, 300, 280, 340);
    line(280, 340, 260, 350);

    // pierna derecha
    line(360, 250, 370, 340);
    line(370, 340, 390, 340);

    // === Corbatín ===
    fill(0);
    triangle(320, 220, 300, 210, 300, 230);
    triangle(320, 220, 340, 210, 340, 230);

    // === Ojo ===
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

// --- Factory ---
class FiguraFactory {
  static crear(tipo, x, y, tam, col) {
    switch (tipo) {
      case 'circulo':   return new Circulo(x, y, tam, col, tipo);
      case 'cuadrado':  return new Cuadrado(x, y, tam, col, tipo);
      case 'triangulo': return new Triangulo(x, y, tam, col, tipo);
      case 'personaje': return new Personaje(x, y, tam, col, tipo);
      default:          return new Circulo(x, y, tam, col, 'circulo');
    }
  }
}

// --- Estado global ---
let menu = [];
let dibujos = [];
let figuraActiva = 'circulo';
let colorActual = '#1a1a1a';
let tamActual = 30;

const MENU_HEIGHT = 90;
const TIPOS = ['circulo', 'cuadrado', 'triangulo', 'personaje'];
const MENU_COLS = ['#ef4444', '#22c55e', '#3b82f6', '#f59e0b'];
const COLORES = [
  '#1a1a1a', '#ef4444', '#f97316',
  '#eab308', '#22c55e', '#3b82f6',
  '#a855f7', '#ffffff'
];
const WHEEL_SENSITIVITY = 0.05;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  for (let i = 0; i < TIPOS.length; i++) {
    menu.push(FiguraFactory.crear(TIPOS[i], 60 + i * 70, 50, 40, MENU_COLS[i]));
  }
}

function draw() {
  background(245);

  // Dibujar mientras el mouse está presionado (fuera del área del menú)
  if (mouseIsPressed && mouseY > MENU_HEIGHT) {
    dibujos.push(
      FiguraFactory.crear(figuraActiva, mouseX, mouseY, tamActual, colorActual)
    );
  }

  // Renderizar dibujos guardados
  for (const f of dibujos) f.display();

  // Renderizar menú con retroalimentación visual del elemento activo
  for (const item of menu) {
    if (item.tipo === figuraActiva) {
      stroke(30);
      strokeWeight(3);
    } else {
      noStroke();
    }
    item.display();
  }
  noStroke();

  // Preview del cursor
  if (mouseY > MENU_HEIGHT) {
    const preview = FiguraFactory.crear(figuraActiva, mouseX, mouseY, tamActual, colorActual);
    preview.displayOutline();
    noStroke();
  }
}

function mousePressed() {
  for (const item of menu) {
    if (item.isClicked(mouseX, mouseY)) {
      figuraActiva = item.tipo;
      return;
    }
  }
}

function keyPressed() {
  // Limpiar canvas con 'c'
  if (key === 'c' || key === 'C') dibujos = [];

  // Cambiar color con teclas 1–8
  const idx = int(key) - 1;
  if (idx >= 0 && idx < COLORES.length) colorActual = COLORES[idx];

  // Cambiar tamaño con + / -
  if (key === '+' || key === '=') tamActual = min(tamActual + 5, 100);
  if (key === '-') tamActual = max(tamActual - 5, 5);
}

function mouseWheel(event) {
  tamActual -= event.delta * WHEEL_SENSITIVITY;
  tamActual = constrain(tamActual, 5, 100);
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}