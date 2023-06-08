import getDivElement from '../../../elements/divElement';

export default class DifficultRadioBtn {
  constructor(value, onChange, checked) {
    this.element = getDivElement(['radioBtn']);
    this.element.insertAdjacentHTML('afterbegin', `
      <input type="radio" id="${value}" name="difficult" value="${value}" ${checked ? 'checked' : ''}>
      <label for="${value}">${value}</label>
    `);
    this.element.addEventListener('change', onChange);
  }

  getElement() {
    return this.element;
  }
}
