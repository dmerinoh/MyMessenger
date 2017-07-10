"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var page_1 = require("ui/page");
var settings_1 = require("./providers/settings");
var email_1 = require("./providers/email");
var toast_1 = require("./providers/toast");
var contacts_1 = require("./providers/contacts");
var app_component_1 = require("./app.component");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("nativescript-angular/http");
var router_1 = require("nativescript-angular/router");
var app_routing_1 = require("./app.routing");
var ng2_simple_timer_1 = require("ng2-simple-timer");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            nativescript_module_1.NativeScriptModule,
            router_1.NativeScriptRouterModule,
            forms_1.NativeScriptFormsModule,
            http_1.NativeScriptHttpModule,
            router_1.NativeScriptRouterModule.forRoot(app_routing_1.routes)
        ],
        declarations: [app_component_1.AppComponent, app_routing_1.navigatableComponents],
        schemas: [core_1.NO_ERRORS_SCHEMA],
        providers: [page_1.Page, settings_1.Settings, email_1.EmailComposer, toast_1.ToastUtils, contacts_1.ContactsUtils, ng2_simple_timer_1.SimpleTimer],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
