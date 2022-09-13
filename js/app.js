import useFetch from './useFetch.js';

const d = document;
const selectTag = d.querySelector('#select-tag');
const templateCards = d.querySelector('#template-cards').content;
const fragment = d.createDocumentFragment();
const contentCards = d.querySelector('#content-cards');

d.addEventListener('DOMContentLoaded', app);

async function app() {
  d.querySelector('#year').textContent = new Date().getFullYear();

  await getTags(); // esperar para obtener un valor en el option del select
  createCards(selectTag.value);
  selectTag.addEventListener('change', ({ target }) =>
    createCards(target.value)
  );
}

async function getTags() {
  const { tags } = await useFetch();
  const tagsOrder = tags.sort();

  tagsOrder.forEach((item) => {
    const option = d.createElement('option');
    option.value = item.toLowerCase();
    option.textContent = item;
    selectTag.appendChild(option);
  });
}

async function createCards(optionValue) {
  const { data } = await useFetch();
  console.log('data', data.length);
  const items = data.filter(({ tag }) => tag.toLowerCase() === optionValue);
  console.log('items', items.length);

  contentCards.innerHTML = '';
  if (items.length > 0) {
    items.forEach(uiCard);
  } else {
    const h3 = d.createElement('h3');
    h3.textContent = 'Aún no hay recursos para este filtro.';
    contentCards.appendChild(h3);
  }
}

function uiCard(item) {
  const { title, description, image, url } = item;

  templateCards.querySelector('a').href = url;
  templateCards.querySelector('img').src = image;
  templateCards.querySelector('img').alt = title;
  templateCards.querySelector('h2').textContent = title;
  templateCards.querySelector('p').textContent = description;

  const clone = templateCards.cloneNode(true);
  fragment.appendChild(clone);
  contentCards.appendChild(fragment);
}
