export default function uiLoading(active) {
  const d = document;
  const contentCards = d.querySelector('.content__cards');
  const p = d.createElement('div');
  p.classList.add('loading');
  p.id = 'loading';

  if (active) {
    p.textContent = 'Cargando recursos...';
    contentCards.appendChild(p);
  } else {
    d.querySelector('#loading').remove();
  }
}
