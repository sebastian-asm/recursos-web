export default function uiButtonTop() {
  const { scrollY, innerHeight } = window;
  const divButton = document.querySelector('#button-top');

  if (scrollY >= innerHeight) divButton.classList.add('button-top-on');
  else divButton.classList.remove('button-top-on');

  divButton.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#main').scrollIntoView();
  });
}
