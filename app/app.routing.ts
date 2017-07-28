import { HomeComponent } from "./pages/home/home.component";
import { ContactsComponent } from "./pages/contacts/contacts.component";
import { AudioComponent } from "./pages/audio/audio.component";
import { RecorderComponent } from "./pages/recorder/recorder.component";
import { PlayerComponent } from "./pages/player/player.component";
import { TabsComponent } from "./pages/tabs/tabs";
//import { BottomBarComponent } from "./pages/bottombar/bottombar";

export const routes = [
    //{ path: "", component: BottomBarComponent },
    { path: "tabs", component: TabsComponent },
    { path: "", component: HomeComponent },
    { path: "contacts", component: ContactsComponent },
    { path: "audio", component: AudioComponent },
    { path: "recorder", component: RecorderComponent },
    { path: "player", component: PlayerComponent }
];

export const navigatableComponents = [
    TabsComponent,
    //BottomBarComponent,
    HomeComponent,
    ContactsComponent,
    AudioComponent,
    RecorderComponent,
    PlayerComponent
];