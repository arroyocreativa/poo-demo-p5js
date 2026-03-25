class FiguraFactory {
  static crear(tipo, x, y, tam, col) {
    switch (tipo) {
      case "circulo":
        return new Circulo(x, y, tam, col, tipo);
      case "cuadrado":
        return new Cuadrado(x, y, tam, col, tipo);
      case "triangulo":
        return new Triangulo(x, y, tam, col, tipo);
      case "billCipher":
        return new BillCipher(x, y, tam, col, tipo);
      default:
        return new Circulo(x, y, tam, col, "circulo");
    }
  }
}
