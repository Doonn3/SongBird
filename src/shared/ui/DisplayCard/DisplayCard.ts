import './style.scss';

type PropsType = {
  id: number;
  title: string;
  urlImg: string;
  slot?: HTMLElement;
};

interface IAction {
  onClick: (id: string) => void;
}

export function DisplayCard(props: PropsType, action?: IAction) {
  const render = (): HTMLElement => {
    const root = document.createElement('div');
    root.classList.add('display-card');
    root.setAttribute('data-id', `${props.title}-${props.id}`);

    const containerTop = document.createElement('div');
    containerTop.classList.add('display-card__top');

    containerTop.insertAdjacentHTML(
      'beforeend',
      `
    <img class="display-card__img" 
      src="${props.urlImg}" 
      alt="${props.title}">

    <span class="display-card__title">${props.title}</span>
    `,
    );

    const containerBottom = document.createElement('div');
    containerBottom.classList.add('display-card__bottom');
    containerBottom.append(props.slot ? props.slot : '');

    root.append(containerTop, containerBottom);

    if (action) {
      containerTop.addEventListener('click', () => {
        action.onClick(`${props.title}`);
      });
    }
    return root;
  };

  return {
    render,
  };
}

// const template = `
// <div class="display-card">
//     <div class="display-card__top">
//       <img class="display-card__img"
//       src="${props.urlImg}"
//       alt="${props.name}">

//       <span class="display-card__title">${props.name}</span>
//     </div>

//     <div class="display-card__bottom">
//       ${props.slot ? props.slot : ""}
//     </div>
// </div>
// `;
