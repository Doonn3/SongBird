import './style.scss';

type PropsType = {
  slots: HTMLElement[];
};

export function LayoutGrid(props: PropsType) {
  const render = (): HTMLElement => {
    const root = document.createElement('div');
    root.classList.add('layout-grid');
    root.append(...props.slots);
    return root;
  };

  return {
    render,
  };
}
