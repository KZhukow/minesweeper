import { customDifKey, difficultData, difficultKeyTypes } from '../../../utils/const';
import HorizontalArrowsSvg from '../../elements/HorizontalArrowsSvg';
import MineSvg from '../../elements/MineSvg';
import VerticalArrowsSvg from '../../elements/VerticalArrowsSvg';
import getDivElement from '../../elements/divElement';
import DifficultRadioBtn from './DifficultRadioBtn/DifficultRadioBtn';
import NumberInput from './NumberInput/NumberInput';
import './style.css';

export default class DifficultForm {
  constructor({ difficult, width, height, numberOfMines }, onSubmit) {
    this.element = document.createElement('form');
    this.element.classList.add('difficultForm');
    this.element.addEventListener('submit', onSubmit);

    this.radioBtnControls = difficultKeyTypes
      .map((it) => new DifficultRadioBtn(it, this.radioBtnOnChange, it === difficult));

    this.numberInputsContainer = getDivElement(['numberInputsContainer']);
    if (difficult !== customDifKey) this.numberInputsContainer.classList.add('disabled');

    this.widthInput = new NumberInput(width, 'width', difficult !== customDifKey, HorizontalArrowsSvg());
    this.heightInput = new NumberInput(height, 'height', difficult !== customDifKey, VerticalArrowsSvg());
    this.numberOfMinesInput = new NumberInput(numberOfMines, 'numberOfMines', difficult !== customDifKey, MineSvg(), 2499);

    this.start();
  }

  radioBtnOnChange = ({ target: { value } }) => {
    if (value === customDifKey) {
      this.numberInputsContainer.classList.remove('disabled');
      this.widthInput.setDisabled(false);
      this.heightInput.setDisabled(false);
      this.numberOfMinesInput.setDisabled(false);
    } else {
      this.numberInputsContainer.classList.add('disabled');
      this.widthInput.setDisabled(true);
      this.heightInput.setDisabled(true);
      this.numberOfMinesInput.setDisabled(true);
      this.widthInput.setValue(difficultData[value].width);
      this.heightInput.setValue(difficultData[value].height);
      this.numberOfMinesInput.setValue(difficultData[value].numberOfMines);
    }
  };

  getElement() {
    return this.element;
  }

  start() {
    const radioBtnContainer = getDivElement(['radioBtnContainer']);
    this.radioBtnControls.forEach((it) => radioBtnContainer.appendChild(it.getElement()));

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('submitBtn');
    submitBtn.innerHTML = 'Apply';
    submitBtn.type = 'submit';

    this.numberInputsContainer.appendChild(this.widthInput.getElement());
    this.numberInputsContainer.appendChild(this.heightInput.getElement());
    this.numberInputsContainer.appendChild(this.numberOfMinesInput.getElement());

    this.element.appendChild(radioBtnContainer);
    this.element.appendChild(this.numberInputsContainer);
    this.element.appendChild(submitBtn);
  }
}
