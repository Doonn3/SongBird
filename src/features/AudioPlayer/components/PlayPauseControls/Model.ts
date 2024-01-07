import AudioPlayerModel from "../../model/AudioPlayerModel";
import PlayPauseStopControls from "./PlayPauseStopControls";

export class Model {
  private audioPlayer: AudioPlayerModel;
  private view: PlayPauseStopControls;

  private isPlay = false;

  public get IsPlay() {
    return this.isPlay;
  }

  constructor(audioPlayer: AudioPlayerModel, view: PlayPauseStopControls) {
    this.audioPlayer = audioPlayer;
    this.audioPlayer.onEnded(this.Stop.bind(this));
    this.view = view;
  }

  private play() {
    this.audioPlayer.Audio.Play();
  }

  private pause() {
    this.audioPlayer.Audio.Pause();
  }

  public Stop() {
    this.isPlay = false;
    this.audioPlayer.Audio.Stop();
    this.view.changeIcon();
  }

  public Toggle() {
    this.isPlay = !this.isPlay;
    if (this.isPlay) {
      this.play();
    } else {
      this.pause();
    }
  }
}
