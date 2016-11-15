import { 
  Component,
  Input, 
  OnInit, 
  Output, 
  EventEmitter, 
  OnDestroy,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { ProblemSet } from './problem-set';
import { Card } from './card';
import { Deck } from '../deck';
import { DeckService } from '../deck.service';
import { MathJaxDirective } from '../../mathjax.directive';

@Component({
  moduleId: module.id,
  selector: 'problem-set-review',
  templateUrl: 'problem-set.component.html',
  animations: [
      trigger('result', [
        state('standard', style({
          visibility: 'hidden',
          opacity: '0',
          backgroundColor: 'green'
        })),  
        state('success', style({
          visibility: 'visible',
          opacity: '1',
          backgroundColor: 'green'
        })),
        state('failure', style({
          visibility: 'visible',
          opacity: '1',
          backgroundColor: 'red'
        })),
        transition('standard <=> success', animate('500ms ease-in')),
        transition('standard <=> failure', animate('500ms ease-in'))
      ])
    ]
})

export class ProblemSetComponent implements OnInit, OnDestroy {
  @Input() problemSet: ProblemSet;
  @Input() deck: Deck;
  @Output() complete: EventEmitter<any> = new EventEmitter();
  currentCard: Card;
  noneExpiredCards = [];
  expiredCards = [];
  attempt: any;
  result: any;
  resultState: string = 'standard';
  numProblemsToCompletion: number;
  numProblemsCompleted: number;
  percentComplete: number;
  numCorrect: number = 0;
  numAttempts: number = 0;
  percentCorrect: number;
  showEditor: boolean = false;
  toggleEditorBtnText: string = 'Show Editor';
  
  
  constructor(private deckService: DeckService) {}
 
  ngOnInit() {
    this.numProblemsToCompletion = (this.problemSet.cards.length * this.problemSet.repsPerCard);
    this.numProblemsCompleted = this.initializeNumProblemsCompleted();
    this.percentComplete = (Math.round(this.numProblemsCompleted / this.numProblemsToCompletion * 100));
    // this.checkUnexpire()
    this.sortExpired();
    if(this.noneExpiredCards.length > 0) {
      this.currentCard = _.sample(this.noneExpiredCards);
    } else {
      this.complete.emit(null)
    };
  }
  
  ngOnDestroy() {
   this.deckService.updateCards(this.expiredCards.concat(this.noneExpiredCards), this.deck).subscribe(data => {
     this.result = data;
   })
  }
  
  
  onSuccess(card: Card) {
    this.resultState = 'success';
    setTimeout(() => this.returnToStandard('success', card), 1500);
  }
  
  showAnswer() {
    $('#myModal').modal();
  }
  
  toggleAnswer() {
    $('myModal').modal('toggle');
  }
  
  toggleShowEditor() {
    this.showEditor = !this.showEditor;
    if(this.toggleEditorBtnText == 'Show Editor') {
      this.toggleEditorBtnText = 'Hide Editor';
    } else {
      this.toggleEditorBtnText = 'Show Editor';
    }
  }
  
  onFailure(card: Card) {
    this.resultState = 'failure';
    setTimeout(() => this.returnToStandard('failure', card), 1500);
    this.currentCard = _.sample(this.problemSet.cards);
  }
  
  private problemSetComplete() {
    console.log('Now inside problemSetComplete function and noneExpiredCard.length = ' + this.noneExpiredCards.length);
    if(this.noneExpiredCards.length > 0) {
      return false;
    } else {
      return true;
    }
  }
  
  private oneDayFromNow() {
    let now = new Date();
    let tomorrow = now.setHours(now.getHours() + 24);
  }
  
  private updateCard(card: Card) {
    this.initializeCounters(card);
    // Updating this 11/6 to reduce # of reps down to 4
    if(card.repOfTen >= 3) {
      this.handleTemporaryExpire(card);
    } else {
      this.handleNormalUpdate(card);
    }
    this.numCorrect++;
    this.numAttempts++;
    card.lastUpdated = new Date();
  }
  
  private handleCardExpired(card: Card) {
    if(card.temporaryExpire) {
      this.expiredCards.push(card);
      let cardIndex = this.noneExpiredCards.indexOf(card);
      this.noneExpiredCards.splice(cardIndex, 1);
    }
  }
  
  private sortExpired() {
    this.problemSet.cards.forEach((card) => {
      if(card.temporaryExpire || card.retired) {
        this.expiredCards.push(card);
      } else {
        this.noneExpiredCards.push(card);
      }
    });
  }
  
  
  private isTemporarilyExpired(card: Card) {
    if(card.temporaryExpire) {
      return true;
    } else {
      return false;
    }
  }
  
  private initializeCounters(card: Card) {
    if(card.repOfTen === null || card.repOfTen === undefined) {
      card.repOfTen = 0;
    }
    if(card.ofTenForMaster === null || card.ofTenForMaster === undefined) {
      card.ofTenForMaster = 0;
    }
  }
  
  private handleTemporaryExpire(card: Card) {
    card.temporaryExpire = true;
    this.handleCardExpired(card);
    card.ofTenForMaster++;
    if(this.noneExpiredCards.length >= 1) {
      // Sample from available cards
      this.currentCard = _.sample(this.noneExpiredCards);
    } 
    if(this.noneExpiredCards.length <= 0) {
      console.log('None Expired Cards length tripped: ' + this.noneExpiredCards.length);
      this.complete.emit(null);
    }
  }
  
  private handleNormalUpdate(card: Card) {
    let index = this.noneExpiredCards.indexOf(card);
    // First remove the card from the noneExpired, then add it again after updating.
    this.noneExpiredCards.splice(index, 1)
    card.repOfTen++;
    this.noneExpiredCards.push(card);
    // Take a sample from the noneExpiredCards array and assign to currentCard
    this.currentCard = _.sample(this.noneExpiredCards);
  }
  
  private returnToStandard(value: string, card: Card) {
    if(value === 'success') {
      this.updateCard(card);
      this.attempt = '';
    } else {
      this.numAttempts++;
      this.currentCard = _.sample(this.problemSet.cards);
    }
    this.resultState = 'standard';
    this.calculatePercentages();
  }
  
  private initializeNumProblemsCompleted() {
    let num = 0
    this.problemSet.cards.forEach((card) => {
      num += (this.numProblemsCompleted || 0) + (card.repOfTen || 0); 
    })
    return num;
  }
  
  private calculatePercentComplete() {
    this.numProblemsCompleted = this.totalCurrentReps();
    return (Math.round(this.numProblemsCompleted / this.numProblemsToCompletion * 100));
  }
  
  private calculatePercentCorrect() {
    return (Math.round(this.numCorrect / this.numAttempts * 100));
  }
  
  private calculatePercentages() {
    this.percentComplete = this.calculatePercentComplete();
    this.percentCorrect = this.calculatePercentCorrect();
  }
  
  private totalCurrentReps() {
    let num = 0;
    this.noneExpiredCards.forEach((card) => {
      num += card.repOfTen || 0;
    })
    this.expiredCards.forEach((card) => {
      num += card.repOfTen || 0;
    })
    return num;
  }
  
}