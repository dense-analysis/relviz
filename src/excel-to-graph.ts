import * as fs from 'fs'

import {parseArguments} from './internal/parse-arguments'
import {readExcelFile} from './internal/excel'
import {NodeData, EdgeData, GraphData} from './internal/graph-data'

const main = async (): Promise<void> => {
  const args = parseArguments()
  const nodes: NodeData[] = []
  const edges: EdgeData[] = []

  const report = await readExcelFile(args.filename)

  report.sheets.forEach(sheet => {
    const edgeLabel = sheet.name

    const headers = sheet.data[0]

    sheet.data.slice(1).forEach(row => {
      const rowNodes: NodeData[] = row.map((cell, i) => {
        return {
          type: headers[i].value.toString(),
          label: cell.value.toString(),
        }
      })

      // Add nodes.
      rowNodes.forEach(node => {
        // Add nodes if they aren't there already.
        if (!nodes.some(({label}) => label === node.label)) {
          nodes.push(node)
        }
      })

      // Add edges.
      edges.push({
        label: edgeLabel,
        from: rowNodes[0].label,
        to: rowNodes[1].label,
      })
    })
  })

  const data: GraphData = {nodes, edges}

  fs.writeFile(
    'dist/graph-data.js',
    (
      'export const graphData = '
      + JSON.stringify(data, null, 2)
      + '\n'
    ),
    (err) => {
      if (err != null) {
        console.error(err)
      }
    },
  )
}

main()
  .then(
    () => {},
    (error) => {
      console.error(error)
    })
