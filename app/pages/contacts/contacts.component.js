"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var contacts_1 = require("../../providers/contacts");
var ContactsComponent = (function () {
    function ContactsComponent(contactsUtils, routerExtensions) {
        this.contactsUtils = contactsUtils;
        this.routerExtensions = routerExtensions;
        this.contactList = new Array();
    }
    ContactsComponent.prototype.ngOnInit = function () {
        this.contactList = this.contactsUtils.contactList;
    };
    ContactsComponent.prototype.onItemTap = function (args) {
        var tappedView = args.view;
        var contact = tappedView.bindingContext;
        this.contactsUtils.currentContact = contact;
        this.routerExtensions.navigate(['/audio']);
    };
    ContactsComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    return ContactsComponent;
}());
ContactsComponent = __decorate([
    core_1.Component({
        selector: "contacts",
        templateUrl: "pages/contacts/contacts.html",
        styleUrls: ["pages/contacts/contacts.css"]
    }),
    __metadata("design:paramtypes", [contacts_1.ContactsUtils, nativescript_angular_1.RouterExtensions])
], ContactsComponent);
exports.ContactsComponent = ContactsComponent;
