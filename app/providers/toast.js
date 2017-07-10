"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var toast = require("nativescript-toasts");
/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
var ToastUtils = (function () {
    function ToastUtils() {
    }
    ToastUtils.prototype.showMessage = function (message, position) {
        var toastOptions = {
            text: message,
            duration: toast.DURATION.SHORT,
            position: position == 'top' ? toast.POSITION.TOP : toast.POSITION.BOTTOM
        };
        toast.show(toastOptions);
    };
    return ToastUtils;
}());
ToastUtils = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ToastUtils);
exports.ToastUtils = ToastUtils;
