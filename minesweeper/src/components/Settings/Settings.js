import { customDifKey, darkThemeKey, difficultData, lightThemeKey, offVolumeKey, onVolumeKey, storageThemeKey, storageVolumeKey, themeKeyTypes, volumeKeyTypes } from '../../utils/const';
import { getLocalStorageCurrentValue, setLocalStorageValue } from '../../utils/utils';
import getDivElement from '../elements/divElement';
import SegmentedControl from '../segmentedControl/SegmentedControl';
import DifficultForm from './DifficultForm/DifficultForm';
import './style.css';

export default class Settings {
  constructor(root) {
    this.element = getDivElement(['settingsContainer']);
    this.root = root;

    this.theme = getLocalStorageCurrentValue(storageThemeKey, themeKeyTypes);
    this.volume = getLocalStorageCurrentValue(storageVolumeKey, volumeKeyTypes);
    this.themeSegmentedControl = new SegmentedControl(this.theme, '🌞', lightThemeKey, '🌑', darkThemeKey, this.switchTheme);
    this.volumeSegmentedControl = new SegmentedControl(this.volume, '🔉', onVolumeKey, '🔇', offVolumeKey, this.switchVolume);

    this.difficultForm = new DifficultForm(this.root.gameSettings, this.onFormSubmit);

    this.start();
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const difficult = formData.get('difficult');
    this.root.gameSettings.difficult = difficult;
    if (difficult === customDifKey) {
      const width = parseInt(formData.get('width'), 10);
      const height = parseInt(formData.get('height'), 10);
      const numberOfMines = parseInt(formData.get('numberOfMines'), 10);
      if (numberOfMines >= width * height) {
        e.target.querySelector('#numberOfMines').setCustomValidity('The value must be less than the multiply of the width and height.');
        e.target.reportValidity();
      } else {
        e.target.querySelector('#numberOfMines').setCustomValidity('');
        this.root.gameSettings.width = +formData.get('width');
        this.root.gameSettings.height = +formData.get('height');
        this.root.gameSettings.numberOfMines = +formData.get('numberOfMines');
      }
    } else {
      this.root.gameSettings.width = difficultData[difficult].width;
      this.root.gameSettings.height = difficultData[difficult].height;
      this.root.gameSettings.numberOfMines = difficultData[difficult].numberOfMines;
    }
    this.root.restartGame();
  };

  switchVolume = () => {
    this.volume = this.volume === onVolumeKey ? offVolumeKey : onVolumeKey;
    setLocalStorageValue(storageVolumeKey, this.volume);
    this.root.audioElement.setVolume(+this.volume);
    return this.volume;
  };

  switchTheme = () => {
    this.theme = this.theme === darkThemeKey ? lightThemeKey : darkThemeKey;
    setLocalStorageValue(storageThemeKey, this.theme);
    this.root.body.setAttribute('theme', this.theme);
    return this.theme;
  };

  getElement() {
    return this.element;
  }

  start() {
    this.root.body.setAttribute('theme', this.theme);

    const title = getDivElement(['settingsTitle']);
    title.innerHTML = 'Settings';

    const segmentedBtnContainer = getDivElement(['settingsSegmentedBtnContainer']);
    segmentedBtnContainer.appendChild(this.themeSegmentedControl.getElement());
    segmentedBtnContainer.appendChild(this.volumeSegmentedControl.getElement());

    this.element.appendChild(title);
    this.element.appendChild(this.difficultForm.getElement());
    this.element.appendChild(segmentedBtnContainer);
  }
}
