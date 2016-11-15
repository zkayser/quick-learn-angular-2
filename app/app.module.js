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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var ng2_ckeditor_1 = require('ng2-ckeditor');
var app_routing_1 = require('./app.routing');
var header_component_1 = require('./header.component');
var app_component_1 = require('./app.component');
var home_component_1 = require('./home/home.component');
var decks_module_1 = require('./decks/decks.module');
var dropdown_directive_1 = require('./dropdown.directive');
var card_review_component_1 = require('./decks/cards/card-review.component');
var subjects_module_1 = require('./subjects/subjects.module');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                router_1.RouterModule,
                app_routing_1.routing,
                decks_module_1.DecksModule,
                ng2_ckeditor_1.CKEditorModule,
                subjects_module_1.SubjectsModule
            ],
            declarations: [app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                home_component_1.HomeComponent,
                dropdown_directive_1.DropdownDirective,
                card_review_component_1.CardReviewComponent
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [
                app_routing_1.appRoutingProviders
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map