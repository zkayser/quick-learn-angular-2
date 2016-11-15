import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeckFormComponent } from './decks/deck-form.component';
import { DeckListComponent } from './decks/deck-list.component';
import { DeckShowComponent } from './decks/deck-show.component';
import { HeaderComponent } from './header.component';
import { HomeComponent } from './home/home.component';
import { CardReviewComponent } from './decks/cards/card-review.component';
import { SubjectListComponent } from './subjects/subject-list.component';
import { SubjectFormComponent } from './subjects/subject-form.component';
import { SubjectShowComponent } from './subjects/subject-show.component';
import { NewSubjectDeckComponent } from './subjects/new-subject-deck.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'new-deck', component: DeckFormComponent },
    { path: 'decks', component: DeckListComponent },
    { path: 'decks/:id', component: DeckShowComponent },
    { path: 'review/problems/:deck_id', component: CardReviewComponent },
    { path: 'review/flashcards/:deck_id', component: CardReviewComponent },
    { path: 'subjects', component: SubjectListComponent },
    { path: 'new-subject', component: SubjectFormComponent },
    { path: 'subjects/:id', component: SubjectShowComponent },
    { path: 'new-subject-deck/:id', component: NewSubjectDeckComponent }
  ];
  
export const appRoutingProviders: any[] = [
  
  ];
  
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);