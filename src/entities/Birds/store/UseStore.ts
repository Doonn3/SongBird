import BirdsDataRu from '../data/birdsDataRu';
import type { BirdType } from '../data/BirdDataType';
import { GameModel } from '../model/GameModel';

import { EventSystem } from 'Core';

type Type =
  | 'event-start-level'
  | 'event-details-answer'
  | 'get-choice-answers'
  | 'event-get-score'
  | 'event-wrong-answer'
  | 'event-correct-answer'
  | 'event-end-level';

export type EmitPropsType = {
  birdsChoise: BirdType[];
  birdAnswer: BirdType | null;
};

export class BirdsStore extends EventSystem<Type> {
  public static Instance = new BirdsStore();

  private model = new GameModel(BirdsDataRu);

  public GetScore() {
    console.log('GET SCORE  ', this.model.ScoreModel.CurrentScore);
    return this.model.ScoreModel.CurrentScore;
  }

  public Start() {
    this.model.Start();
    this.Emit<EmitPropsType>('event-start-level', {
      birdsChoise: this.model.QuizMasterModel.ChoiceAnswers,
      birdAnswer: this.model.QuizMasterModel.CurrentQuestion,
    });
  }

  public Reset() {
    this.model.ScoreModel.ResetLevelScore();
    this.model.LevelModel.Reset();
    this.Emit('event-get-score', this.model.ScoreModel.CurrentScore);
  }

  public NextLevel() {
    this.model.NextLevel();
    this.Emit<EmitPropsType>('event-start-level', {
      birdsChoise: this.model.QuizMasterModel.ChoiceAnswers,
      birdAnswer: this.model.QuizMasterModel.CurrentQuestion,
    });

    if (
      this.model.LevelModel.Level >=
      this.model.LevelModel.LevelList.length - 1
    ) {
      this.Emit('event-end-level', {});
    }
  }

  public CurrentLevel() {
    return this.model.LevelModel.CurrentLevelIndex;
  }

  public CurrentAnswer() {
    return this.model.QuizMasterModel.CurrentQuestion;
  }

  public IsCorrectAnswer(index: number) {
    const result = this.model.IsAnswerCorrect(index);
    console.log(result);
    this.Emit(
      'event-details-answer',
      this.model.QuizMasterModel.ChoiceAnswers[index],
    );

    if (result) {
      this.Emit(
        'event-correct-answer',
        this.model.QuizMasterModel.CurrentQuestion,
      );
    }

    this.Emit('event-get-score', this.model.ScoreModel.CurrentScore);
    console.log('GET SCORE  ', this.model.ScoreModel.CurrentScore);
    return result;
  }

  public GetByName(name: string) {
    const find = this.model.Birds.flat().find((bird) => bird.name === name);

    return find ? find : null;
  }

  public GetLevelList() {
    return this.model.GetLevelList();
  }

  public GetAllBirds() {
    const birds = BirdsDataRu.flat().map<BirdType>((bird) => {
      return {
        id: bird.id,
        name: bird.name,
        image: bird.image,
        description: bird.description,
        species: bird.species,
        audio: bird.audio,
      };
    });

    return birds;
  }
}
