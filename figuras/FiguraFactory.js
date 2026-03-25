class FiguraFactory {
  static crear(tipo, x, y, tam) {
    switch (tipo) {
      case "circulo":
        return new Circulo(x, y, tam, tipo);
      case "cuadrado":
        return new Cuadrado(x, y, tam, tipo);
      case "triangulo":
        return new Triangulo(x, y, tam, tipo);
      case "billCipher":
        return new BillCipher(x, y, tam, tipo);
      default:
        return new Circulo(x, y, tam, "circulo");
    }
  }
}
