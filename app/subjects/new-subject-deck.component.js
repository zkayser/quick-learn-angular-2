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
var router_1 = require('@angular/router');
var deck_1 = require('../decks/deck');
var deck_service_1 = require('../decks/deck.service');
var NewSubjectDeckComponent = (function () {
    function NewSubjectDeckComponent(route, deckService, router) {
        this.route = route;
        this.deckService = deckService;
        this.router = router;
        this.deck = new deck_1.Deck();
    }
    NewSubjectDeckComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.deck.subjectId = params['id'];
            console.log(_this.deck);
        });
    };
    NewSubjectDeckComponent.prototype.onSubmit = function () {
        var _this = this;
        this.deckService.addDeck(this.deck).subscribe(function (data) {
            _this.result = data;
            _this.deckId = data._id.$oid;
            console.log(_this.deckId);
        }, function (err) { return console.log(err); }, function () { return _this.router.navigate(['/decks', _this.deckId]); });
    };
    NewSubjectDeckComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'new-subject-deck',
            templateUrl: 'new-subject-deck.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, deck_service_1.DeckService, router_1.Router])
    ], NewSubjectDeckComponent);
    return NewSubjectDeckComponent;
}());
exports.NewSubjectDeckComponent = NewSubjectDeckComponent;
//# sourceMappingURL=new-subject-deck.component.js.map