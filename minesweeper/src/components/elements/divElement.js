export default function getDivElement(classList = []) {
  const element = document.createElement('div');
  element.classList.add(...classList);
  return element;
}
