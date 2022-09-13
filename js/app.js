import useFetch from './useFetch.js';

const d = document;
const selectTag = d.querySelector('#select-tag');
const templateCards = d.querySelector('#template-cards').content;
const fragment = d.createDocumentFragment();
const contentCards = d.querySelector('#content-cards');
const contentStat = d.querySelector('#content-stat');

d.addEventListener('DOMContentLoaded', app);

async function app() {
  d.querySelector('#year').textContent = new Date().getFullYear();

  await getTags(); // esperar para obtener un valor en el option del select
  createCards(selectTag.value);

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

  const { data } = await useFetch();
  const items = data.filter(({ tag }) => tag === optionValue);

  h2.textContent =
    items.length > 1
      ? `Hay ${items.length} recursos disponibles para ${optionValue}`
      : `Hay ${items.length} recurso disponible para ${optionValue}`;

  p.textContent = `De un total de ${data.length} publicados en el sitio.`;
  contentStat.append(h2, p);

  items.forEach(uiCard);
}

function uiCard(item, index) {
  const { title, description, image, url } = item;

  templateCards.querySelector('a').href = url;
  templateCards.querySelector('img').src = image;
  templateCards.querySelector('img').alt = title;
  templateCards.querySelector('h3').textContent = `${index + 1}. ${title}`;
  templateCards.querySelector('p').textContent = description;

  const clone = templateCards.cloneNode(true);
  fragment.appendChild(clone);
  contentCards.appendChild(fragment);
}

function uiButtonTop() {
  const { scrollY } = window;
  const divButton = d.querySelector('#button-top');

  if (scrollY >= 650) divButton.classList.add('button-top-on');
  else divButton.classList.remove('button-top-on');
}
