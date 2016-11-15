import { Component } from '@angular/core';
import { Deck } from './deck';
import { Card } from './cards/card';
import { DeckService } from './deck.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'deck-form',
  templateUrl: 'deck-form.component.html',
  styles: [`
            .panel-heading {
              text-align: center;
            }
            .panel-body {
              padding-right: 100px;
            }
          `]
})

export class DeckFormComponent {
  errorMessage: string;
  deck: Deck = new Deck();
  decks: Deck[];
  result: any;
  private subscription: Subscription;
  
  constructor(private deckService: DeckService) {}
 
 
 onSubmit() {
  this.deckService.addDeck(this.deck).subscribe(data => {
     this.result = data
   },
   err => console.log(err),
   () => console.log('Deck added'));
 }
 
 get diagnostic() {
   return JSON.stringify(this.deck);
 }
}