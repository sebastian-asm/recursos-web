const d = document;
const selectTag = d.querySelector('#select-tag');
const templateCards = d.querySelector('#template-cards').content;
const fragment = d.createDocumentFragment();
const contentCards = d.querySelector('#content-cards');

d.addEventListener('DOMContentLoaded', app);

function app() {
  d.querySelector('#year').textContent = new Date().getFullYear();
  createCards(selectTag.value);
  selectTag.addEventListener('change', ({ target }) =>
    createCards(target.value)
  );
}

async function createCards(optionValue) {
  const resp = await fetch('./assets/db/db.json');
  const data = await resp.json();
  const items = data.filter((item) => item.tag === optionValue);

  contentCards.innerHTML = '';
  if (items.length > 0) {
    items.forEach(uiCard);
  } else {
    console.log('no hay elementos');
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
