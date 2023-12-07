class State<T> {
  private value: T;
  private observers: Array<(value: T) => void> = [];

  public get Value() {
    return this.value;
  }

  constructor(initVal: T) {
    this.value = initVal;
  }

  public Set(newValue: T) {
    if (this.value === newValue) return;

    this.value = newValue;
    this.notifyObservers();
  }

  private notifyObservers() {
    for (let observer of this.observers) {
      observer(this.value);
    }
  }

  public AddObserver(observer: (value: T) => void) {
    if (this.observers.includes(observer)) return;

    this.observers.push(observer);
  }

  public RemoveObserver(observer: (value: T) => void) {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex > -1) {
      this.observers.splice(observerIndex, 1);
    }
  }
}

export default State;
