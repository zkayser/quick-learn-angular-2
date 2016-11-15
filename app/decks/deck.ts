import { Card } from './cards/card';
import { ProblemSet } from './cards/problem-set';

export class Deck {
  public id: string;
  public title: string;
  public description: string;
  public cards: Card[] = [];
  public subjectId: string;
}