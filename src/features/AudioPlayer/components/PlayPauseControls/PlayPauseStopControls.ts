import PlayIcon from "../../assets/play.svg";
import PauseIcon from "../../assets/pause.svg";
import StopIcon from "../../assets/stop.svg";

import "./style.scss";
import { utils } from "@/shared/Utils";
import AudioPlayerModel from "../../model/AudioPlayerModel";
import { Model } from "./Model";

function controls() {
  const root = utils.createHTMLElement("div", "play-pause-stop-controls");
  const playPause = utils.createHTMLElement("div", "play-pause-wraper");
  const stop = utils.createHTMLElement("div", "stop-wraper");
  root.append(playPause, stop);
  return {
    root,
    playPause,
    stop,
  };
}

class PlayPauseStopControls {
  private controls = controls();
  private model: Model;

  constructor(audioPlayer: AudioPlayerModel) {
    this.model = new Model(audioPlayer, this);

    this.controls.playPause.insertAdjacentHTML(
      "beforeend",
      this.model.IsPlay ? PauseIcon : PlayIcon
    );

    this.controls.stop.insertAdjacentHTML("beforeend", StopIcon);
  }

  public OnMount = () => {
    this.controls.playPause.addEventListener("click", this.onTogglePlay);
    this.controls.stop.addEventListener("click", this.onStop);
  };

  public OnUnmount = () => {
    this.onStop();
    this.controls.playPause.removeEventListener("click", this.onTogglePlay);
    this.controls.stop.removeEventListener("click", this.onStop);
  };

  private onTogglePlay = () => {
    this.model.Toggle();
    this.changeIcon(); // перерендериваем элемент после изменения состояния
  };

  private onStop = () => {
    this.model.Stop();
    this.changeIcon();
  };

  public changeIcon() {
    this.controls.playPause.innerHTML = `${
      this.model.IsPlay ? PauseIcon : PlayIcon
    }`;
  }

  public Render() {
    return this.controls.root;
  }
}

export default PlayPauseStopControls;

// TEMPLATE
/*
    <div class="play-pause-stop-controls">

      <div class="play-pause-wraper">
        ${isPlay ? PauseIcon : PlayIcon}
      </div>
        

      <div class="stop-wraper">
        ${StopIcon}
      </div>
    </div>
*/
