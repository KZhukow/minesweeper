import getDivElement from '../elements/divElement';
import './style.css';

export default class ModalWindow {
  constructor() {
    this.element = getDivElement(['modal']);

    this.element.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.close();
      }
    });
  }

  open(content) {
    content.classList.add('modalContent');
    this.element.appendChild(content);
    this.element.classList.add('open');
  }

  close() {
    this.element.classList.remove('open');
    this.element.innerHTML = '';
  }

  getElement() {
    return this.element;
  }
}
