import {ITreeNode} from '../app/components/tree/tree.component';

export const dummyNodesData: ITreeNode[] = [
  {parent: 0, value: 'First Node Ever'},
  {parent: 1, value: 'First Node, First Child'},
  {parent: 1, value: 'First Node, Second Child'},
  {parent: 1, value: 'First Node, Third Child'},
  {parent: 1, value: 'First Node, Forth Child'},
  {parent: 2, value: 'Second Node, First Child'},
  {parent: 2, value: 'Second Node, Second Child'},
  {parent: 2, value: 'Second Node, Third Child'},
  {parent: 2, value: 'Second Node, Forth Child'},
  {parent: 5, value: 'Forth Child, First Child'},
  {parent: 5, value: 'Forth Child, Second Child'},
  {parent: 5, value: 'Forth Child, Third Child'},
  {parent: 5, value: 'Forth Child, Third Child'},
  {parent: 8, value: 'Forth Child, Third Child'},
  {parent: 8, value: 'Forth Child, Third Child'},
  {parent: 6, value: 'Forth Child, Third Child'},
];
