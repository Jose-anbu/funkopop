import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';
import Funko from './funko.js';  // import nombreDeLaVariableDondeVoyAGuardarLoQueQuieroImportar from './archivoAImportar'; -> si está en la misma ubicación solo agregar ./
import $ from 'jquery';

// INICIALIZO VARIABLES
let productos = [];
leerProductos();

let productoExistente = false; // false = producto es nuevo; true = modificar producto

window.agregarProducto = function (event) {     // window.nombreDeVariable = function (event) -> para cuando queremos acceder a una función por fuera del archivo js cuando usamos webpack 
    event.preventDefault();
    console.log("desde agregar producto");

    // validar formulario
    if (ingresarCodigo() && ingresarNombre() && ingresarNumSerie() && ingresarCategoria() && ingresarDescripcion() && ingresarStock() && ingresarPrecio() && ingresarImagen()) {
        console.log("todo ok")
        // CREAR EL OBJETO
        let productoFunko = new Funko(codigo.value, nombre.value, numeroSerie.value, categoria.value, descripcion.value, stock.value, precio.value, imagen.value);

        console.log(productoFunko);

        // GUARDO EL OBJETO EN EL ARRAY: nombreArreglo.push(loQueQuieroGuardar)
        productos.push(productoFunko);

        // GUARDAR EL ARRAY EN LOCALSTORAGE
        localStorage.setItem('funkopopKey', JSON.stringify(productos));

        // LIMPIAR FORMULARIO
        limpiarFormulario();

        leerProductos();
    }
}

// FUNCIONES PARA VALIDAR CAMPOS
let codigo = document.getElementById('codigo');
let nombre = document.getElementById('nombre');
let numeroSerie = document.getElementById('numSerie');
let categoria = document.getElementById('categoria');
let descripcion = document.getElementById('descripcion');
let stock = document.getElementById('stock');
let precio = document.getElementById('precio');
let imagen = document.getElementById('imagen');
codigo.addEventListener('blur', ingresarCodigo);
nombre.addEventListener('blur', ingresarNombre);
numeroSerie.addEventListener('blur', ingresarNumSerie);
categoria.addEventListener('blur', ingresarCategoria);
descripcion.addEventListener('blur', ingresarDescripcion);
stock.addEventListener('blur', ingresarStock);
precio.addEventListener('blur', ingresarPrecio);
imagen.addEventListener('blur', ingresarImagen);

function ingresarCodigo() {
    let quitarEspacios = / /;
    if (codigo.value != "" && !isNaN(codigo.value) && !quitarEspacios.test(codigo.value)) {
        codigo.className = 'form-control is-valid';
        return true;
    } else {
        codigo.className = 'form-control is-invalid';
        return false;
    }
}

function ingresarNombre() {
    if (nombre.value != "") {
        nombre.className = 'form-control is-valid';
        return true;
    } else {
        nombre.className = 'form-control is-invalid';
        return false;
    }
}

function ingresarNumSerie() {
    if (numeroSerie.value != "") {
        numeroSerie.className = 'form-control is-valid';
        return true;
    } else {
        numeroSerie.className = 'form-control is-invalid';
        return false;
    }
}

function ingresarCategoria() {
    if (isNaN(categoria.value)) {
        categoria.className = 'form-control is-valid';
        return true;
    } else {
        categoria.className = 'form-control is-invalid';
        return false;
    }
}

function ingresarDescripcion() {
    if (isNaN(descripcion.value)) {
        descripcion.className = 'form-control is-valid';
        return true;
    } else {
        descripcion.className = 'form-control is-invalid';
        return false;
    }
}

function ingresarStock() {
    let quitarEspacios = / /;
    if (stock.value != "" && !isNaN(stock.value) && !quitarEspacios.test(stock.value)) {
        stock.className = 'form-control is-valid';
        return true;
    } else {
        stock.className = 'form-control is-invalid';
        return false;
    }
}

function ingresarPrecio() {
    let quitarEspacios = / /;
    if (precio.value != "" && !isNaN(precio.value) && !quitarEspacios.test(precio.value)) {
        precio.className = 'form-control is-valid';
        return true;
    } else {
        precio.className = 'form-control is-invalid';
        return false;
    }
}

function ingresarImagen() {
    let quitarEspacios = / /;
    let expresion = /[a-z]+\.+(jpeg|jpg|png)/;
    if (isNaN(imagen.value) && expresion.test(imagen.value) && !quitarEspacios.test(imagen.value)) {
        imagen.className = 'form-control is-valid';
        return true;
    } else {
        imagen.className = 'form-control is-invalid';
        return false;
    }
}

function leerProductos() {
    // ESTA FUNCION LEE LOS DATOS DE LOCALSTORAGE
    if (localStorage.length > 0) {
        let _productos = JSON.parse(localStorage.getItem('funkopopKey'));

        if (productos.length == 0) {
            productos = _productos;
        }

        // BORRAR FILAS
        borrarFilas();

        // DIBUJAR LAS FILAS DE LA TABLA
        dibujarFilas(_productos);
    }
}

