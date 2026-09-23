# 👟 Shopping-Cart

Sistema de carrito de compras dinámico para una tienda de zapatillas, desarrollado con JavaScript Vanilla, SweetAlert2 para notificaciones interactivas y Web Storage para la persistencia de datos.

---

## 🌐 Demostración

👉 **[Haz clic aquí para probar la Live Demo](https://sebaxlandaeta.github.io/Shopping-Cart/index.html)**

---

## ✨ Características Principales

- 🛍️ **Catálogo Dinámico:** Renderizado automático de productos (tarjetas) a partir de una lista de objetos en JavaScript.
- 💾 **Carrito de Compras Persistente:** Uso de `localStorage` para que los productos no se pierdan al cerrar o recargar la página.
- ⏱️ **Cálculo en Tiempo Real:** El carrito muestra hace cuánto tiempo se agregó cada producto (minutos, horas, días) y se actualiza automáticamente cada 10 segundos.
- 🎁 **Pop-up de Oferta:** Alerta promocional inteligente (`sessionStorage`) que aparece a los 5 segundos de ingresar, mostrándose solo una vez por sesión.
- 🔔 **Interfaz Interactiva:** Alertas estilizadas con SweetAlert2 al añadir productos, mostrando la cantidad actual del artículo en tiempo real.

---

## 🛠️ Tecnologías Utilizadas

- 🌐 **HTML5 & CSS3:** Estructura y diseño de tarjetas / tablas.
- 🟨 **JavaScript (ES6+):** Clases, manipulación del DOM, Timers, LocalStorage y SessionStorage.
- 🍬 **SweetAlert2:** Librería para alertas visuales.
