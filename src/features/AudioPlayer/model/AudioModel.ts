export class AudioModel {
  private audio: HTMLAudioElement;

  constructor(audio: HTMLAudioElement) {
    this.audio = audio;
  }

  public Play() {
    this.audio.play();
  }

  public Pause() {
    this.audio.pause();
  }

  public Stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  public SetTime(second: number) {
    this.audio.currentTime = second;
  }
}