function dibujarFilas(_productos) {
    let tbody = document.getElementById('listaProductos');
    let codHtml = '';
    for (let i in _productos) {
        codHtml = `<tr>
        <th scope="row">${_productos[i].codigo}</th>
        <td>${_productos[i].nombre}</td>
        <td>${_productos[i].numeroSerie}</td>
        <td>${_productos[i].categoria}</td>
        <td>${_productos[i].descripcion}</td>
        <td>${_productos[i].stock}</td>
        <td>$ ${_productos[i].precio}</td>
        <td>${_productos[i].imagen}</td>
        <td>
            <button class="btn btn-outline-info" onclick="editarProducto(${_productos[i].codigo})">Editar</button>
            <button class="btn btn-outline-danger" onclick="eliminarProducto(this)" id="${_productos[i].codigo}">Borrar</button>
        </td>
    </tr>`

        tbody.innerHTML += codHtml;
    }
}

function borrarFilas() {
    let tbody = document.getElementById('listaProductos');
    if (tbody.children.length > 0) {
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
    }
}

// ABM: Alta Baja y Modificaciones. CRUD: Create Read Update Delete

window.eliminarProducto = function (prod) {
    console.log(prod);

    // BUSCAR UN OBJETO EN EL ARREGLO (OPCION 1)
    // for(let i in productos){
    //     if (productos[i].codigo == prod.id){
    //         // OBJETO ENCONTRADO

    //     }
    // }

    // filter: DEVUELVE UN ARREGLO
    let arregloFiltrado = productos.filter(function (item) {
        return item.codigo != prod.id;   // indico que quiero conservar todos los items cuyo código sea distinto del código "2" supongamos. Por lo tanto la variable arregloFiltrado guardará los items que no cumplan con la condición (en este caso, es que NO cumplan porque tiene !=)
    })

    console.log(arregloFiltrado);

    localStorage.setItem('funkopopKey', JSON.stringify(arregloFiltrado));
    productos = arregloFiltrado;
    leerProductos();

    console.log(arregloFiltrado);
}

window.editarProducto = function (codigo) {
    console.log(codigo);

    let modalProducto = document.getElementById('modalProducto');
    // BUSCAR PRODUCTO: usamos find -> trae el producto que corresponde a la condicion que le coloquemos
    let objetoEncontrado = productos.find(function (producto) {
        return producto.codigo == codigo;
    })

    console.log(objetoEncontrado);

    // CARGAR EN EL MODAL LOS DATOS DEL OBJETO QUE QUIERO EDITAR
    document.getElementById('codigo').value = objetoEncontrado.codigo;
    document.getElementById('nombre').value = objetoEncontrado.nombre;
    document.getElementById('numSerie').value = objetoEncontrado.numeroSerie;
    document.getElementById('categoria').value = objetoEncontrado.categoria;
    document.getElementById('descripcion').value = objetoEncontrado.descripcion;
    document.getElementById('stock').value = objetoEncontrado.stock;
    document.getElementById('precio').value = objetoEncontrado.precio;
    document.getElementById('imagen').value = objetoEncontrado.imagen;

    // TAMBIEN PODEMOS HACERLO DE LA SIGUIENTE MANERA
    // document.getElementById('codigo').value = objetoEncontrado.codigo;
    // nombre.value = objetoEncontrado.nombre;
    // numeroSerie.value = objetoEncontrado.numeroSerie;
    // categoria.value = objetoEncontrado.categoria;
    // descripcion.value = objetoEncontrado.descripcion;
    // stock.value = objetoEncontrado.stock;
    // precio.value = objetoEncontrado.precio;
    // imagen.value = objetoEncontrado.imagen;

    // CAMBIAR EL VALOR DE LA VARIABLE BANDERA
    productoExistente = true;

    // ABRIR LA VENTANA MODAL
    $(modalProducto).modal('show');
}

window.guardarDatos = function (event) {

    if (productoExistente == false) {
        // agregar un nuevo producto
        agregarProducto(event);
    } else {
        // modificar el producto existente
        productoModificado(event);
    }
}

function productoModificado(event) {
    event.preventDefault();
    console.log("guardando datos del producto");

    // TOMAR LOS DATOS MODIFICADOS DEL FORM
    let codigo = document.getElementById('codigo').value,
        nombre = document.getElementById('nombre').value,
        numeroSerie = document.getElementById('numSerie').value,
        categoria = document.getElementById('categoria').value,
        descripcion = document.getElementById('descripcion').value,
        stock = document.getElementById('stock').value,
        precio = document.getElementById('precio').value,
        imagen = document.getElementById('imagen').value;

    // ACTUALIZAR ESOS DATOS EN EL ARREGLO
    for (let i in productos) {
        if (productos[i].codigo == codigo) {
            // encontramos el producto
            productos[i].nombre = nombre;
            productos[i].numeroSerie = numeroSerie;
            productos[i].categoria = categoria;
            productos[i].descripcion = descripcion;
            productos[i].stock = stock;
            productos[i].precio = precio;
            productos[i].imagen = imagen;
        }
    }

    // ACTUALIZARMOS EL LOCALSTORAGE
    localStorage.setItem("funkopopKey", JSON.stringify(productos));
    limpiarFormulario();

    // ACTUALIZAR FILAS DE LA TABLA
    leerProductos();

    let modalProducto = document.getElementById('modalProducto');
    $(modalProducto).modal('hide');
}

// LIMPIAR FORMULARIO
function limpiarFormulario() {
    document.getElementById('formProducto').reset();
    productoExistente = false;
}