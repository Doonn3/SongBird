import AudioPlayerModel from "../model/AudioPlayerModel";
import PlayPauseStopControls from "../components/PlayPauseControls/PlayPauseStopControls";
import { ProgressBarControls } from "../components/ProgressBarControls/ProgressBarControls";

import "./style.scss";

type PropsType = {
  audioSrc: string;
};

class AudioPlayer {
  private root: HTMLElement;

  private model = new AudioPlayerModel();

  private playPauseStopControls: PlayPauseStopControls;

  private progressBarControls: ProgressBarControls;

  constructor(_props?: PropsType) {
    if (_props) {
      this.model.SetAudio(_props.audioSrc);
    }

    this.playPauseStopControls = new PlayPauseStopControls({
      onPlay: this.onPlay,
      onPause: this.onPause,
      onStop: this.onStop,
    });

    this.progressBarControls = new ProgressBarControls({
      onChangeProgressBar: this.onChangeProgressBar,
    });

    this.model.onEnded(this.onEnded);
    this.model.onDurationChange(this.onDuration);
    this.model.onCurrentChange(this.onCurrentTime);

    this.root = document.createElement("div");
    this.root.classList.add("audio-player");

    this.root.append(this.playPauseStopControls.Render());
    this.root.append(this.progressBarControls.Render());
  }

  public SetAudioSrc(audioSrc: string) {
    this.model.SetAudio(audioSrc);
  }

  private onPlay = () => {
    this.model.Play();
  };

  private onPause = () => {
    this.model.Pause();
  };

  private onStop = () => {
    this.model.Stop();
  };

  public OnReset() {
    this.onStop();
  }

  private onEnded = () => {
    this.playPauseStopControls.Stop();
  };

  private onDuration = (duration: number) => {
    this.progressBarControls.Model.SetDuration(duration);
  };

  private onCurrentTime = (time: number) => {
    this.progressBarControls.Model.UpdateCurrentTime(time);
  };

  private onChangeProgressBar = (time: number) => {
    this.model.SetTime(time);
  };

  public Render = () => {
    // this.root = document.createElement("div");
    // root.classList.add("audio-player");
    // root.append(playPauseStopControls.render());
    // root.insertAdjacentHTML("beforeend", soundControls.render());
    // root.append(progressBarControls.Render());
    return this.root;
  };
}

export default AudioPlayer;
