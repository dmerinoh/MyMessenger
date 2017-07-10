import {Injectable} from '@angular/core';

import * as email from "nativescript-email";
import {ToastUtils} from "./toast";
/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class EmailComposer {

    private to: string[] = [];
    private cc: string[] = [];
    private subject: string;
    private body: string;
    private attachments: Array<email.Attachment>;
    private composeOptions: email.ComposeOptions;

    constructor(private toastUtils: ToastUtils) {
        this.attachments = new Array<email.Attachment>();
    }

    isAvailable() {
        return email.available();
    }

    sendEmail() {
        let self = this;

        self.composeOptions = {
            to: self.to,
            cc: self.cc,
            subject: self.subject,
            body: self.body,
            attachments: self.attachments
        }

        //self.isAvailable().then(available => {
        email.compose(self.composeOptions).then(result => {
            if (result) {
                this.toastUtils.showMessage('Email sent.', 'top');
            } else {
                this.toastUtils.showMessage('Email not sent.', 'top');
            }
        }, error => {
            this.toastUtils.showMessage(error, 'top');
        }).catch(error => {
            this.toastUtils.showMessage(error, 'top');
        });
    }

    setTo(_to: string) {
        this.to.push(_to);
    }

    setCc(_cc: string) {
        this.cc.push(_cc);
    }

    setSubject(_subject: string) {
        this.subject = _subject;
    }

    setBody(_body: string) {
        this.body = _body;
    }

    addAttachments(_name: string, path: string) {
        let _attachment: email.Attachment = {
            fileName: _name,
            path: path,
            mimeType: 'audio/3gp'
        };
        this.attachments.push(_attachment);
    }

}
