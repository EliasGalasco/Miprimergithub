/*DOM SELECTOR*/

const carritoContenedor = document.querySelector(`#carritoContenedor`)
const reiniciarCarro = document.querySelector(`#reiniciarCarro`)
const precioTotal = document.querySelector(`#precioTotal`)
const finalizarCompra = document.querySelector(`#finalizarCompra`)
const productos = document.querySelector("#productos")




/*ARRAY VACIO CARRITO*/
let carrito = []


document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carro")) || []
    mostrarCarro()
})

//ARRAY de productos
const todosLosProductos = []



/*CARGAR ESTANTERIA JSON */

const cargarProductos = async()=>{
    const res = await fetch ("../productos.json")
    const data = await res.json()
    for(let prod of data){
        let prodNuevo = new productosShine(prod.id,prod.nombre,prod.descripcion,prod.precio,prod.imagen,prod.cantidad)
        todosLosProductos.push(prodNuevo)
    }
    renderizar(todosLosProductos)
}
cargarProductos()
console.log(todosLosProductos)






//Bucle para cars

const renderizar = (todosLosProductos)=>{
for (let prod of todosLosProductos) {
    const { id, nombre, descripcion, precio, imagen, cantidad } = prod
    let cardsProductos = document.createElement("div")
    cardsProductos.className = "col-12 col-md-6 col-lg-6 col-xl-4 cardsBody";
    cardsProductos.innerHTML += `
        <div class="card cardShop h-100" id="resultado">
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
}};

renderizar(todosLosProductos)


/*FUNCTION btn PARA BUSCADOR */
const buscadorTienda = document.querySelector(`.buscadorTienda`);
const btnSearch = document.querySelector(`.btn-search`);

buscadorTienda.addEventListener("input", ()=>{Info(buscadorTienda.value, todosLosProductos)})


function Info(buscado, array){
    let busqueda = array.filter(
        (prod) => prod.nombre.toLowerCase().includes(buscado.toLowerCase())
    )
    busqueda.length == 0 ? 
    (productos.innerHTML = `<h3 class="text-warning text-center m-2">No encontramos coincidencias intente de nuevo con otros productos...<br><span>A continuación tiene todo nuestro catálogo disponible</span> </h3>`
    , renderizar(array)) 
    : (productos.innerHTML = "", renderizar(busqueda))
}


/*FUNCTION btnsearch PARA BUSCADOR */




/*REINICIAR CARRITO DE COMPRAS*/
reiniciarCarro.addEventListener("click", () => {
    carrito.length = []
    mostrarCarro()
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
    mostrarCarro();
}
/*Guardar productos en storage */
function guardarStorage() {
    localStorage.setItem("carro", JSON.stringify(carrito))
}



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
            let eliminarProducto = carrito.find(producto => producto.id == prod.id)
            let loc = carrito.indexOf(eliminarProducto)
            carrito.splice(loc, 1)
            mostrarCarro()
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
    if (carrito.length === 0) {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No agregaste ningun producto!!',
            showConfirmButton: false,
            timer: 1500
        })
    }
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
        text: "Tranquilo/a puedes cancelarlo si no lo estas!",
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
            carrito = []
            mostrarCarro()
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


const selectOrden = document.querySelector(`#selectOrden`)
selectOrden.addEventListener("change",()=>{
    if(selectOrden.value == 1){
        ordenarMenorMayor(todosLosProductos)
    }else if(selectOrden.value == 2){
        ordenarMayorMenor(todosLosProductos)
    }else if(selectOrden.value == 3){
        ordenarAlfabeticamente(todosLosProductos)
    }else{
        renderizar(todosLosProductos)
    }
})


function ordenarMenorMayor(array) {
    let menorMayor = [].concat(array)
    menorMayor.sort((a, b) => (b.precio - a.precio))
    productos.innerHTML = ""
    renderizar(menorMayor)
}
function ordenarMayorMenor(array) {
    let mayorMenor = [].concat(array)
    mayorMenor.sort((a, b) => (a.precio - b.precio))
    productos.innerHTML = ""
    renderizar(mayorMenor)
}
function ordenarAlfabeticamente(array) {
    let alfabeticamente = array.slice()
    alfabeticamente.sort((a, b) => {
        if (a.titulo < b.titulo) return -1
        if (a.titulo > b.titulo) return 1
        return 0
    })
    productos.innerHTML = ""
    renderizar(alfabeticamente)
}

