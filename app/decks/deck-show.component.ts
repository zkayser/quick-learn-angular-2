import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Deck } from './deck';
import { Card } from './cards/card';
import { DeckService } from './deck.service';
import { AddCardComponent } from './cards/add-card.component';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ProblemSet } from './cards/problem-set';


@Component({
  moduleId: module.id,
  selector: 'deck-show',
  templateUrl: 'deck-show.component.html'
})

export class DeckShowComponent implements OnInit, OnDestroy {
  deck: Deck;
  id: string;
  errorMessage: any;
  problemSets: ProblemSet[];
  numProbSets: number;
  dateSortedTuple: any[];
  private sub: Subscription;
  addCardsMode = false;
  showCardsMode = false;
  reviewProblemsMode = false;
  reviewFlashcardsMode = false;
  initialMode = true;
  
  constructor(private route: ActivatedRoute, private deckService: DeckService, private router: Router) {}
  
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.deckService.getDeck(this.id).subscribe(
      (data: any) => {
        this.deck = data.deck;
        this.deck.id = this.id;
        this.sortCardsByCreatedAt(this.deck);
        if(this.deck.cards.length > 10) {
          this.numberProblemSetsNeeded(this.deck);
        } else {
          this.numProbSets = 1;
        }
        this.initProblemSets();
        console.log(this.problemSets);
      }
    );
    });
  }
  
  addCards() {
    if(this.showCardsMode) {
      this.showCardsMode = !this.showCardsMode;
    }
    this.addCardsMode = !this.addCardsMode;
  }
  
  showCards() {
    if(this.addCardsMode) {
      this.addCardsMode = !this.addCardsMode;
    }
    this.showCardsMode = !this.showCardsMode;
  }
  
  onReviewProblems() {
    this.initialMode = false;
    this.reviewProblemsMode = !this.reviewProblemsMode;
  }
  
  onReviewFlashcards() {
    this.router.navigate(['/review/flaschards', this.deck.id]);
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  onCardSubmitted(card: Card) {
    this.addCardsMode = !this.addCardsMode;
    if(card.isProblem) {
      this.assignCardToProblemSet(card);
    }
  }
  
  hideProblemSets() {
    this.reviewProblemsMode = !this.reviewProblemsMode;
    this.initialMode = !this.initialMode;
  }
  
  private sortCardsByCreatedAt(deck: Deck) {
    let cardDateArray = new Array(0);
    deck.cards.forEach((card) => {
      let cardDateTuple = [card, card.createdAt];
      cardDateArray.push(cardDateTuple);
    });
    let sortedArray = cardDateArray.sort(this.compareDates);
    console.log(sortedArray);
    this.dateSortedTuple = sortedArray;
  }
  
  private compareDates(a: any, b: any) {
    return a[1] - b[1];
  }
  
  private numberProblemSetsNeeded(deck: Deck) {
    this.numProbSets = (Math.floor(deck.cards.length / 10) + 1);
  }
  
  private initProblemSets() {
    this.problemSets = [];
    for(let i = 0; i < this.numProbSets; i++) {
      this.problemSets.push(new ProblemSet());
    }
    this.problemSets.forEach((problemSet) => problemSet.repsPerCard = 10);
    this.assignCardsToProblemSets();
    // NO LONGER NEEDED 
    // this.checkProblemSetCompletionStatusForAll();
  }
  
  private assignCardsToProblemSets() {
    let currentProbSetNum = 0
    this.dateSortedTuple.forEach((cardSortedTuple) => {
      if(!this.problemSets[currentProbSetNum].cards) {
        this.problemSets[currentProbSetNum].cards = [];
        this.problemSets[currentProbSetNum].cards.push(cardSortedTuple[0]);
      } else if(this.problemSets[currentProbSetNum].cards.length < 10) {
        this.problemSets[currentProbSetNum].cards.push(cardSortedTuple[0]);
      } else {
        currentProbSetNum++;
        this.problemSets[currentProbSetNum].cards = [];
        this.problemSets[currentProbSetNum].cards.push(cardSortedTuple[0]);
      }
    });
  }
  
  private assignCardToProblemSet(card: Card) {
    let probSetIndex = (this.problemSets.length - 1);
    let probSet = this.problemSets[probSetIndex];
    if(probSet.cards.length < 10 && probSet.cards.length > 0) {
      probSet.cards.push(card);
    } else if (probSet.cards.length >= 10) {
      this.numProbSets++;
      this.problemSets.push(new ProblemSet())
      let thatProbSet = this.problemSets[probSetIndex + 1];
      thatProbSet.cards.push(card);
    } else {
      // Final case is, if the problem set exists but the 
      // cards array has not yet been initiated.
      probSet.cards = [card];
    }
  }
}