export interface EndNode {
  tag: 'TextNode' | 'ImgNode';
  data: string;
  className: string;
  id: string;
}

export interface ContainerNode {
  tag: 'DivNode' | 'Header' | 'UnorderedListItem' | 'OrderListItem';
  children: (EndNode | ContainerNode)[];
  id: string;
}
