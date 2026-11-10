/**
 * Punto de entrada del frontend.
 * Detecta qué elementos existen en la página y los inicializa.
 */

import { renderizarProductos, renderizarCategorias, renderizarFiltros } from './modules/catalog.js';
import { iniciarTienda } from './modules/shop.js';
import { iniciarDetalle } from './modules/product.js';
import { revelar } from './modules/reveal.js';

document.addEventListener('DOMContentLoaded', () => {

  /* --- Menú móvil --- */
  const botonMenu = document.querySelector('.menu-boton');
  const nav = document.querySelector('.nav');

  if (botonMenu && nav) {
    botonMenu.addEventListener('click', () => {
      const abierto = botonMenu.getAttribute('aria-expanded') === 'true';
      botonMenu.setAttribute('aria-expanded', !abierto);
      nav.classList.toggle('nav--abierta');
    });
  }

  /* --- Animación al hacer scroll de los títulos de sección --- */
  revelar(document.querySelectorAll('.seccion__encabezado, .centrado'));

  /* --- Página de inicio --- */
  renderizarCategorias(document.getElementById('categorias'));

  const destacados = document.getElementById('productos-destacados');
  if (destacados) {
    renderizarProductos(destacados, { limite: 8 });

    renderizarFiltros(document.getElementById('filtros'), (categoria) => {
      renderizarProductos(destacados, { categoria, limite: 8 });
    });
  }

  /* --- Página de tienda --- */
  iniciarTienda();

  /* --- Página de detalle --- */
  iniciarDetalle();

});