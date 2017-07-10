import { Component } from "@angular/core";
import {RouterExtensions} from "nativescript-angular";

@Component({
  selector: "player",
  templateUrl: "pages/player/player.html",
  styleUrls: ["pages/player/player.css"]
})
export class PlayerComponent {

  constructor(private routerExtensions: RouterExtensions){
  }

  public goBack(){
    this.routerExtensions.back();
  }
}