import { AudioModel } from './AudioModel';
import { SoundModel } from './SoundModel';

class AudioPlayerModel {
  private instanceAudio = new Audio();
  private audioModel: AudioModel;
  private soundModel: SoundModel;

  private durationCallback: (duration: number) => void = () => {};
  private currTimeCallback: (currentTime: number) => void = () => {};
  private defaultState: () => void = () => {};
  private endedCallback: () => void = () => {};

  public get Audio() {
    return this.audioModel;
  }

  public get Sound() {
    return this.soundModel;
  }

  constructor() {
    this.audioModel = new AudioModel(this.instanceAudio);
    this.soundModel = new SoundModel(this.instanceAudio);
  }

  private mount() {
    this.instanceAudio.addEventListener('loadedmetadata', this.eventDuration);
    this.instanceAudio.addEventListener('timeupdate', this.eventCurrentTime);
    this.instanceAudio.addEventListener('ended', this.eventEnded);
  }

  private unMount() {
    this.audioModel.Stop();
    this.instanceAudio.src = '';
    this.instanceAudio.removeEventListener(
      'loadedmetadata',
      this.eventDuration,
    );
    this.instanceAudio.removeEventListener('timeupdate', this.eventCurrentTime);
    this.instanceAudio.removeEventListener('ended', this.eventEnded);
  }

  public Destroy() {
    this.unMount();
  }

  public SetAudio(_audio: string) {
    this.unMount();

    this.instanceAudio.src = _audio;

    this.mount();
  }

  public onDurationChange(callback: () => void) {
    this.durationCallback = callback;
  }

  public onCurrentChange(callback: () => void) {
    this.currTimeCallback = callback;
  }

  public onEnded(callback: () => void) {
    this.endedCallback = callback;
  }

  private eventDuration = () => {
    this.durationCallback(this.instanceAudio.duration);
  };

  private eventCurrentTime = () => {
    this.currTimeCallback(this.instanceAudio.currentTime);
  };

  private eventEnded = () => {
    this.endedCallback();
  };
}

export default AudioPlayerModel;
