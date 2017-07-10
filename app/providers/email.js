"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var email = require("nativescript-email");
var toast_1 = require("./toast");
/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
var EmailComposer = (function () {
    function EmailComposer(toastUtils) {
        this.toastUtils = toastUtils;
        this.to = [];
        this.cc = [];
        this.attachments = new Array();
    }
    EmailComposer.prototype.isAvailable = function () {
        return email.available();
    };
    EmailComposer.prototype.sendEmail = function () {
        var _this = this;
        var self = this;
        self.composeOptions = {
            to: self.to,
            cc: self.cc,
            subject: self.subject,
            body: self.body,
            attachments: self.attachments
        };
        //self.isAvailable().then(available => {
        email.compose(self.composeOptions).then(function (result) {
            if (result) {
                _this.toastUtils.showMessage('Email sent.', 'top');
            }
            else {
                _this.toastUtils.showMessage('Email not sent.', 'top');
            }
        }, function (error) {
            _this.toastUtils.showMessage(error, 'top');
        }).catch(function (error) {
            _this.toastUtils.showMessage(error, 'top');
        });
    };
    EmailComposer.prototype.setTo = function (_to) {
        this.to.push(_to);
    };
    EmailComposer.prototype.setCc = function (_cc) {
        this.cc.push(_cc);
    };
    EmailComposer.prototype.setSubject = function (_subject) {
        this.subject = _subject;
    };
    EmailComposer.prototype.setBody = function (_body) {
        this.body = _body;
    };
    EmailComposer.prototype.addAttachments = function (_name, path) {
        var _attachment = {
            fileName: _name,
            path: path,
            mimeType: 'audio/3gp'
        };
        this.attachments.push(_attachment);
    };
    return EmailComposer;
}());
EmailComposer = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [toast_1.ToastUtils])
], EmailComposer);
exports.EmailComposer = EmailComposer;
