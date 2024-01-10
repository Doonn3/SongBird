import './style.scss';
import SoundMuteIcon from '../../assets/sound-mute.svg';
import SoundMinIcon from '../../assets/sound-min.svg';
import SoundMaxIcon from '../../assets/sound-max.svg';
import { utils } from '@/shared/Utils';
import AudioPlayerModel from '../../model/AudioPlayerModel';

class SoundModel {
  private audioPlayerModel: AudioPlayerModel;

  private currentStatusIcon = SoundMinIcon;

  private statusMap = {
    mute: SoundMuteIcon,
    min: SoundMinIcon,
    max: SoundMaxIcon,
  };

  private readonly maxPowerSound = 100;
  private readonly minPowerSound = 0;
  private currentPowerSound = 50;
  private tempPowerSound = this.currentPowerSound;

  private isMute = false;

  public get CurrentStatusIcon() {
    return this.currentStatusIcon;
  }

  public get CurrentPowerSound() {
    return this.currentPowerSound;
  }

  constructor(audioPlayerModel: AudioPlayerModel) {
    this.audioPlayerModel = audioPlayerModel;
    this.audioPlayerModel.Sound.SoundPower(this.currentPowerSound / 100);
  }

  public changeIcon() {
    this.isMute = !this.isMute;

    this.audioPlayerModel.Sound.SoundMute(this.isMute);

    if (this.isMute) {
      this.tempPowerSound = this.currentPowerSound;
      this.currentPowerSound = this.minPowerSound;
      this.currentStatusIcon = this.statusMap.mute;
    } else {
      this.currentPowerSound = this.tempPowerSound;
      this.currentStatusIcon = this.statusMap.min;
    }

    return this.currentStatusIcon;
  }

  public ChangeSound(offsetX: number, width: number) {
    let calc = (offsetX / width) * 100;

    if (calc >= 95) calc = this.maxPowerSound;
    if (calc <= 5) calc = this.minPowerSound;

    this.changeSoundIcon(calc);

    this.currentPowerSound = calc;
    this.audioPlayerModel.Sound.SoundPower(calc / 100);

    return calc;
  }

  private changeSoundIcon(value: number) {
    if (value >= 95) {
      this.currentStatusIcon = this.statusMap.max;
    } else if (value <= 5) {
      this.currentStatusIcon = this.statusMap.mute;
    } else {
      this.currentStatusIcon = this.statusMap.min;
    }
  }
}

export class SoundControls {
  private root: HTMLElement;
  private iconControl: HTMLElement;
  private track: HTMLElement;
  private fill: HTMLElement;

  private model: SoundModel;

  constructor(audioPlayerModel: AudioPlayerModel) {
    this.model = new SoundModel(audioPlayerModel);

    this.root = utils.createHTMLElement('div', 'sound-controls');

    this.iconControl = utils.createHTMLElement('div', 'sound-controls__icons');
    this.iconControl.innerHTML = this.model.CurrentStatusIcon;

    this.track = utils.createHTMLElement(
      'div',
      'sound-controls__progress-track',
    );

    this.fill = utils.createHTMLElement(
      'span',
      'sound-controls__progress-fill',
    );

    this.fill.style.width = `${this.model.CurrentPowerSound}%`;

    this.track.append(this.fill);

    this.root.append(this.iconControl, this.track);
  }

  public OnMount() {
    this.iconControl.addEventListener('click', this.onChangeIconControls);
    this.track.addEventListener('click', this.onChangeSound);
  }

  public OnUnMount() {
    this.iconControl.removeEventListener('click', this.onChangeIconControls);
    this.track.removeEventListener('click', this.onChangeSound);
  }

  public Render() {
    return this.root;
  }

  private onChangeIconControls = () => {
    const result = this.model.changeIcon();
    this.iconControl.innerHTML = result;
    this.fill.style.width = `${this.model.CurrentPowerSound}%`;
  };

  private onChangeSound = (event: MouseEvent) => {
    const offsetX = event.offsetX;
    const trackWidth = this.track.getBoundingClientRect().width;
    const result = this.model.ChangeSound(offsetX, trackWidth);
    this.fill.style.width = `${result}%`;
    this.iconControl.innerHTML = this.model.CurrentStatusIcon;
  };
}
