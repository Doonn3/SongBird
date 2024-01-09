import { BirdsStore, EmitPropsType } from "@/entities/Birds";

import { ICommand } from "./ICommand";
import { ListQuestion } from "../components/ListQuestion/ListQuestion";
import { AnswerOptions } from "../components/AnswerOptions/AnswerOptions";
import { CurrentQuestion } from "../components/CurrentQuestion/CurrentQuestion";
import { NextButton } from "../components/NextButton/NextButton";
import { BirdDescription } from "../components/BirdDescription/BirdDescription";

import { useRouter } from "@/shared/Core";

type PropsType = {
  listQuestion: ListQuestion;
  answerOptions: AnswerOptions;
  currentQuestion: CurrentQuestion;
  birdDescription: BirdDescription;
  nextLevelBtn: NextButton;
  store: BirdsStore;
};

export class NextLevelCommand implements ICommand<EmitPropsType> {
  private props: PropsType;

  constructor(props: PropsType) {
    this.props = props;
  }

  public OnMount() {
    this.props.store.Sub({
      id: "QuizPage",
      type: "event-start-level",
      call: this.Execute.bind(this),
    });

    this.props.store.Sub({
      id: "NextLevelCommand",
      type: "event-end-level",
      call: this.handlerEndLevel,
    });
    this.props.nextLevelBtn.SetAction(this.onClickNextLevelBtn);
  }

  public OnUnmount() {
    this.props.store.UnSub({
      id: "QuizPage",
      type: "event-start-level",
      call: this.Execute.bind(this),
    });

    this.props.store.UnSub({
      id: "NextLevelCommand",
      type: "event-end-level",
      call: this.handlerEndLevel,
    });
  }

  Execute(data: EmitPropsType): void {
    this.props.listQuestion.SelectItem(this.props.store.CurrentLevel());

    this.props.answerOptions.CreateItems(
      data.birdsChoise.map((bird) => bird.name)
    );

    if (data.birdAnswer) {
      this.props.currentQuestion.Default();
      this.props.currentQuestion.SetAudio(data.birdAnswer.audio);
    }
  }

  private handlerEndLevel = () => {
    this.props.nextLevelBtn.SetText("Посмотреть Результат");
    this.props.nextLevelBtn.SetAction(this.onClickNextLevelBtnResult);
  };

  private onClickNextLevelBtn = () => {
    console.log("CLICK Next Level");
    this.props.currentQuestion.OnUnMount();
    this.props.currentQuestion.OnMount();

    this.props.birdDescription.DefaultState();

    this.props.store.NextLevel();
  };

  private onClickNextLevelBtnResult = () => {
    useRouter("quiz-result");
  };
}
