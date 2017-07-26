import { HomeComponent } from "./pages/home/home.component";
import { ContactsComponent } from "./pages/contacts/contacts.component";
import { AudioComponent } from "./pages/audio/audio.component";
import { RecorderComponent } from "./pages/recorder/recorder.component";
import { PlayerComponent } from "./pages/player/player.component";
import { TabsComponent } from "./pages/tabs/tabs";

export const routes = [
    { path: "", component: TabsComponent },
    { path: "home", component: HomeComponent },
    { path: "contacts", component: ContactsComponent },
    { path: "audio", component: AudioComponent },
    { path: "recorder", component: RecorderComponent },
    { path: "player", component: PlayerComponent }
];

export const navigatableComponents = [
    TabsComponent,
    HomeComponent,
    ContactsComponent,
    AudioComponent,
    RecorderComponent,
    PlayerComponent
];