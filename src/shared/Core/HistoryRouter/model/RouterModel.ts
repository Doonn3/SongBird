import { RoutesType } from '../Types/Types';

export class RouterModel {
  private readonly routes: RoutesType;

  constructor(routes: RoutesType) {
    this.routes = routes;
  }

  public GetRoute(urlPath: string) {
    const route = this.findRoute(urlPath, this.routes);

    return route;
  }

  private findRoute(urlPath: string, routes: RoutesType) {
    const route =
      routes.find((route) => route.path === urlPath) ||
      routes.find((route) => route.path === '*');

    console.log(route);
    return route ? route : null;
  }
}
