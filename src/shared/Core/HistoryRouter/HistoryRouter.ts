import { BaseComponent } from "..";
import { RoutesType } from "./Types/Types";
import { ComponentModel } from "./model/ComponentModel";
import { RouterModel } from "./model/RouterModel";

interface EmitType {
  (mountComponent: BaseComponent): void;
}

export class HistoryRouter {
  public static Instance: HistoryRouter;
  private browserHistory = window.history;

  private routerModel: RouterModel;
  private componentModel = new ComponentModel();

  public EmitRender: EmitType | null = null;

  constructor(routes: RoutesType) {
    this.routerModel = new RouterModel(routes);

    HistoryRouter.Instance = this;
  }

  public Init() {
    this.onURLChange();
    window.addEventListener("popstate", () => {
      this.onURLChange();
    });
  }

  public LinkTo(to: string) {
    this.browserHistory.pushState(null, "", to);
    this.onURLChange();
  }

  private onURLChange() {
    const pathLocation = window.location.pathname;

    const route = this.routerModel.GetRoute(pathLocation);

    const component = this.componentModel.GetComponent(route);

    if (route?.redirect) {
      this.LinkTo(route.redirect);
    }

    if (component) {
      if (this.EmitRender) {
        this.EmitRender(component);
      }
    }
  }
}
