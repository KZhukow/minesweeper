import getDivElement from '../../../elements/divElement';

export default class NumberInput {
  constructor(value, name, isDisabled, icon, max = 50) {
    this.element = getDivElement(['numberInputContainer']);
    const numberInputIcon = getDivElement(['numberInputIcon']);
    numberInputIcon.innerHTML = icon;
    this.inputElement = document.createElement('input');
    this.inputElement.type = 'number';
    this.inputElement.name = name;
    this.inputElement.id = name;
    this.inputElement.value = value;
    this.inputElement.disabled = isDisabled;
    this.inputElement.required = true;
    this.inputElement.min = 1;
    this.inputElement.max = max;
    this.inputElement.addEventListener('change', () => {
      document.querySelector('#numberOfMines').setCustomValidity('');
    });
    this.element.appendChild(numberInputIcon);
    this.element.appendChild(this.inputElement);
  }

  setDisabled(value) {
    this.inputElement.disabled = value;
  }

  getElement() {
    return this.element;
  }

  setValue(value) {
    this.inputElement.value = value;
  }
}
