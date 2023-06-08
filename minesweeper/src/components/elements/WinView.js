import getDivElement from './divElement';

export default function WinView(stats = []) {
  const element = getDivElement(['winViewContainer']);
  const title = getDivElement(['winViewTitle']);
  title.innerHTML = 'You Win!';
  const statsContainer = getDivElement(['winViewStats']);
  stats.forEach((el) => statsContainer.appendChild(el.cloneNode(true)));
  element.appendChild(title);
  element.appendChild(statsContainer);
  return element;
}
