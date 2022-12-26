import {ArgumentParser} from 'argparse'

export interface Arguments {
  filename: string
}

export const parseArguments = (): Arguments => {
  const parser = new ArgumentParser({
    prog: 'relviz',
    add_help: true,
  })
  parser.add_argument('filename', {
    help: 'An Excel file to load',
  })

  const rawArgs = parser.parse_args() as Record<string, unknown>

  const filename = rawArgs.filename

  if (typeof filename !== 'string') {
    throw new Error('filename was not a string')
  }

  const args: Arguments = {
    filename,
  }

  return args
}
