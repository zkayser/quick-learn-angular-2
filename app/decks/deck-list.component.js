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
var deck_service_1 = require('./deck.service');
var DeckListComponent = (function () {
    function DeckListComponent(deckService, router) {
        this.deckService = deckService;
        this.router = router;
    }
    DeckListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.decks = [];
        this.sub = this.deckService.getDecks().subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var d = data_1[_i];
                var deck = d.deck;
                var id = d._id.$oid;
                deck.id = id;
                _this.decks.push(deck);
            }
        });
    };
    DeckListComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
        console.log('Unsubscribed from deckChanged');
    };
    DeckListComponent.prototype.onSelect = function (deck) {
        this.router.navigate(['/decks', deck.id]);
    };
    DeckListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'deck-list',
            templateUrl: 'deck-list.component.html',
            styles: ["\n            .panel-primary .panel-heading {\n              background-color: #df691a;\n            }\n          "]
        }), 
        __metadata('design:paramtypes', [deck_service_1.DeckService, router_1.Router])
    ], DeckListComponent);
    return DeckListComponent;
}());
exports.DeckListComponent = DeckListComponent;
//# sourceMappingURL=deck-list.component.js.map