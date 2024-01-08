import { RouterLink } from "Core";
import { utils } from "@/shared/Utils";

import "./style.scss";

const STYLE_LOGO = "btn btn-ghost font-size-24 color-black color-grad fw-700 breakpoint-1536:font-size-28";
const STYLE_LINK =
  "btn btn-ghost font-size-20 color-white bg-dark-gray hover:bg-white/10 breakpoint-1536:font-size-24";

class Header {
  private root: HTMLElement;

  constructor(style?: string) {
    this.root = utils.createHTMLElement("header", `header ${style ?? ""}`);

    const logo = RouterLink("/home", {
      classStyle: STYLE_LOGO,
      text: "SongBird",
    });

    const nav = utils.createHTMLElement("nav", "header__nav");

    const galleryLink = RouterLink("/gallery", {
      classStyle: STYLE_LINK,
      text: "Gallery",
    });

    const quizLink = RouterLink("/quiz", {
      classStyle: STYLE_LINK,
      text: "Quiz",
    });

    nav.append(galleryLink, quizLink);

    this.root.append(logo, nav);
  }

  public Render() {
    return this.root;
  }
}

export default Header;
