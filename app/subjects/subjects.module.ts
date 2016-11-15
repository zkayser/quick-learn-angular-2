import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubjectListComponent } from './subject-list.component';
import { SubjectService } from './subject.service';
import { SubjectFormComponent } from './subject-form.component';
import { SubjectShowComponent } from './subject-show.component';
import { NewSubjectDeckComponent } from './new-subject-deck.component';

@NgModule({
  imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule
            ],
  declarations: [
                 SubjectListComponent,
                 SubjectFormComponent,
                 SubjectShowComponent,
                 NewSubjectDeckComponent
                ],
  providers: [SubjectService]
})

export class SubjectsModule { }