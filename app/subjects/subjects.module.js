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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var subject_list_component_1 = require('./subject-list.component');
var subject_service_1 = require('./subject.service');
var subject_form_component_1 = require('./subject-form.component');
var subject_show_component_1 = require('./subject-show.component');
var new_subject_deck_component_1 = require('./new-subject-deck.component');
var SubjectsModule = (function () {
    function SubjectsModule() {
    }
    SubjectsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule
            ],
            declarations: [
                subject_list_component_1.SubjectListComponent,
                subject_form_component_1.SubjectFormComponent,
                subject_show_component_1.SubjectShowComponent,
                new_subject_deck_component_1.NewSubjectDeckComponent
            ],
            providers: [subject_service_1.SubjectService]
        }), 
        __metadata('design:paramtypes', [])
    ], SubjectsModule);
    return SubjectsModule;
}());
exports.SubjectsModule = SubjectsModule;
//# sourceMappingURL=subjects.module.js.map