import { TestAnswerVariant } from "./test-answer-variant";

export class TestQuestion {
  id: number = 0;
  text: string = "";
  answerVariants: TestAnswerVariant[] = [
    new TestAnswerVariant(true),
    new TestAnswerVariant(false),
    new TestAnswerVariant(false),
    new TestAnswerVariant(false),
  ];
}
