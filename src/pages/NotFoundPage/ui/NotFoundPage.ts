import { BaseComponent } from "Core";

class NotFoundPage extends BaseComponent {
  public Render(): HTMLElement {
    const root = document.createElement("p");
    root.textContent = "Not Found Page";
    root.style.color = "white";
    root.style.fontSize = "50px";
    return root;
  }
}

export default NotFoundPage;
