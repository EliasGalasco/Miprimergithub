/*DOM SELECTOR*/
const buscadorTienda = document.querySelector(`.buscadorTienda`);
const btnSearch = document.querySelector(`.btn-search`);
const carritoContenedor = document.querySelector(`#carritoContenedor`)
const reiniciarCarro = document.querySelector(`#reiniciarCarro`)
const precioTotal = document.querySelector(`#precioTotal`)
const finalizarCompra = document.querySelector(`#finalizarCompra`)



//ARRAY de productos
const todosLosProductos = [aqtua, caffezino, ego10, egofrutas, egolife, egoherbal, estop]
/*ARRAY VACIO CARRITO*/
let carrito = []

//Bucle para cars
for (let prod of todosLosProductos) {
    const { id, nombre, descripcion, precio, imagen, cantidad } = prod
    let cardsProductos = document.createElement("div")
    cardsProductos.className = "col-12 col-md-6 col-lg-6 col-xl-4 cardsBody";
    cardsProductos.innerHTML += `
        <div class="card cardShop h-100">
            <img src="../imagenes/${imagen}" class="card-img-top cardShop" alt="${nombre}">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${descripcion}</p>
                <span class="card-text">Cantidad: ${cantidad}</span>
                <p class="precioscards">Precio: $${precio}</p>
                <div class="btnTienda">
                    <button id="boton-${id}"  class="btn">Agregar al carrito <i class="fa-solid fa-cart-shopping"></i></i></button>
                </div>
            </div>
        </div>
    </div>`
    productos.appendChild(cardsProductos);
    const boton = document.querySelector(`#boton-${id}`);
    boton.addEventListener('click', () => {
        agregarProducto(prod)
    })

};


/*FUNCTION btn PARA BUSCADOR */



/*FUNCION Input BUSCADOR */
buscadorTienda.addEventListener("input", () => { buscarProducto(buscadorTienda.value, todosLosProductos) })

function buscarProducto(buscador, array) {
    console.log(buscador)
    let busqueda = array.filter(
        (producto) => producto.nombre == producto
    )
        console.log(busqueda)
}

/*REINICIAR CARRITO DE COMPRAS*/
reiniciarCarro.addEventListener("click", () => {
    carrito.length = []
    mostrarCarro(carrito)
})

/*GUARDAR AL CARRITO*/
function agregarProducto(prod) {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'El producto fue agregado con Exito!!',
        showConfirmButton: false,
        timer: 1500
    })
    carrito.push(prod)
    mostrarCarro(carrito);
}
/*Guardar productos en storage */
function guardarStorage() {
    localStorage.setItem("carro", JSON.stringify(carrito))
}
document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carro")) || []
    mostrarCarro()
})


/*Agregar items en el modal*/
const mostrarCarro = () => {
    let modalBody = document.querySelector("#modalBodyId")
    modalBody.innerHTML = ""
    carrito.forEach((prod) => {
        const { id, nombre, precio, imagen, cantidad } = prod
        modalBody.innerHTML += `
        <div id="productosEnCarrito${id}" class="modal-contenedor">
            <div>
                <img class="img-fluid img-carrito" src="${imagen}"/>
            </div>
            <div>
                <p class="precioscards">Producto: ${nombre} </p>
                <p class="precioscards">Cantidad: ${cantidad} </p>
                <p class="precioscards"> Precio: $${precio} </p>
                <button id="btnEliminar${id}" class="btn btnEliminarCarrito">Eliminar Producto</button>
            </div>
        </div>
        `
    })
    /*Eliminacion */
    carrito.forEach((prod, i) => {
        const { id } = prod
        document.getElementById(`btnEliminar${id}`).addEventListener("click", () => {
            /*Eliminar del DOM */
            let cardProductos = document.querySelector(`#productosEnCarrito${id}`)
            cardProductos.remove()
            /*Eliminar del array */
            carrito.splice(i, 1)
            /*Eliminar del Storage */
            localStorage.setItem("carro", JSON.stringify(carrito))


        })
    });
    if (carrito.length === 0) {
        modalBody.innerHTML = `
        <p class="text-center f-bold"> Aun no agregaste ningún producto!</p>
        `
    }
    /*Contador de items del carrito*/
    carritoContenedor.textContent = carrito.length
    guardarStorage()
    /*Precio Total*/
    precioTotal.textContent = carrito.reduce((suma, producto) => suma + producto.precio, 0)

}
/*Finalizar Compra SweetAlert */

finalizarCompra.addEventListener(`click`, () => {
    compraFinalizada()
})

function compraFinalizada() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Estas Seguro que quieres continuar?',
        text: "Tranquilo/a puede cancelarlo si no lo estas!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Continuar!',
        cancelButtonText: 'No, Cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Excelente!',
                'Tu orden fue registrada con exito!.',
                'success'
            )
            carrito.length = []
            localStorage.removeItem("carro")
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Rechazada!',
                'Tu orden ha sido rechazada, intentelo de nuevo :)',
                'error'
            )
        }
    })
}