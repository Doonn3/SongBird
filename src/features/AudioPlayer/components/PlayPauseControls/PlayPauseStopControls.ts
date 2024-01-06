import PlayIcon from "../../assets/play.svg";
import PauseIcon from "../../assets/pause.svg";
import StopIcon from "../../assets/stop.svg";

import "./style.scss";

interface IControl {
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
}

class PlayPauseStopControls {
  private root: HTMLElement;
  private playPause: HTMLElement;
  private stop: HTMLElement;
  private isPlay = false;

  private props: IControl | null = null;
  constructor(_props: IControl) {
    this.root = document.createElement("div");
    this.root.classList.add("play-pause-stop-controls");

    this.playPause = document.createElement("div");
    this.playPause.classList.add("play-pause-wraper");
    this.playPause.insertAdjacentHTML(
      "beforeend",
      this.isPlay ? PauseIcon : PlayIcon
    );

    this.stop = document.createElement("div");
    this.stop.classList.add("stop-wraper");
    this.stop.insertAdjacentHTML("beforeend", StopIcon);

    this.root.append(this.playPause, this.stop);

    this.props = _props;
  }

  private onMount = () => {
    this.playPause.addEventListener("click", this.onTogglePlay);
    this.stop.addEventListener("click", this.onStop);
  };

  private onUnmount = () => {
    this.playPause.removeEventListener("click", this.onTogglePlay);
    this.stop.removeEventListener("click", this.onStop);
  };

  private onTogglePlay = () => {
    this.isPlay = !this.isPlay;

    this.playPause.innerHTML = `${this.isPlay ? PauseIcon : PlayIcon}`; // перерендериваем элемент после изменения состояния

    if (this.isPlay) {
      if (this.props?.onPlay) this.props.onPlay();
    } else {
      if (this.props?.onPause) this.props.onPause();
    }
  };

  private onStop = () => {
    this.Stop();
    if (this.props?.onStop) this.props.onStop();
  };

  public Stop() {
    this.isPlay = false;
    this.playPause.innerHTML = `${this.isPlay ? PauseIcon : PlayIcon}`; // перерендериваем элемент после изменения состояния
  }

  public Play() {
    this.isPlay = true;
    if (this.isPlay) {
      this.playPause.innerHTML = `${this.isPlay ? PauseIcon : PlayIcon}`; // перерендериваем элемент после изменения состояния
    }
  }

  public Render() {
    this.onMount();
    return this.root;
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
