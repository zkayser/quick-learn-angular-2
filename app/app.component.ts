import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import './rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  onCreateDeck() {
    console.log("Create button pressed");
  }
}
