import uiButtonTop from './ui/buttonTop.js';
import uiCard from './ui/card.js';
import uiLoading from './ui/loading.js';
import useFetch from './useFetch.js';

const d = document;
const selectTag = d.querySelector('#select-tag');
const contentCards = d.querySelector('#content-cards');
const contentStat = d.querySelector('#content-stat');
const contentData = d.querySelector('#content-data');

d.addEventListener('DOMContentLoaded', app);

async function app() {
  d.querySelector('#year').textContent = new Date().getFullYear();

  uiLoading(true);
  await getTags(); // esperar para obtener un valor en el option del select
  createCards(selectTag.value);
  uiLoading(false);

  window.addEventListener('scroll', uiButtonTop);
  selectTag.addEventListener('change', ({ target }) =>
    createCards(target.value)
  );
}

async function getTags() {
  const { tags } = await useFetch();
  const tagsOrder = tags.sort();

  tagsOrder.forEach((item) => {
    const option = d.createElement('option');
    option.value = item;
    option.textContent = item;
    selectTag.appendChild(option);
  });
}

async function createCards(optionValue) {
  const h2 = d.createElement('h2');
  const p = d.createElement('p');

  contentCards.innerHTML = '';
  contentStat.innerHTML = '';
  contentData.classList.remove('fade-in');

  uiLoading(true);
  const { data } = await useFetch();
  const items = data.filter(({ tags }) => tags.includes(optionValue));
  uiLoading(false);

  contentData.classList.add('fade-in');
  h2.textContent =
    items.length > 1
      ? `Hay ${items.length} recursos filtrados por '${optionValue}'`
      : `Hay ${items.length} recurso filtrado por '${optionValue}'`;

  p.textContent = `De un total de ${data.length} publicados en el sitio.`;
  contentStat.append(h2, p);

  items.forEach(uiCard);
}
