/**
 * Renderizado del catálogo de productos y de las categorías.
 */

import { obtenerProductos } from './api.js';
import { revelar } from './reveal.js';

/* Las seis categorías del modelo, con su nombre visible */
export const CATEGORIAS = [
  { valor: 'mochilas',  etiqueta: 'Mochilas' },
  { valor: 'sombreros', etiqueta: 'Sombreros' },
  { valor: 'anchetas',  etiqueta: 'Anchetas' },
  { valor: 'bebidas',   etiqueta: 'Café y bebidas' },
  { valor: 'souvenirs', etiqueta: 'Souvenirs' },
  { valor: 'otros',     etiqueta: 'Otros' }
];

/* Formato de moneda colombiana: 180000 → "$ 180.000" */
export const pesos = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0
});

/**
 * Escapa caracteres que podrían romper el HTML o inyectar código.
 * Los datos vienen de la base de datos, así que nunca se insertan crudos.
 */
export function escapar(texto = '') {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

/* ---------- Tarjeta de producto ---------- */

function plantillaProducto(producto) {
  const { _id, nombre, precio, stock, imagenes = [], artesano, origen } = producto;

  // Mientras no haya foto, se muestra una trama con la inicial del producto
  const visual = imagenes.length
    ? `<img class="producto__imagen" src="${escapar(imagenes[0])}" alt="${escapar(nombre)}" loading="lazy">`
    : `<div class="producto__sinimagen" aria-hidden="true">${escapar(nombre.charAt(0))}</div>`;

  const etiqueta = stock === 0
    ? '<span class="producto__etiqueta producto__etiqueta--agotado">Agotado</span>'
    : '';

  // "Comunidad Wayú · La Guajira" — solo con los datos que existan
  const procedencia = [artesano, origen].filter(Boolean).join(' · ');

  return `
    <article class="producto">
      <a href="/producto.html?id=${_id}" class="producto__marco">
        ${visual}
        ${etiqueta}
      </a>
      <div class="producto__cuerpo">
        ${procedencia ? `<p class="producto__procedencia">${escapar(procedencia)}</p>` : ''}
        <h3 class="producto__nombre">
          <a href="/producto.html?id=${_id}">${escapar(nombre)}</a>
        </h3>
        <p class="producto__precio">${pesos.format(precio)}</p>
      </div>
    </article>
  `;
}

/* ---------- Estados de la interfaz ---------- */

function estadoCargando(contenedor) {
  contenedor.innerHTML = `
    <div class="estado">
      <p>Cargando productos…</p>
    </div>
  `;
}

function estadoVacio(contenedor) {
  contenedor.innerHTML = `
    <div class="estado">
      <p class="estado__titulo">No hay productos que mostrar</p>
      <p>Prueba con otra categoría o revisa el catálogo completo.</p>
    </div>
  `;
}

function estadoError(contenedor, mensaje) {
  contenedor.innerHTML = `
    <div class="estado">
      <p class="estado__titulo">No se pudo cargar el catálogo</p>
      <p>${escapar(mensaje)}</p>
    </div>
  `;
}

/* ---------- Carga y pintado de productos ---------- */

export async function renderizarProductos(contenedor, filtros = {}) {
  if (!contenedor) return;

  estadoCargando(contenedor);

  try {
    const { data } = await obtenerProductos(filtros);

    if (!data.length) {
      estadoVacio(contenedor);
      return;
    }

    contenedor.innerHTML = data.map(plantillaProducto).join('');
    revelar(contenedor.querySelectorAll('.producto'));
  } catch (error) {
    estadoError(contenedor, error.message);
  }
}

/* ---------- Categorías con su conteo ---------- */

export async function renderizarCategorias(contenedor) {
  if (!contenedor) return;

  // Se consulta el total de cada categoría en paralelo.
  // Solo se pide limite=1 porque interesa el campo "total", no los documentos.
  const consultas = CATEGORIAS.map(async (categoria) => {
    try {
      const { total } = await obtenerProductos({ categoria: categoria.valor, limite: 1 });
      return { ...categoria, total };
    } catch {
      return { ...categoria, total: 0 };
    }
  });

  const resultados = await Promise.all(consultas);

  contenedor.innerHTML = resultados.map(({ valor, etiqueta, total }) => `
    <a href="/tienda.html?categoria=${valor}" class="categoria categoria--${valor}">
      <div class="categoria__texto">
        <p class="categoria__nombre">${etiqueta}</p>
        <p class="categoria__conteo">${total} ${total === 1 ? 'producto' : 'productos'}</p>
      </div>
    </a>
  `).join('');

  revelar(contenedor.querySelectorAll('.categoria'));
}

/* ---------- Filtros por categoría ---------- */

export function renderizarFiltros(contenedor, alCambiar, categoriaActiva = '') {
  if (!contenedor) return;

  const opciones = [{ valor: '', etiqueta: 'Todos' }, ...CATEGORIAS];

  contenedor.innerHTML = opciones.map(({ valor, etiqueta }) => `
    <button class="filtro" data-categoria="${valor}" aria-pressed="${valor === categoriaActiva}">
      ${etiqueta}
    </button>
  `).join('');

  contenedor.addEventListener('click', (evento) => {
    const boton = evento.target.closest('.filtro');
    if (!boton) return;

    contenedor.querySelectorAll('.filtro')
      .forEach(b => b.setAttribute('aria-pressed', b === boton));

    alCambiar(boton.dataset.categoria);
  });
}

/* ---------- Detalle de un producto ---------- */

export function plantillaDetalle(producto) {
  const {
    nombre, descripcion, precio, stock, categoria,
    imagenes = [], artesano, material, origen
  } = producto;

  const visual = imagenes.length
    ? `<img class="detalle__imagen" src="${escapar(imagenes[0])}" alt="${escapar(nombre)}">`
    : `<div class="producto__sinimagen" aria-hidden="true">${escapar(nombre.charAt(0))}</div>`;

  // Solo se pinta la fila si el campo tiene valor
  const fila = (clave, valor) => valor
    ? `<div class="detalle__fila">
         <span class="detalle__clave">${clave}</span>
         <span class="detalle__valor">${escapar(String(valor))}</span>
       </div>`
    : '';

  const disponibilidad = stock > 0
    ? `${stock} ${stock === 1 ? 'unidad disponible' : 'unidades disponibles'}`
    : 'Agotado';

  const etiquetaCategoria = CATEGORIAS.find(c => c.valor === categoria)?.etiqueta || categoria;

  return `
    <div class="detalle__marco">${visual}</div>

    <div>
      <p class="detalle__categoria">${escapar(etiquetaCategoria)}</p>
      <h1 class="detalle__nombre">${escapar(nombre)}</h1>
      <p class="detalle__precio">${pesos.format(precio)}</p>

      <p class="detalle__descripcion">${escapar(descripcion)}</p>

      <div class="detalle__ficha">
        ${fila('Disponibilidad', disponibilidad)}
        ${fila('Artesano', artesano)}
        ${fila('Material', material)}
        ${fila('Origen', origen)}
      </div>

      <div class="detalle__acciones">
        <button class="boton boton--principal" ${stock === 0 ? 'disabled' : ''}>
          ${stock === 0 ? 'Producto agotado' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  `;
}