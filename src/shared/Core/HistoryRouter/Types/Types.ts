import { BaseComponent } from '../../BaseComponent/BaseComponent';

export interface IRoute {
  path: string;
  name: string;
  component?: typeof BaseComponent;
  redirect?: string;
}

export type RoutesType = IRoute[];
