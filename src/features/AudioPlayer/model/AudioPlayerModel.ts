class AudioPlayerModel {
  private instanceAudio = new Audio();
  private durationCallback: (duration: number) => void = () => {};
  private currTimeCallback: (currentTime: number) => void = () => {};
  private endedCallback: () => void = () => {};
  public SetAudio(_audio: string) {
    this.instanceAudio.src = _audio;

    this.instanceAudio.addEventListener("loadedmetadata", this.eventDuration);
    this.instanceAudio.addEventListener("timeupdate", this.eventCurrentTime);
    this.instanceAudio.addEventListener("ended", this.eventEnded);
  }

  public Play() {
    this.instanceAudio.play();
  }

  public Pause() {
    this.instanceAudio.pause();
  }

  public Stop() {
    this.instanceAudio.pause();
    this.instanceAudio.currentTime = 0;
  }

  public SetTime(second: number) {
    this.instanceAudio.currentTime = second;
  }

  public onDurationChange(callback: (duration: number) => void) {
    this.durationCallback = callback;
  }

  public onCurrentChange(callback: (currentTime: number) => void) {
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
    console.log(
      'this.instanceAudio.addEventListener("playing", this.eventPlaying);'
    );
    this.endedCallback();
  };
}

export default AudioPlayerModel;
