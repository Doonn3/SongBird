export interface ICommand<T> {
  Execute(data: T): void;
}
