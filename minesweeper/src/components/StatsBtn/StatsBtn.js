import StatsSvg from '../elements/StatsSvg';
import getDivElement from '../elements/divElement';

export default class StatsBtn {
  constructor(action) {
    this.element = getDivElement(['statsBtn']);
    this.element.innerHTML = StatsSvg();
    this.element.addEventListener('click', action);
  }

  getElement() {
    return this.element;
  }
}
