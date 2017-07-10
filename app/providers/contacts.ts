import { Injectable } from '@angular/core';
import { Settings } from "./settings";

import * as contacts from "nativescript-contacts";

import { Contact } from "../models/contact";
/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class ContactsUtils  {

  private _contactList: Array<Contact>;
  private _currentContact: Contact;

  constructor(private settings: Settings) {
    this._contactList = new Array<Contact>();
    this._currentContact = new Contact();

    this.pupulate();
  }

  pupulate(){
    let contact1: Contact = new Contact();
    contact1.id = '01';
    contact1.nickname = 'Lila';
    contact1.email = 'lila1982@nauta.cu';
    this.contactList.push(contact1);

    let contact2: Contact = new Contact();
    contact2.id = '02';
    contact2.nickname = 'Diosmani';
    contact2.email = 'dmerinoh@nauta.cu';
    this.contactList.push(contact2);

    this.settings.setValue('contactList', this.contactList);
  }

  get contactList(): Contact[] {
    this.settings.getValue('contactList').then(value => {
      this._contactList = value;
    });

    return this._contactList;
  }

  set contactList(value: Contact[]) {
    this._contactList = value;
  }

  get currentContact(): Contact {
    return this._currentContact;
  }

  set currentContact(value: Contact) {
    this._currentContact = value;
  }
}
