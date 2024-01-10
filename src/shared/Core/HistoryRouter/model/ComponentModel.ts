import { BaseComponent } from '../../BaseComponent/BaseComponent';
import { IRoute } from '../Types/Types';

export class ComponentModel {
  private currComponent: BaseComponent | null = null;

  public GetComponent(curr: IRoute | null) {
    this.unmountCurrComponent();
    this.updateCurrComponent(curr);
    return this.currComponent;
  }

  private unmountCurrComponent() {
    if (this.currComponent) {
      console.log('<<UNMOUNT :: COMPONENT>>', this.currComponent);
      this.currComponent.OnUnMount();
      this.currComponent = null;
    }
  }

  private updateCurrComponent(curr: IRoute | null) {
    if (curr && curr.component) {
      this.currComponent = new curr.component();
      console.log('<<MOUNT :: COMPONENT>>', this.currComponent);
      this.currComponent.Init();
      this.currComponent.OnMount();
    }
  }
}
