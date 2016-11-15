"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var deck_service_1 = require('./deck.service');
var deck_form_component_1 = require('./deck-form.component');
var deck_list_component_1 = require('./deck-list.component');
var deck_show_component_1 = require('./deck-show.component');
var add_card_component_1 = require('./cards/add-card.component');
var show_cards_component_1 = require('./cards/show-cards.component');
var ng2_ckeditor_1 = require('ng2-ckeditor');
var mathjax_directive_1 = require('../mathjax.directive');
var problem_set_list_component_1 = require('./cards/problem-set-list.component');
var problem_set_component_1 = require('./cards/problem-set.component');
var DecksModule = (function () {
    function DecksModule() {
    }
    DecksModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ng2_ckeditor_1.CKEditorModule
            ],
            declarations: [
                deck_form_component_1.DeckFormComponent,
                deck_list_component_1.DeckListComponent,
                deck_show_component_1.DeckShowComponent,
                add_card_component_1.AddCardComponent,
                show_cards_component_1.ShowCardsComponent,
                mathjax_directive_1.MathJaxDirective,
                problem_set_list_component_1.ProblemSetListComponent,
                problem_set_component_1.ProblemSetComponent
            ],
            providers: [deck_service_1.DeckService]
        }), 
        __metadata('design:paramtypes', [])
    ], DecksModule);
    return DecksModule;
}());
exports.DecksModule = DecksModule;
//# sourceMappingURL=decks.module.js.map