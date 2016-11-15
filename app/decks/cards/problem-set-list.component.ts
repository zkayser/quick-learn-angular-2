import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Card } from './card';
import { Deck } from '../deck';
import { ProblemSet } from './problem-set';

@Component({
  moduleId: module.id,
  selector: 'problem-set-list',
  templateUrl: 'problem-set-list.component.html'
})

export class ProblemSetListComponent implements OnInit {
  @Input() problemSets: ProblemSet[];
  @Input() deck: Deck;
  @Output() goBack: EventEmitter<any> = new EventEmitter();
  trainingMode = false;
  inTraining: ProblemSet;
  
  constructor() {}
  
  ngOnInit(){
    console.log('Inspect problem sets: ' + this.problemSets);
    this.problemSets.forEach((problemSet) => {
      this.checkForUnexpire(problemSet);
      if(problemSet.cards.every(card => card.temporaryExpire)) {
        problemSet.status = 'Complete';
      } else {
        problemSet.status = 'Ready';
      }
    });
  }
  
  completed(problemSet: ProblemSet) {
    let numberTemporaryExpired = 0
    problemSet.cards.forEach((card) => {
      if(card.temporaryExpire) {
        numberTemporaryExpired++;
      }
    });
    return numberTemporaryExpired;
  }
  
  onTrain(index: any) {
    this.trainingMode = !this.trainingMode;
    this.inTraining = this.problemSets[index];
  }
  
  onComplete(problemSet: ProblemSet) {
    this.trainingMode = !this.trainingMode;
    problemSet.status = 'Complete';
    this.inTraining = null;
  }
  
  backToDeckOverview() {
    this.goBack.emit(null);
  }
  
  // Following 2 methods essentially copied from the problem set detail component typescript file
  private unexpireCard(card: Card) {
    let updatedDate = new Date(card.lastUpdated);
    let now = new Date();
    let yesterday = now.setHours(now.getHours() - 24);
    if(updatedDate < yesterday) {
     card.temporaryExpire = false;
     card.repOfTen = 0;
    } 
    if(card.temporaryExpire === undefined || card.temporaryExpire === null) {
      card.temporaryExpire = false;
    }
  }
  
  private checkForUnexpire(problemSet: ProblemSet) {
    problemSet.cards.forEach((card) => {
      this.unexpireCard(card);
    })
  }
}