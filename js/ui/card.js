export default function uiCard(item, index) {
  const d = document;
  const templateCards = d.querySelector('#template-cards').content;
  const fragment = d.createDocumentFragment();
  const contentCards = d.querySelector('#content-cards');
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
