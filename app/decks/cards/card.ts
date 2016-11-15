import { Deck } from '../deck';

export class Card {
  
  public front: string;
  public back: string;
  public totalSeen: number = 0;
  public due: boolean;
  public deck: Deck;
  public isFlashcard: boolean;
  public isProblem: boolean;
  public createdAt: any;
  public lastUpdated: any;
  public problemSetNumber: number;
  public nextDue: any;
  public repOfTen: number = 0;
  public ofTenForMaster: number = 0;
  public temporaryExpire: boolean = false;
  public retired: boolean; 
  
  constructor() {
    this.createdAt = new Date();
    this.lastUpdated = new Date();
  }
}