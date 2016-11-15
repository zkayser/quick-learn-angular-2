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
var deck_service_1 = require('../decks/deck.service');
var subject_service_1 = require('./subject.service');
var SubjectShowComponent = (function () {
    function SubjectShowComponent(route, subjectService, deckService, router) {
        this.route = route;
        this.subjectService = subjectService;
        this.deckService = deckService;
        this.router = router;
    }
    SubjectShowComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.decks = [];
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.subjectService.getSubject(_this.id).subscribe(function (data) {
                _this.subject = data.subject;
                _this.subject.id = _this.id;
            });
            _this.deckService.getDecks().subscribe(function (data) {
                console.log(data);
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var d = data_1[_i];
                    var deck = d.deck;
                    var id = d._id.$oid;
                    deck.id = id;
                    if (deck.subjectId === _this.id) {
                        _this.decks.push(deck);
                        console.log(_this.decks);
                    }
                }
            });
        });
    };
    SubjectShowComponent.prototype.onSelect = function (deck) {
        this.router.navigate(['/decks', deck.id]);
    };
    SubjectShowComponent.prototype.newDeck = function (subjectId) {
        this.router.navigate(['/new-subject-deck', subjectId]);
    };
    SubjectShowComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'subject-show',
            templateUrl: 'subject-show.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, subject_service_1.SubjectService, deck_service_1.DeckService, router_1.Router])
    ], SubjectShowComponent);
    return SubjectShowComponent;
}());
exports.SubjectShowComponent = SubjectShowComponent;
//# sourceMappingURL=subject-show.component.js.map