import Graph from 'graphology'
import Sigma from 'sigma'

import getNodeProgramImage from 'sigma/rendering/webgl/programs/node.image'

import ForceSupervisor from 'graphology-layout-force/worker'

/**
 * Render a graph with Sigma.js to the container.
 */
export const renderGraph = (graph: Graph): void => {
  const container = document.getElementById('sigma-container') as HTMLElement

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderer = new Sigma(graph, container, {
    nodeProgramClasses: {
      image: getNodeProgramImage(),
      border: getNodeProgramImage(),
    },
    renderEdgeLabels: true,
  })

  // Create the spring layout and start it
  const layout = new ForceSupervisor(graph)
  layout.start()
}
