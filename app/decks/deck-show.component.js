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
var problem_set_1 = require('./cards/problem-set');
var DeckShowComponent = (function () {
    function DeckShowComponent(route, deckService, router) {
        this.route = route;
        this.deckService = deckService;
        this.router = router;
        this.addCardsMode = false;
        this.showCardsMode = false;
        this.reviewProblemsMode = false;
        this.reviewFlashcardsMode = false;
        this.initialMode = true;
    }
    DeckShowComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.deckService.getDeck(_this.id).subscribe(function (data) {
                _this.deck = data.deck;
                _this.deck.id = _this.id;
                _this.sortCardsByCreatedAt(_this.deck);
                if (_this.deck.cards.length > 10) {
                    _this.numberProblemSetsNeeded(_this.deck);
                }
                else {
                    _this.numProbSets = 1;
                }
                _this.initProblemSets();
                console.log(_this.problemSets);
            });
        });
    };
    DeckShowComponent.prototype.addCards = function () {
        if (this.showCardsMode) {
            this.showCardsMode = !this.showCardsMode;
        }
        this.addCardsMode = !this.addCardsMode;
    };
    DeckShowComponent.prototype.showCards = function () {
        if (this.addCardsMode) {
            this.addCardsMode = !this.addCardsMode;
        }
        this.showCardsMode = !this.showCardsMode;
    };
    DeckShowComponent.prototype.onReviewProblems = function () {
        this.initialMode = false;
        this.reviewProblemsMode = !this.reviewProblemsMode;
    };
    DeckShowComponent.prototype.onReviewFlashcards = function () {
        this.router.navigate(['/review/flaschards', this.deck.id]);
    };
    DeckShowComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    DeckShowComponent.prototype.onCardSubmitted = function (card) {
        this.addCardsMode = !this.addCardsMode;
        if (card.isProblem) {
            this.assignCardToProblemSet(card);
        }
    };
    DeckShowComponent.prototype.hideProblemSets = function () {
        this.reviewProblemsMode = !this.reviewProblemsMode;
        this.initialMode = !this.initialMode;
    };
    DeckShowComponent.prototype.sortCardsByCreatedAt = function (deck) {
        var cardDateArray = new Array(0);
        deck.cards.forEach(function (card) {
            var cardDateTuple = [card, card.createdAt];
            cardDateArray.push(cardDateTuple);
        });
        var sortedArray = cardDateArray.sort(this.compareDates);
        console.log(sortedArray);
        this.dateSortedTuple = sortedArray;
    };
    DeckShowComponent.prototype.compareDates = function (a, b) {
        return a[1] - b[1];
    };
    DeckShowComponent.prototype.numberProblemSetsNeeded = function (deck) {
        this.numProbSets = (Math.floor(deck.cards.length / 10) + 1);
    };
    DeckShowComponent.prototype.initProblemSets = function () {
        this.problemSets = [];
        for (var i = 0; i < this.numProbSets; i++) {
            this.problemSets.push(new problem_set_1.ProblemSet());
        }
        this.problemSets.forEach(function (problemSet) { return problemSet.repsPerCard = 10; });
        this.assignCardsToProblemSets();
        // NO LONGER NEEDED 
        // this.checkProblemSetCompletionStatusForAll();
    };
    DeckShowComponent.prototype.assignCardsToProblemSets = function () {
        var _this = this;
        var currentProbSetNum = 0;
        this.dateSortedTuple.forEach(function (cardSortedTuple) {
            if (!_this.problemSets[currentProbSetNum].cards) {
                _this.problemSets[currentProbSetNum].cards = [];
                _this.problemSets[currentProbSetNum].cards.push(cardSortedTuple[0]);
            }
            else if (_this.problemSets[currentProbSetNum].cards.length < 10) {
                _this.problemSets[currentProbSetNum].cards.push(cardSortedTuple[0]);
            }
            else {
                currentProbSetNum++;
                _this.problemSets[currentProbSetNum].cards = [];
                _this.problemSets[currentProbSetNum].cards.push(cardSortedTuple[0]);
            }
        });
    };
    DeckShowComponent.prototype.assignCardToProblemSet = function (card) {
        var probSetIndex = (this.problemSets.length - 1);
        var probSet = this.problemSets[probSetIndex];
        if (probSet.cards.length < 10 && probSet.cards.length > 0) {
            probSet.cards.push(card);
        }
        else if (probSet.cards.length >= 10) {
            this.numProbSets++;
            this.problemSets.push(new problem_set_1.ProblemSet());
            var thatProbSet = this.problemSets[probSetIndex + 1];
            thatProbSet.cards.push(card);
        }
        else {
            // Final case is, if the problem set exists but the 
            // cards array has not yet been initiated.
            probSet.cards = [card];
        }
    };
    DeckShowComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'deck-show',
            templateUrl: 'deck-show.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, deck_service_1.DeckService, router_1.Router])
    ], DeckShowComponent);
    return DeckShowComponent;
}());
exports.DeckShowComponent = DeckShowComponent;
//# sourceMappingURL=deck-show.component.js.map