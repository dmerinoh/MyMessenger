"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var settings_1 = require("./settings");
var contact_1 = require("../models/contact");
/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
var ContactsUtils = (function () {
    function ContactsUtils(settings) {
        this.settings = settings;
        this._contactList = new Array();
        this._currentContact = new contact_1.Contact();
        this.pupulate();
    }
    ContactsUtils.prototype.pupulate = function () {
        var contact1 = new contact_1.Contact();
        contact1.id = '01';
        contact1.nickname = 'Lila';
        contact1.email = 'lila1982@nauta.cu';
        this.contactList.push(contact1);
        var contact2 = new contact_1.Contact();
        contact2.id = '02';
        contact2.nickname = 'Diosmani';
        contact2.email = 'dmerinoh@nauta.cu';
        this.contactList.push(contact2);
        this.settings.setValue('contactList', this.contactList);
    };
    Object.defineProperty(ContactsUtils.prototype, "contactList", {
        get: function () {
            var _this = this;
            this.settings.getValue('contactList').then(function (value) {
                _this._contactList = value;
            });
            return this._contactList;
        },
        set: function (value) {
            this._contactList = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactsUtils.prototype, "currentContact", {
        get: function () {
            return this._currentContact;
        },
        set: function (value) {
            this._currentContact = value;
        },
        enumerable: true,
        configurable: true
    });
    return ContactsUtils;
}());
ContactsUtils = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [settings_1.Settings])
], ContactsUtils);
exports.ContactsUtils = ContactsUtils;
