import { Injectable } from '@angular/core';

/*
  Generated class for the LetconnectServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LetconnectServiceProvider {

  items = [];

  constructor() {
    console.log('Hello LetconnectServiceProvider Provider');
  }

  getItems(){
    return this.items;
  }

  removeItem(index) {
    this.items.splice(index, 1);
  }

  addItem(item) {
    this.items.push(item);
  }

  editItem(item, index) {
    this.items[index] = item;
  }
}

