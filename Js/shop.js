//TODOS LOS PRODUCTOS
class productosShine{
    constructor(id,nombre,descripcion,precio,imagen){
        this.id          = id;
        this.nombre      = nombre;
        this.descripcion = descripcion;
        this.precio      = precio;
        this.imagen      = imagen;
    }
}
const aqtua = new productosShine("1","Aqtua", "Recomendado para:Presión alta , problemas deinsuficiencia cardíaca, cansanciocrónico, hígado graso y fortalecerel sistema inmune", 1500, 'shop2.jpg' );
const caffezino = new productosShine("2","caffezino", "Recomendado para:Presión alta , problemas deinsuficiencia cardíaca, cansanciocrónico, hígado graso y fortalecerel sistema inmune", 2500, 'shop3.jpg' );
const ego10 = new productosShine("3","ego10", "Recomendado para:Presión alta , problemas deinsuficiencia cardíaca, cansanciocrónico, hígado graso y fortalecerel sistema inmune", 6500, 'shop4.jpg' );
const egofrutas = new productosShine("4","egofrutas", "Recomendado para:Presión alta , problemas deinsuficiencia cardíaca, cansanciocrónico, hígado graso y fortalecerel sistema inmune", 5500, 'shop5.jpg' );
const egolife = new productosShine("5","egolife", "Recomendado para:Presión alta , problemas deinsuficiencia cardíaca, cansanciocrónico, hígado graso y fortalecerel sistema inmune", 3500, 'shop6.jpg' );
const egoherbal = new productosShine("6","egoherbal", "Recomendado para:Presión alta , problemas deinsuficiencia cardíaca, cansanciocrónico, hígado graso y fortalecerel sistema inmune", 2500, 'shop7.jpg' );
const estop = new productosShine("7","estop", "Recomendado para:Presión alta , problemas deinsuficiencia cardíaca, cansanciocrónico, hígado graso y fortalecerel sistema inmune", 6400, 'shop8.jpg' );


//ARRAY de productos
const todosLosProductos = [aqtua, caffezino, ego10, egofrutas, egolife, egoherbal, estop]
console.log(todosLosProductos)
//Bucle para cars

let cardsProductos = document.querySelector("#bucleCardsProductos")
let carrito = []

todosLosProductos.forEach((prod) => {
    const {id, nombre, descripcion, precio, imagen} = prod
    cardsProductos.innerHTML += `
    <div class="col-12 col-md-6 col-lg-6 col-xl-4 cardsBody">
        <div class="card cardShop h-100">
            <img src="../imagenes/${imagen}" class="card-img-top cardShop" alt="${nombre}">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${descripcion}</p>
                <p class="precioscards">$${precio}</p>
                <div class="btnTienda">
                    <button onclick="agregarProducto(${id})" class="btn">Agregar al carrito <i class="fa-solid fa-cart-shopping"></i></i></button>
                </div>
            </div>
        </div>
    </div>`
});

function agregarProducto(id){
    const item = todosLosProductos.find((x) => x.id === id)
    carrito.push(item)
    console.log(item)
}






// const mostrarCarrito = () => {
//     const modalBody = document.querySelector('.modal .modal-body')
//     carrito.forEach((prod) => {
//         const {id, nombre, descripcion, precio, imagen} = prod
//         modalBody.innerHTML += `
//         <div class="modal-contenedor">
//             <div>
//                 <img class="img-fluid img-carrito" src="${imagen}"/>
//             </div>
//             <div>
//                 <p>Producto: ${nombre} </p>
//                 <p>Precio: ${precio} </p>
//                 <button class="btn">Eliminar Producto</button>
//             </div>
//         </div>
//         `
//     })
// }