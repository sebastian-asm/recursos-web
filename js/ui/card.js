export default function uiCard(item, index) {
  const d = document;
  const templateCards = d.querySelector('#template-cards').content;
  const fragment = d.createDocumentFragment();
  const contentCards = d.querySelector('#content-cards');
  const { title, description, image, url } = item;
  const cloudinary =
    'https://res.cloudinary.com/dzu2kemtg/image/upload/v1668195722/recursos-web/';

  templateCards.querySelector('a').href = url;
  templateCards.querySelector('img').src = `${cloudinary + image}.png`;
  templateCards.querySelector('img').alt = title;
  templateCards.querySelector('h3').textContent = `${index + 1}. ${title}`;
  templateCards.querySelector('p').textContent = description;

  const clone = templateCards.cloneNode(true);
  fragment.appendChild(clone);
  contentCards.appendChild(fragment);
}
