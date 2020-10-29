export interface EndNode {
  tag: 'TextNode' | 'ImgNode';
  data: string;
  className: string;
}

export interface ContainerNode {
  tag: string;
  children: (EndNode | ContainerNode)[];
}
