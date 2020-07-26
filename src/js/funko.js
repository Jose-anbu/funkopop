export default class Funko {    // export default -> le indico que toda la clase podrá ser exportada y accededida desde otros archivos
    constructor(codigo, nombre, numeroSerie, categoria, descripcion, stock, precio, imagen) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.numeroSerie = numeroSerie;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.stock = stock;
        this.precio = precio;
        this.imagen = imagen;
    }
}

