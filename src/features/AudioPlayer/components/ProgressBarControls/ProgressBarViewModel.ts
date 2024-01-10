import AudioPlayerModel from '../../model/AudioPlayerModel';
import { ProgressBarControls } from './ProgressBarControls';
import { ProgressBarModel } from './ProgressBarModel';

export class ProgressBarViewModel {
  private audioPlayerModel: AudioPlayerModel;
  private view: ProgressBarControls;
  private progressBarModel = new ProgressBarModel();

  public get ProgressBarModel() {
    return this.progressBarModel;
  }

  constructor(audioPlayerModel: AudioPlayerModel, view: ProgressBarControls) {
    this.audioPlayerModel = audioPlayerModel;
    this.view = view;

    this.audioPlayerModel.onDurationChange(this.durationChange);
    this.audioPlayerModel.onCurrentChange(this.updateCurrentTimeChange);
  }

  private durationChange = (val: number) => {
    this.progressBarModel.Duration = val;

    const readableTime =
      this.progressBarModel.ConvertSecondsToFormatMinSecond(val);
    this.view.UpdateDuration(readableTime);
  };

  private updateCurrentTimeChange = (val: number) => {
    this.progressBarModel.CurrTime = val;

    const readableTime =
      this.progressBarModel.ConvertSecondsToFormatMinSecond(val);
    this.view.UpdateTime(readableTime);

    const dur = this.ProgressBarModel.Duration;

    this.view.UpdateProgressBar((val / dur) * 100);
  };

  public Calc(offsetX: number, width: number) {
    const result = this.ProgressBarModel.Calc(offsetX, width);
    this.audioPlayerModel.Audio.SetTime(result.totalSeconds);
  }
}
