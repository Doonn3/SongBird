import type { BirdType } from '../data/BirdDataType';

export class QuizMasterModel {
  private currentQuestion: BirdType | null = null;

  private choiceAnswers: BirdType[] = [];
  private tempChoiceAnswerIndex: number[] = [];

  public get CurrentQuestion() {
    return this.currentQuestion;
  }

  public get ChoiceAnswers() {
    return this.choiceAnswers;
  }

  public Set(data: BirdType[]) {
    this.choiceAnswers = this.mixing(data);
    this.tempChoiceAnswerIndex = [];
    console.log('SEEEEEEEETTTTTTTTTTT');

    // Загадываеи ответ
    const randomIndex = Math.floor(Math.random() * this.choiceAnswers.length);
    this.currentQuestion = this.choiceAnswers[randomIndex];
    console.log(this.currentQuestion);
  }

  public IsAnswerCorrect(index: number) {
    if (this.tempChoiceAnswerIndex.includes(index)) return null;
    this.tempChoiceAnswerIndex.push(index);
    if (this.choiceAnswers[index] === this.currentQuestion) {
      return true;
    }

    return false;
  }

  // Перемешиваем массив
  private mixing(data: BirdType[]) {
    const arr: BirdType[] = [];
    type CheckDuplicateType = { [key: string]: boolean };
    const check: CheckDuplicateType = {};

    while (arr.length < data.length) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const elem = data[randomIndex];

      if (check[elem.name] !== true) {
        check[elem.name] = true;
        arr.push(data[randomIndex]);
      }
    }

    return arr;
  }
}
