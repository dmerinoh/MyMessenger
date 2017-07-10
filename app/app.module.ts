import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { Page } from 'ui/page';

import { Settings } from "./providers/settings";
import { EmailComposer } from "./providers/email";
import { ToastUtils } from "./providers/toast";
import { ContactsUtils } from "./providers/contacts";

import { AppComponent } from "./app.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { routes, navigatableComponents } from "./app.routing";

import { SimpleTimer } from 'ng2-simple-timer';

@NgModule({
  imports: [
      NativeScriptModule,
      NativeScriptRouterModule,
      NativeScriptFormsModule,
      NativeScriptHttpModule,
      NativeScriptRouterModule.forRoot(routes)
  ],
  declarations: [AppComponent, navigatableComponents],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [Page, Settings, EmailComposer, ToastUtils, ContactsUtils, SimpleTimer],
  bootstrap: [AppComponent]
})
export class AppModule {}
