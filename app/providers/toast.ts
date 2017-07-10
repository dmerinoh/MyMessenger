import { Injectable } from '@angular/core';
import * as toast from "nativescript-toasts";
/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class ToastUtils  {

  constructor() {
  }

  showMessage(message: string, position: string){
    let toastOptions: toast.ToastOptions = {
      text: message,
      duration: toast.DURATION.SHORT,
      position: position == 'top' ? toast.POSITION.TOP : toast.POSITION.BOTTOM
    };

    toast.show(toastOptions);
  }
}
