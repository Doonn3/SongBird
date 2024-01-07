import { utils } from "@/shared/Utils";

import AudioPlayerModel from "../../model/AudioPlayerModel";
import { ProgressBarViewModel } from "./ProgressBarViewModel";

import "./style.scss";

function progressBarInfo() {
  const root = utils.createHTMLElement("div", "progress-bar__info");
  const time = utils.createHTMLElement("div", "progress-bar__time");
  time.textContent = "0";
  const maxDuration = utils.createHTMLElement("div", "progress-bar__max-time");
  root.append(time, maxDuration);

  return {
    root,
    time,
    maxDuration,
  };
}

function progressBar() {
  const root = utils.createHTMLElement("div", "progress-bar");
  const track = utils.createHTMLElement("div", "progress-bar__track");
  const fill = utils.createHTMLElement("span", "progress-bar__fill");
  track.append(fill);
  root.append(track);

  return {
    root,
    track,
    fill,
  };
}

export class ProgressBarControls {
  private progressBarContext = progressBar();
  private progressBarInfoContext = progressBarInfo();

  private vm: ProgressBarViewModel;

  constructor(audioModel: AudioPlayerModel) {
    this.vm = new ProgressBarViewModel(audioModel, this);

    const barInfo = document.createElement("div");
    barInfo.classList.add("progress-bar__info");

    const convert = this.vm.ProgressBarModel.ConvertSecondsToFormatMinSecond(0);

    this.progressBarInfoContext.maxDuration.textContent = convert;

    this.progressBarContext.root.append(this.progressBarInfoContext.root);
  }

  public OnMount() {
    this.progressBarContext.root.addEventListener("click", this.onChange);
  }

  public OnUnmount() {
    this.progressBarContext.root.removeEventListener("click", this.onChange);
  }

  private onChange = (event: MouseEvent) => {
    const calcMaxTrackWidth =
      this.progressBarContext.track.getBoundingClientRect().width;
    const offsetX = event.offsetX;

    this.vm.Calc(offsetX, calcMaxTrackWidth);
  };

  public UpdateDuration(duration: string) {
    this.progressBarInfoContext.maxDuration.textContent = duration;
  }

  public UpdateTime(currTime: string) {
    this.progressBarInfoContext.time.textContent = currTime;
  }

  public UpdateProgressBar(percentage: number) {
    this.progressBarContext.fill.style.width = `${percentage}%`;
  }

  public Render(): HTMLElement {
    return this.progressBarContext.root;
  }
}

// TEMPLATE
/*
    <div class="progress-bar">
        <div class="progress-bar__track">
            <span class="progress-bar__fill"></span>
        </div>

        <div class="progress-bar__info">
            <span class="progress-bar__time">0</span>
            <span class="progress-bar__max-time">${convertSecondsToFormatMinSecond(
              props.maxTimeForSeconds
            )}</span>
        </div>
    </div>
*/
