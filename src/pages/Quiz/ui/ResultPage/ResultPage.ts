import { BaseComponent, useRouter } from "Core";
import { utils } from "@/shared/Utils";

import { BirdsStore } from "@/entities/Birds";
import { AudioPlayer } from "@/features/AudioPlayer";

import ROCK_PRIVET_AUDIO from "@/shared/assets/audio/rock-privet.mp3";

import "./style.scss";

const TEXT_BTN = "Повторить";
const TEXT_LOSE = "Мало очков, что бы получить приз нужно минимум 15 очков.";

function wrapperScore() {
  const wrapperScore = utils.createHTMLElement("div", "result__score");
  const textScore = utils.createHTMLElement("span", "font-size-24");
  textScore.textContent = "Score: ";
  const resultScore = utils.createHTMLElement("span", "font-size-24");
  wrapperScore.append(textScore, resultScore);

  return {
    wrapperScore,
    resultScore,
  };
}

function view() {
  const root = utils.createHTMLElement("section", "result");

  const ws = wrapperScore();

  const wrapper = utils.createHTMLElement("div", "result__content");
  const text = utils.createHTMLElement("p", "font-size-24");
  const prize = utils.createHTMLElement("div");
  const btn = utils.createHTMLElement(
    "button",
    "btn btn-accent color-black font-size-28"
  );
  btn.textContent = TEXT_BTN;
  wrapper.append(text, btn);

  root.append(ws.wrapperScore, wrapper);

  return {
    root,
    resultScore: ws.resultScore,
    wrapper,
    text,
    prize,
    btn,
  };
}

class ResultPage extends BaseComponent {
  private view = view();

  private audioPlayer = new AudioPlayer();

  private store = BirdsStore.Instance;

  constructor() {
    super();
  }

  private checkScrore() {
    const score = this.store.GetScore();
    this.view.resultScore.textContent = `${score}`;

    if (score < 15) {
      this.view.text.textContent = TEXT_LOSE;
    } else {
      this.view.text.remove();
      this.view.wrapper.prepend(this.audioPlayer.Render());
      this.audioPlayer.SetAudioSrc(ROCK_PRIVET_AUDIO);
    }
  }

  public Init(): void {
    this.checkScrore();
  }

  public OnMount(): void {
    this.audioPlayer.OnMount();
    this.view.btn.addEventListener("click", this.onClick);
  }

  public OnUnMount(): void {
    this.audioPlayer.OnUnMount();
    this.view.btn.removeEventListener("click", this.onClick);
  }

  public Render(): HTMLElement {
    return this.view.root;
  }

  private onClick = () => {
    this.store.Reset();
    useRouter("quiz");
  };
}

export default ResultPage;
