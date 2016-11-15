import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from './subject';
import { SubjectService } from './subject.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'subject-form',
  templateUrl: 'subject-form.component.html'
})

export class SubjectFormComponent {
  errorMessage: string;
  subject = new Subject();
  result: any;
  private sub: Subscription;
  
  constructor(private subjectService: SubjectService, private router: Router) {}
  
  onSubmit() {
    this.subjectService.addSubject(this.subject).subscribe(data => {
      this.result = data;
      this.subject.id = data._id.$oid;
      this.router.navigate(['/subjects', this.subject.id]);
    },
    err => console.log(err),
    () => console.log('subject added'));
  }
  
}