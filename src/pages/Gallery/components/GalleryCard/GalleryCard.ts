import { utils } from "@/shared/Utils";

import "./style.scss";

const STYLE_CARD = "card";
const STYLE_IMG = "card__img";
const STYLE_WRAPPER_TITLE = "card__wrapper-title";
const STYLE_TITLE = "font-size-40 color-white";

type PropsType = {
  title: string;
  urlImg: string;
};

interface IAction {
  onClickCard: (title: string) => void;
}

export class GalleryCard {
  private props: PropsType;

  private root: HTMLElement;
  private action: IAction;

  constructor(props: PropsType, action: IAction) {
    this.props = props;
    this.action = action;

    this.root = utils.createHTMLElement("div", STYLE_CARD);
    const img = utils.createHTMLElement("img", STYLE_IMG) as HTMLImageElement;
    img.src = this.props.urlImg;

    const titleWrapper = utils.createHTMLElement("div", STYLE_WRAPPER_TITLE);
    const title = utils.createHTMLElement("span", STYLE_TITLE);
    title.textContent = this.props.title;
    titleWrapper.append(title);

    this.root.append(img, titleWrapper);
  }

  private onClick = () => {
    this.action.onClickCard(this.props.title);
  };

  public OnMount() {
    this.root.addEventListener("click", this.onClick);
  }

  public OnUnMount() {
    this.root.removeEventListener("click", this.onClick);
  }

  public Render() {
    return this.root;
  }
}
