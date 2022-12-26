export interface NodeData {
  type: string
  label: string
}

export interface EdgeData {
  label: string
  from: string
  to: string
}

export interface GraphData {
  edges: EdgeData[]
  nodes: NodeData[]
}
