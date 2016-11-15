import { Card } from './card';

export class ProblemSet {
  public cards: Card[];
  public repsPerCard: number = 10;
  public isComplete: boolean;
  public status: string;
}