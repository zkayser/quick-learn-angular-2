import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Deck } from '../decks/deck';
import { DeckService } from '../decks/deck.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'new-subject-deck',
  templateUrl: 'new-subject-deck.component.html'
})

export class NewSubjectDeckComponent implements OnInit {
  errorMessage: any;
  deck: Deck = new Deck();
  result: any;
  deckId: string
  private sub: Subscription;
  
 
 constructor(private route: ActivatedRoute, private deckService: DeckService, private router: Router) {} 
 
 ngOnInit() {
   this.sub = this.route.params.subscribe(params => {
     this.deck.subjectId = params['id'];
     console.log(this.deck);
   })
 }
 
 onSubmit() {
   this.deckService.addDeck(this.deck).subscribe(data => {
     this.result = data;
     this.deckId = data._id.$oid;
     console.log(this.deckId);
   },
   err => console.log(err),
   () => this.router.navigate(['/decks', this.deckId]));
 }
}