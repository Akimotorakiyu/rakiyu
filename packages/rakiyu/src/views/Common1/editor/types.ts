export interface EndNode {
  tag: 'TextNode' | 'ImgNode';
  data: string;
  className: string;
}

export interface ContainerNode {
  tag: 'DivNode';
  children: (EndNode | ContainerNode)[];
}
