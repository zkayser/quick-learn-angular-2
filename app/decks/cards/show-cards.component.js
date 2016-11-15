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
var deck_1 = require('../deck');
var deck_service_1 = require('../deck.service');
var ShowCardsComponent = (function () {
    function ShowCardsComponent(deckService) {
        this.deckService = deckService;
        this.editMode = false;
    }
    ShowCardsComponent.prototype.ngOnInit = function () {
        this.cards = this.deck.cards;
    };
    ShowCardsComponent.prototype.onEdit = function (cardsIndex) {
        this.editMode = !this.editMode;
        this.selectedIndex = cardsIndex;
    };
    ShowCardsComponent.prototype.onDelete = function (card) {
        var _this = this;
        this.deckService.deleteCard(this.deck, card).subscribe(function (data) {
            _this.result = data;
        });
    };
    ShowCardsComponent.prototype.onCancel = function () {
        this.editMode = !this.editMode;
    };
    ShowCardsComponent.prototype.editCard = function (card, deck) {
        var _this = this;
        this.deckService.editCard(card, deck).subscribe(function (data) {
            _this.result = data;
        });
        this.editMode = false;
    };
    ShowCardsComponent.prototype.percentMastered = function (card) {
        var numSetsComplete = card.ofTenForMaster || 0;
        return (Math.round(numSetsComplete / 10 * 100));
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', deck_1.Deck)
    ], ShowCardsComponent.prototype, "deck", void 0);
    ShowCardsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'show-cards',
            templateUrl: 'show-cards.component.html'
        }), 
        __metadata('design:paramtypes', [deck_service_1.DeckService])
    ], ShowCardsComponent);
    return ShowCardsComponent;
}());
exports.ShowCardsComponent = ShowCardsComponent;
//# sourceMappingURL=show-cards.component.js.map