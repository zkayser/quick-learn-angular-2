import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from './subject';
import { SubjectService } from './subject.service';
import { DeckService } from '../decks/deck.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'subject-list',
  templateUrl: 'subject-list.component.html',
  styles: [`
            .panel-primary .panel-heading {
              background-color: #df691a;
            }
          `]
})

export class SubjectListComponent implements OnInit, OnDestroy {
  sub: Subscription;
  subjects: Subject[];
  strings = ['cool', 'stuff'];
  
  constructor(private subjectService: SubjectService, private router: Router) {
  }
  
  ngOnInit() {
    this.subjects = [];
    this.sub = this.subjectService.getSubjects().subscribe(
      (data: any[]) => {
        for (let d of data) {
          var subject = d.subject;
          var id = d._id.$oid;
          subject.id = id;
          this.subjects.push(subject);
          console.log('Retrieved subjects...')
      }
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  onNewSubject() {
    this.router.navigate(['/new-subject']);
  }
  
  goToSubject(id: string) {
    this.router.navigate(['/subjects', id]);
  }
}