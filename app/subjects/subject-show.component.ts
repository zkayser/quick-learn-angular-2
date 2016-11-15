import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from './subject';
import { Deck } from '../decks/deck';
import { DeckService } from '../decks/deck.service';
import { SubjectService } from './subject.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'subject-show',
  templateUrl: 'subject-show.component.html'
})

export class SubjectShowComponent implements OnInit {
  subject: Subject;
  id: string;
  decks: Deck[];
  private sub: Subscription;
  
  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private deckService: DeckService,
    private router: Router) {}
  
  ngOnInit() {
    this.decks = [];
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.subjectService.getSubject(this.id).subscribe(
      (data: any) => {
        this.subject = data.subject;
        this.subject.id = this.id;
      });
      this.deckService.getDecks().subscribe(
      (data: any[]) => {
        console.log(data);
        for(let d of data) {
          var deck = d.deck;
          var id = d._id.$oid;
          deck.id = id;
          if(deck.subjectId === this.id) {
            this.decks.push(deck);
            console.log(this.decks);
          }
        }
      });
    });
  }
  
  onSelect(deck: Deck) {
    this.router.navigate(['/decks', deck.id]);
  }
  
  newDeck(subjectId: string) {
    this.router.navigate(['/new-subject-deck', subjectId]);
  }
  
}