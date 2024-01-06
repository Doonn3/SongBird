import { BaseComponent, HistoryRouter } from "Core";
import { routs } from "./routs/routs";

export class App {
  private router = new HistoryRouter(routs);
  private root: HTMLElement;

  constructor(elem: HTMLElement) {
    this.root = elem;
    this.router.EmitRender = this.onRender;
    this.router.EmitUnMountComponent = this.onMountComponent;
    this.router.Init();
  }

  private onMountComponent = (component: BaseComponent) => {
    console.log("<<UNMOUNT :: COMPONENT>>", component);

    component.OnUnMount();

    this.root.innerHTML = "";
  };

  private onRender = (component: BaseComponent) => {
    console.log("<<MOUNT :: COMPONENT>>", component);

    component.Init();

    this.root.append(component.Render());

    component.OnMount();
  };
}
