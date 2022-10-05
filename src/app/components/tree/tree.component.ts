import {Component, Input, OnInit} from '@angular/core';
import {TreeService} from './tree.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


export interface ITreeNode {
  id?: number;
  parent?: number | null;
  value?: string;
}

@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  @Input() level: number | undefined;
  @Input() root!: ITreeNode;

  public nodes: ITreeNode[] = [];
  public isExpanded = false;
  public hasChildren = false;
  public editFormVisible: boolean | undefined;
  public newNodeFormVisible: boolean | undefined;
  public nodeEditForm: FormGroup;

  constructor(private service: TreeService, private fb: FormBuilder) {
    this.nodeEditForm = fb.group({
      value: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    if (this.root && this.root.id) {
      this.service.getRootNodes(this.root.id).subscribe((nodes: ITreeNode[]) => {
        this.hasChildren = nodes.length > 0;
        this.nodes = nodes;
      });
    }
  }

  toggleCollapse(): void {
    this.isExpanded = !this.isExpanded;
  }

  editNode(node: ITreeNode): void {
    this.nodeEditForm.patchValue(node);
    this.editFormVisible = !this.editFormVisible;
  }

  updateNode(): void {
    if (this.nodeEditForm.valid) {
      this.root.value = this.nodeEditForm.getRawValue().value;
      this.service.updateNode(this.root)
        .subscribe((res: any) => {
          console.log('success');
          this.editFormVisible = !this.editFormVisible;
        }, (err) => {
          console.log(err);
        });
    }
  }

  addNode() {
    this.newNodeFormVisible = !this.newNodeFormVisible;
    this.nodeEditForm.patchValue({parent: this.root.parent});
  }

  submitNode() {
    if (this.nodeEditForm.valid) {
      const newNode = this.nodeEditForm.getRawValue();
      newNode.parent = this.root.id;
      this.service.updateNode(newNode)
        .subscribe((node: ITreeNode) => {
          this.nodes.push(node);
          this.newNodeFormVisible = !this.newNodeFormVisible;
          this.nodeEditForm.reset();
        }, (err) => {
          console.log(err);
        });
    }
  }
}
