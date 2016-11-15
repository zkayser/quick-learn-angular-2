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
var subject_service_1 = require('./subject.service');
var SubjectListComponent = (function () {
    function SubjectListComponent(subjectService, router) {
        this.subjectService = subjectService;
        this.router = router;
        this.strings = ['cool', 'stuff'];
    }
    SubjectListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subjects = [];
        this.sub = this.subjectService.getSubjects().subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var d = data_1[_i];
                var subject = d.subject;
                var id = d._id.$oid;
                subject.id = id;
                _this.subjects.push(subject);
                console.log('Retrieved subjects...');
            }
        });
    };
    SubjectListComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    SubjectListComponent.prototype.onNewSubject = function () {
        this.router.navigate(['/new-subject']);
    };
    SubjectListComponent.prototype.goToSubject = function (id) {
        this.router.navigate(['/subjects', id]);
    };
    SubjectListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'subject-list',
            templateUrl: 'subject-list.component.html',
            styles: ["\n            .panel-primary .panel-heading {\n              background-color: #df691a;\n            }\n          "]
        }), 
        __metadata('design:paramtypes', [subject_service_1.SubjectService, router_1.Router])
    ], SubjectListComponent);
    return SubjectListComponent;
}());
exports.SubjectListComponent = SubjectListComponent;
//# sourceMappingURL=subject-list.component.js.map