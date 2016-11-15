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
var forms_1 = require('@angular/forms');
var platform_browser_1 = require('@angular/platform-browser');
exports.TinyMceValueAccessor = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return TinyMceDirective; }),
    multi: true
};
var TinyMceDirective = (function () {
    function TinyMceDirective(sanitizer) {
        this.sanitizer = sanitizer;
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
        this.init = false;
        this.uniqueId = "tinymce-host-" + TinyMceDirective.nextUniqueId++;
    }
    Object.defineProperty(TinyMceDirective.prototype, "value", {
        //get accessor
        get: function () {
            return this.innerValue;
        },
        //set accessor including call the onchange callback
        set: function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    TinyMceDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        console.log('tinymce');
        tinymce.init({
            selector: "[data-tinymce-uniqueid=" + this.uniqueId + "]",
            schema: 'html5',
            setup: function (ed) {
                ed.on('init', function (ed2) {
                    if (_this.innerValue)
                        ed2.target.setContent(_this.innerValue);
                    _this.init = true;
                });
            }
        });
        // I chose to send an update on blur, you may choose otherwise
        tinymce.activeEditor.on('blur', function () { return _this.updateValue(); });
    };
    TinyMceDirective.prototype.updateValue = function () {
        var content = tinymce.activeEditor.getContent();
        this.value = this.sanitizer.bypassSecurityTrustHtml(content);
    };
    TinyMceDirective.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
            if (this.init && value)
                tinymce.activeEditor.setContent(value);
        }
    };
    TinyMceDirective.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    TinyMceDirective.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    TinyMceDirective.prototype.ngOnDestroy = function () {
        if (this.init)
            tinymce.remove("[data-tinymce-uniqueid=" + this.uniqueId + "]");
    };
    TinyMceDirective.nextUniqueId = 0;
    __decorate([
        core_1.HostBinding('attr.data-tinymce-uniqueId'), 
        __metadata('design:type', Object)
    ], TinyMceDirective.prototype, "uniqueId", void 0);
    TinyMceDirective = __decorate([
        core_1.Directive({
            selector: '[htmlEditor]',
            providers: [exports.TinyMceValueAccessor]
        }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizer])
    ], TinyMceDirective);
    return TinyMceDirective;
}());
exports.TinyMceDirective = TinyMceDirective;
//# sourceMappingURL=tiny-editor.directive.js.map