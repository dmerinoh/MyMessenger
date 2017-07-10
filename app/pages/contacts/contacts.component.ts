import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { ContactsUtils } from "../../providers/contacts";

import { Contact } from "../../models/contact";

@Component({
  selector: "contacts",
  templateUrl: "pages/contacts/contacts.html",
  styleUrls: ["pages/contacts/contacts.css"]
})
export class ContactsComponent implements OnInit{

  public contactList: Array<Contact>;

  constructor(private contactsUtils: ContactsUtils, private routerExtensions: RouterExtensions){
    this.contactList = new Array<Contact>();
  }

  ngOnInit(): void {
    this.contactList = this.contactsUtils.contactList;
  }

  public onItemTap(args) {
    let tappedView: any = args.view;
    let contact: Contact = tappedView.bindingContext;
    this.contactsUtils.currentContact = contact;
    this.routerExtensions.navigate(['/audio']);
  }

  public goBack(){
    this.routerExtensions.back();
  }
}