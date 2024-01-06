import { utils } from "@/shared/Utils";

import "./style.scss";

const STYLE_PARALLAX3D = "parallax-3d";
const STYLE_LAYERS = "parallax-3d__layers";
const STYLE_LAYER = "parallax-3d__layer";
const STYLE_LAYER_SCREEN = "parallax-3d__layer-screen";

type LayersType = {
  img?: string;
  htmlElement?: HTMLElement;
  layerDepth: number;
};

export class Parallax3D {
  private root: HTMLElement;
  private layers: HTMLElement;

  private speedRotate = 0.01;

  constructor() {
    this.root = utils.createHTMLElement("div", STYLE_PARALLAX3D);
    this.layers = utils.createHTMLElement("div", STYLE_LAYERS);
  }

  private createImgLayer(layerData: LayersType) {
    const item = utils.createHTMLElement("div", STYLE_LAYER);
    item.style.transform = `translateZ(${layerData.layerDepth}px)`;

    if (layerData.img) {
      const img = utils.createHTMLElement("img") as HTMLImageElement;
      img.src = layerData.img;
      img.style.width = "100%";
      img.style.height = "100%";
      item.append(img);
    }

    return item;
  }

  private createScreenLayer(layerData: LayersType) {
    const layerScreen = utils.createHTMLElement("div", STYLE_LAYER_SCREEN);
    layerScreen.style.transform = `translateZ(${layerData.layerDepth}px)`;
    layerScreen.append(layerData.htmlElement ?? "");
    return layerScreen;
  }

  public Build(layersData: LayersType[]) {
    const items: HTMLElement[] = [];
    layersData.forEach((layerData) => {
      if (layerData.img) {
        const img = this.createImgLayer(layerData);
        items.push(img);
      }

      if (layerData.htmlElement) {
        const layerScreen = this.createScreenLayer(layerData);
        items.push(layerScreen);
      }
    });

    this.layers.append(...items);
  }

  temp = 0;

  public Render() {
    this.root.append(this.layers);

    this.root.addEventListener("mousemove", (e: MouseEvent) => {
      const X = (e.clientX - window.innerWidth / 2) * this.speedRotate;
      const Y = (e.clientY - window.innerHeight / 2) * this.speedRotate;
      this.layers.style.transform = `rotateX(${Y * -1}deg) rotateY(${
        X * -1
      }deg)`;
    });

    return this.root;
  }
}
