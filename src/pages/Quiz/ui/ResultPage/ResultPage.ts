import { BaseComponent, useRouter } from "Core";
import { utils } from "@/shared/Utils";

import { BirdsStore } from "@/entities/Birds";
import { AudioPlayer } from "@/features/AudioPlayer";

import ASD from "@/shared/assets/audio/rock-privet.mp3";

import "./style.scss";

class ResultPage extends BaseComponent {
  private root: HTMLElement;
  private resultScore: HTMLElement;
  private text: HTMLElement;

  private btn: HTMLElement;

  private audioPlayer = new AudioPlayer();

  private store = BirdsStore.Instance;

  constructor() {
    super();
    this.root = utils.createHTMLElement("section", "result");

    this.resultScore = utils.createHTMLElement("span");

    this.text = utils.createHTMLElement("p");

    this.btn = utils.createHTMLElement(
      "button",
      "btn btn-accent color-black font-size-20"
    );
    this.btn.textContent = "Повторить";

    this.root.append(this.resultScore, this.text, this.btn);
  }

  private checkScrore() {
    const score = this.store.GetScore();
    this.resultScore.textContent = `${score}`;

    if (score < 20) {
      this.text.textContent = "Мало Очьков Что бы Получить Приз!!!";
    } else {
      this.text.textContent = "Победа!!!";
      this.root.append(this.audioPlayer.Render());
      this.audioPlayer.SetAudioSrc(ASD);
    }
  }

  public Init(): void {
    this.checkScrore();
  }

  public OnMount(): void {
    this.audioPlayer.OnMount();
    this.btn.addEventListener("click", this.onClick);
  }

  public OnUnMount(): void {
    this.audioPlayer.OnUnMount();
    this.btn.removeEventListener("click", this.onClick);
  }

  public Render(): HTMLElement {
    return this.root;
  }

  private onClick = () => {
    this.store.Reset();
    useRouter("quiz");
  };
}

export default ResultPage;
