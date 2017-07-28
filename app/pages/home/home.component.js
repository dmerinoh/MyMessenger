"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_1 = require("data/observable");
var nativescript_angular_1 = require("nativescript-angular");
var nativescript_bottombar_1 = require("nativescript-bottombar");
nativescript_angular_1.registerElement('BottomBar', function () { return nativescript_bottombar_1.BottomBar; });
var HomeComponent = (function (_super) {
    __extends(HomeComponent, _super);
    function HomeComponent() {
        var _this = _super.call(this) || this;
        _this._items = [
            new nativescript_bottombar_1.BottomBarItem(0, "Home", "ic_home_black_24dp", "black"),
            new nativescript_bottombar_1.BottomBarItem(1, "Calendar", "ic_calendar", "#1083BF", new nativescript_bottombar_1.Notification("green", "blue", "")),
            new nativescript_bottombar_1.BottomBarItem(2, "Profile", "ic_collaborator", "pink", new nativescript_bottombar_1.Notification("pink", "yellow", "")),
            new nativescript_bottombar_1.BottomBarItem(3, "Message", "ic_paperplane", "green", new nativescript_bottombar_1.Notification("white", "red", "1"))
        ];
        _this.hidden = false;
        _this.colored = true;
        _this.titleState = 0 /* SHOW_WHEN_ACTIVE */;
        _this.inactiveColor = "white";
        _this.accentColor = "blue";
        return _this;
    }
    HomeComponent.prototype.tabSelected = function (args) {
        console.log(args.newIndex);
        if (args.newIndex !== args.oldIndex) {
            this._bar.setNotification("", args.newIndex);
        }
    };
    HomeComponent.prototype.tabLoaded = function (event) {
        this._bar = event.object;
        console.log('tabLoaded');
    };
    HomeComponent.prototype.selectItem = function () {
        this._bar.selectItem(0);
    };
    HomeComponent.prototype.getCurrentIndex = function () {
        console.log(this._bar.selectedIndex);
    };
    HomeComponent.prototype.toggleHide = function () {
        this.hidden = !this.hidden;
    };
    HomeComponent.prototype.toggleColored = function () {
        this.colored = !this.colored;
    };
    Object.defineProperty(HomeComponent.prototype, "hidden", {
        get: function () {
            return this._hidden;
        },
        set: function (value) {
            this._hidden = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "colored", {
        get: function () {
            return this._colored;
        },
        set: function (value) {
            this._colored = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "titleState", {
        get: function () {
            return this._titleState;
        },
        set: function (value) {
            this._titleState = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "bar", {
        get: function () {
            return this._bar;
        },
        set: function (value) {
            this._bar = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "inactiveColor", {
        get: function () {
            return this._inactiveColor;
        },
        set: function (value) {
            this._inactiveColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "accentColor", {
        get: function () {
            return this._accentColor;
        },
        set: function (value) {
            this._accentColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            this._items = value;
        },
        enumerable: true,
        configurable: true
    });
    return HomeComponent;
}(observable_1.Observable));
HomeComponent = __decorate([
    core_1.Component({
        selector: "home",
        templateUrl: "pages/home/home.html",
        styleUrls: ["pages/home/home.css"]
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);
exports.HomeComponent = HomeComponent;
