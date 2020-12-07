export class Exercise {
  public id: number;
  public name: string;
  public subject: string;
  public description: string;
  public maximumScore: number;
  public timeMinutes: number;

  public isTimeEnabled(): boolean {
    return this.timeMinutes > 0 ? true : false;
  }
}
