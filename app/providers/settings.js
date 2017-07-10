"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_secure_storage_1 = require("nativescript-secure-storage");
/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
var Settings = (function () {
    function Settings() {
        var _this = this;
        this.storage = new nativescript_secure_storage_1.SecureStorage();
        var audioFormat = 3;
        this.getValue('audioFormat').then(function (value) {
            if (!value)
                _this.setValue('audioFormat', audioFormat).then(function () { });
        });
        var audioEncoder = 1;
        this.getValue('audioEncoder').then(function (value) {
            if (!value)
                _this.setValue('audioEncoder', audioEncoder).then(function () { });
        });
        var audioChannels = 1;
        this.getValue('audioChannels').then(function (value) {
            if (!value)
                _this.setValue('audioChannels', audioChannels).then(function () { });
        });
        var audioSampleRate = 8000;
        this.getValue('audioSampleRate').then(function (value) {
            if (!value)
                _this.setValue('audioSampleRate', audioSampleRate).then(function () { });
        });
        var audioBitRate = 8;
        this.getValue('audioBitRate').then(function (value) {
            if (!value)
                _this.setValue('audioBitRate', audioBitRate).then(function () { });
        });
        var audioMaxDuration = 120000;
        this.getValue('audioMaxDuration').then(function (value) {
            if (!value)
                _this.setValue('audioMaxDuration', audioMaxDuration).then(function () { });
        });
    }
    Settings.prototype.setValue = function (key, value) {
        return this.storage.set({ key: key, value: value });
    };
    Settings.prototype.getValue = function (key) {
        return this.storage.get({ key: key });
    };
    return Settings;
}());
Settings = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], Settings);
exports.Settings = Settings;
