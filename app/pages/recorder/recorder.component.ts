import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";

@Component({
  selector: "recorder",
  templateUrl: "pages/recorder/recorder.html",
  styleUrls: ["pages/recorder/recorder.css"]
})
export class RecorderComponent {

  constructor(private routerExtensions: RouterExtensions){
  }

  public goBack(){
    this.routerExtensions.back();
  }
}