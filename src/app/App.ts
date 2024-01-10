import { BaseComponent, HistoryRouter } from 'Core';
import { routs } from './routs/routs';

export class App {
  private router = new HistoryRouter(routs);
  private root: HTMLElement;

  constructor(elem: HTMLElement) {
    this.root = elem;
    this.router.EmitRender = this.onRender;
    this.router.Init();
  }

  private onRender = (component: BaseComponent) => {
    this.root.innerHTML = '';

    this.root.append(component.Render());
  };
}
