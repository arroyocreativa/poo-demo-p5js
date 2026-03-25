# poo-demo-p5js

App de dibujo interactivo con p5.js para enseñar Programación Orientada a Objetos (POO), herencia y patrón de diseño Factory.

## Objetivo pedagógico

Este proyecto muestra cómo pasar de "dibujar formas" a diseñar un sistema orientado a objetos donde:

1. Hay una clase base con comportamiento común.
2. Hay subclases que implementan su propia forma de dibujar.
3. Un Factory decide qué clase instanciar según un tipo.
4. El resto de la app usa una interfaz uniforme (polimorfismo).

## Estado actual de la app

La app funciona con 4 tipos de figura:

1. `circulo`
2. `cuadrado`
3. `triangulo`
4. `billCipher`

Comportamiento principal:

1. Menú superior con botones de figuras.
2. Dibujo continuo manteniendo clic en el canvas.
3. Vista previa de la figura activa cerca del cursor.
4. Ajuste de tamaño con teclado o rueda del mouse.
5. Limpieza del lienzo con tecla `C`.

## Controles

| Acción | Entrada |
|---|---|
| Seleccionar figura | Clic en un botón del menú superior |
| Dibujar | Mantener presionado el mouse en el canvas |
| Aumentar tamaño | `+` o `=` |
| Reducir tamaño | `-` |
| Ajustar tamaño con rueda | Scroll arriba/abajo |
| Limpiar dibujo | `C` |

## Arquitectura POO (clases y subclases)

### 1) Clase base: `Figura`

Archivo: `figuras/Figura.js`

Responsabilidades:

1. Guardar estado común: `x`, `y`, `tam`, `tipo`.
2. Definir la interfaz común: `display()` y `displayOutline()`.
3. Ofrecer utilidad compartida: `isClicked(mx, my)` para detectar clics en menú.

Idea clave:

- `Figura` abstrae "algo dibujable".
- No define una forma específica: eso lo resuelven las subclases.

### 2) Subclases concretas

Archivos:

1. `figuras/Circulo.js`
2. `figuras/Cuadrado.js`
3. `figuras/Triangulo.js`
4. `figuras/BillCipher.js`

Cada subclase:

1. Hereda de `Figura` (`extends Figura`).
2. Define su propio color en el constructor (`this.col`).
3. Implementa su forma en `_drawShape()`.
4. Implementa `display()` (relleno + borde).
5. Implementa `displayOutline()` (solo contorno para preview).

Esto permite polimorfismo: el programa llama `display()` sin saber si es círculo, triángulo o Bill Cipher.

## Patrón Factory aplicado

Archivo: `figuras/FiguraFactory.js`

`FiguraFactory.crear(tipo, x, y, tam)` centraliza la creación de objetos:

1. Si `tipo` es `circulo`, retorna `new Circulo(...)`.
2. Si `tipo` es `cuadrado`, retorna `new Cuadrado(...)`.
3. Si `tipo` es `triangulo`, retorna `new Triangulo(...)`.
4. Si `tipo` es `billCipher`, retorna `new BillCipher(...)`.
5. Si no coincide, usa `Circulo` por defecto.

Ventaja didáctica:

- El código cliente no necesita conocer clases concretas.
- La lógica de construcción queda en un solo punto.
- Agregar nuevas figuras requiere cambios mínimos y localizados.

## Flujo de ejecución (cómo se conecta todo)

1. `index.html` carga p5.js y luego las clases en orden:
   `Figura` -> subclases -> `FiguraFactory` -> `sketch.js`.
2. En `setup()`, se crea el menú con `FiguraFactory.crear(...)`.
3. En `draw()`, al mantener clic, se agregan instancias a `dibujos`.
4. Luego se recorre `dibujos` y se llama `display()` a cada objeto.
5. Para vista previa, se crea una figura temporal y se llama `displayOutline()`.

## ¿Dónde se ve la POO en este proyecto?

1. Encapsulación: cada objeto figura guarda su propio estado.
2. Herencia: clases hijas reutilizan estructura de `Figura`.
3. Polimorfismo: mismo mensaje (`display`) para objetos distintos.
4. Abstracción: `Figura` define "qué" debe poder hacer una figura, no "cómo".

## Cómo ejecutar

1. Abre `index.html` en navegador.
2. Recomendado en VS Code: extensión Live Server para recarga rápida.

## Estructura actual del proyecto

```
poo-demo-p5js/
├── index.html
├── p5.min.js
├── sketch.js
├── README.md
└── figuras/
    ├── Figura.js
    ├── FiguraFactory.js
    ├── Circulo.js
    ├── Cuadrado.js
    ├── Triangulo.js
    ├── BillCipher.js
    └── EjemploSubclase.js
```

## Actividad sugerida para clase

Agregar una nueva subclase `Estrella` y conectarla al sistema.

Pasos:

1. Crear `figuras/Estrella.js` con `class Estrella extends Figura`.
2. Implementar `_drawShape()`, `display()` y `displayOutline()`.
3. Cargar el script en `index.html` antes de `FiguraFactory.js`.
4. Agregar caso `estrella` en `FiguraFactory.crear(...)`.
5. Incluir `estrella` en `TIPOS` en `sketch.js`.

Con esto se evidencia el principio Open/Closed: extender comportamiento sin reescribir toda la app.