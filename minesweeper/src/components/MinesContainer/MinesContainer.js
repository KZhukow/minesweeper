import { getCellIndexesWithMines, getNeighborCellIndexes } from '../../utils/utils';
import getDivElement from '../elements/divElement';
import MineCell from './MineCell/MineCell';
import './style.css';

export default class MinesContainer {
  constructor(root) {
    this.root = root;
    this.element = getDivElement(['minesContainer']);
    this.cells = [];
  }

  getElement() {
    return this.element;
  }

  addChild(child) {
    this.element.appendChild(child);
  }

  setFieldInitConfig(width, height) {
    this.element.innerHTML = '';
    this.element.style.gridTemplateColumns = `repeat(${width}, auto)`;
    this.element.style.gridTemplateRows = `repeat(${height}, auto)`;
  }

  generateField() {
    this.cells = [];
    const { width, height } = this.root.gameSettings;
    this.setFieldInitConfig(width, height);
    const numberOfCells = width * height;
    for (let i = 0; i < numberOfCells; i++) {
      const mineCell = new MineCell(
        this.root,
        this,
        i,
        getNeighborCellIndexes(numberOfCells, width, i),
        ...this.root.gameSettings.cellsData[i],
      );
      this.cells.push(mineCell);
      this.addChild(mineCell.getElement());
    }
  }

  setMinesState(exception) {
    const { numberOfMines, width, height } = this.root.gameSettings;
    const numberOfCells = width * height;
    const mineIndexes = getCellIndexesWithMines(numberOfCells, numberOfMines, exception);
    this.root.gameSettings.mineIndexes = mineIndexes;
    mineIndexes.forEach((it) => {
      this.cells[it].setIsMine();
    });
  }

  firstClickAction(clickedCellIndex) {
    this.root.startGame();
    this.setMinesState(clickedCellIndex);
  }

  openCellsAfterLose() {
    this.cells.forEach((cell) => {
      if (cell.isOpened) return;
      if ((cell.isMine && !cell.isFlag) || (!cell.isMine && cell.isFlag)) {
        cell.open();
      }
    });
  }

  setCellFlagsAfterWin() {
    this.root.gameSettings.mineIndexes.forEach((i) => {
      this.cells[i].setFlagState();
    });
  }
}
