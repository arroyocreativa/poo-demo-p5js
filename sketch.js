// App base: estado, interacción y render.
// Las clases de figuras viven en /figuras.

let menu = [];
let dibujos = [];
let figuraActiva = "circulo";
let colorActual = "#ef4444";
let tamActual = 30;

const MENU_HEIGHT = 90;
const TIPOS = ["circulo", "cuadrado", "triangulo", "personaje"];
const MENU_COLS = ["#ef4444", "#22c55e", "#3b82f6", "#f59e0b"];
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

  if (mouseIsPressed && mouseY > MENU_HEIGHT) {
    dibujos.push(FiguraFactory.crear(figuraActiva, mouseX, mouseY, tamActual, colorActual));
  }

  for (const f of dibujos) f.display();

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
      colorActual = item.col;
      return;
    }
  }
}

function keyPressed() {
  if (key === "c" || key === "C") dibujos = [];

  if (key === "+" || key === "=") tamActual = min(tamActual + 5, 100);
  if (key === "-") tamActual = max(tamActual - 5, 5);
}

function mouseWheel(event) {
  tamActual -= event.delta * WHEEL_SENSITIVITY;
  tamActual = constrain(tamActual, 5, 100);
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
