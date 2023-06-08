import { formatTime } from '../../utils/utils';
import ClockSvg from '../elements/ClockSvg';
import GameInfoSection from '../elements/GameInfoSection';

export default class Stopwatch {
  constructor(root) {
    this.root = root;
    this.element = new GameInfoSection(ClockSvg());
    this.intervalId = null;
    this.setStopwatchInnerHtml();
    if (this.root.gameSettings.isGameStarted && !this.root.gameSettings.isGameFinished) {
      this.start();
    }
  }

  start() {
    this.intervalId = setInterval(() => {
      this.root.gameSettings.time += 1;
      this.setStopwatchInnerHtml();
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  reset() {
    this.stop();
    this.setStopwatchInnerHtml();
  }

  setStopwatchInnerHtml() {
    this.element.setContent(formatTime(this.root.gameSettings.time));
  }

  getElement() {
    return this.element.getElement();
  }
}
