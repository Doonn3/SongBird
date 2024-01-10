import './style.scss';

interface PropstType {
  emit: (index: number) => void;
}

export class AnswerOptions {
  private root: HTMLElement;
  private items: HTMLLIElement[] = [];
  private itemClickIndexs: number[] = [];

  private props?: PropstType;

  private isSuccess = false;

  constructor(props?: PropstType) {
    this.root = document.createElement('ul');
    this.root.classList.add('answer-options');
    this.props = props;
  }

  public SetEmit(props: PropstType) {
    this.props = props;
  }

  public OnMount() {
    this.root.addEventListener('click', this.onClickAnswer);
  }

  public OnUnMount() {
    this.root.removeEventListener('click', this.onClickAnswer);
  }

  private onClickAnswer = (event: Event) => {
    const index = this.items.indexOf(event.target as HTMLLIElement);
    if (index < 0) return;

    // if (this.itemClickIndexs.includes(index) && this.isSuccess) return;
    // this.itemClickIndexs.push(index);

    this.props?.emit(index);
  };

  public Success(index: number) {
    this.isSuccess = true;
    (this.items[index].firstChild as HTMLElement).classList.add('success');
  }

  public Error(index: number) {
    if (this.isSuccess) return;
    (this.items[index].firstChild as HTMLElement).classList.add('error');
  }

  public CreateItems(arr: string[]) {
    this.items = [];
    this.itemClickIndexs = [];
    this.isSuccess = false;
    arr.forEach((elem) => {
      const item = document.createElement('li');
      item.classList.add('answer-options__item');
      const span = document.createElement('span');

      span.classList.add('indicator');

      const p = document.createElement('p');
      p.textContent = elem;

      item.append(span, p);

      this.items.push(item);
    });

    this.root.innerHTML = '';
    this.root.append(...this.items);
  }

  public Render() {
    return this.root;
  }
}
