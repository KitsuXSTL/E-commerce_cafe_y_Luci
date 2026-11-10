/**
 * Lógica de la página de tienda: filtros, búsqueda y paginación.
 * El estado se refleja en la URL para que las búsquedas sean compartibles.
 */

import { renderizarProductos, renderizarFiltros } from './catalog.js';
import { obtenerProductos } from './api.js';

const POR_PAGINA = 12;

/* El estado vive en un solo objeto, no disperso en variables sueltas */
const estado = {
  categoria: '',
  buscar: '',
  pagina: 1,
  total: 0
};

let elementos = {};

/* Lee los parámetros de la URL al cargar la página */
function leerURL() {
  const params = new URLSearchParams(window.location.search);
  estado.categoria = params.get('categoria') || '';
  estado.buscar = params.get('buscar') || '';
  estado.pagina = Number(params.get('pagina')) || 1;
}

/* Escribe el estado en la URL sin recargar la página */
function escribirURL() {
  const params = new URLSearchParams();
  if (estado.categoria) params.set('categoria', estado.categoria);
  if (estado.buscar) params.set('buscar', estado.buscar);
  if (estado.pagina > 1) params.set('pagina', estado.pagina);

  const query = params.toString();
  const url = query ? `?${query}` : window.location.pathname;
  window.history.replaceState({}, '', url);
}

/* Obtiene el total de resultados para calcular las páginas */
async function actualizarResumen() {
  try {
    const { total } = await obtenerProductos({
      categoria: estado.categoria,
      buscar: estado.buscar,
      limite: 1
    });

    estado.total = total;

    elementos.resumen.textContent = total === 0
      ? 'Sin resultados'
      : `${total} ${total === 1 ? 'producto' : 'productos'}`;

    actualizarPaginacion();
  } catch {
    elementos.resumen.textContent = '';
  }
}

function actualizarPaginacion() {
  const paginas = Math.ceil(estado.total / POR_PAGINA);

  elementos.paginacion.hidden = paginas <= 1;
  if (paginas <= 1) return;

  elementos.info.textContent = `Página ${estado.pagina} de ${paginas}`;
  elementos.anterior.disabled = estado.pagina === 1;
  elementos.siguiente.disabled = estado.pagina >= paginas;
}

/* Punto único desde el que se recarga la vista */
async function actualizar() {
  escribirURL();

  renderizarProductos(elementos.productos, {
    categoria: estado.categoria,
    buscar: estado.buscar,
    limite: POR_PAGINA,
    pagina: estado.pagina
  });

  await actualizarResumen();
}

export function iniciarTienda() {
  elementos = {
    productos: document.getElementById('productos'),
    filtros: document.getElementById('filtros'),
    resumen: document.getElementById('resumen'),
    campo: document.getElementById('campo-busqueda'),
    formulario: document.getElementById('form-busqueda'),
    paginacion: document.getElementById('paginacion'),
    anterior: document.getElementById('pagina-anterior'),
    siguiente: document.getElementById('pagina-siguiente'),
    info: document.getElementById('pagina-info')
  };

  if (!elementos.productos) return;

  leerURL();

  // El campo de búsqueda refleja el término que venga en la URL
  if (elementos.campo) elementos.campo.value = estado.buscar;

  renderizarFiltros(elementos.filtros, (categoria) => {
    estado.categoria = categoria;
    estado.pagina = 1;
    actualizar();
  }, estado.categoria);

  if (elementos.formulario) {
    elementos.formulario.addEventListener('submit', (evento) => {
      evento.preventDefault();
      estado.buscar = elementos.campo.value.trim();
      estado.pagina = 1;
      actualizar();
    });
  }

  elementos.anterior?.addEventListener('click', () => {
    if (estado.pagina > 1) {
      estado.pagina--;
      actualizar();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  elementos.siguiente?.addEventListener('click', () => {
    estado.pagina++;
    actualizar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  actualizar();
}