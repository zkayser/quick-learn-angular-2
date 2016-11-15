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
var ProblemSetListComponent = (function () {
    function ProblemSetListComponent() {
        this.goBack = new core_1.EventEmitter();
        this.trainingMode = false;
    }
    ProblemSetListComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('Inspect problem sets: ' + this.problemSets);
        this.problemSets.forEach(function (problemSet) {
            _this.checkForUnexpire(problemSet);
            if (problemSet.cards.every(function (card) { return card.temporaryExpire; })) {
                problemSet.status = 'Complete';
            }
            else {
                problemSet.status = 'Ready';
            }
        });
    };
    ProblemSetListComponent.prototype.completed = function (problemSet) {
        var numberTemporaryExpired = 0;
        problemSet.cards.forEach(function (card) {
            if (card.temporaryExpire) {
                numberTemporaryExpired++;
            }
        });
        return numberTemporaryExpired;
    };
    ProblemSetListComponent.prototype.onTrain = function (index) {
        this.trainingMode = !this.trainingMode;
        this.inTraining = this.problemSets[index];
    };
    ProblemSetListComponent.prototype.onComplete = function (problemSet) {
        this.trainingMode = !this.trainingMode;
        problemSet.status = 'Complete';
        this.inTraining = null;
    };
    ProblemSetListComponent.prototype.backToDeckOverview = function () {
        this.goBack.emit(null);
    };
    // Following 2 methods essentially copied from the problem set detail component typescript file
    ProblemSetListComponent.prototype.unexpireCard = function (card) {
        var updatedDate = new Date(card.lastUpdated);
        var now = new Date();
        var yesterday = now.setHours(now.getHours() - 24);
        if (updatedDate < yesterday) {
            card.temporaryExpire = false;
            card.repOfTen = 0;
        }
        if (card.temporaryExpire === undefined || card.temporaryExpire === null) {
            card.temporaryExpire = false;
        }
    };
    ProblemSetListComponent.prototype.checkForUnexpire = function (problemSet) {
        var _this = this;
        problemSet.cards.forEach(function (card) {
            _this.unexpireCard(card);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ProblemSetListComponent.prototype, "problemSets", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', deck_1.Deck)
    ], ProblemSetListComponent.prototype, "deck", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ProblemSetListComponent.prototype, "goBack", void 0);
    ProblemSetListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'problem-set-list',
            templateUrl: 'problem-set-list.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ProblemSetListComponent);
    return ProblemSetListComponent;
}());
exports.ProblemSetListComponent = ProblemSetListComponent;
//# sourceMappingURL=problem-set-list.component.js.map