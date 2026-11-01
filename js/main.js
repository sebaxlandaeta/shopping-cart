'use strict';
// CLASE DE LOS PRODUCTOS.
class Producto {
    constructor (sku, name, price, url) {
        this.sku = sku;
        this.name = name;
        this.price = price;
        this.url = url;
        this.fecha = null;
    }

    getPrecioFormateado() {
        return `${this.price.toFixed(2)} $`;
    }
}

// ARREGLO DE 16 PRODUCTOS QUE REPRESENTAN LAS 16 CARDS DE LA PAGINA.
const products = [
    new Producto("ADI-STR-00", "Adidas Adistar", 87.95, "https://www.tennispremium.co/cdn/shop/files/WhatsAppImage2025-11-18at12.31.23AM_4.jpg?v=1765918838"),
    new Producto("ADI-ZER-01", "Adidas Adizero", 97.95, "https://www.asphaltgold.com/cdn/shop/files/3xZrrrX3UQRnCxuRVHEL_JH6208-Adidas-adizero-Evo-SL-Footwear-White-Core-Black-Footwear-White-SM-1.jpg?crop=center&height=768&v=1742396023&width=768"),
    new Producto("LEN-WIT-04", "Lebron Witness 4", 209.97, "https://i.ebayimg.com/images/g/NXsAAeSwcSpp2s3H/s-l1200.webp"),
    new Producto("LEN-WIT-05", "Lebron Witness 5", 209.97, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZvjZHvpahlU1p0XvFlHpV2u5ftBrcWH8N7NOVj28ENv91GxcNHuhnRa3S&s=10"),
    new Producto("LEN-WIT-06", "Lebron Witness 6", 146.00, "https://www.khazanay.pk/cdn/shop/files/b8b326f7-f2a6-4de2-8d2b-96bf3c1bde33-Img-shoe.jpg?v=1793121667"),
    new Producto("LEB-ROM-15", "Lebron 15", 97.00, "https://justfreshkicks.com/wp-content/uploads/2018/02/Nike-LeBron-15-Fruity-Pebbles-Multicolor.jpg"),
    new Producto("LEB-ROM-16", "Lebron 16", 120.00, "https://i.ebayimg.com/images/g/QZ8AAeSwQUZpYHeU/s-l1200.webp"),
    new Producto("LEB-ROM-17", "Lebron 17", 12.50, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVaQ9r18l1ns5ethyfybJEbaQ9te1O633iwnntlL4bZ3OASzI0p8IeySM&s=10"),
    new Producto("LEB-ROM-18", "Lebron 18", 85.50, "https://i.ebayimg.com/images/g/8pwAAOSwTChjAU~~/s-l1200.jpg"),
    new Producto("JOR-RET-01", "Jordan Retro 1", 98.00, "https://roosters.cl/cdn/shop/files/IMG_0365.jpg?v=1726702590&width=1946"),
    new Producto("JOR-RET-02", "Jordan Retro 2", 190.95, "https://media.gq.com.mx/photos/62b09f7f55c3e87dbdd427f1/master/w_1600%2Cc_limit/tenis-air-jordan-2-j-balvin-nueva-colaboracion-fecha-de-lanzamiento-azules.png"),
    new Producto("JOR-RET-03", "Jordan Retro 3", 89.50, "https://www.tennispremium.co/cdn/shop/files/9c5f428e-93ae-42f4-9594-9b4eb8f5c695.jpg?v=1744605140&width=1445"),
    new Producto("JOR-RET-04", "Jordan Retro 4", 89.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2OLK-9NJAky4T_bIiLPmLTCleLayzEfiTrVqjaxlZW35a1Ub1uZgCQuwR&s=10"),
    new Producto("LV-SKT-00", "Louis Vuitton Skate", 115.00, "https://lockerstreet.com/cdn/shop/files/EBF6A6EE-ABFB-4328-9C09-323C2D92B5C2.jpg?v=1726009523&width=1946"),
    new Producto("BLC-TRC-01", "Balenciaga Track", 230.00, "https://i.ebayimg.com/images/g/65wAAeSwOotpV2AJ/s-l1200.jpg"),
    new Producto("LV-TRN-00", "Louis Vuitton Trainer", 124.00, "https://i.ebayimg.com/images/g/KiUAAeSwlIVp5RXX/s-l1200.jpg")
];
// Preguntamos si la oferta ya ha sido mostrada para no volver a mostrar dos veces.
const ofertaMostrada = sessionStorage.getItem('Oferta');
if (!ofertaMostrada) {
    setTimeout(() => {
        if (!sessionStorage.getItem('Oferta')) {
            mostrarOferta();
            sessionStorage.setItem('Oferta', 'true');
        }
    }, 5000);
}
// LAS CARDS DE CADA PRODUCTO ES CREADA EN TIEMPO DE EJECUCIÓN.
const contenedorPrincipal = document.getElementById('products');
let tarjetaHTML = ''; 
// Recorremos el arreglo de todos los productos para imprimirlos en la pagina.
products.forEach((p) => {
    tarjetaHTML += `
                <article class="card">
                    <div>
                        <img src="${p.url}" alt="${p.name}" class="product-img">
                    </div>   
                    <div class="product-sku">${p.sku}</div>
                    <div class="product-name">${p.name}</div>
                    <div class="product-price">${p.getPrecioFormateado()}</div>
                    <button class="button-carrito">Añadir al carrito</button>
                </article>
                `;
});

contenedorPrincipal.innerHTML = tarjetaHTML;

// VERIFICAMOS ANTES SI HAY ALGO GUARDADO EN EL LOCALSTORAGE.
const carritoGuardado = localStorage.getItem('Carrito');
let carrito = carritoGuardado ? JSON.parse(carritoGuardado) : []; // Si hay algo lo guardamos en el arreglo, si no, se inicializa vacío.

// BUSCAMOS TODOS LOS BOTONES DE LAS CARDS PARA CREAR SUS ONCLIKS.
const buttonsAdd = document.querySelectorAll('.button-carrito');
buttonsAdd.forEach((button, index) => {
    button.onclick = () => { 
        // Al hacer click, llamamos a la función para agregar el producto.
        agregarProducto(products[index]); 

        // Buscamos si un producto ya ha sido añadido al carrito anteriormente.
        const productoEnCarrito = carrito.find(p => p.sku === products[index].sku);

        // Mostramos un alert al agregar un producto al carrito.
        Swal.fire({
            title: `¡${products[index].name} fue agregado con éxito!`,
            text: `Tiene ${productoEnCarrito.cantidad} unidad(es) agregada(s) en el carrito.`,
            icon: "success",
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#074067',
            background: '#212b36',
            color: '#fff',
            draggable: true
        });
    }
})

//FUNCIÓN PARA AÑADIR PRODUCTOS AL CARRITO.
function agregarProducto(product) {
    // Buscamos si un producto ya ha sido añadido al carrito anteriormente.
    const productoExistente = carrito.find(p => p.sku === product.sku);
    const now = new Date();
    if (productoExistente) {
        // Si existe, se le aumenta el atributo cantidad.
        productoExistente.cantidad++;
        productoExistente.fecha = now;
    } else {
        // Si no existe, se le crea un atributo cantidad y se agrega al carrito.
        product.cantidad = 1;
        product.fecha = now;
        carrito.push(product);
    }

    // Guardamos el estado del carrito actual en localStorage.
    localStorage.setItem('Carrito', JSON.stringify(carrito));
}

// FUNCIÓN QUE MUESTRA LA OFERTA AL PASAR 5 SEGUNDOS DE QUE LA PAGINA HAYA CARGADO
function mostrarOferta() {
    Swal.fire({
        title: "¡Oferta Imperdible!",
        text: "Aprovecha nuestros descuentos exclusivos solo por hoy.",
        imageUrl: "https://i.pinimg.com/736x/d4/96/d9/d496d982acffc2661cd2dd859c4a3fd9.jpg",
        imageWidth: 400,
        imageHeight: 250,
        imageAlt: "Banner de Liquidación Especial",
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#212b36',
        color: '#fff',
    });
}