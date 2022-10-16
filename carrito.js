let carrito  = []

function cargarItems(carrito)
{
  let articulo;
  let seguir;
  do
  {
    articulo = cargarUnItem();
    carrito.push(articulo);
    seguir = prompt("desea continuar cargando items? si/no");
  }while(seguir == 'si');  

}

function cargarUnItem()
{
    let articulo = new Item();
    articulo.categoria = prompt("Ingrese categoria del articulo");
    articulo.modelo = prompt("Ingrese modelo del articulo");
    articulo.color = prompt("Ingrese color del producto");
    articulo.talle = prompt("ingrese talle del producto");
    articulo.precioUnitario = parseFloat(prompt("ingrese precio del producto"));
    articulo.cantidad = parseInt(prompt("ingrese cantidad del producto"));
    
    return articulo;
}

function mostrarCarrito(carrito) // Mostrar carrito con ForOf.
{
    for (let articulo of carrito)
    {
        console.log("Categoria: " +articulo.categoria + "\n"
                    +"Modelo: "+articulo.modelo+ "\n"
                    +"Color: "+articulo.color+ "\n"
                    +"Talle: "+articulo.talle+ "\n"
                    +"Precio Unitario: "+articulo.precioUnitario+ "\n"
                    +"Cantidad: "+articulo.cantidad+ "\n");
    }
}

function mostrarCarritoDOM(carrito) // Utlize lo visto en al clase de DOM para tambien mostrar todo en la pagina.
{
    let tabla = document.getElementById("items")
    tabla.innerHTML = ""
    carrito.forEach((elemento) => {
        tabla.innerHTML +=  `
                          <tr>
                            <th> ${elemento.categoria} </th>
                            <th> ${elemento.modelo} </th>
                            <th> ${elemento.color} </th>
                            <th> ${elemento.talle} </th>
                            <th> ${elemento.precioUnitario} </th>
                            <th> ${elemento.cantidad} </th>
                          </tr>`
    })

}

// Buscar un elemento especifico ingresado por el prompt //
function buscarElemento(carrito,modelo)
{
   let elemento = carrito.find((articulo) => {
        return articulo.modelo == modelo; 
    }) //// si no lo encuentra devolvera undefined

    return elemento;
}

cargarItems(carrito);
mostrarCarritoDOM(carrito);
mostrarCarrito(carrito);
console.log(buscarElemento(carrito, prompt('Ingrese el modelo del producto que desea buscar')));

// Ordenar por precio //
let ordenarPrecio = [];
ordenarPrecio = carrito.map (elemento => elemento);
ordenarPrecio = carrito;
ordenarPrecio.sort (function (a,b) {
    return a.precioUnitario - b.precioUnitario;
});
console.log ("ordenados de menor a mayor por Precio Unitario");
console.log(ordenarPrecio);

// Mostrar el carrito utilizando una Higher Function //
function mostrarCarritovHF(carrito,fn)
{
  for (let elem of carrito)
  {
    fn(elem);
  }

}

function mostrarUnElemento(articulo)
{
    console.log("Categoria: " +articulo.categoria + "\n"
    +"Modelo: "+articulo.modelo+ "\n"
    +"Color: "+articulo.color+ "\n"
    +"Talle: "+articulo.talle+ "\n" 
    +"Precio Unitario: "+articulo.precioUnitario+ "\n"
    +"Cantidad: "+articulo.cantidad+ "\n");
}

console.log ("Mostrar carrito utilizando una Higher Function")
console.log (mostrarCarritovHF(carrito,mostrarUnElemento));