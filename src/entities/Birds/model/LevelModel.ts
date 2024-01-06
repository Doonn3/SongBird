export class LevelModel {
  private levelList = [
    "Разминка",
    "Воробьиные",
    "Лесные птицы",
    "Певчие птицы",
    "Хищные птицы",
    "Морские птицы",
  ];

  private level = 0;

  public get CurrentLevel() {
    return this.levelList[this.level];
  }

  public get CurrentLevelIndex() {
    return this.level;
  }

  public get LevelList() {
    return this.levelList;
  }

  public get Level() {
    return this.level;
  }

  public NextLevel() {
    this.level += 1;
  }

  public Reset() {
    this.level = 0;
  }
}
