
//ARRAY de productos
const todosLosProductos = [aqtua, caffezino, ego10, egofrutas, egolife, egoherbal, estop]
console.log(todosLosProductos);
//Bucle para cars
const carrito = []

let productos = document.querySelector("#productos");
for (let prod of todosLosProductos) {
    const { id, nombre, descripcion, precio, imagen } = prod
    let cardsProductos = document.createElement("div")
    cardsProductos.className = "col-12 col-md-6 col-lg-6 col-xl-4 cardsBody";
    cardsProductos.innerHTML += `
        <div class="card cardShop h-100">
            <img src="../imagenes/${imagen}" class="card-img-top cardShop" alt="${nombre}">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${descripcion}</p>
                <p class="precioscards">$${precio}</p>
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

/*FUNCTION PARA BUSCAR POR ID*/
/*GUARDAR AL CARRITO*/
function agregarProducto(prod) {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'El producto fue agregado !!exitosamente!!',
        showConfirmButton: false,
        timer: 1500
    })
        carrito.push(prod)
        console.log(carrito)
        localStorage.setItem("carrito", JSON.stringify(carrito))
        mostrarCarro(carrito);
}

/*Agregar items en el modal*/
function mostrarCarro(array) {
    let modalBody = document.querySelector("#modalBodyId")
    modalBody.innerHTML = ""
    array.forEach((prod) => {
        const { id, nombre, precio, imagen } = prod
        modalBody.innerHTML += `
        <div id="productosEnCarrito${id}" class="modal-contenedor">
            <div>
                <img class="img-fluid img-carrito" src="${imagen}"/>
            </div>
            <div>
                <p class="precioscards">Producto: ${nombre} </p>
                <p class="precioscards"> $${precio} </p>
                <button id="btnEliminar${id}" class="btn btnEliminarCarrito">Eliminar Producto</button>
            </div>
        </div>
        `
    })
    /*Eliminacion */
    array.forEach((prod, indice) => {
        const { id } = prod
        document.getElementById(`btnEliminar${id}`).addEventListener("click", () => {
            /*Eliminar del DOM */
            let cardProductos = document.querySelector(`#productosEnCarrito${id}`)
            cardProductos.remove()
            /*Eliminar del array */
            carrito.splice(indice, 1)
            /*Eliminar del Storage */
            localStorage.setItem("carrito", JSON.stringify(carrito))
            
        })
    });
}



