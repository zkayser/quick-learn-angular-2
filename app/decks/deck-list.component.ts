import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Deck } from './deck';
import { DeckService } from './deck.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'deck-list',
  templateUrl: 'deck-list.component.html',
  styles: [`
            .panel-primary .panel-heading {
              background-color: #df691a;
            }
          `]
})

export class DeckListComponent implements OnInit, OnDestroy {
  sub: Subscription;
  decks: Deck[];
  
  constructor(private deckService: DeckService, private router: Router) {}
  
  ngOnInit() {
    this.decks = [];
    this.sub = this.deckService.getDecks().subscribe(
      (data: any[]) => {
        for (let d of data) {
          var deck = d.deck;
          var id = d._id.$oid;
          deck.id = id;
          this.decks.push(deck);
        }
      }
    )
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
    console.log('Unsubscribed from deckChanged');
  }
  
  onSelect(deck: Deck) {
    this.router.navigate(['/decks', deck.id]);
  }
  
}