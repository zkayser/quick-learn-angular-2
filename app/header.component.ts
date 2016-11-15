import { Component } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';

@Component({
  moduleId: module.id,
  selector: 'ql-header',
  templateUrl: 'header.component.html',
  styles: [`
            .navbar-nav>li>a.active {
              color: white;
            }
            .navbar-nav>li>a.active:hover {
              color: white;
              background-color: #df691a;
              background-image: none;
            }
          `]
})

export class HeaderComponent {
  
  mobileMenuDisplayed: boolean = false;
  
  dropMenu() {
    this.mobileMenuDisplayed = !this.mobileMenuDisplayed;
    console.log(this.mobileMenuDisplayed);
  }
}