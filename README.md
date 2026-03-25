# poo-demo-p5js

Sistema de dibujo interactivo desarrollado con **p5.js** aplicando el **patrón de diseño Factory** y principios de **Programación Orientada a Objetos**.

---

## 🚀 Demo

Abre `index.html` en tu navegador (o usa [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en VS Code).

### Controles

| Acción | Tecla / Gesto |
|---|---|
| Seleccionar figura | Clic en botón del menú |
| Dibujar | Mantener clic en el canvas |
| Cambiar color (8 opciones) | Teclas `1` – `8` |
| Aumentar tamaño | `+` o rueda del mouse ↑ |
| Reducir tamaño | `-` o rueda del mouse ↓ |
| Limpiar canvas | `c` |

---

## 🧩 Práctica: De clase simple a sistema de dibujo interactivo

### 🎯 Objetivo

Transformar una clase base (`Figura`) en un sistema donde:

```js
class Figura {
  constructor(x, y, tam, col) {
    this.x = x;
    this.y = y;
    this.tam = tam;
    this.col = col;
  }
  display() {
    fill(this.col);
    ellipse(this.x, this.y, this.tam);
  }
}
```

- Existan **múltiples tipos de figura**
- Haya un **menú de selección**
- Se pueda **dibujar con el mouse (clic sostenido)**

---

### 1. 🧱 Entender la clase base

Partimos de esto:

- Una clase `Figura` con:
  - `x`, `y` → posición
  - `tam` → tamaño
  - `col` → color
- Un método:
  - `display()` → dibuja un círculo

> ¿Qué pasaría si quisiéramos dibujar algo que **no** sea un círculo?

---

### 2. 🔧 Extender la clase con herencia

En lugar de agregar un `if` por cada tipo dentro de una sola clase, creamos **subclases** especializadas:

```js
class Figura {
  constructor(x, y, tam, col, tipo) {
    this.x = x; this.y = y;
    this.tam = tam; this.col = col;
    this.tipo = tipo;
  }
  display() {}
  isClicked(mx, my) {
    return dist(mx, my, this.x, this.y) < this.tam / 2;
  }
}

class Circulo extends Figura {
  display() { fill(this.col); ellipse(this.x, this.y, this.tam); }
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
      this.x,                this.y - this.tam / 2,
      this.x - this.tam / 2, this.y + this.tam / 2,
      this.x + this.tam / 2, this.y + this.tam / 2
    );
  }
}
```

---

### 3. 🏭 Aplicar el patrón Factory

El **Factory** centraliza la creación de objetos. En lugar de escribir `new Circulo(...)` o `new Cuadrado(...)` en cada lugar del código, delegamos esa decisión a un único método:

```js
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
```

Ahora cualquier parte del código que necesite crear una figura llama a:

```js
FiguraFactory.crear('cuadrado', mouseX, mouseY, 30, '#3b82f6');
```

---

### 4. 🎛️ Crear menú de selección

Usamos la factory para crear los botones del menú:

```js
const TIPOS = ['circulo', 'cuadrado', 'triangulo'];
const MENU_COLS = ['#ef4444', '#22c55e', '#3b82f6'];

for (let i = 0; i < TIPOS.length; i++) {
  menu.push(FiguraFactory.crear(TIPOS[i], 60 + i * 70, 50, 40, MENU_COLS[i]));
}
```

---

### 5. 🖱️ Detectar clics en el menú

El método `isClicked` heredado de `Figura` permite detectar si el puntero está dentro del botón:

```js
function mousePressed() {
  for (const item of menu) {
    if (item.isClicked(mouseX, mouseY)) {
      figuraActiva = item.tipo;
      return;
    }
  }
}
```

---

### 6. ✏️ Dibujar con clic sostenido

```js
let dibujos = [];

// dentro de draw():
if (mouseIsPressed && mouseY > MENU_HEIGHT) {
  dibujos.push(
    FiguraFactory.crear(figuraActiva, mouseX, mouseY, tamActual, colorActual)
  );
}

for (const f of dibujos) {
  f.display();
}
```

---

### 7. 🎨 Mejoras progresivas

#### Nivel 1 – Color dinámico

Teclas `1`–`8` cambian `colorActual` de una paleta predefinida.

#### Nivel 2 – Tamaño variable

`+` / `-` o la rueda del mouse modifican `tamActual`.

#### Nivel 3 – Retroalimentación visual del menú

```js
if (item.tipo === figuraActiva) {
  stroke(30); strokeWeight(3);
} else {
  noStroke();
}
```

#### Nivel 4 – Limpiar pantalla

```js
function keyPressed() {
  if (key === 'c' || key === 'C') dibujos = [];
}
```

#### Nivel 5 – Herencia (opcional)

Las clases hijas `Circulo`, `Cuadrado` y `Triangulo` ya implementan herencia sobre `Figura`.

---

## 💬 Discusión clave

> ¿Es mejor usar `tipo` (condicional) o herencia + Factory?

| Enfoque | Cuándo conviene |
|---|---|
| **`tipo` con `if/switch`** | Proyectos pequeños, pocas variaciones, prototipado rápido |
| **Herencia + Factory** | Cuando el número de variantes puede crecer, se quiere código extensible (principio Open/Closed), o varios módulos crean objetos del mismo tipo |

---

## 🧠 Preguntas de reflexión

- ¿Qué hace que esto sea **Programación Orientada a Objetos**?
- ¿Dónde está la **abstracción**? (pista: `display()` en la clase base)
- ¿Qué **responsabilidades** tiene cada clase?
- ¿Qué pasaría si quisiéramos **guardar el dibujo** como imagen o JSON?
- ¿Cómo añadirías un nuevo tipo de figura (por ejemplo, una estrella) con el mínimo de cambios?

---

## 🚀 Extensión creativa

Piensa en esto como un **instrumento** más que como un ejercicio:

- 🎵 **Dibujar con sonido** – el tamaño o color responde a la amplitud del micrófono
- ⏱️ **Dibujar con tiempo** – figuras que aparecen, crecen y desaparecen (animaciones)
- 🔁 **Dibujar con reglas** – simetría axial, radial, fractales
- ↩️ **Dibujar con memoria** – undo / redo con una pila de estados

---

## 📁 Estructura del proyecto

```
poo-demo-p5js/
├── index.html   # Página host (carga p5.js y sketch.js)
├── p5.min.js    # Biblioteca p5.js (incluida localmente)
└── sketch.js    # Lógica: Factory, clases, dibujo interactivo
```