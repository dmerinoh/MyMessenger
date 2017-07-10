import { HomeComponent } from "./pages/home/home.component";
import { ContactsComponent } from "./pages/contacts/contacts.component";
import { AudioComponent } from "./pages/audio/audio.component";
import { RecorderComponent } from "./pages/recorder/recorder.component";
import { PlayerComponent } from "./pages/player/player.component";

export const routes = [
    { path: "home", component: HomeComponent },
    { path: "", component: ContactsComponent },
    { path: "audio", component: AudioComponent },
    { path: "recorder", component: RecorderComponent },
    { path: "player", component: PlayerComponent }
];

export const navigatableComponents = [
    HomeComponent,
    ContactsComponent,
    AudioComponent,
    RecorderComponent,
    PlayerComponent
];