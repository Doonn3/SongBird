import { BaseComponent } from "../../BaseComponent/BaseComponent";

export interface IRoute {
  path: string;
  name: string;
  component?: BaseComponent;
  redirect?: string;
}

export type RoutesType = IRoute[];
