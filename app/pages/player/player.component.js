"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var PlayerComponent = (function () {
    function PlayerComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
    }
    PlayerComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    return PlayerComponent;
}());
PlayerComponent = __decorate([
    core_1.Component({
        selector: "player",
        templateUrl: "pages/player/player.html",
        styleUrls: ["pages/player/player.css"]
    }),
    __metadata("design:paramtypes", [nativescript_angular_1.RouterExtensions])
], PlayerComponent);
exports.PlayerComponent = PlayerComponent;
