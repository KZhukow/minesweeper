import GearSvg from '../elements/GearSvg';
import getDivElement from '../elements/divElement';

export default class SettingsBtn {
  constructor(action) {
    this.element = getDivElement(['settingsBtn']);
    this.element.innerHTML = GearSvg();
    this.element.addEventListener('click', action);
  }

  getElement() {
    return this.element;
  }
}
