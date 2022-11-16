let carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
let stock = [];

const tabla = document.getElementById("items");
const agregar = document.querySelector("#agregar");
const descuento = document.querySelector("#descuento");
const ordenar = document.getElementById("ordenar");
const vaciar = document.getElementById("vaciar");
const productosEnStock = document.getElementById("productos");

listadoUpdate();

fetch(`./stock.json`)
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    stock = JSON.parse(data);
    cargarListado();
    console.log(stock);
  });

console.log(stock);

function cargarListado() {
  stock.forEach((producto) => {
    let option = document.createElement("option");
    option.innerText = `${producto.nombre} $${producto.precio}`;
    option.value = stock.indexOf(producto); ///nos devuelve el indice en el array
    productosEnStock.appendChild(option); ///le agregamos al select el option
  });
}

function newRow(item) {
  let row = document.createElement("tr");
  let pos = carrito.indexOf(item); ///el indice en el carrito

  ///creo celda con NOMBRE
  let celda = document.createElement("td");
  celda.innerText = item.producto.nombre;
  row.append(celda); ///agregue el nombre

  ///creo la celda CANTIDAD
  celda = document.createElement("td");
  celda.innerText = item.cantidad;

  ///le agrego los botones INCREMENTO y DECREMENTO
  let botonIncremento = document.createElement("button");
  botonIncremento.className = "btn btn-primary";
  botonIncremento.innerText = "+";

  let botonDecremento = document.createElement("button");
  botonDecremento.className = "btn btn-primary";
  botonDecremento.innerText = "-";

  botonIncremento.onclick = () => {
    carrito[pos].cantidad++;
    listadoUpdate();
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  botonDecremento.onclick = () => {
    if (carrito[pos].cantidad > 0) {
      carrito[pos].cantidad--;
      listadoUpdate();
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  };

  celda.append(botonIncremento);
  celda.append(botonDecremento);
  row.append(celda);

  ///creo la celda precio
  celda = document.createElement("td");
  celda.innerText = item.producto.precio;
  row.append(celda);

  ///Creacion del boton Eliminar
  let botonEliminar = document.createElement("button");
  botonEliminar.className = "btn btn-danger";
  botonEliminar.innerText = "Eliminar";

  botonEliminar.onclick = () => {
    carrito.splice(pos, 1); ///elimina el objeto en la posicion pos del carrito
    listadoUpdate(); //vuelvo a generar los elementos del DOM
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  celda = document.createElement("td");
  celda.append(botonEliminar);
  row.append(celda);
  tabla.append(row);
}
/* calculo el total de precios */
function calculoTotal() {
  //Acumulo PrecioTotal
  total = document.getElementById("total");
  total.innerText = carrito.reduce(
    (suma, item) => suma + item.producto.precio * item.cantidad,
    0
  );
}

/* Actualizacion de la tabla */
function listadoUpdate() {
  tabla.innerHTML = "";
  carrito.forEach((item) => {
    newRow(item);
  });
  calculoTotal();
}

/* Se agrega un nuevo Item al carrito  */
agregar.addEventListener("submit", (e) => {
  e.preventDefault();
  let producto = stock[productosEnStock.value];

  let index = carrito.findIndex((element) => element.producto.nombre == producto.nombre);
  if (index != -1) {
    carrito[index].cantidad += 1;
    listadoUpdate();
  } else {
    let nuevoElementoCarrito = new Item(producto, 1); ///creamos el item de carrito
    carrito.push(nuevoElementoCarrito); ///agrego el elemento al carrito
    newRow(nuevoElementoCarrito);
  }
  calculoTotal();
  localStorage.setItem("carrito", JSON.stringify(carrito));
});

/* aplicamos el 20% de descuentoa los productos, si el cupon ingresado es valido */
descuento.addEventListener("submit", (e) => {
  e.preventDefault();
  let cupon = document.getElementById("cuponDescuento").value;
  if (cupon == "cursojs2022") {
    carrito = carrito.map((item) => {
      return new Item(
        new Producto(
          item.producto.nombre,
          item.producto.precio - item.producto.precio * 0.2
        ),
        item.cantidad
      );
    });
    listadoUpdate();
  } else {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Cupon no valido!',
      })
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
});

/* Ordenamiento por nombre */
ordenar.onclick = () => {
  carrito.sort((actual, siguiente) => {
    return actual.producto.nombre.localeCompare(siguiente.producto.nombre);
  });
  listadoUpdate();
};

/* Vaciar carrito */
vaciar.onclick = () => {
  carrito = [];
  listadoUpdate();
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
