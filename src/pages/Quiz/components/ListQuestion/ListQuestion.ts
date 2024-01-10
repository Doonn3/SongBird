import { RouterLink } from 'Core';
import './style.scss';

export class ListQuestion {
  private root: HTMLElement;

  private questionsContainer: HTMLElement;
  private li: HTMLLIElement[] = [];

  private score: HTMLElement;

  constructor() {
    this.root = document.createElement('div');
    this.root.classList.add('block-question');

    const div = document.createElement('div');
    div.classList.add('block-question__top');

    const logo = RouterLink('/home', {
      classStyle: 'btn btn-ghost font-size-32 color-white',
      text: 'Song Bird',
    });

    const scoreContainer = document.createElement('div');
    scoreContainer.classList.add(
      'score-container',
      'font-size-32',
      'color-white',
    );
    const name = document.createElement('span');
    name.textContent = 'Score: ';
    this.score = document.createElement('span');
    this.score.textContent = '0';
    scoreContainer.append(name, this.score);

    div.append(logo, scoreContainer);

    this.questionsContainer = document.createElement('ul');
    this.questionsContainer.classList.add(
      'block-question__list',
      'color-white',
    );

    this.root.append(div, this.questionsContainer);
  }

  public SetQuestions(questions: string[]) {
    this.li = [];
    for (let i = 0; i < questions.length; i += 1) {
      const elemLi = document.createElement('li');
      elemLi.textContent = questions[i];
      this.li.push(elemLi);
    }

    this.questionsContainer.innerHTML = '';
    this.questionsContainer.append(...this.li);
  }

  public SelectItem(index: number) {
    this.li.forEach((item) => {
      item.setAttribute('class', '');
    });

    this.li[index].classList.add('item-select');
  }

  public SetScore(score: number) {
    this.score.textContent = `${score}`;
  }

  public Render() {
    return this.root;
  }
}
