import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Deck } from '../deck';
import { Card } from './card';
import { DeckService } from '../deck.service';
import { MathJaxDirective } from '../../mathjax.directive';

@Component({
  moduleId: module.id,
  selector: 'show-cards',
  templateUrl: 'show-cards.component.html'
})

export class ShowCardsComponent implements OnInit {
  @Input() deck: Deck;
  cards: Card[]
  editMode = false;
  selectedIndex: string;
  result: any;
  
  
  constructor(private deckService: DeckService) {}
  
  ngOnInit() {
    this.cards = this.deck.cards;
    }
  
  onEdit(cardsIndex: string) {
    this.editMode = !this.editMode;
    this.selectedIndex = cardsIndex;
  }
  
  onDelete(card: Card) {
    this.deckService.deleteCard(this.deck, card).subscribe(data => {
      this.result = data;
    });
  }
  
  onCancel() {
    this.editMode = !this.editMode;
  }
  
  editCard(card: Card, deck: Deck) {
    this.deckService.editCard(card, deck).subscribe(data => {
      this.result = data;
    });
    this.editMode = false;
  }
  
  percentMastered(card: Card) {
    let numSetsComplete = card.ofTenForMaster || 0;
    return (Math.round(numSetsComplete / 10 * 100));
  }
}