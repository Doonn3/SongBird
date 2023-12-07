import "./style.scss";
import { DisplayCard } from "../../../shared/ui";
import { AudioPlayer } from "../../../features/AudioPlayer";

import { useBirdsStore } from "../../../entities/Birds";

import { ModalBirdInfo } from "../components/ModalBirdInfo/ModalBirdInfo";

export class CatalogPage {
  private root: HTMLElement;

  private cards: HTMLElement[] = [];

  private modal = new ModalBirdInfo();

  constructor() {
    this.root = document.createElement("section");
    this.root.classList.add("catalog");
    this.OnInit();
  }

  public OnInit() {
    const cards = useBirdsStore.GetAllBirds().map((bird) => {
      let slot = new AudioPlayer({ audioSrc: bird.audio });
      const elem = slot.Render();
      return DisplayCard(
        {
          id: bird.id,
          title: bird.name,
          urlImg: bird.image,
          slot: elem,
        },
        { onClick: this.onClick }
      ).render();
    });

    this.cards = cards;

    this.root.append(...cards);
  }

  // private onMount() {
  //   this.root.addEventListener("click", this.onClick);
  // }

  private onClick = (name: string) => {
    const bird = useBirdsStore.GetByName(name);
    if (bird === null) return;
    console.log(bird);
    this.modal.SetInfo(
      {
        title: bird.name,
        subTitle: bird.species,
        description: bird.description,
        urlSrc: bird.image,
      },
      bird.audio
    );
    this.modal.Open();
  };

  public OnUnmount() {}

  public Render() {
    this.root.append(this.modal.Render());

    return this.root;
  }
}
