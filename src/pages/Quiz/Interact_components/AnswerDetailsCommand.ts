import { BirdType, BirdsStore } from "@/entities/Birds";

import { BirdDescription } from "../components/BirdDescription/BirdDescription";

import { ICommand } from "./ICommand";

import { CurrentQuestion } from "../components/CurrentQuestion/CurrentQuestion";
import { ListQuestion } from "../components/ListQuestion/ListQuestion";
import { AnswerOptions } from "../components/AnswerOptions/AnswerOptions";
import { NextButton } from "../components/NextButton/NextButton";

type PropsType = {
  birdDescription: BirdDescription;
  listQuestion: ListQuestion;
  currentQuestion: CurrentQuestion;
  answerOptions: AnswerOptions;
  nextBtn: NextButton;
  store: BirdsStore;
};

export class AnswerDetailsCommand implements ICommand<BirdType> {
  private props: PropsType;

  constructor(props: PropsType) {
    this.props = props;
  }

  public OnMount() {
    this.props.listQuestion.SetQuestions(this.props.store.GetLevelList());

    this.props.store.Sub({
      id: "AnswerDetailsCommand",
      type: "event-get-score",
      call: this.handlerScore,
    });

    this.props.store.Sub({
      id: "AnswerDetailsCommand",
      type: "event-correct-answer",
      call: this.handlerCorrectAnswer,
    });

    this.props.store.Sub({
      id: "AnswerDetailsCommand",
      type: "event-details-answer",
      call: this.Execute.bind(this),
    });

    this.props.answerOptions.SetEmit({ emit: this.onClickAnswerOption });

    console.log(this.props);
  }

  public OnUnmount() {
    this.props.store.UnSub({
      id: "AnswerDetailsCommand",
      type: "event-get-score",
      call: this.handlerScore,
    });

    this.props.store.UnSub({
      id: "AnswerDetailsCommand",
      type: "event-correct-answer",
      call: this.handlerCorrectAnswer,
    });

    this.props.store.UnSub({
      id: "AnswerDetailsCommand",
      type: "event-details-answer",
      call: this.Execute.bind(this),
    });
  }

  Execute(data: BirdType): void {
    const { name, species, description, image, audio } = data;
    console.log(this.props);
    this.props.birdDescription.SetInfo({
      title: name,
      subtitle: species,
      description: description,
      img: image,
      audio: audio,
    });
  }

  private onClickAnswerOption = (index: number) => {
    const result = this.props.store.IsCorrectAnswer(index);
    if (result) {
      this.props.answerOptions.Success(index);
      this.props.nextBtn.Highlight();
    } else {
      this.props.answerOptions.Error(index);
    }
  };

  private handlerScore = (score: number) => {
    console.log(score, "SCORE");
    this.props.listQuestion.SetScore(score);
  };

  private handlerCorrectAnswer = (bird: BirdType) => {
    this.props.currentQuestion.SetImg(bird.image);
    this.props.currentQuestion.SetTitle(bird.name);
  };
}
