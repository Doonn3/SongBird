import "./style.scss";
import { PlayPauseStopControls } from "./components/PlayPauseControls/PlayPauseStopControls";
import { ProgressBarControls } from "./components/ProgressBarControls/ProgressBarControls";
import { SoundControls } from "./components/SoundControls/SoundControls";

class AudioPlayer {
  private instanceAudio = new Audio();
  private duration = 0;
  private durationCallback: (duration: number) => void = () => {};
  private currTimeCallback: (duration: number) => void = () => {};
  public SetAudio(_audio: string) {
    console.log("SET");
    this.instanceAudio.src = _audio;

    this.instanceAudio.addEventListener("loadedmetadata", this.eventDuration);
    this.instanceAudio.addEventListener("timeupdate", this.eventCurrentTime);
  }

  public Play() {
    console.log("PLAY");
    console.log(this.instanceAudio);
    this.instanceAudio.play();
  }

  public Pause() {
    console.log("PAUSE");
    console.log(this.instanceAudio);
    this.instanceAudio.pause();
  }

  public onDurationChange(callback: (duration: number) => void) {
    this.durationCallback = callback;
  }

  public onCurrentChange(callback: (currTime: number) => void) {
    this.currTimeCallback = callback;
  }

  private eventDuration = () => {
    console.log("Total time in seconds: " + this.instanceAudio.duration);
    this.duration = this.instanceAudio.duration;
    this.durationCallback(this.duration);
  };

  private eventCurrentTime = () => {
    console.log('123');
    this.currTimeCallback(this.instanceAudio.currentTime)
  };
}

const audioPlayer = new AudioPlayer();

type PropsType = {
  audioSrc: string;
};

export async function AudioControl(props: PropsType) {
  let root: HTMLElement | null = null;
  const audioSrc = props.audioSrc;

  const playPauseStopControls = PlayPauseStopControls({
    onPlay: () => {
      audioPlayer.SetAudio(audioSrc);
      audioPlayer.Play();
    },
    onPause: () => {
      audioPlayer.Pause();
    },
  });
  const soundControls = SoundControls();
  const progressBarControls = new ProgressBarControls();

  audioPlayer.onDurationChange((duration) => {
    console.log("131");
    progressBarControls.Model.SetDuration(duration);
  });

  audioPlayer.onCurrentChange((time) => {
    progressBarControls.Model.CurrTime.Set(time)
  })

  const onMount = () => {
    // soundControls.onMount(root!);
  };

  const render = () => {
    root = document.createElement("div");
    root.classList.add("audio-player");

    root.append(playPauseStopControls.render());
    // root.insertAdjacentHTML("beforeend", soundControls.render());
    root.append(progressBarControls.Render());

    return root;
  };

  return {
    render,
  };
}

/*
<<TEMPLATE>>
<div class="audio-player">  
  ${playPauseControls.render()}
  ${soundControls.render()}
  ${progressBarControls.render()}
</div>
*/
