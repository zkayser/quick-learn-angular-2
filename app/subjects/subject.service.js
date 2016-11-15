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
var SubjectService = (function () {
    function SubjectService(http) {
        this.http = http;
        this.apiKey = 'bJm46fpjBZ97JnmI_6cIa3b9S6udG9AB';
        this.decksUrl = 'https://api.mlab.com/api/1/databases/quick-learn/collections/decks';
        this.subjectsUrl = 'https://api.mlab.com/api/1/databases/quick-learn/collections/subjects';
    }
    SubjectService.prototype.getSubjects = function () {
        return this.http.get(this.subjectsUrl + '?apiKey=' + this.apiKey)
            .map(function (response) { return response.json(); });
    };
    SubjectService.prototype.getSubject = function (id) {
        var subject$ = this.http.get(this.subjectsUrl + '/' + id + '?apiKey=' + this.apiKey)
            .map(function (response) { return response.json(); });
        return subject$;
    };
    SubjectService.prototype.addSubject = function (subject) {
        var body = JSON.stringify({ subject: subject });
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.subjectsUrl + '?apiKey=' + this.apiKey, body, options)
            .map(function (res) { return res.json(); });
    };
    SubjectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SubjectService);
    return SubjectService;
}());
exports.SubjectService = SubjectService;
//# sourceMappingURL=subject.service.js.map