import { TestQuestion } from "./test-question";
import { Exercise } from "./exercise";

export class Test extends Exercise {
  questions: TestQuestion[] = new Array<TestQuestion>();
}
