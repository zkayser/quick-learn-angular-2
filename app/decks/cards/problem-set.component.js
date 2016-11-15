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
var problem_set_1 = require('./problem-set');
var deck_1 = require('../deck');
var deck_service_1 = require('../deck.service');
var ProblemSetComponent = (function () {
    function ProblemSetComponent(deckService) {
        this.deckService = deckService;
        this.complete = new core_1.EventEmitter();
        this.noneExpiredCards = [];
        this.expiredCards = [];
        this.resultState = 'standard';
        this.numCorrect = 0;
        this.numAttempts = 0;
        this.showEditor = false;
        this.toggleEditorBtnText = 'Show Editor';
    }
    ProblemSetComponent.prototype.ngOnInit = function () {
        this.numProblemsToCompletion = (this.problemSet.cards.length * this.problemSet.repsPerCard);
        this.numProblemsCompleted = this.initializeNumProblemsCompleted();
        this.percentComplete = (Math.round(this.numProblemsCompleted / this.numProblemsToCompletion * 100));
        // this.checkUnexpire()
        this.sortExpired();
        if (this.noneExpiredCards.length > 0) {
            this.currentCard = _.sample(this.noneExpiredCards);
        }
        else {
            this.complete.emit(null);
        }
        ;
    };
    ProblemSetComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        this.deckService.updateCards(this.expiredCards.concat(this.noneExpiredCards), this.deck).subscribe(function (data) {
            _this.result = data;
        });
    };
    ProblemSetComponent.prototype.onSuccess = function (card) {
        var _this = this;
        this.resultState = 'success';
        setTimeout(function () { return _this.returnToStandard('success', card); }, 1500);
    };
    ProblemSetComponent.prototype.showAnswer = function () {
        $('#myModal').modal();
    };
    ProblemSetComponent.prototype.toggleAnswer = function () {
        $('myModal').modal('toggle');
    };
    ProblemSetComponent.prototype.toggleShowEditor = function () {
        this.showEditor = !this.showEditor;
        if (this.toggleEditorBtnText == 'Show Editor') {
            this.toggleEditorBtnText = 'Hide Editor';
        }
        else {
            this.toggleEditorBtnText = 'Show Editor';
        }
    };
    ProblemSetComponent.prototype.onFailure = function (card) {
        var _this = this;
        this.resultState = 'failure';
        setTimeout(function () { return _this.returnToStandard('failure', card); }, 1500);
        this.currentCard = _.sample(this.problemSet.cards);
    };
    ProblemSetComponent.prototype.problemSetComplete = function () {
        console.log('Now inside problemSetComplete function and noneExpiredCard.length = ' + this.noneExpiredCards.length);
        if (this.noneExpiredCards.length > 0) {
            return false;
        }
        else {
            return true;
        }
    };
    ProblemSetComponent.prototype.oneDayFromNow = function () {
        var now = new Date();
        var tomorrow = now.setHours(now.getHours() + 24);
    };
    ProblemSetComponent.prototype.updateCard = function (card) {
        this.initializeCounters(card);
        // Updating this 11/6 to reduce # of reps down to 4
        if (card.repOfTen >= 3) {
            this.handleTemporaryExpire(card);
        }
        else {
            this.handleNormalUpdate(card);
        }
        this.numCorrect++;
        this.numAttempts++;
        card.lastUpdated = new Date();
    };
    ProblemSetComponent.prototype.handleCardExpired = function (card) {
        if (card.temporaryExpire) {
            this.expiredCards.push(card);
            var cardIndex = this.noneExpiredCards.indexOf(card);
            this.noneExpiredCards.splice(cardIndex, 1);
        }
    };
    ProblemSetComponent.prototype.sortExpired = function () {
        var _this = this;
        this.problemSet.cards.forEach(function (card) {
            if (card.temporaryExpire || card.retired) {
                _this.expiredCards.push(card);
            }
            else {
                _this.noneExpiredCards.push(card);
            }
        });
    };
    ProblemSetComponent.prototype.isTemporarilyExpired = function (card) {
        if (card.temporaryExpire) {
            return true;
        }
        else {
            return false;
        }
    };
    ProblemSetComponent.prototype.initializeCounters = function (card) {
        if (card.repOfTen === null || card.repOfTen === undefined) {
            card.repOfTen = 0;
        }
        if (card.ofTenForMaster === null || card.ofTenForMaster === undefined) {
            card.ofTenForMaster = 0;
        }
    };
    ProblemSetComponent.prototype.handleTemporaryExpire = function (card) {
        card.temporaryExpire = true;
        this.handleCardExpired(card);
        card.ofTenForMaster++;
        if (this.noneExpiredCards.length >= 1) {
            // Sample from available cards
            this.currentCard = _.sample(this.noneExpiredCards);
        }
        if (this.noneExpiredCards.length <= 0) {
            console.log('None Expired Cards length tripped: ' + this.noneExpiredCards.length);
            this.complete.emit(null);
        }
    };
    ProblemSetComponent.prototype.handleNormalUpdate = function (card) {
        var index = this.noneExpiredCards.indexOf(card);
        // First remove the card from the noneExpired, then add it again after updating.
        this.noneExpiredCards.splice(index, 1);
        card.repOfTen++;
        this.noneExpiredCards.push(card);
        // Take a sample from the noneExpiredCards array and assign to currentCard
        this.currentCard = _.sample(this.noneExpiredCards);
    };
    ProblemSetComponent.prototype.returnToStandard = function (value, card) {
        if (value === 'success') {
            this.updateCard(card);
            this.attempt = '';
        }
        else {
            this.numAttempts++;
            this.currentCard = _.sample(this.problemSet.cards);
        }
        this.resultState = 'standard';
        this.calculatePercentages();
    };
    ProblemSetComponent.prototype.initializeNumProblemsCompleted = function () {
        var _this = this;
        var num = 0;
        this.problemSet.cards.forEach(function (card) {
            num += (_this.numProblemsCompleted || 0) + (card.repOfTen || 0);
        });
        return num;
    };
    ProblemSetComponent.prototype.calculatePercentComplete = function () {
        this.numProblemsCompleted = this.totalCurrentReps();
        return (Math.round(this.numProblemsCompleted / this.numProblemsToCompletion * 100));
    };
    ProblemSetComponent.prototype.calculatePercentCorrect = function () {
        return (Math.round(this.numCorrect / this.numAttempts * 100));
    };
    ProblemSetComponent.prototype.calculatePercentages = function () {
        this.percentComplete = this.calculatePercentComplete();
        this.percentCorrect = this.calculatePercentCorrect();
    };
    ProblemSetComponent.prototype.totalCurrentReps = function () {
        var num = 0;
        this.noneExpiredCards.forEach(function (card) {
            num += card.repOfTen || 0;
        });
        this.expiredCards.forEach(function (card) {
            num += card.repOfTen || 0;
        });
        return num;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', problem_set_1.ProblemSet)
    ], ProblemSetComponent.prototype, "problemSet", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', deck_1.Deck)
    ], ProblemSetComponent.prototype, "deck", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ProblemSetComponent.prototype, "complete", void 0);
    ProblemSetComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'problem-set-review',
            templateUrl: 'problem-set.component.html',
            animations: [
                core_1.trigger('result', [
                    core_1.state('standard', core_1.style({
                        visibility: 'hidden',
                        opacity: '0',
                        backgroundColor: 'green'
                    })),
                    core_1.state('success', core_1.style({
                        visibility: 'visible',
                        opacity: '1',
                        backgroundColor: 'green'
                    })),
                    core_1.state('failure', core_1.style({
                        visibility: 'visible',
                        opacity: '1',
                        backgroundColor: 'red'
                    })),
                    core_1.transition('standard <=> success', core_1.animate('500ms ease-in')),
                    core_1.transition('standard <=> failure', core_1.animate('500ms ease-in'))
                ])
            ]
        }), 
        __metadata('design:paramtypes', [deck_service_1.DeckService])
    ], ProblemSetComponent);
    return ProblemSetComponent;
}());
exports.ProblemSetComponent = ProblemSetComponent;
//# sourceMappingURL=problem-set.component.js.map