# 🪴 Paradise Nursery - React Vite Shopping App

Welcome to **Paradise Nursery**, an e-commerce plant store where green meets serenity 🌿.  
This is a single-page React + Redux application built with **Vite** for optimal performance and development experience.

---

## 🌟 Funcionalidades Clave

- 🏠 **Landing page** con slogan y botón "Get Started"
- 🪴 **Catálogo de plantas** agrupado en 3 categorías:
  - Air Purifying Plants
  - Aromatic Fragrant Plants
  - Insect Repellent Plants
- 🛒 **Carrito de compras** con:
  - Añadir plantas con botón individual
  - Incrementar/decrementar cantidades
  - Eliminar productos
  - Ver total del carrito
  - Botón de checkout (con mensaje de "Coming Soon")
- 🔁 Alternancia entre vista de productos y carrito
- 🧾 Página "About Us" integrada
- 💾 Estado del carrito manejado con Redux Toolkit

---

## 🧱 Estructura del Proyecto

```
src/
├── App.jsx              # App principal con navegación landing/productos
├── AboutUs.jsx          # Sección de "Sobre nosotros"
├── CartItem.jsx         # Componentes de ítems del carrito
├── ProductList.jsx      # Vista principal de productos
├── CartSlice.js         # Redux slice para manejar el estado del carrito
├── store.js             # Configuración de Redux store
├── index.jsx            # Punto de entrada de React
├── index.css            # Estilos globales
├── *.css                # Estilos específicos por componente
```

---

## 🚀 Tecnologías Utilizadas

- ⚛️ React
- 📦 Redux Toolkit
- 🧪 Vite
- 🎨 CSS personalizado
- 🔗 Vercel (para deployment)

---

## 📦 Scripts útiles

### Ejecutar en modo desarrollo

```bash
npm install
npm run dev
```

Accede a la app en: [http://localhost:5173](http://localhost:5173)

---

### Compilar para producción

```bash
npm run build
npm run preview
```

---

## 🌐 Deployment

Esta app fue desplegada en [Vercel](https://vercel.com/).  
El archivo `vite.config.js` incluye:

```ts
export default defineConfig({
  base: '/',
  plugins: [react()],
});
```

Este `base: '/'` es **crucial** para que el routing funcione correctamente en producción.

---

## ✨ Créditos / Inspiración

- Plant data: imágenes de Unsplash y Pixabay
- Estructura general inspirada en tiendas SPA modernas
- Proyecto desarrollado para práctica de integración de Redux con UI dinámica

---

## 🧠 Nota personal

> Este proyecto fue creado como parte de un desafío académico y como práctica de conceptos clave en React, Vite y Redux. Está pensado como una base para futuros sistemas de e-commerce con lógica client-side.

---

## 📫 Contacto

Desarrollado por [Katapentakill](https://github.com/Katapentakill)  
Feel free to fork, contribute or build upon this 🌱