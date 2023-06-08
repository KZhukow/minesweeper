import GameInfoSection from '../elements/GameInfoSection';

export default class Counter {
  constructor(root, settingKey, icon) {
    this.key = settingKey;
    this.root = root;
    this.element = new GameInfoSection(icon);
    this.setCounterInnerHtml();
  }

  setCounterInnerHtml() {
    this.element.setContent(this.root.gameSettings[this.key]);
  }

  getElement() {
    return this.element.getElement();
  }
}
