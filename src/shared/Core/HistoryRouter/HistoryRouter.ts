import { BaseComponent } from "..";
import { IRoute, RoutesType } from "./Types/Types";

class RouterController {
  private prevTempRoute: IRoute | null = null;
  private currTempRoute: IRoute | null = null;

  public GetRoute(urlPath: string, routes: RoutesType) {
    const route = this.findRoute(urlPath, routes);

    if (this.currTempRoute === null) {
      this.currTempRoute = route;
    } else {
      this.prevTempRoute = this.currTempRoute;
      this.currTempRoute = route;
    }

    return { prev: this.prevTempRoute, curr: this.currTempRoute };
  }

  private findRoute(urlPath: string, routes: RoutesType) {
    const route = routes.find((route) => route.path === urlPath);
    return route ? route : null;
  }
}

export class HistoryRouter {
  public static Instance: HistoryRouter;
  private browserHistory = window.history;
  private routes: RoutesType;

  private routeController = new RouterController();

  public EmitRender!: (mountComponent: BaseComponent) => void;

  public EmitUnMountComponent!: (unMountComponent: BaseComponent) => void;

  public get Routes() {
    return this.routes;
  }

  constructor(routes: RoutesType) {
    this.routes = routes;
    HistoryRouter.Instance = this;
  }

  public Init() {
    this.onURLChange();
    window.addEventListener("popstate", (event) => {
      this.onURLChange();
    });
  }

  public LinkTo(to: string) {
    this.browserHistory.pushState(null, "", to);
    this.onURLChange();
  }

  private onURLChange() {
    console.log("URL changed to", window.location.pathname);

    const route = this.routeController.GetRoute(
      window.location.pathname,
      this.routes
    );

    if (route.prev) {
      const component = route.prev.component;
      if (component) {
        this.EmitUnMountComponent(component);
      }
    }

    if (route.curr) {
      const redirect = route.curr.redirect;
      if (redirect) {
        this.LinkTo(redirect);
      }
      const component = route.curr.component;
      if (component) {
        this.EmitRender(component);
      }
    }
  }
}
