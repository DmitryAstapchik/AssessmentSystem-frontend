import { Exercise } from "./exercise";

export class Task extends Exercise {
  codeTemplate: string;
  assemblyName: string;
  testClassName: string;
  testMethodName: string;
  tips: any;
}
