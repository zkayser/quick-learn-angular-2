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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var DeckService = (function () {
    function DeckService(http) {
        this.http = http;
        this.apiKey = 'bJm46fpjBZ97JnmI_6cIa3b9S6udG9AB';
        this.decksUrl = 'https://api.mlab.com/api/1/databases/quick-learn/collections/decks';
        this.decks = [];
    }
    DeckService.prototype.addDeck = function (deck) {
        var body = JSON.stringify({ deck: deck });
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.decksUrl + '?apiKey=' + this.apiKey, body, options)
            .map(function (res) { return res.json(); });
    };
    DeckService.prototype.getDeck = function (id) {
        var deck$ = this.http.get(this.decksUrl + '/' + id + '?apiKey=' + this.apiKey)
            .map(function (response) { return response.json(); });
        return deck$;
    };
    DeckService.prototype.addCard = function (card, deck) {
        if (!deck.cards) {
            deck.cards = [];
            deck.cards.push(card);
            console.log(deck.cards);
        }
        else {
            deck.cards.push(card);
            console.log(deck.cards);
        }
        var body = JSON.stringify({ deck: deck });
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(this.decksUrl + '/' + deck.id + '?apiKey=' + this.apiKey, body, options)
            .map(function (res) { return res.json(); });
    };
    DeckService.prototype.editCard = function (card, deck) {
        var index = deck.cards.indexOf(card);
        deck.cards.splice(index, 1, card);
        var body = JSON.stringify({ deck: deck });
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(this.decksUrl + '/' + deck.id + '?apiKey=' + this.apiKey, body, options)
            .map(function (res) { return res.json(); });
    };
    DeckService.prototype.deleteCard = function (deck, card) {
        var index = deck.cards.indexOf(card);
        deck.cards.splice(index, 1);
        var body = JSON.stringify({ deck: deck });
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(this.decksUrl + '/' + deck.id + '?apiKey=' + this.apiKey, body, options)
            .map(function (res) { return res.json(); });
    };
    DeckService.prototype.updateCards = function (cardArray, deck) {
        var _this = this;
        // Updating once for development only
        this.updateTimeStampsFor(deck);
        // Match cards on timestamp
        cardArray.forEach(function (card) {
            var theCard = _this.matchCardsByDate(card, deck);
            var index = deck.cards.indexOf(theCard);
            // Overwrites the old card with the new card in one fell swoop
            deck.cards.splice(index, 1, card);
        });
        var body = JSON.stringify({ deck: deck });
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(this.decksUrl + '/' + deck.id + '?apiKey=' + this.apiKey, body, options)
            .map(function (res) { return res.json(); });
    };
    DeckService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    DeckService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message : error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    DeckService.prototype.getDecks = function () {
        return this.http.get(this.decksUrl + '?apiKey=' + this.apiKey)
            .map(function (response) { return response.json(); });
    };
    DeckService.prototype.cardIsProblem = function (card) {
        return card.isProblem;
    };
    // Two helper methods to update cards in the development database
    // that do not have a timestamp
    DeckService.prototype.addTimeStampToCard = function (card) {
        if (card.createdAt === undefined || card.createdAt === null) {
            card.createdAt = new Date();
        }
    };
    DeckService.prototype.updateTimeStampsFor = function (deck) {
        var _this = this;
        deck.cards.forEach(function (card) {
            _this.addTimeStampToCard(card);
        });
    };
    // Helper method to match cards by timestamp
    DeckService.prototype.matchCardsByDate = function (card, deck) {
        var returnedCard = null;
        deck.cards.forEach(function (deckCard) {
            if (card.createdAt === deckCard.createdAt) {
                returnedCard = deckCard;
            }
        });
        return returnedCard;
    };
    DeckService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DeckService);
    return DeckService;
}());
exports.DeckService = DeckService;
//# sourceMappingURL=deck.service.js.map