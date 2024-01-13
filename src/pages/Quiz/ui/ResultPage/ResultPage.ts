import { BaseComponent, useRouter } from 'Core';
import { utils } from '@/shared/Utils';

import { BirdsStore } from '@/entities/Birds';

import './style.scss';

const TEXT_BTN = 'Повторить';
const TEXT_LOSE = 'Мало очков, что бы получить приз нужно минимум 15 очков.';

function wrapperScore() {
  const wrapperScore = utils.createHTMLElement('div', 'result__score');
  const textScore = utils.createHTMLElement('span', 'font-size-24');
  textScore.textContent = 'Score: ';
  const resultScore = utils.createHTMLElement('span', 'font-size-24');
  wrapperScore.append(textScore, resultScore);

  return {
    wrapperScore,
    resultScore,
  };
}

function view() {
  const root = utils.createHTMLElement('section', 'result');

  const ws = wrapperScore();

  const wrapper = utils.createHTMLElement('div', 'result__content');
  const text = utils.createHTMLElement('p', 'font-size-24');
  const prize = utils.createHTMLElement('div');
  const btn = utils.createHTMLElement(
    'button',
    'btn btn-accent color-black font-size-28',
  );
  btn.textContent = TEXT_BTN;
  wrapper.append(text, btn);

  root.append(ws.wrapperScore, wrapper);

  return {
    root,
    resultScore: ws.resultScore,
    wrapper,
    text,
    prize,
    btn,
  };
}

class ResultPage extends BaseComponent {
  private view = view();

  private store = BirdsStore.Instance;

  private checkScrore() {
    const score = this.store.GetScore();
    this.view.resultScore.textContent = `${score}`;

    if (score < 15) {
      this.view.text.textContent = TEXT_LOSE;
    } else {
      this.view.text.remove();

      const link = utils.createHTMLElement(
        'a',
        'font-size-24 color-accent hover:color-accent-cold',
      ) as HTMLAnchorElement;
      link.textContent = 'Rock Privet';
      link.href = 'https://www.youtube.com/watch?v=NY8qKnaXe6k';
      link.target = '_blank';
      this.view.wrapper.prepend(link);
    }
  }

  public Init(): void {
    this.checkScrore();
  }

  public OnMount(): void {
    this.view.btn.addEventListener('click', this.onClick);
  }

  public OnUnMount(): void {
    this.view.btn.removeEventListener('click', this.onClick);
  }

  public Render(): HTMLElement {
    return this.view.root;
  }

  private onClick = () => {
    this.store.Reset();
    useRouter('quiz');
  };
}

export default ResultPage;
