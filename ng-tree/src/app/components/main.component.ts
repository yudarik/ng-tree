import { Component, OnInit } from '@angular/core';
import {TreeService} from './tree/tree.service';
import {ITreeNode} from './tree/tree.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [TreeService]
})
export class MainComponent implements OnInit {

  public parentNodes: ITreeNode[] | undefined;

  constructor(private service: TreeService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.service.getRootNodes(0).subscribe((nodes: ITreeNode[]) => {
      if (nodes.length)
        this.parentNodes = nodes;
      else
        this.service.loadDummyMockData().subscribe(count => {
          if (count) {
            this.loadData();
          }
        }, (err) => {
          console.log(err);
        });
    }, (err) => {
      console.log(err);
    });
  }

}
