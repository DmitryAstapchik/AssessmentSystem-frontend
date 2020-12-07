export class TestAnswerVariant {
  id: number = 0;
  text: string = "";
  isCorrect: boolean = false;

  constructor(isCorrect: boolean) {
    this.isCorrect = isCorrect;
  }
}


