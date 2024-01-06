type TagType = "div" | "section" | "span" | "img" | "header" | "nav" | "p" | 'button';

export function createHTMLElement(tag: TagType, style?: string) {
  const elem = document.createElement(tag);

  if (style) {
    elem.setAttribute("class", style);
  }

  return elem as HTMLElement;
}
