import BirdsDataRu from "../data/birdsDataRu";
import type { BirdType } from "../data/BirdDataType";

class ReactiveState<T> {
  private state: T;
  private subscribers: Array<(value: T) => void> = [];

  constructor(_init: T) {
    this.state = _init;
  }

  get value() {
    return this.state;
  }

  set value(newValue: T) {
    this.state = newValue;
    this.subscribers.forEach((subscriber) => subscriber(newValue));
  }

  subscribe(subscriber: (value: T) => void) {
    this.subscribers.push(subscriber);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== subscriber);
    };
  }
}

class BirdsStore {
  public Birds = new ReactiveState<BirdType[] | null>(null);

  public GetAllBirds() {
    const birds = BirdsDataRu.flat().map<BirdType>((bird) => {
      return {
        id: bird.id,
        name: bird.name,
        image: bird.image,
        description: bird.description,
        species: bird.species,
        audio: bird.audio,
      };
    });

    this.Birds.value = birds; // Пока Хз Помойму Не Работает

    return birds;
  }

  public GetByName(name: string) {
    const find = this.Birds.value?.find((bird) => bird.name === name);

    return find ? find : null;
  }
}

export const useBirdsStore = new BirdsStore();
