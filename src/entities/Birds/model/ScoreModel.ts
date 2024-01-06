export class ScoreModel {
  private maxPointsPerLevel = 5;

  private totalScore = 0;

  public get CurrentScore() {
    return this.totalScore;
  }

  public DecreaseMaxPoints() {
    this.maxPointsPerLevel -= 1;
    if (this.maxPointsPerLevel <= 0) this.maxPointsPerLevel = 0;
  }

  public ResetMaxPointsPerLevel() {
    this.totalScore += this.maxPointsPerLevel;
    this.maxPointsPerLevel = 5;
  }

  public ResetLevelScore() {
    this.totalScore = 0;
  }
}
