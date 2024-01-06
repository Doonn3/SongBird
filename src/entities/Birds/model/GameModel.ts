import type { BirdType } from "../data/BirdDataType";
import { LevelModel } from "./LevelModel";
import { QuizMasterModel } from "./QuizMasterModel";
import { ScoreModel } from "./ScoreModel";

export class GameModel {
  private birds: BirdType[][] = [];

  public get Birds() {
    return this.birds;
  }

  private scoreModel = new ScoreModel();
  private levelModel = new LevelModel();
  private quizMasterModel = new QuizMasterModel();

  public get LevelModel() {
    return this.levelModel;
  }

  public get QuizMasterModel() {
    return this.quizMasterModel;
  }

  public get ScoreModel() {
    return this.scoreModel;
  }

  private isOnceStart = false;

  constructor(birds: BirdType[][]) {
    this.birds = birds;
  }

  public Start() {
    if (this.isOnceStart === false) {
      const arr = this.GetRandomBirds(6);

      this.quizMasterModel.Set(arr);
      this.isOnceStart = true;
      return;
    }

    this.quizMasterModel.Set(this.birds[this.levelModel.Level]);
  }

  public IsAnswerCorrect(index: number) {
    const result = this.quizMasterModel.IsAnswerCorrect(index);
    if (result) {
      this.scoreModel.ResetMaxPointsPerLevel();
    } else {
      this.scoreModel.DecreaseMaxPoints();
    }

    return result;
  }

  public NextLevel() {
    this.levelModel.NextLevel();
    this.Start();
    return this.levelModel.CurrentLevelIndex;
  }

  public GetLevelList() {
    return this.levelModel.LevelList;
  }

  public GameOver() {}

  public GetRandomBirds(amount: number) {
    const flat = this.birds.flat();

    console.log(flat);

    if (amount > flat.length) {
      amount = flat.length;
    }

    const arr: BirdType[] = [];
    type CheckDuplicateType = { [key: string]: boolean };
    const check: CheckDuplicateType = {};

    while (arr.length < amount) {
      const randomIndex = Math.floor(Math.random() * flat.length);
      const bird = flat[randomIndex];
      if (check[bird.name] !== true) {
        check[bird.name] = true;
        arr.push(bird);
      }
    }

    return arr;
  }
}
