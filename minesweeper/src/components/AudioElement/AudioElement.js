import { audioClickSrc, audioFlagSrc, audioLoseSrc, audioWinSrc } from '../../utils/const';

export default class AudioElement {
  constructor(volume) {
    this.audioElement = new Audio();
    this.audioElement.volume = volume;
  }

  play(src) {
    this.audioElement.src = src;
    this.audioElement.currentTime = 0;
    setTimeout(() => this.audioElement.play());
  }

  playWin() {
    this.play(audioWinSrc);
  }

  playLose() {
    this.play(audioLoseSrc);
  }

  playFlag() {
    this.play(audioFlagSrc);
  }

  playClick() {
    this.play(audioClickSrc);
  }

  setVolume(volume) {
    this.audioElement.volume = volume;
  }
}
