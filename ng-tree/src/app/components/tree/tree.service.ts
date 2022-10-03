import { Injectable } from '@angular/core';
import {Observable, forkJoin } from 'rxjs';
import {ITreeNode} from './tree.component';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import {dummyNodesData} from '../../../assets/dummy-ndoes';

const STORE_NAME = 'tree-nodes';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  constructor(private dbService: NgxIndexedDBService) {
  }

  loadDummyMockData(): Observable<any> {
    dummyNodesData.filter(node => node)

    return this.dbService.bulkAdd(STORE_NAME, dummyNodesData.map(node => node));
  }

  getParentNode(): Observable<ITreeNode> {
    return this.dbService.getByIndex(STORE_NAME, 'parent', 0);
  }

  getRootNodes(id: number): Observable<ITreeNode[]> {
    return this.dbService.getAllByIndex(STORE_NAME, 'parent', IDBKeyRange.only(id));
  }

  updateNode(node: ITreeNode): Observable<any> {
    return this.dbService.update(STORE_NAME, node);
  }
}
