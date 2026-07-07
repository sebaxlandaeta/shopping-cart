'use strict';

// Selecciona el contenedor de la tabla y busca los datos guardados en el navegador
const tbody = document.getElementsByTagName('tbody')[0];
const storage = localStorage.getItem('Carrito');

// Función principal para renderizar la tabla de productos y calcular costes
function actualizarCarrito() {
    let montoTotal = 0;       // Acumulador para la suma total de la compra
    let tarjetaHTML = ``;     // Guarda el string de filas HTML que inyectaremos al final
    let carrito;

    // Si existen productos guardados, procesamos la información
    if (storage) {
        try {
            // Convierte el texto plano de localStorage en un array de objetos manipulable
            carrito = JSON.parse(storage);
            const ahora = new Date().getTime(); // Timestamp actual para calcular el tiempo transcurrido

            // Recorremos cada producto para calcular sus subtotales y construir su fila
            carrito.forEach(p => {
                const subtotal = p.price * p.cantidad;
                montoTotal += subtotal; // Sumamos el subtotal al gran total

                let tiempoTexto;   
                
                // Cálculo de diferencia de tiempo entre el "ahora" y la fecha de guardado del producto
                if (p.fecha) {
                    const fechaProducto = new Date(p.fecha).getTime();
                    const diferenciaMilisegundos = ahora - fechaProducto;
                    
                    // Conversión manual de milisegundos a unidades de tiempo legibles
                    const minutosTranscurridos = Math.floor(diferenciaMilisegundos / 60000);
                    const horasTranscurridas = Math.floor(minutosTranscurridos / 60);
                    const diasTranscurridos = Math.floor(horasTranscurridas / 24);

                    // Estructura condicional para mostrar el tiempo en un formato amigable y con plurales correctos
                    if (minutosTranscurridos < 1) {
                        tiempoTexto = "Hace un instante";   
                    } else if (minutosTranscurridos < 60) {
                        tiempoTexto = minutosTranscurridos === 1 ? `Hace ${minutosTranscurridos} minuto` :
                                                                  `Hace ${minutosTranscurridos} minutos`;
                    } else if (horasTranscurridas < 24) {
                        tiempoTexto = horasTranscurridas === 1 ? `Hace ${horasTranscurridas} hora` :
                                                                 `Hace ${horasTranscurridas} horas`;
                    } else {
                        tiempoTexto = diasTranscurridos === 1 ? `Hace ${diasTranscurridos} día` : 
                                                                `Hace ${diasTranscurridos} días`;
                    }
                }
                
                // Estructura HTML de la fila de la tabla, rellenada dinámicamente con los datos del producto
                tarjetaHTML += `
                    <tr>
                        <td>${p.name}</td>
                        <td>${p.price}$</td>
                        <td>${p.cantidad}</td>
                        <td>${subtotal}$</td>
                        <td>${tiempoTexto}</td>
                    </tr>
                `;
            });

            // Si el elemento visual del total existe en el HTML, lo actualiza formateado a 2 decimales
            const spanTotal = document.getElementById('showTotal');
            if (spanTotal) {
                spanTotal.innerText = `Monto total a pagar: ${montoTotal.toFixed(2)}$`;
            }
        } catch (e) {
            // Prevención de errores por si los datos del localStorage están corruptos o mal formateados
            console.log('Error al procesar el carrito:', e);
        }
    } else {
        // Vista alternativa por si el usuario entra a la sección y no tiene ningún producto guardado
        tarjetaHTML = `
            <tr>
                <td colspan="5" style="font-weight: bold;">No hay zapatos seleccionados en el carrito.</td>        
            </tr>
        `;
    }

    // Inyección final: reemplaza el contenido viejo del tbody con las nuevas filas generadas
    tbody.innerHTML = tarjetaHTML;
}

// Primera llamada obligatoria para pintar los datos de inmediato al cargar la página
actualizarCarrito();

// Bucle de refresco automático cada 10 segundos. 
setInterval(actualizarCarrito, 10000);