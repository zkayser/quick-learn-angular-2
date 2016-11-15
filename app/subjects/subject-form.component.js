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
var subject_1 = require('./subject');
var subject_service_1 = require('./subject.service');
var SubjectFormComponent = (function () {
    function SubjectFormComponent(subjectService, router) {
        this.subjectService = subjectService;
        this.router = router;
        this.subject = new subject_1.Subject();
    }
    SubjectFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.subjectService.addSubject(this.subject).subscribe(function (data) {
            _this.result = data;
            _this.subject.id = data._id.$oid;
            _this.router.navigate(['/subjects', _this.subject.id]);
        }, function (err) { return console.log(err); }, function () { return console.log('subject added'); });
    };
    SubjectFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'subject-form',
            templateUrl: 'subject-form.component.html'
        }), 
        __metadata('design:paramtypes', [subject_service_1.SubjectService, router_1.Router])
    ], SubjectFormComponent);
    return SubjectFormComponent;
}());
exports.SubjectFormComponent = SubjectFormComponent;
//# sourceMappingURL=subject-form.component.js.map