import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import {CKEditorModule} from 'ng2-ckeditor';
import { routing, appRoutingProviders } from './app.routing';
import { HeaderComponent } from './header.component';
import { AppComponent }   from './app.component';
import { HomeComponent } from './home/home.component';
import { DecksModule } from './decks/decks.module';
import { DropdownDirective } from './dropdown.directive';
import { CardReviewComponent } from './decks/cards/card-review.component';
import { SubjectsModule } from './subjects/subjects.module';



@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  HttpModule,
                  RouterModule,
                  routing,
                  DecksModule,
                  CKEditorModule,
                  SubjectsModule
                ],
  declarations: [ AppComponent,
                  HeaderComponent,
                  HomeComponent,
                  DropdownDirective,
                  CardReviewComponent
                ],
  bootstrap:    [ AppComponent ],
  providers: [
              appRoutingProviders
             ]
})

export class AppModule { }
