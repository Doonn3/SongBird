import { BaseComponent } from "Core";

import { utils } from "@/shared/Utils";

import { BirdsStore } from "@/entities/Birds";
import { Header } from "@/widgets/Header";

import { GalleryCard } from "../components/GalleryCard";
import { ModalBirdInfo } from "../components/ModalBirdInfo";

import "./style.scss";

export class GalleryPage extends BaseComponent {
  // private header = new Header("fixed top-10 z-index-2000");
  private header = new Header("fixed top-5 z-index-2000");

  private modalInfo: ModalBirdInfo;

  private cards: GalleryCard[] = [];

  private store = new BirdsStore();

  constructor() {
    super();
    this.modalInfo = new ModalBirdInfo(this.onCloseModal);
  }

  private onCloseModal = () => {
    this.modalInfo.Hide();
  };

  private createCards() {
    this.cards = this.store.GetAllBirds().map((bird) => {
      return new GalleryCard(
        {
          title: bird.name,
          urlImg: bird.image,
        },
        { onClickCard: this.onClickCard }
      );
    });

    return this.cards;
  }

  private onClickCard = (title: string) => {
    const bird = this.store.GetByName(title);
    if (bird === null) return;
    const { id, name, species, description, image, audio } = bird;

    this.modalInfo.SetInfo({
      title: name,
      subTitle: species,
      description: description,
      urlSrc: image,
      audioSrc: audio,
    });

    this.modalInfo.Show();
  };

  public OnMount() {
    this.cards.forEach((card) => {
      card.OnMount();
    });

    this.modalInfo.OnMount();
  }

  public OnUnMount() {
    this.cards.forEach((card) => {
      card.OnUnMount();
    });
    this.cards = [];

    this.modalInfo.OnUnMount();
  }

  public Render() {
    const root = utils.createHTMLElement("section", "gallery");

    const content = utils.createHTMLElement("section", "gallery__content");

    const wrapperHeader = utils.createHTMLElement(
      "div",
      "gallery__wrapper-header"
    );
    wrapperHeader.append(this.header.Render());

    content.append(...this.createCards().map((card) => card.Render()));

    root.append(wrapperHeader, content, this.modalInfo.Render());
    return root;
  }
}
