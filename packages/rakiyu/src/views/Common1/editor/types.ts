export interface EndNode {
  tag: 'TextNode' | 'ImgNode';
  data: string;
  className: string;
  id: string;
}

export interface ContainerNode {
  tag: 'DivNode' | 'Header';
  children: (EndNode | ContainerNode)[];
  id: string;
}
