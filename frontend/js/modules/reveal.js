/**
 * Animación de aparición al hacer scroll.
 * Cada elemento entra suavemente la primera vez que se ve en pantalla.
 */

const RETRASO_ENTRE_ELEMENTOS = 90; // milisegundos entre una tarjeta y la siguiente

// Si el navegador no soporta IntersectionObserver, no se anima nada
// y el contenido se muestra normal.
const observador = 'IntersectionObserver' in window
  ? new IntersectionObserver(alEntrarEnPantalla, {
      threshold: 0.15,                   // se activa cuando se ve el 15 % del elemento
      rootMargin: '0px 0px -40px 0px',   // un poco antes del borde inferior
    })
  : null;

function alEntrarEnPantalla(entradas) {
  // Los elementos que entran juntos (una fila de tarjetas) se escalonan
  const visibles = entradas.filter((entrada) => entrada.isIntersecting);

  visibles.forEach((entrada, i) => {
    const elemento = entrada.target;
    elemento.style.transitionDelay = `${i * RETRASO_ENTRE_ELEMENTOS}ms`;
    elemento.classList.add('revelar--visible');
    observador.unobserve(elemento); // solo se anima una vez

    elemento.addEventListener('transitionend', function alTerminar(evento) {
      // Ignora transiciones de elementos hijos y de otras propiedades
      if (evento.target !== elemento || evento.propertyName !== 'opacity') return;
      elemento.removeEventListener('transitionend', alTerminar);
      limpiar(elemento);
    });
  });
}

// Al terminar se quitan las clases para que el elemento recupere
// sus transiciones normales (por ejemplo, el efecto hover de las tarjetas).
function limpiar(elemento) {
  elemento.classList.remove('revelar', 'revelar--visible');
  elemento.style.transitionDelay = '';
}

/**
 * Prepara los elementos para aparecer al hacer scroll.
 * @param {Iterable<Element>} elementos - Por ejemplo, el resultado de querySelectorAll
 */
export function revelar(elementos) {
  if (!observador) return;

  elementos.forEach((elemento) => {
    elemento.classList.add('revelar');
    observador.observe(elemento);
  });
}