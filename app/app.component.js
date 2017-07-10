"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var AppComponent = (function () {
    function AppComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
    }
    AppComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        template: "\n      <page-router-outlet></page-router-outlet>\n  "
    }),
    __metadata("design:paramtypes", [nativescript_angular_1.RouterExtensions])
], AppComponent);
exports.AppComponent = AppComponent;
