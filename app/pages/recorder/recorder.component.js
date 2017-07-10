"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var RecorderComponent = (function () {
    function RecorderComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
    }
    RecorderComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    return RecorderComponent;
}());
RecorderComponent = __decorate([
    core_1.Component({
        selector: "recorder",
        templateUrl: "pages/recorder/recorder.html",
        styleUrls: ["pages/recorder/recorder.css"]
    }),
    __metadata("design:paramtypes", [nativescript_angular_1.RouterExtensions])
], RecorderComponent);
exports.RecorderComponent = RecorderComponent;
