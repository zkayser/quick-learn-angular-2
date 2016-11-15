import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeckService } from './deck.service';
import { DeckFormComponent } from './deck-form.component';
import { DeckListComponent } from './deck-list.component';
import { DeckShowComponent } from './deck-show.component';
import { Card } from './cards/card';
import { ProblemSet } from './cards/problem-set';
import { AddCardComponent } from './cards/add-card.component';
import { ShowCardsComponent } from './cards/show-cards.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { MathJaxDirective } from '../mathjax.directive';
import { ProblemSetListComponent } from './cards/problem-set-list.component';
import { ProblemSetComponent } from './cards/problem-set.component';

@NgModule({
  imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            CKEditorModule
           ],
  declarations: [
                 DeckFormComponent,
                 DeckListComponent,
                 DeckShowComponent,
                 AddCardComponent,
                 ShowCardsComponent,
                 MathJaxDirective,
                 ProblemSetListComponent,
                 ProblemSetComponent
                 ],
  providers: [DeckService]
})

export class DecksModule {}