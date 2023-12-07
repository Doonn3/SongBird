import "./style.scss";
import SoundMuteIcon from "../../assets/sound-mute.svg";
import SoundMinIcon from "../../assets/sound-min.svg";
import SoundMaxIcon from "../../assets/sound-max.svg";

export function SoundControls() {
  let root: HTMLElement | null = null;
  let iconControl: HTMLElement | null = null;

  let track: HTMLElement | null = null;
  let fill: HTMLElement | null = null;

  let strenthFill = 100;

  const status = {
    mute: SoundMuteIcon,
    min: SoundMinIcon,
    max: SoundMaxIcon,
  };

  let isMute = false;

  const onMount = (parent?: HTMLElement) => {
    if (parent === undefined) {
      throw new Error("Not Mount, SoundControls");
    }

    root = parent.querySelector(".sound-controls");

    iconControl = root!.querySelector(".sound-controls__icons");

    track = root!.querySelector(".sound-controls__progress-track");

    fill = root!.querySelector(".sound-controls__progress-fill");

    iconControl?.addEventListener("click", onChangeIconControls);
    track?.addEventListener("click", onChangeFill);
  };

  const onChangeIconControls = () => {
    isMute = !isMute;

    iconControl!.innerHTML = `${isMute ? status.mute : status.max}`;

    if (isMute) {
      fillChange(0);
    } else {
      fillChange(100);
    }
  };

  const onChangeFill = (event: MouseEvent) => {
    const offsetX = event.offsetX;
    const trackWidth = track!.getBoundingClientRect().width;

    let calc = (offsetX / trackWidth) * 100;

    if (calc >= 95) calc = 100;
    if (calc <= 5) calc = 0;
    fillChange(calc);
  };

  const fillChange = (val: number) => {
    fill!.style.width = `${val}%`;

    changeIcon(val);
  };

  const changeIcon = (val: number) => {
    let icon = SoundMaxIcon;
    if (val > 50) {
      icon = SoundMaxIcon;
    }

    if (val < 20) {
      icon = SoundMinIcon;
    }

    if (val <= 0) {
      icon = SoundMuteIcon;
    }

    iconControl!.innerHTML = `${icon}`;
  };

  const render = () => {
    return `
    <div class="sound-controls">
        <div class="sound-controls__icons">
            ${isMute ? status.mute : status.max}
        </div>

        <div class="sound-controls__progress-track">
            <span class="sound-controls__progress-fill"></span>
        </div>
    </div>
    `;
  };

  return {
    render,
    onMount,
  };
}
