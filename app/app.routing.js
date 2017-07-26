"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_component_1 = require("./pages/home/home.component");
var contacts_component_1 = require("./pages/contacts/contacts.component");
var audio_component_1 = require("./pages/audio/audio.component");
var recorder_component_1 = require("./pages/recorder/recorder.component");
var player_component_1 = require("./pages/player/player.component");
var tabs_1 = require("./pages/tabs/tabs");
exports.routes = [
    { path: "", component: tabs_1.TabsComponent },
    { path: "home", component: home_component_1.HomeComponent },
    { path: "contacts", component: contacts_component_1.ContactsComponent },
    { path: "audio", component: audio_component_1.AudioComponent },
    { path: "recorder", component: recorder_component_1.RecorderComponent },
    { path: "player", component: player_component_1.PlayerComponent }
];
exports.navigatableComponents = [
    tabs_1.TabsComponent,
    home_component_1.HomeComponent,
    contacts_component_1.ContactsComponent,
    audio_component_1.AudioComponent,
    recorder_component_1.RecorderComponent,
    player_component_1.PlayerComponent
];
