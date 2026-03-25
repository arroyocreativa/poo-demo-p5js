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

  isClicked(mx, my) {
    return dist(mx, my, this.x, this.y) < this.tam / 2;
  }
}

// --- Subclases ---
class Circulo extends Figura {
  display() {
    fill(this.col);
    ellipse(this.x, this.y, this.tam);
  }
}

class Cuadrado extends Figura {
  display() {
    fill(this.col);
    rectMode(CENTER);
    rect(this.x, this.y, this.tam, this.tam);
    rectMode(CORNER);
  }
}

class Triangulo extends Figura {
  display() {
    fill(this.col);
    triangle(
      this.x,               this.y - this.tam / 2,
      this.x - this.tam / 2, this.y + this.tam / 2,
      this.x + this.tam / 2, this.y + this.tam / 2
    );
  }
}

// --- Factory ---
class FiguraFactory {
  static crear(tipo, x, y, tam, col) {
    switch (tipo) {
      case 'circulo':   return new Circulo(x, y, tam, col, tipo);
      case 'cuadrado':  return new Cuadrado(x, y, tam, col, tipo);
      case 'triangulo': return new Triangulo(x, y, tam, col, tipo);
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
const TIPOS = ['circulo', 'cuadrado', 'triangulo'];
const MENU_COLS = ['#ef4444', '#22c55e', '#3b82f6'];
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
  noStroke();
  for (const f of dibujos) {
    f.display();
  }

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
  if (key === 'c' || key === 'C') {
    dibujos = [];
  }

  // Cambiar color con teclas 1–8
  const idx = int(key) - 1;
  if (idx >= 0 && idx < COLORES.length) {
    colorActual = COLORES[idx];
  }

  // Cambiar tamaño con + / -
  if (key === '+' || key === '=') tamActual = min(tamActual + 5, 100);
  if (key === '-') tamActual = max(tamActual - 5, 5);
}

function mouseWheel(event) {
  tamActual -= event.delta * WHEEL_SENSITIVITY;
  tamActual = constrain(tamActual, 5, 100);
  return false; // prevenir scroll de página
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
