import getDivElement from './divElement';

export default class GameInfoSection {
  constructor(icon) {
    this.element = getDivElement(['gameInfoSection']);
    this.contentElement = getDivElement(['content']);
    this.element.insertAdjacentHTML('afterbegin', `
      <div class="icon">${icon}</div>
    `);
    this.element.appendChild(this.contentElement);
  }

  setContent(value) {
    this.contentElement.innerHTML = value;
  }

  getElement() {
    return this.element;
  }
}
