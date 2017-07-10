"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_1 = require("data/observable");
var email_1 = require("../../providers/email");
var toast_1 = require("../../providers/toast");
var nativescript_angular_1 = require("nativescript-angular");
var HomeComponent = (function (_super) {
    __extends(HomeComponent, _super);
    function HomeComponent(routerExtensions, toastUtils, emailComposer) {
        var _this = _super.call(this) || this;
        _this.routerExtensions = routerExtensions;
        _this.toastUtils = toastUtils;
        _this.emailComposer = emailComposer;
        return _this;
    }
    HomeComponent.prototype.goToAudio = function () {
        this.routerExtensions.navigate(['/audio']);
    };
    HomeComponent.prototype.goToContacts = function () {
        this.routerExtensions.navigate(['/contacts']);
    };
    HomeComponent.prototype.goToRecorder = function () {
        this.routerExtensions.navigate(['/recorder']);
    };
    HomeComponent.prototype.goToPlayer = function () {
        this.routerExtensions.navigate(['/player']);
    };
    HomeComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    return HomeComponent;
}(observable_1.Observable));
HomeComponent = __decorate([
    core_1.Component({
        selector: "home",
        templateUrl: "pages/home/home.html",
        styleUrls: ["pages/home/home.css"]
    }),
    __metadata("design:paramtypes", [nativescript_angular_1.RouterExtensions, toast_1.ToastUtils,
        email_1.EmailComposer])
], HomeComponent);
exports.HomeComponent = HomeComponent;
