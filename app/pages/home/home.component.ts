import { Component } from "@angular/core";
import { Page } from 'ui/page';
import { Observable } from 'data/observable';
import { EmailComposer } from "../../providers/email";
import { ToastUtils } from "../../providers/toast";
import { AudioUtils } from "../../providers/audio";
import { RouterExtensions } from "nativescript-angular";

@Component({
    selector: "home",
    templateUrl: "pages/home/home.html",
    styleUrls: ["pages/home/home.css"]
})
export class HomeComponent extends Observable {
    constructor(private routerExtensions: RouterExtensions, private toastUtils: ToastUtils,
                private emailComposer: EmailComposer) {
        super();
    }

    public goToAudio() {
        this.routerExtensions.navigate(['/audio']);
    }

    public goToContacts() {
        this.routerExtensions.navigate(['/contacts']);
    }

    public goToRecorder() {
        this.routerExtensions.navigate(['/recorder']);
    }

    public goToPlayer() {
        this.routerExtensions.navigate(['/player']);
    }

    public goBack(){
        this.routerExtensions.back();
    }
}