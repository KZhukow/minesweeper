import getDivElement from './divElement';

export default function LoseView() {
  const element = getDivElement(['loseView']);
  element.innerHTML = 'You Lose!';
  return element;
}
