import { cellTextColorData } from '../../../utils/const';
import FlagSvg from '../../elements/FlagSvg';
import MineSvg from '../../elements/MineSvg';
import getDivElement from '../../elements/divElement';
import './style.css';

export default class MineCell {
  constructor(
    root,
    container,
    index,
    neighborCellIndexes,
    isOpen = 0,
    state = 0,
    isFlag = 0,
    isClickedForLose = 0,
  ) {
    this.root = root;
    this.container = container;
    this.index = index;
    this.neighborCellIndexes = neighborCellIndexes;
    this.isOpen = !!isOpen;
    this.isMine = state === -1;
    this.isFlag = isFlag === 1;
    this.isClickedForLose = isClickedForLose === 1;
    this.minesAround = state > 0 ? state : 0;
    this.element = getDivElement(['mineCell']);
    if (this.root.gameSettings.isGameStarted || this.isFlag) {
      this.setElementContent();
    }

    this.element.addEventListener('click', () => {
      if (this.root.gameSettings.isGameFinished || this.isOpen || this.isFlag) return;

      this.root.gameSettings.clickCount += 1;
      this.root.clickCounter.setCounterInnerHtml();

      if (!this.root.gameSettings.isGameStarted) {
        this.container.firstClickAction(this.index);
      }
      if (this.isMine) {
        this.root.gameSettings.cellsData[this.index][0] = 1;
        this.root.gameSettings.cellsData[this.index][3] = 1;
        this.isOpen = true;
        this.isClickedForLose = true;
        this.setElementContent();
        this.root.loseGameAction();
      } else {
        this.root.audioElement.playClick();
        this.checkMineCell();
      }
    });

    this.element.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (this.root.gameSettings.isGameFinished || this.isOpen) return;
      this.root.audioElement.playFlag();
      this.isFlag = !this.isFlag;
      this.root.gameSettings.cellsData[this.index][2] = Number(this.isFlag);
      if (this.isFlag) {
        this.root.gameSettings.minesLeft -= 1;
        this.root.gameSettings.flagsCount += 1;
      } else {
        this.root.gameSettings.minesLeft += 1;
        this.root.gameSettings.flagsCount -= 1;
      }
      this.setElementContent();
      this.root.leftMinesCounter.setCounterInnerHtml();
      this.root.flagCounter.setCounterInnerHtml();
    });
  }

  getElement() {
    return this.element;
  }

  setIsMine() {
    this.isMine = true;
    this.root.gameSettings.cellsData[this.index][1] = -1;
  }

  checkMineCell() {
    if (this.isOpen || this.isMine || this.isFlag) return;
    this.isOpen = true;
    const minesAround = this
      .neighborCellIndexes
      .filter((mineIndex) => this.container.cells[mineIndex].isMine)
      .length;
    this.minesAround = minesAround;
    this.root.gameSettings.cellsData[this.index][0] = 1;
    this.root.gameSettings.cellsData[this.index][1] = minesAround;
    this.root.gameSettings.openedCells += 1;
    this.setElementContent();
    if (this.root.gameSettings.openedCells === this.root.gameSettings.emptyCells) {
      this.root.winGameAction();
      return;
    }
    if (minesAround === 0) {
      this
        .neighborCellIndexes
        .forEach((mineIndex) => this.container.cells[mineIndex].checkMineCell());
    }
  }

  setElementContent() {
    if (this.isOpen) {
      this.element.classList.add('isOpenedCell');
      if (this.isMine) {
        this.element.innerHTML = MineSvg('mineIcon');
        if (this.isClickedForLose) this.element.classList.add('isMineClicked');
      } else if (this.isFlag) {
        this.element.innerHTML = MineSvg('mineIcon');
        this.element.classList.add('isFalseFlag');
      } else if (this.minesAround > 0) {
        const minesAmount = this.minesAround;
        this.element.style.color = cellTextColorData[minesAmount];
        this.element.innerHTML = minesAmount;
      }
    }
    if (!this.isOpen && this.isFlag) {
      this.element.innerHTML = FlagSvg('flagIcon');
    } else if (!this.isOpen && !this.isFlag) {
      this.element.innerHTML = '';
    }
  }

  open() {
    this.isOpen = true;
    this.root.gameSettings.cellsData[this.index][0] = 1;
    this.setElementContent();
  }

  setFlagState() {
    if (this.isFlag) return;
    this.isFlag = true;
    this.root.gameSettings.cellsData[this.index][2] = 1;
    this.root.gameSettings.minesLeft -= 1;
    this.root.gameSettings.flagsCount += 1;
    this.root.leftMinesCounter.setCounterInnerHtml();
    this.root.flagCounter.setCounterInnerHtml();
    this.setElementContent();
  }
}
