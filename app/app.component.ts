import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";

@Component({
  selector: "my-app",
  template: `
      <page-router-outlet></page-router-outlet>
  `
})
export class AppComponent {
  constructor(private routerExtensions: RouterExtensions) { }

  public goBack(){
    this.routerExtensions.back();
  }
}