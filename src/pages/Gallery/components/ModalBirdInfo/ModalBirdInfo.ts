import { ModalDialog, ModalPropsType } from "@/shared/ui/ModalDialog";
import { AudioPlayer } from "@/features/AudioPlayer";
import { utils } from "@/shared/Utils";

import "./style.scss";

class View {
  private root: HTMLElement;
  private content: HTMLElement;
  private img: HTMLImageElement;
  private title: HTMLElement;
  private subtitle: HTMLElement;
  private description: HTMLElement;

  public get Context() {
    return { root: this.root, content: this.content };
  }

  constructor(props: { urlSrc: string; slot: HTMLElement }) {
    this.root = utils.createHTMLElement("div", "modal");
    this.root.style.display = "none";
    this.content = utils.createHTMLElement("div", "modal__content");
    const contentLeft = utils.createHTMLElement("div", "modal__content-left");

    this.img = utils.createHTMLElement("img") as HTMLImageElement;
    this.img.src = props.urlSrc;
    const wrapperAudio = utils.createHTMLElement("div");
    wrapperAudio.append(props.slot);

    contentLeft.append(this.img, wrapperAudio);

    const contentRight = utils.createHTMLElement("div", "modal__content-right");

    const wrapper = utils.createHTMLElement(
      "div",
      "modal__content-right-wrapper"
    );
    this.title = utils.createHTMLElement("span", "color-white font-size-36");
    this.subtitle = utils.createHTMLElement("span", "color-white font-size-28");
    wrapper.append(this.title, this.subtitle);

    this.description = utils.createHTMLElement("p", "color-white font-size-24");
    contentRight.append(wrapper, this.description);

    this.content.append(contentLeft, contentRight);
    this.root.append(this.content);
  }

  public Show() {
    this.root.style.display = "grid";
  }

  public Hide() {
    this.root.style.display = "none";
  }

  public SetProps(props: PropsType) {
    this.img.src = props.urlSrc;
    this.title.textContent = props.title;
    this.subtitle.textContent = props.subTitle;
    this.description.textContent = props.description;
  }
}

type PropsType = ModalPropsType & {
  audioSrc: string;
};

type ActionType = () => void;

export class ModalBirdInfo {
  // private dialog: ModalDialog;
  private audioPlayer = new AudioPlayer();

  private view: View;
  private actionView: ActionType;

  constructor(action: ActionType) {
    this.view = new View({ urlSrc: "", slot: this.audioPlayer.Render() });
    this.actionView = action;
  }

  public SetInfo(props: PropsType) {
    this.audioPlayer.SetAudioSrc(props.audioSrc);
    this.audioPlayer.OnReset();
    this.view.SetProps(props);
  }

  public Show() {
    this.view.Show();
  }

  public Hide() {
    this.view.Hide();
  }

  public OnMount() {
    this.view.Context.root.addEventListener("click", this.emitClose);
    this.audioPlayer.OnMount();
  }

  public OnUnMount() {
    this.view.Context.root.removeEventListener("click", this.emitClose);
    this.audioPlayer.OnUnMount();
  }

  private emitClose = (e: Event) => {
    const target = e.target;
    if (target === this.view.Context.root) {
      this.audioPlayer.OnReset();
      this.actionView();
    }
  };

  public Render() {
    return this.view.Context.root;
  }
}
