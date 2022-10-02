const impuestoCompraUsd = 0.75;

let opcionMenu = parseInt(prompt("Seleccione la opcion deseada:\n1-Calcular Precio con impuesto\n2-Salir"));

while (opcionMenu != 2) {

    if (opcionMenu == 1) {
        let precioJuego = parseFloat(prompt('Ingrese el valor del videojuego'));
        let totalImpuesto = calcularPrecioFinal (precioJuego);
        let totalPrecio = precioJuego + totalImpuesto;
        alert ('El impuesto total sobre el precio del video juego es:\n' + '$' + totalImpuesto + '\nEl precio total a pagar es:\n' + '$' + totalPrecio);

    }
    else if (opcionMenu == 2) {
        alert ('Gracias por su consulta');
    }
    else {
        alert ('Opcion Invalida');
    }

    opcionMenu = parseInt(prompt("Desea calcular otro precio?:\n1-Calcular Precio con impuesto\n2-Salir"));
}

function calcularPrecioFinal (precio) {
    let impuesto = precio * impuestoCompraUsd;
    return impuesto;
}
