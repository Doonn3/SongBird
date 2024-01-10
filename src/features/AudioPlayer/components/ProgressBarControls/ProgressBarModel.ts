export class ProgressBarModel {
  private duration = 0;
  private currTime = 0;

  public get Duration() {
    return this.duration;
  }

  public set Duration(val: number) {
    this.duration = val;
  }

  public get CurrTime() {
    return this.currTime;
  }

  public set CurrTime(val: number) {
    this.currTime = val;
  }

  public ConvertSecondsToFormatMinSecond = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  public Calc(offsetX: number, width: number) {
    let percentage = (offsetX / width) * 100;
    if (percentage > 99) percentage = 100;
    if (percentage < 1) percentage = 0;

    const totalSeconds = (this.duration * percentage) / 100;
    const readableTime = this.ConvertSecondsToFormatMinSecond(totalSeconds);

    return {
      percentage,
      totalSeconds,
      readableTime,
    };
  }
}
