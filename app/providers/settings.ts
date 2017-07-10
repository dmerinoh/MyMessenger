import { Injectable } from '@angular/core';
import { SecureStorage } from "nativescript-secure-storage";

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class Settings {

  private storage: SecureStorage;

  constructor() {
    this.storage = new SecureStorage();

    let audioFormat: number = 3;
    this.getValue('audioFormat').then(value => {
      if(!value)
        this.setValue('audioFormat', audioFormat).then(() => {});
    });

    let audioEncoder: number = 1;
    this.getValue('audioEncoder').then(value => {
      if(!value)
        this.setValue('audioEncoder', audioEncoder).then(() => {});
    });

    let audioChannels: number = 1;
    this.getValue('audioChannels').then(value => {
      if(!value)
        this.setValue('audioChannels', audioChannels).then(() => {});
    });

    let audioSampleRate: number = 8000;
    this.getValue('audioSampleRate').then(value => {
      if(!value)
        this.setValue('audioSampleRate', audioSampleRate).then(() => {});
    });

    let audioBitRate: number = 8;
    this.getValue('audioBitRate').then(value => {
      if(!value)
        this.setValue('audioBitRate', audioBitRate).then(() => {});
    });

    let audioMaxDuration: number = 120000;
    this.getValue('audioMaxDuration').then(value => {
      if(!value)
        this.setValue('audioMaxDuration', audioMaxDuration).then(() => {});
    });
  }

  setValue(key: string, value: any) {
    return this.storage.set({key: key, value: value});
  }

  getValue(key: string) {
    return this.storage.get({key: key});
  }
}
