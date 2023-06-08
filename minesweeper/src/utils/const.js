export const gameSettingStorageKey = 'game-setting-minesweeper-2023q1-7OFej';

export const difficultKeyTypes = ['easy', 'medium', 'hard', 'custom'];
export const [easyDifKey, mediumDifKey, hardDifKey, customDifKey] = difficultKeyTypes;

export const difficultData = {
  [easyDifKey]: {
    difficult: easyDifKey,
    width: 10,
    height: 10,
    numberOfMines: 10,
  },
  [mediumDifKey]: {
    difficult: mediumDifKey,
    width: 15,
    height: 15,
    numberOfMines: 50,
  },
  [hardDifKey]: {
    difficult: hardDifKey,
    width: 25,
    height: 25,
    numberOfMines: 99,
  },
};

export const cellTextColorData = {
  1: 'blue',
  2: 'green',
  3: 'red',
  4: 'darkblue',
  5: 'brown',
  6: '#00fff1',
  7: 'darkviolet',
  8: 'black',
};

export const storageThemeKey = 'theme-minesweeper-2023q1-7OFej';
export const darkThemeKey = 'dark';
export const lightThemeKey = 'light';

export const themeKeyTypes = [lightThemeKey, darkThemeKey];

export const storageVolumeKey = 'volume-minesweeper-2023q1-7OFej';
export const onVolumeKey = '1';
export const offVolumeKey = '0';

export const volumeKeyTypes = [onVolumeKey, offVolumeKey];

export const audioWinSrc = './assets/audio/win.mp3';
export const audioLoseSrc = './assets/audio/lose.mp3';
export const audioClickSrc = './assets/audio/click.mp3';
export const audioFlagSrc = './assets/audio/flag.mp3';
