
//ARRAY de productos
const todosLosProductos = [aqtua, caffezino, ego10, egofrutas, egolife, egoherbal, estop]
console.log(todosLosProductos);
//Bucle para cars
const carrito = []

let productos = document.querySelector("#productos");
for(let prod of todosLosProductos){
    const {id, nombre, descripcion, precio, imagen} = prod
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
function agregarProducto(prod){
    carrito.push(prod)
    console.log(carrito)
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

/*Agregar items en el modal*/
let modalBody = document.querySelector("#modalBodyId")
    modalBody = innerHeight = ""
function mostrarCarro(array){
    array.forEach((prod) => {
        const {nombre, precio, imagen} = prod
        modalBody.innerHTML += `
        <div class="modal-contenedor">
            <div>
                <img class="img-fluid img-carrito" src="${imagen}"/>
            </div>
            <div>
                <p>Producto: ${nombre} </p>
                <p>Precio: ${precio} </p>
                <button class="btn">Eliminar Producto</button>
            </div>
        </div>
        `
    })
}
mostrarCarro(carrito)




