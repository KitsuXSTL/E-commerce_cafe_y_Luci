/**
 * Vista de detalle de un producto.
 * El identificador se lee del parámetro ?id= de la URL.
 */

import { obtenerProductoPorId } from './api.js';
import { plantillaDetalle, escapar } from './catalog.js';

export async function iniciarDetalle() {
  const contenedor = document.getElementById('detalle');
  if (!contenedor) return;

  const id = new URLSearchParams(window.location.search).get('id');

  if (!id) {
    contenedor.innerHTML = `
      <div class="estado">
        <p class="estado__titulo">Producto no especificado</p>
        <p>Vuelve a la <a href="/tienda.html">tienda</a> para elegir un producto.</p>
      </div>
    `;
    return;
  }

  contenedor.innerHTML = '<div class="estado"><p>Cargando producto…</p></div>';

  try {
    const { data } = await obtenerProductoPorId(id);

    contenedor.innerHTML = plantillaDetalle(data);
    document.title = `${data.nombre} — Artesanías y Café Luci`;

    // Actualiza las migas de pan con el nombre real
    const miga = document.getElementById('miga-actual');
    if (miga) miga.textContent = data.nombre;

  } catch (error) {
    contenedor.innerHTML = `
      <div class="estado">
        <p class="estado__titulo">No se pudo cargar el producto</p>
        <p>${escapar(error.message)}</p>
        <p><a href="/tienda.html">Volver a la tienda</a></p>
      </div>
    `;
  }
}