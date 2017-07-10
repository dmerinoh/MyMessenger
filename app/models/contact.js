"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Contact = (function () {
    function Contact() {
        var _this = this;
        this.toString = function () {
            return _this.nickname + ': ' + _this.email;
        };
    }
    Object.defineProperty(Contact.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "nickname", {
        get: function () {
            return this._nickname;
        },
        set: function (value) {
            this._nickname = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (value) {
            this._fullName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (value) {
            this._email = value;
        },
        enumerable: true,
        configurable: true
    });
    return Contact;
}());
exports.Contact = Contact;
