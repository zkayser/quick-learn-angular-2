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
var MathJaxDirective = (function () {
    function MathJaxDirective(elRef) {
        this.elRef = elRef;
    }
    MathJaxDirective.prototype.ngOnInit = function () {
        this.elRef.nativeElement.innerHtml = this.mathString;
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.elRef.nativeElement]);
    };
    MathJaxDirective.prototype.ngOnChanges = function () {
        console.log('>> ngOnChanges');
        this.elRef.nativeElement.innerHtml = this.mathString;
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.elRef.nativeElement]);
    };
    __decorate([
        core_1.Input('MathJax'), 
        __metadata('design:type', String)
    ], MathJaxDirective.prototype, "mathString", void 0);
    MathJaxDirective = __decorate([
        core_1.Directive({
            selector: '[MathJax]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], MathJaxDirective);
    return MathJaxDirective;
}());
exports.MathJaxDirective = MathJaxDirective;
//# sourceMappingURL=mathjax.directive.js.map