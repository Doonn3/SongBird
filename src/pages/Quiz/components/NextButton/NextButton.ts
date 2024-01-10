import './style.scss';

interface IAction {
  (): void;
}

export class NextButton {
  private root: HTMLElement;

  private isHighlight = false;

  private action: IAction | null = null;

  private classStyle = {
    default: 'btn next-btn color-white bg-dark-gray',
    success: 'btn next-btn color-white bg-success',
  };

  constructor(action?: IAction) {
    this.root = document.createElement('btn');
    this.root.setAttribute('class', this.classStyle.default);

    this.root.textContent = 'Следующий Уровень';

    if (action) this.action = action;
  }

  public SetAction(action: IAction) {
    this.action = action;
  }

  public OnMount() {
    this.root.addEventListener('click', this.onClick);
  }

  public OnUnMount() {
    this.root.removeEventListener('click', this.onClick);
    this.action = null;
  }

  public Highlight = () => {
    this.root.setAttribute('class', this.classStyle.success);
    this.isHighlight = true;
  };

  public SetText(text: string) {
    this.root.textContent = text;
  }

  public RemoveHighlight = () => {
    this.root.setAttribute('class', this.classStyle.default);
    this.isHighlight = false;
  };

  public Render() {
    return this.root;
  }

  private onClick = () => {
    console.log('BUTTON>>CLICK__NEXT');
    if (this.isHighlight) {
      if (this.action) {
        this.action();
        this.RemoveHighlight();
      }
    }
  };
}
