import Graph from 'graphology'

// Import the graph data without using any node module code so
// it can be packaged in a script for the web browser.
//
// @ts-expect-error
import {graphData as untypedGraphData} from '../dist/graph-data'

import {renderGraph} from './internal/render-graph'
import {GraphData} from './internal/graph-data'

const graphData = untypedGraphData as GraphData
const graph = new Graph()

// Colors to cycle through for different node types.
// We'll fall back to a default color if we run out.
const nodeColors = [
  'blue',
  'green',
]
const nodeColorMap: {[type: string]: string} = {}

graphData.nodes.forEach(({type, label}) => {
  if (!(type in nodeColorMap)) {
    const color = nodeColors.shift() ?? 'black'

    nodeColorMap[type] = color
  }

  const color = nodeColorMap[type]

  graph.addNode(label, {label, size: 10, color})
})

graphData.edges.forEach(({label, from, to}) => {
  // TODO: Write a program to increase the arrow size.
  // https://stackoverflow.com/questions/56551575/how-to-change-arrow-size-in-sigma-js/73988100#73988100
  graph.addEdge(from, to, {
    type: 'arrow',
    label,
    color: 'black',
    size: 3,
    forceLabel: true,
  })
})

graph.nodes().forEach((node, i) => {
  const angle = (i * 2 * Math.PI) / graph.order
  graph.setNodeAttribute(node, 'x', 100 * Math.cos(angle))
  graph.setNodeAttribute(node, 'y', 100 * Math.sin(angle))
})

renderGraph(graph)
