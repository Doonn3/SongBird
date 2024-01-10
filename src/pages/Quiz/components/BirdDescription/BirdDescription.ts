import { AudioPlayer } from '@/features/AudioPlayer';
import './style.scss';

type InfoType = {
  img: string;
  title: string;
  subtitle: string;
  description: string;
  audio: string;
};

export class BirdDescription {
  private root: HTMLElement;

  private container: HTMLElement;
  private img: HTMLImageElement;
  private title: HTMLElement;
  private subtitle: HTMLElement;

  private description: HTMLElement;

  private audioPlayer = new AudioPlayer();

  constructor() {
    this.root = document.createElement('div');
    this.root.classList.add('bird-info', 'font-size-24', 'color-white');

    this.container = document.createElement('div');
    this.container.classList.add('bird-info__container');

    this.img = document.createElement('img');
    this.img.classList.add('bird-info__img');

    this.title = document.createElement('p');
    this.title.classList.add(
      'color-white',
      'font-size-24',
      'm-0',
      'border-bottom',
    );

    this.subtitle = document.createElement('p');
    this.subtitle.classList.add(
      'color-white',
      'font-size-20',
      'm-0',
      'border-bottom',
    );

    const div = document.createElement('div');

    div.append(this.title, this.subtitle, this.audioPlayer.Render());

    this.container.append(this.img, div);

    this.description = document.createElement('p');
    this.description.classList.add('color-white', 'font-size-20', 'm-0');

    this.root.textContent = 'Выберите Птицу Из Списка';
  }

  public DefaultState() {
    this.root.textContent = 'Выберите Птицу Из Списка';
  }

  public SetInfo(info: InfoType) {
    this.audioPlayer.OnUnMount();
    this.img.src = info.img;
    this.title.textContent = info.title;
    this.subtitle.textContent = info.subtitle;
    this.description.textContent = info.description;
    this.audioPlayer.SetAudioSrc(info.audio);
    this.audioPlayer.OnMount();

    this.root.textContent = '';
    this.root.append(this.container, this.description);
  }

  public OnMount() {}

  public OnUnMount() {}

  public Render() {
    return this.root;
  }
}
