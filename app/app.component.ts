import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";

@Component({
  selector: "my-app",
  template: `
      <GridLayout>
          <page-router-outlet></page-router-outlet>
      </GridLayout>
  `
})
export class AppComponent {
  constructor(private routerExtensions: RouterExtensions) { }

  public goBack(){
    this.routerExtensions.back();
  }
}