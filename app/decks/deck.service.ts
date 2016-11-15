import { Injectable, EventEmitter } from '@angular/core';
import { Deck } from './deck';
import { Card } from './cards/card';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DeckService {
  private apiKey: string = 'bJm46fpjBZ97JnmI_6cIa3b9S6udG9AB';
  private decksUrl: string = 'https://api.mlab.com/api/1/databases/quick-learn/collections/decks';
  decks: Deck[] = [];
  deck: Deck;
  
  constructor(private http: Http) {}
  
  addDeck(deck: Deck) {
    let body = JSON.stringify({deck});
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.decksUrl + '?apiKey=' + this.apiKey, body, options)
      .map(res => res.json());
  }
  
  getDeck(id: string): Observable<Deck> {
    let deck$ = this.http.get(this.decksUrl + '/' + id + '?apiKey=' + this.apiKey)
      .map((response: Response) => response.json());
    return deck$;
  }
  
  addCard(card: Card, deck: Deck) {
    if (!deck.cards) {
      deck.cards = [];
      deck.cards.push(card);
      console.log(deck.cards);
    } else {
      deck.cards.push(card);
      console.log(deck.cards)
    }
    let body = JSON.stringify({deck});
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers: headers});
    return this.http.put(this.decksUrl + '/' + deck.id + '?apiKey=' + this.apiKey, body, options)
      .map(res => res.json());
  }
  
  editCard(card: Card, deck: Deck) {
    let index = deck.cards.indexOf(card);
    deck.cards.splice(index, 1, card);
    let body = JSON.stringify({deck});
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers: headers});
    return this.http.put(this.decksUrl + '/' + deck.id + '?apiKey=' + this.apiKey, body, options)
      .map(res => res.json());
  }
  
  deleteCard(deck: Deck, card: Card) {
    let index = deck.cards.indexOf(card);
    deck.cards.splice(index, 1);
    let body = JSON.stringify({deck});
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers: headers});
    return this.http.put(this.decksUrl + '/' + deck.id + '?apiKey=' + this.apiKey, body, options)
      .map(res => res.json());
  }
  
  updateCards(cardArray: Card[], deck: Deck) {
    // Updating once for development only
    this.updateTimeStampsFor(deck);
    // Match cards on timestamp
    cardArray.forEach((card) => {
      let theCard = this.matchCardsByDate(card, deck);
      let index = deck.cards.indexOf(theCard);
      // Overwrites the old card with the new card in one fell swoop
      deck.cards.splice(index, 1, card);
    });
    let body = JSON.stringify({deck});
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers: headers});
    return this.http.put(this.decksUrl + '/' + deck.id + '?apiKey=' + this.apiKey, body, options)
      .map(res => res.json());
  }
  
  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }
  
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg);
    return Observable.throw(errMsg);
  }
  
  getDecks() {
    return this.http.get(this.decksUrl + '?apiKey=' + this.apiKey)
      .map((response: Response) => response.json())
  }
  
  private cardIsProblem(card: Card) {
    return card.isProblem;
  }
  
  // Two helper methods to update cards in the development database
  // that do not have a timestamp
  private addTimeStampToCard(card: Card) {
    if(card.createdAt === undefined || card.createdAt === null) {
      card.createdAt = new Date();
    }
  }
  
  private updateTimeStampsFor(deck: Deck) {
    deck.cards.forEach((card) => {
      this.addTimeStampToCard(card)
    });
  }
  
  // Helper method to match cards by timestamp
  private matchCardsByDate(card: Card, deck: Deck) {
    let returnedCard = null;
    deck.cards.forEach((deckCard) => {
      if(card.createdAt === deckCard.createdAt) {
        returnedCard = deckCard;
      }
    });
    return returnedCard;
  }
}