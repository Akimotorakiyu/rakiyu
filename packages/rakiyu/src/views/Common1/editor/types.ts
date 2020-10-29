export interface EndNode {
  tag: 'TextNode' | 'ImgNode';
  data: string;
  className: string;
  id: string;
}

export interface ContainerNode {
  tag: 'DivNode' | 'Header' | 'UnorderedListItem' | 'OrderedListItem';
  children: (EndNode | ContainerNode)[];
  id: string;
  listOrder?: Number; // OrderedListItem
}
