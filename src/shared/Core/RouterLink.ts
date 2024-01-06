import { HistoryRouter } from ".";

type PropsType = {
  classStyle?: string;
  text?: string;
};

export function RouterLink(to: string, props?: PropsType) {
  const a = document.createElement("a");

  if (props?.classStyle) {
    a.setAttribute("class", props.classStyle);
  }

  if (props?.text) {
    a.textContent = props.text;
  }

  a.addEventListener("click", (event) => {
    event.preventDefault();
    HistoryRouter.Instance.LinkTo(to);
  });

  return a;
}
