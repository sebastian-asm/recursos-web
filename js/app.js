const select = document.querySelector('select');

document.addEventListener('DOMContentLoaded', app);

function app() {
  createCards(select.value);
  select.addEventListener('change', ({ target }) => createCards(target.value));
}

async function createCards(optionValue) {
  const resp = await fetch('./assets/db/db.json');
  const data = await resp.json();
  const items = data.filter((item) => item.tag === optionValue);
  console.log(items);
}
