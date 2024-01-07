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
    this.progressBarControls = new ProgressBarControls(this.model);
    this.soundControls = new SoundControls(this.model);

    this.playPauseStopControls = new PlayPauseStopControls(this.model);

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
    this.playPauseStopControls.OnMount();
    this.soundControls.OnMount();
    this.progressBarControls.OnMount();
  }

  public OnUnMount() {
    this.playPauseStopControls.OnUnmount();
    this.soundControls.OnUnMount();
    this.progressBarControls.OnUnmount();
    this.model.Destroy();
  }

  public SetAudioSrc(audioSrc: string) {
    this.model.SetAudio(audioSrc);
  }

  public Render = () => {
    return this.root;
  };
}

export default AudioPlayer;
