import "./style.scss";
import PlayIcon from "../../assets/play.svg";
import PauseIcon from "../../assets/pause.svg";
import StopIcon from "../../assets/stop.svg";

interface IControl {
  onPlay: () => void;
  onPause: () => void;
}

export function PlayPauseStopControls(props?: IControl) {
  let root: HTMLElement | null = null;
  let playPause: HTMLElement | null = null;
  let isPlay = false;

  const onMount = () => {
    playPause?.addEventListener("click", togglePlay);
  };

  const onUnmount = () => {
    playPause?.removeEventListener("click", togglePlay);
    playPause = null;
  };

  const togglePlay = () => {
    isPlay = !isPlay;

    playPause!.innerHTML = `${isPlay ? PauseIcon : PlayIcon}`; // перерендериваем элемент после изменения состояния

    if (isPlay) {
      if (props?.onPlay) props.onPlay();
    } else {
      if (props?.onPause) props.onPause();
    }
  };

  const render = (): HTMLElement => {
    root = document.createElement("div");
    root.classList.add("play-pause-stop-controls");

    playPause = document.createElement("div");
    playPause.classList.add("play-pause-wraper");
    playPause.insertAdjacentHTML("beforeend", isPlay ? PauseIcon : PlayIcon);

    const wraper = document.createElement("div");
    wraper.classList.add("stop-wraper");
    wraper.insertAdjacentHTML("beforeend", StopIcon);

    root.append(playPause, wraper);
    onMount();
    return root;
  };

  return {
    render,
    onUnmount,
  };
}

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
