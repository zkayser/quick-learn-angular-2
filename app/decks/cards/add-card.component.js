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
var deck_service_1 = require('../deck.service');
var card_1 = require('./card');
var deck_1 = require('../deck');
var AddCardComponent = (function () {
    function AddCardComponent(deckService) {
        this.deckService = deckService;
        this.card = new card_1.Card();
        this.submitted = new core_1.EventEmitter();
    }
    Object.defineProperty(AddCardComponent.prototype, "diagnostic", {
        get: function () {
            return JSON.stringify(this.card);
        },
        enumerable: true,
        configurable: true
    });
    AddCardComponent.prototype.submitCard = function (card, deck) {
        var _this = this;
        this.deckService.addCard(card, deck).subscribe(function (data) {
            _this.result = data;
        });
        this.submitted.emit(card);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', deck_1.Deck)
    ], AddCardComponent.prototype, "deck", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AddCardComponent.prototype, "submitted", void 0);
    AddCardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'add-card',
            templateUrl: 'add-card.component.html'
        }), 
        __metadata('design:paramtypes', [deck_service_1.DeckService])
    ], AddCardComponent);
    return AddCardComponent;
}());
exports.AddCardComponent = AddCardComponent;
//# sourceMappingURL=add-card.component.js.map