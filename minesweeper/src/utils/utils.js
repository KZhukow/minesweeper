import { difficultData, easyDifKey, gameSettingStorageKey } from './const';

export function getCellIndexesWithMines(cellsAmount, minesAmount, exception) {
  const cellIndexes = [];
  for (let i = 0; i < cellsAmount; i++) {
    if (i !== exception) {
      cellIndexes.push(i);
    }
  }
  return cellIndexes.sort(() => Math.random() - 0.5).slice(0, minesAmount);
}

export function getNeighborCellIndexes(cellsAmount, cellsInRow, index) {
  return [
    index % cellsInRow === 0 ? -1 : index - cellsInRow - 1,
    index - cellsInRow,
    (index + 1) % cellsInRow === 0 ? -1 : index - cellsInRow + 1,

    index % cellsInRow === 0 ? -1 : index - 1,
    (index + 1) % cellsInRow === 0 ? -1 : index + 1,

    index % cellsInRow === 0 ? -1 : index + cellsInRow - 1,
    index + cellsInRow,
    (index + 1) % cellsInRow === 0 ? -1 : index + cellsInRow + 1,
  ].filter((it) => it >= 0 && it < cellsAmount);
}

export function setLocalStorageValue(key, value) {
  localStorage.setItem(key, value);
}

export function getLocalStorageCurrentValue(key, valueTypes) {
  const value = localStorage.getItem(key);
  if (valueTypes.includes(value)) {
    return value;
  }
  localStorage.setItem(key, valueTypes[0]);
  return valueTypes[0];
}

export function getInitGameSettings({
  difficult,
  height,
  width,
  numberOfMines,
  stats = [],
} = difficultData[easyDifKey]) {
  const cellsData = [];
  for (let i = 0; i < height * width; i++) {
    cellsData.push([0, 0, 0]);
  }
  return {
    difficult,
    height,
    width,
    openedCells: 0,
    emptyCells: (height * width) - numberOfMines,
    numberOfMines,
    clickCount: 0,
    time: 0,
    minesLeft: numberOfMines,
    flagsCount: 0,
    isGameStarted: false,
    isGameFinished: false,
    isGameWin: false,
    cellsData,
    mineIndexes: [],
    stats,
  };
}

export function getGameSettings() {
  const gameSettings = JSON.parse(localStorage.getItem(gameSettingStorageKey));
  if (gameSettings === null) {
    const data = getInitGameSettings();
    localStorage.removeItem(gameSettingStorageKey);
    return data;
  }

  localStorage.removeItem(gameSettingStorageKey);
  return gameSettings;
}

export function formatTime(seconds) {
  let sec = seconds;
  const days = Math.floor(sec / (24 * 3600));
  sec %= (24 * 3600);
  const hours = Math.floor(sec / 3600);
  sec %= 3600;
  const minutes = Math.floor(sec / 60);
  sec %= 60;

  let result = '';

  if (days > 0) {
    result += `${days.toString().padStart(2, '0')}:`;
  }
  if (hours > 0 || result.length > 0) {
    result += `${hours.toString().padStart(2, '0')}:`;
  }
  if (minutes > 0 || result.length > 0) {
    result += `${minutes.toString().padStart(2, '0')}:`;
  }
  result += sec.toString().padStart(2, '0');

  return result;
}
