export class SoundModel {
  private audio: HTMLAudioElement;

  constructor(audio: HTMLAudioElement) {
    this.audio = audio;
  }

  public SoundMute(flag: boolean) {
    this.audio.muted = flag;
  }

  public SoundPower(power: number) {
    this.audio.volume = power;
  }
}
