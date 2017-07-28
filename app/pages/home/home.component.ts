import { Component } from "@angular/core";
import { Observable } from 'data/observable';
import { registerElement, RouterExtensions } from "nativescript-angular";
import { BottomBar, BottomBarItem, TITLE_STATE, SelectedIndexChangedEventData, Notification } from 'nativescript-bottombar';

registerElement('BottomBar', () => BottomBar);

@Component({
    selector: "home",
    templateUrl: "pages/home/home.html",
    styleUrls: ["pages/home/home.css"]
})
export class HomeComponent extends Observable {

    private _hidden: boolean;
    private _colored: boolean;
    private _titleState: TITLE_STATE;
    private _bar: BottomBar;
    private _inactiveColor: string;
    private _accentColor: string;

    private _items: Array<BottomBarItem> = [
        new BottomBarItem(0, "Home", "ic_home_black_24dp", "black"),
        new BottomBarItem(1, "Calendar", "ic_calendar", "#1083BF", new Notification("green", "blue", "")),
        new BottomBarItem(2, "Profile", "ic_collaborator", "pink", new Notification("pink", "yellow", "")),
        new BottomBarItem(3, "Message", "ic_paperplane", "green", new Notification("white", "red", "1"))
    ];

    constructor() {
        super();
        this.hidden = false;
        this.colored = true;
        this.titleState = TITLE_STATE.SHOW_WHEN_ACTIVE;
        this.inactiveColor = "white";
        this.accentColor = "blue";
    }

    tabSelected(args: SelectedIndexChangedEventData) {
        console.log(args.newIndex);
        if (args.newIndex !== args.oldIndex) {
            this._bar.setNotification("", args.newIndex);
        }
    }

    tabLoaded(event) {
        this._bar = <BottomBar>event.object
        console.log('tabLoaded');
    }
    selectItem() {
        this._bar.selectItem(0);
    }

    getCurrentIndex() {
        console.log(this._bar.selectedIndex);
    }

    toggleHide() {
        this.hidden = !this.hidden;
    }

    toggleColored() {
        this.colored = !this.colored;
    }

    get hidden(): boolean {
        return this._hidden;
    }

    set hidden(value: boolean) {
        this._hidden = value;
    }

    get colored(): boolean {
        return this._colored;
    }

    set colored(value: boolean) {
        this._colored = value;
    }

    get titleState(): TITLE_STATE {
        return this._titleState;
    }

    set titleState(value: TITLE_STATE) {
        this._titleState = value;
    }

    get bar(): BottomBar {
        return this._bar;
    }

    set bar(value: BottomBar) {
        this._bar = value;
    }

    get inactiveColor(): string {
        return this._inactiveColor;
    }

    set inactiveColor(value: string) {
        this._inactiveColor = value;
    }

    get accentColor(): string {
        return this._accentColor;
    }

    set accentColor(value: string) {
        this._accentColor = value;
    }

    get items(): Array<BottomBarItem> {
        return this._items;
    }

    set items(value: Array<BottomBarItem>) {
        this._items = value;
    }
}