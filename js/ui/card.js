export default function uiCard(item, index) {
  const d = document;
  const templateCards = d.querySelector('#template-cards').content;
  const fragment = d.createDocumentFragment();
  const contentCards = d.querySelector('#content-cards');
  const { title, description, image, url, tags } = item;
  const cloudinary =
    'https://res.cloudinary.com/dzu2kemtg/image/upload/v1668195722/recursos-web/';

  templateCards.querySelector('a').href = url;
  templateCards.querySelector('img').src = `${cloudinary + image}.png`;
  templateCards.querySelector('img').alt = title;
  templateCards.querySelector('h3').textContent = `${index + 1}. ${title}`;
  templateCards.querySelector('p').textContent = description;
  templateCards.querySelector('#tags').innerHTML = '';

  tags.sort().forEach((tag) => {
    const small = document.createElement('small');
    small.textContent = tag;
    templateCards.querySelector('#tags').append(small);
  });

  const clone = templateCards.cloneNode(true);
  fragment.appendChild(clone);
  contentCards.appendChild(fragment);
}
