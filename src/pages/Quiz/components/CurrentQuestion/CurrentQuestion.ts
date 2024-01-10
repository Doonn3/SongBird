import { AudioPlayer } from '@/features/AudioPlayer';
import BirdMaskImg from '../../assets/bird-mask.jpg';

import './style.scss';

export class CurrentQuestion {
  private root: HTMLElement;
  private img: HTMLImageElement;

  private title: HTMLParagraphElement;

  private audioPlayer = new AudioPlayer();

  constructor() {
    this.root = document.createElement('div');
    this.root.classList.add('current-question');

    this.img = document.createElement('img');
    this.img.src = BirdMaskImg;

    const container = document.createElement('div');

    this.title = document.createElement('p');
    this.title.classList.add('font-size-32', 'color-white');
    this.title.textContent = '*******';

    container.append(this.title, this.audioPlayer.Render());

    this.root.append(this.img, container);
  }

  public OnMount() {
    this.audioPlayer.OnMount();
  }

  public OnUnMount() {
    this.audioPlayer.OnUnMount();
    this.Default();
  }

  public SetTitle(text: string) {
    this.title.textContent = text;
  }

  public SetImg(imgUrl: string) {
    this.img.src = imgUrl;
  }

  public SetAudio(audioSrc: string) {
    this.audioPlayer.SetAudioSrc(audioSrc);
  }

  public Default() {
    this.img.src = BirdMaskImg;
    this.title.textContent = '*******';
  }

  public Render() {
    return this.root;
  }
}
