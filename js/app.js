import { uiButtonTop, uiCard, uiLoading, uiAlertError } from './ui/index.js';
import useFetch from './useFetch.js';

const d = document;
const selectTag = d.querySelector('#select-tag');
const contentCards = d.querySelector('#content-cards');
const contentStat = d.querySelector('#content-stat');
const contentData = d.querySelector('#content-data');

d.addEventListener('DOMContentLoaded', app);

async function app() {
  d.querySelector('#year').textContent = new Date().getFullYear();

  try {
    if (d.querySelector('#alert')) d.querySelector('alert').remove();

    uiLoading(true);
    await getTags();
    createCards(selectTag.value);

    window.addEventListener('scroll', uiButtonTop);
    selectTag.addEventListener('change', ({ target }) =>
      createCards(target.value)
    );
  } catch {
    uiAlertError();
  } finally {
    uiLoading(false);
  }
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
  const total = d.querySelector('#total');
  const h2 = d.createElement('h2');
  const p = d.createElement('p');

  contentCards.innerHTML = '';
  contentStat.innerHTML = '';
  contentData.classList.remove('fade-in');

  uiLoading(true);
  const { data } = await useFetch();
  const items = data.filter(({ tags }) => tags.includes(optionValue));
  uiLoading(false);

  total.classList.add('fade-in');
  total.textContent = data.length;

  contentData.classList.add('fade-in');
  h2.textContent =
    items.length > 1
      ? `Hay ${items.length} recursos filtrados por '${optionValue}'`
      : `Hay ${items.length} recurso filtrado por '${optionValue}'`;

  const percentage = ((items.length * 100) / data.length).toFixed(1);
  p.textContent = `Lo que representa el ${percentage}% del contenido total.`;
  contentStat.append(h2, p);

  items.forEach(uiCard);
}
