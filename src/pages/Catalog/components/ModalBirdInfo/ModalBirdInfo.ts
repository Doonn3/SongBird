import { ModalDialog, ModalPropsType } from "@/shared/ui/ModalDialog";
import { AudioPlayer } from "@/features/AudioPlayer";

export class ModalBirdInfo {

  private dialog: ModalDialog;
  private audioPlayer = new AudioPlayer();

  constructor() {
    this.dialog = new ModalDialog(
      { title: "", subTitle: "", description: "", urlSrc: "" },
      this.audioPlayer.Render()
    );

    this.dialog.EmitClose = this.watchIsOpenModal;
  }

  private watchIsOpenModal = () => {
    this.audioPlayer.OnReset();
  };

  public SetInfo(props: ModalPropsType, audioSrc: string) {
    this.dialog.SetProps(props);
    this.audioPlayer.SetAudioSrc(audioSrc);
  }

  public Render() {
    return this.dialog.Render();
  }

  public Open() {
    this.audioPlayer.OnReset();
    this.dialog.Open();
  }
}
