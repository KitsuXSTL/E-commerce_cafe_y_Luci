/**
 * Capa de comunicación con el backend.
 * Todas las peticiones del frontend pasan por aquí.
 */

const BASE = '/api';

/**
 * Envuelve fetch para centralizar el manejo de errores
 * y la conversión de la respuesta a JSON.
 */
async function peticion(ruta, opciones = {}) {
  const respuesta = await fetch(`${BASE}${ruta}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opciones
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.message || 'No se pudo completar la petición');
  }

  return datos;
}

/**
 * Convierte un objeto de filtros en una cadena de consulta.
 * { categoria: 'mochilas', limite: 8 }  →  "?categoria=mochilas&limite=8"
 * Los valores vacíos se descartan.
 */
function construirQuery(filtros = {}) {
  const parametros = new URLSearchParams();

  Object.entries(filtros).forEach(([clave, valor]) => {
    if (valor !== undefined && valor !== null && valor !== '') {
      parametros.append(clave, valor);
    }
  });

  const query = parametros.toString();
  return query ? `?${query}` : '';
}

/* ---------- Productos ---------- */

export function obtenerProductos(filtros = {}) {
  return peticion(`/products${construirQuery(filtros)}`);
}

export function obtenerProductoPorId(id) {
  return peticion(`/products/${id}`);
}