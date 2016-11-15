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
var deck_1 = require('./deck');
var deck_service_1 = require('./deck.service');
var DeckFormComponent = (function () {
    function DeckFormComponent(deckService) {
        this.deckService = deckService;
        this.deck = new deck_1.Deck();
    }
    DeckFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.deckService.addDeck(this.deck).subscribe(function (data) {
            _this.result = data;
        }, function (err) { return console.log(err); }, function () { return console.log('Deck added'); });
    };
    Object.defineProperty(DeckFormComponent.prototype, "diagnostic", {
        get: function () {
            return JSON.stringify(this.deck);
        },
        enumerable: true,
        configurable: true
    });
    DeckFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'deck-form',
            templateUrl: 'deck-form.component.html',
            styles: ["\n            .panel-heading {\n              text-align: center;\n            }\n            .panel-body {\n              padding-right: 100px;\n            }\n          "]
        }), 
        __metadata('design:paramtypes', [deck_service_1.DeckService])
    ], DeckFormComponent);
    return DeckFormComponent;
}());
exports.DeckFormComponent = DeckFormComponent;
//# sourceMappingURL=deck-form.component.js.map