import { Component, OnInit } from '@angular/core';
import { Card } from './card';
import { Deck } from '../deck';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from '../deck.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'card-review',
  templateUrl: 'card-review.component.html'
})

export class CardReviewComponent implements OnInit {
  deck: Deck;
  cards: Card[];
  id: string;
  private sub: Subscription
  
  constructor(private route: ActivatedRoute, private router: Router, private deckService: DeckService) {}
  
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['deck_id'];
      this.deckService.getDeck(this.id).subscribe(
        (data: any) => {
          this.deck = data.deck;
          this.deck.id = this.id;
          this.cards = this.deck.cards;
        }  
      );
    });
  }
}