import { gameSettingStorageKey } from '../../utils/const';
import { getGameSettings, getInitGameSettings, setLocalStorageValue } from '../../utils/utils';
import AudioElement from '../AudioElement/AudioElement';
import Counter from '../Counter/Counter';
import MinesContainer from '../MinesContainer/MinesContainer';
import ModalWindow from '../ModalWindow/ModalWindow';
import RestartGameBtn from '../RestartGameBtn/RestartGameBtn';
import Settings from '../Settings/Settings';
import SettingsBtn from '../SettingsBtn/SettingsBtn';
import StatsBtn from '../StatsBtn/StatsBtn';
import Stopwatch from '../Stopwatch/Stopwatch';
import FlagSvg from '../elements/FlagSvg';
import LoseView from '../elements/LoseView';
import MineSvg from '../elements/MineSvg';
import MouseSvg from '../elements/MouseSvg';
import StatsView from '../elements/StatsView';
import WinView from '../elements/WinView';

export default class App {
  body = document.body;

  constructor() {
    this.gameSettings = getGameSettings(this.difficult);
    this.minesContainer = new MinesContainer(this);
    this.restartGameBtn = new RestartGameBtn(this, this.restartGame);
    this.stopwatch = new Stopwatch(this);
    this.leftMinesCounter = new Counter(this, 'minesLeft', MineSvg());
    this.flagCounter = new Counter(this, 'flagsCount', FlagSvg());
    this.clickCounter = new Counter(this, 'clickCount', MouseSvg());
    this.modalWindow = new ModalWindow();
    this.statsBnt = new StatsBtn(this.openStatsModal.bind(this));
    this.settings = new Settings(this);
    this.audioElement = new AudioElement(+this.settings.volume);
    this.settingsBnt = new SettingsBtn(this.openSettingsModal.bind(this));
  }

  restartGame = () => {
    this.audioElement.playClick();
    this.gameSettings = getInitGameSettings(this.gameSettings);
    this.minesContainer.generateField();
    this.restartGameBtn.setBtnInnerHtml();
    this.leftMinesCounter.setCounterInnerHtml();
    this.flagCounter.setCounterInnerHtml();
    this.clickCounter.setCounterInnerHtml();
    this.stopwatch.reset();
  };

  startGame() {
    this.gameSettings.isGameStarted = true;
    this.stopwatch.start();
  }

  loseGameAction() {
    this.audioElement.playLose();
    this.stopwatch.stop();
    this.minesContainer.openCellsAfterLose();
    this.gameSettings.isGameFinished = true;
    this.restartGameBtn.setBtnInnerHtml();
    this.modalWindow.open(LoseView());
  }

  winGameAction() {
    this.audioElement.playWin();
    this.stopwatch.stop();
    this.minesContainer.setCellFlagsAfterWin();
    this.gameSettings.isGameFinished = true;
    this.gameSettings.isGameWin = true;
    this.restartGameBtn.setBtnInnerHtml();
    this.modalWindow.open(WinView([this.stopwatch.getElement(), this.clickCounter.getElement()]));
    this.gameSettings.stats.unshift({
      date: new Date(),
      difficult: this.gameSettings.difficult,
      width: this.gameSettings.width,
      height: this.gameSettings.height,
      mines: this.gameSettings.numberOfMines,
      time: this.gameSettings.time,
      clickCount: this.gameSettings.clickCount,
    });
    this.gameSettings.stats = this.gameSettings.stats.slice(0, 10);
  }

  openStatsModal() {
    this.modalWindow.open(StatsView(this.gameSettings.stats));
  }

  openSettingsModal() {
    this.modalWindow.open(this.settings.getElement());
  }

  start() {
    window.addEventListener('beforeunload', () => {
      setLocalStorageValue(gameSettingStorageKey, JSON.stringify(this.gameSettings));
    });
    this.body.insertAdjacentHTML('afterbegin', `
      <div class=container>
        <div class="titleContainer">
          <div class="title">Minesweeper</div>
        </div>
        <div class="gameInfoContainer">
          <div class="gameInfoSectionLeft"></div>
          <div class="gameInfoSectionRight"></div>
        </div>
      </div>
    `);
    this.body.appendChild(this.modalWindow.getElement());
    this.body.querySelector('.titleContainer').insertAdjacentElement('afterbegin', this.statsBnt.getElement());
    this.body.querySelector('.titleContainer').insertAdjacentElement('beforeend', this.settingsBnt.getElement());
    this.body.querySelector('.container').appendChild(this.minesContainer.getElement());
    this.body.querySelector('.gameInfoSectionLeft').insertAdjacentElement('afterend', this.restartGameBtn.getElement());
    this.body.querySelector('.gameInfoSectionLeft').appendChild(this.stopwatch.getElement());
    this.body.querySelector('.gameInfoSectionLeft').appendChild(this.leftMinesCounter.getElement());
    this.body.querySelector('.gameInfoSectionRight').appendChild(this.clickCounter.getElement());
    this.body.querySelector('.gameInfoSectionRight').appendChild(this.flagCounter.getElement());
    this.minesContainer.generateField();
  }
}
