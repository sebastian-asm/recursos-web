export default function uiButtonTop() {
  const { scrollY } = window;
  const divButton = document.querySelector('#button-top');

  if (scrollY >= 650) divButton.classList.add('button-top-on');
  else divButton.classList.remove('button-top-on');
}
