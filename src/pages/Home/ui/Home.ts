import { Header } from "@/widgets/Header";
import { BaseComponent, Parallax3D } from "Core";

import IMG_LAYER_0 from "@/shared/assets/img/layer-0.jpg";
import IMG_LAYER_1 from "@/shared/assets/img/layer-1.png";

import "./style.scss";

class Home extends BaseComponent {
  private root: HTMLElement;

  private header = new Header("absolute bottom-10 transform-center-x");

  private parallax = new Parallax3D();

  constructor() {
    super();
    this.root = document.createElement("section");
    this.root.classList.add("home");

    this.parallax.Build([
      {
        img: IMG_LAYER_0,
        layerDepth: 20,
      },
      {
        img: IMG_LAYER_1,
        layerDepth: 60,
      },
      {
        htmlElement: this.header.Render(),
        layerDepth: 80,
      },
    ]);

    // const iframe = document.createElement("iframe");
    // iframe.classList.add("home__iframe");
    // iframe.src =
    //   "https://www.youtube.com/embed/AtCuTQyqWGM?autoplay=1&mute=1&controls=0&modestbranding=1";

    // iframe.setAttribute("allow", "autoplay");

    const content = document.createElement("div");
    content.classList.add("home__content");

    const songBirdLogo = document.createElement("h1");
    songBirdLogo.classList.add(
      "font-size-60",
      "color-white",
      "text-stroke-1",
      "text-stroke-black"
    );
    songBirdLogo.textContent = "Song Bird";

    const btn = document.createElement("button");
    btn.classList.add("btn", "btn-primary", "font-size-32", "color-white");
    btn.textContent = "Начать";

    content.append(songBirdLogo, btn);

    // this.root.append(this.header.Render(), iframe, content);
    // this.root.append(this.header.Render(), content);
    this.root.append(this.parallax.Render());
  }

  public Render() {
    return this.root;
  }
}

export default Home;
