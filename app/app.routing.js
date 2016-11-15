"use strict";
var router_1 = require('@angular/router');
var deck_form_component_1 = require('./decks/deck-form.component');
var deck_list_component_1 = require('./decks/deck-list.component');
var deck_show_component_1 = require('./decks/deck-show.component');
var home_component_1 = require('./home/home.component');
var card_review_component_1 = require('./decks/cards/card-review.component');
var subject_list_component_1 = require('./subjects/subject-list.component');
var subject_form_component_1 = require('./subjects/subject-form.component');
var subject_show_component_1 = require('./subjects/subject-show.component');
var new_subject_deck_component_1 = require('./subjects/new-subject-deck.component');
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'new-deck', component: deck_form_component_1.DeckFormComponent },
    { path: 'decks', component: deck_list_component_1.DeckListComponent },
    { path: 'decks/:id', component: deck_show_component_1.DeckShowComponent },
    { path: 'review/problems/:deck_id', component: card_review_component_1.CardReviewComponent },
    { path: 'review/flashcards/:deck_id', component: card_review_component_1.CardReviewComponent },
    { path: 'subjects', component: subject_list_component_1.SubjectListComponent },
    { path: 'new-subject', component: subject_form_component_1.SubjectFormComponent },
    { path: 'subjects/:id', component: subject_show_component_1.SubjectShowComponent },
    { path: 'new-subject-deck/:id', component: new_subject_deck_component_1.NewSubjectDeckComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map