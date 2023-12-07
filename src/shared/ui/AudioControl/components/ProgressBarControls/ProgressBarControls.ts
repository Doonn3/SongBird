import "./style.scss";
import { State } from "Core";

class ProgressBarModel {
  private duration = new State(0);
  private currTime = new State(0);

  public get Duration() {
    return this.duration;
  }

  public get CurrTime() {
    return this.currTime;
  }

  public ConvertSecondsToFormatMinSecond = (totalSeconds: number) => {
    const minutes = Math.round(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);

    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  public SetDuration(val: number) {
    this.duration.Set(val);
  }

  public UpdateCurrentTime(val: number) {
    this.currTime.Set(val);
  }
}

export class ProgressBarControls {
  private model = new ProgressBarModel();
  private root: HTMLElement;
  private track: HTMLElement;
  private fill: HTMLElement;
  private time: HTMLElement;
  private maxDuration: HTMLElement;

  public get Model() {
    return this.model;
  }

  constructor() {
    this.root = document.createElement("div");
    this.root.classList.add("progress-bar");

    this.track = document.createElement("div");
    this.track.classList.add("progress-bar__track");

    this.fill = document.createElement("span");
    this.fill.classList.add("progress-bar__fill");

    this.track.append(this.fill);

    const barInfo = document.createElement("div");
    barInfo.classList.add("progress-bar__info");

    this.time = document.createElement("div");
    this.time.classList.add("progress-bar__time");
    this.time.textContent = "0";

    this.maxDuration = document.createElement("div");
    this.maxDuration.classList.add("progress-bar__max-time");
    const convert = this.model.ConvertSecondsToFormatMinSecond(
      this.model.Duration.Value
    );
    this.maxDuration.textContent = convert;

    barInfo.append(this.time, this.maxDuration);

    this.root.append(this.track, barInfo);
  }

  private onMount() {
    this.root.addEventListener("click", this.onChange);
    this.model.Duration.AddObserver(this.updateDuration);
    this.model.CurrTime.AddObserver(this.updateTime);
  }

  public OnUnmount() {
    this.root.removeEventListener("click", this.onChange);
  }

  private onChange = (event: MouseEvent) => {
    const calcMaxTrackWidth = this.track.getBoundingClientRect().width;
    const offsetX = event.offsetX;
    let percentage = (offsetX / calcMaxTrackWidth) * 100;
    if (percentage > 99) percentage = 100;
    if (percentage < 1) percentage = 0;
    this.fill.style.width = `${percentage}%`;
    const totalSeconds = (this.model.Duration.Value * percentage) / 100;

    this.time.textContent =
      this.model.ConvertSecondsToFormatMinSecond(totalSeconds);
  };

  private updateDuration = () => {
    const convert = this.model.ConvertSecondsToFormatMinSecond(
      this.model.Duration.Value
    );

    this.maxDuration.textContent = convert;
  };

  private updateTime = () => {
    const convert = this.model.ConvertSecondsToFormatMinSecond(
      this.model.CurrTime.Value
    );
    this.time.textContent = convert;
    this.updateProgressBar();
  };

  private updateProgressBar() {
    let percentage = (this.model.CurrTime.Value / this.model.Duration.Value) * 100;
    console.log(percentage);
    this.fill.style.width = `${percentage}%`;
  }

  public Render(): HTMLElement {
    this.onMount();
    return this.root;
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
