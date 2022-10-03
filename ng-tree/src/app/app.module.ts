import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { TreeComponent } from './components/tree/tree.component';
import {NgxIndexedDBModule, DBConfig, NgxIndexedDBService} from 'ngx-indexed-db';

import {dummyNodesData} from "../assets/dummy-ndoes";
import {TreeService} from "./components/tree/tree.service";

export function migrationFactory() {
  return {
    1: (db: any, transaction: any) => {
      const store = transaction.objectStore('tree-nodes');
      store.createIndex('parent', 'parent', { unique: false });
    }
  };
}
const dbConfig: DBConfig  = {
  name: 'NgTreeAppDb',
  version: 5,
  objectStoresMeta: [{
    store: 'tree-nodes',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'parent', keypath: 'parent', options: { unique: false } },
      { name: 'value', keypath: 'value', options: { unique: false } }
    ]
  }],
  migrationFactory
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TreeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
