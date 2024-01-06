import AudioPlayerModel from "../model/AudioPlayerModel";
import PlayPauseStopControls from "../components/PlayPauseControls/PlayPauseStopControls";
import { ProgressBarControls } from "../components/ProgressBarControls/ProgressBarControls";

import { SoundControls } from "../components/SoundControls/SoundControls";
import { utils } from "@/shared/Utils";

import "./style.scss";

class AudioPlayer {
  private root: HTMLElement;

  private model = new AudioPlayerModel();

  private playPauseStopControls: PlayPauseStopControls;

  private progressBarControls: ProgressBarControls;

  private soundControls: SoundControls;

  constructor() {
    this.soundControls = new SoundControls(this.model);

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

    const div = utils.createHTMLElement("div", "audio-player__controls");
    div.append(
      this.playPauseStopControls.Render(),
      this.soundControls.Render()
    );

    this.root.append(div, this.progressBarControls.Render());
  }

  public OnMount() {
    this.soundControls.OnMount();
  }

  public OnUnMount() {
    this.model.Destroy();
    this.soundControls.OnUnMount();
  }

  public SetAudioSrc(audioSrc: string) {
    this.model.SetAudio(audioSrc);
  }

  public Play() {
    this.onPlay();
    this.playPauseStopControls.Play();
  }

  private onPlay = () => {
    this.model.Play();
  };

  private onPause = () => {
    this.model.Pause();
  };

  private onStop = () => {
    this.model.Stop();
    this.playPauseStopControls.Stop();
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
    return this.root;
  };
}

export default AudioPlayer;
