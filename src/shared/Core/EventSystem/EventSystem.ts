type EventType<T> = T;

type ISubscribe<EType extends string> = {
  id: string;
  type: EventType<EType>;
  call: (data: any) => void;
};

export class EventSystem<EType extends string> {
  private subscribers: ISubscribe<EType>[] = [];

  public Sub(sub: ISubscribe<EType>) {
    this.subscribers.push(sub);
  }

  public UnSub(sub: ISubscribe<EType>) {
    const filter = this.subscribers.filter((_sub) => _sub.id !== sub.id);
    this.subscribers = filter;
  }

  public Emit<T>(type: EType, data: T) {
    this.subscribers.forEach((sub) => {
      if (sub.type === type) {
        if (sub.call) sub.call(data);
      }
    });
  }
}
