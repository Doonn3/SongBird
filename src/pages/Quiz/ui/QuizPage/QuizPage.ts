import { BaseComponent } from 'Core';

import { BirdsStore } from '@/entities/Birds';

import { ListQuestion } from '../../components/ListQuestion/ListQuestion';
import { CurrentQuestion } from '../../components/CurrentQuestion/CurrentQuestion';
import { AnswerOptions } from '../../components/AnswerOptions/AnswerOptions';
import { BirdDescription } from '../../components/BirdDescription/BirdDescription';
import { NextButton } from '../../components/NextButton/NextButton';

import {
  NextLevelCommand,
  AnswerDetailsCommand,
} from '../../Interact_components';

import './style.scss';

class QuizPage extends BaseComponent {
  private store = BirdsStore.Instance;

  private root: HTMLElement;

  private listQuestion = new ListQuestion();
  private currentQuestion = new CurrentQuestion();
  private answerOptions: AnswerOptions;
  private birdDescription = new BirdDescription();

  private nextBtn: NextButton;

  private nextLevelCommand: NextLevelCommand;
  private answerDetailsCommand: AnswerDetailsCommand;

  constructor() {
    super();

    this.root = document.createElement('section');
    this.root.classList.add('quiz');

    const div = document.createElement('div');
    div.classList.add('quiz__middle');

    this.answerOptions = new AnswerOptions();

    div.append(this.answerOptions.Render(), this.birdDescription.Render());

    this.nextBtn = new NextButton();

    this.root.append(
      this.listQuestion.Render(),
      this.currentQuestion.Render(),
      div,
      this.nextBtn.Render(),
    );

    this.nextLevelCommand = new NextLevelCommand({
      answerOptions: this.answerOptions,
      currentQuestion: this.currentQuestion,
      listQuestion: this.listQuestion,
      nextLevelBtn: this.nextBtn,
      birdDescription: this.birdDescription,
      store: this.store,
    });

    this.answerDetailsCommand = new AnswerDetailsCommand({
      birdDescription: this.birdDescription,
      currentQuestion: this.currentQuestion,
      listQuestion: this.listQuestion,
      answerOptions: this.answerOptions,
      nextBtn: this.nextBtn,
      store: this.store,
    });
  }

  public Init() {}

  public OnMount() {
    this.answerOptions.OnMount();
    this.nextBtn.OnMount();
    this.currentQuestion.OnMount();

    this.nextLevelCommand.OnMount();
    this.answerDetailsCommand.OnMount();

    this.store.Start();
  }

  public OnUnMount(): void {
    this.currentQuestion.OnUnMount();
    this.nextLevelCommand.OnUnmount();
    this.answerOptions.OnUnMount();
    this.nextBtn.OnUnMount();
    this.currentQuestion.OnUnMount();
    this.answerDetailsCommand.OnUnmount();
  }

  public Render(): HTMLElement {
    return this.root;
  }
}

export default QuizPage;
