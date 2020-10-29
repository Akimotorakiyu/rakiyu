export interface EndNode {
  tag: 'TextNode' | 'ImgNode';
  data: string;
  className: string;
  id: string;
}

export interface ContainerNode {
  tag: string;
  children: (EndNode | ContainerNode)[];
  id: string;
}
