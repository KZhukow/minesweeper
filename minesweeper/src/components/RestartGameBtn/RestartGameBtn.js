import getDivElement from '../elements/divElement';
import { SadSmileSvg, SmileSvg, SmileWithGlassesSvg } from '../elements/smilesSvg';
import './style.css';

export default class RestartGameBtn {
  constructor(root, action) {
    this.root = root;
    this.action = action;
    this.element = getDivElement(['restartBtn']);

    this.element.addEventListener('click', action);

    this.setBtnInnerHtml();
  }

  getElement() {
    return this.element;
  }

  setBtnInnerHtml() {
    const { isGameFinished, isGameWin } = this.root.gameSettings;
    if (isGameFinished && isGameWin) {
      this.element.innerHTML = SmileWithGlassesSvg();
    } else if (isGameFinished && !isGameWin) {
      this.element.innerHTML = SadSmileSvg();
    } else {
      this.element.innerHTML = SmileSvg();
    }
  }
}
