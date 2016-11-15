import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DeckService } from '../deck.service';
import { Card } from './card';
import { Deck } from '../deck';
import { MathJaxDirective } from '../../mathjax.directive';


@Component({
  moduleId: module.id,
  selector: 'add-card',
  templateUrl: 'add-card.component.html'
})

export class AddCardComponent {
  card: Card = new Card()
  @Input() deck: Deck;
  result: any;
  @Output() submitted: EventEmitter<any> = new EventEmitter();
  
  constructor(private deckService: DeckService) {}
  
  
  get diagnostic() {
    return JSON.stringify(this.card);
  }
  
  submitCard(card: Card, deck: Deck) {
    this.deckService.addCard(card, deck).subscribe(data => {
      this.result = data;
    });
    this.submitted.emit(card);
  }
  
  
  
}