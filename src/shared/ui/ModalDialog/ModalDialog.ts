import './style.scss';

export type PropsType = {
  title: string;
  subTitle: string;
  description: string;
  urlSrc: string;
};

class ModalDialog {
  private root!: HTMLDialogElement;
  private props: PropsType = {
    title: 'Default Title',
    subTitle: 'Default Subtitle',
    description: 'Default Description',
    urlSrc: '',
  };
  private slot?: HTMLElement;

  public EmitClose?: () => void;

  constructor(_props?: PropsType, slot?: HTMLElement) {
    if (_props) {
      this.props = _props;
    }
    this.slot = slot;
    this.root = document.createElement('dialog');
    this.root.classList.add('modal-dialog');
    this.onInit();
  }

  private onInit() {
    const content = document.createElement('div');
    content.classList.add(...['content', 'modal-dialog__content']);

    const leftContent = document.createElement('div');
    leftContent.classList.add('content__left');
    const title = document.createElement('span');
    title.textContent = this.props.title;
    const subTitle = document.createElement('span');
    subTitle.textContent = this.props.subTitle;
    const description = document.createElement('p');
    description.textContent = this.props.description;

    leftContent.append(title, subTitle, description);

    const rightContent = document.createElement('div');
    rightContent.classList.add('content__right');
    const img = document.createElement('img');
    img.src = this.props.urlSrc;

    const slotWraper = document.createElement('div');
    slotWraper.append(this.slot ? this.slot : '');
    rightContent.append(img, slotWraper);

    content.append(leftContent, rightContent);

    this.root.append(content);
  }

  public OnMount() {
    this.root.addEventListener('click', this.onClose);
  }

  public OnUnmount() {
    this.root.removeEventListener('click', this.onClose);
  }

  private onClose = (event: Event) => {
    const target = event.target;
    if (target instanceof HTMLDialogElement) {
      this.Close();

      if (this.EmitClose) this.EmitClose();
    }
  };

  public SetProps(props: PropsType) {
    this.props = props;
    this.root.innerHTML = '';
    this.onInit();
  }

  public Open() {
    this.root.open = true;
  }

  public Close() {
    this.root.open = false;
  }

  public Toggle() {
    this.root.open = !this.root.open;
  }

  public Render() {
    this.OnMount();
    return this.root;
  }
}

export default ModalDialog;

// export function ModalDialog(props: PropsType, slot?: HTMLElement) {
//   const render = () => {
//     const root = document.createElement("dialog");
//     root.classList.add("modal-dialog");
//     root.open = props.isOpen;

//     const content = document.createElement("div");
//     content.classList.add(...["content", "modal-dialog__content"]);

//     const leftContent = document.createElement("div");
//     leftContent.classList.add("content__left");
//     const title = document.createElement("span");
//     title.textContent = props.title;
//     const subTitle = document.createElement("span");
//     subTitle.textContent = props.subTitle;
//     const description = document.createElement("p");
//     description.textContent = props.description;

//     leftContent.append(title, subTitle, description);

//     const rightContent = document.createElement("div");
//     rightContent.classList.add("content__right");
//     const img = document.createElement("img");
//     img.src = props.urlSrc;
//     rightContent.append(img, slot ? slot : "");

//     content.append(leftContent, rightContent);

//     root.append(content);

//     return root;
//   };

//   return {
//     render,
//   };
// }
