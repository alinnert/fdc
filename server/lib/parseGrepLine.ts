export type GrepLine = {
  filename: string
  lineNumber: string
  text: string
}

export function parseGrepLine(line: string): GrepLine | null {
  const match = line.match(/^(.*):([0-9]+):(.*name="([^"]+)".*)$/)
  if (match === null) {
    return null
  }
  const [, filename, lineNumber, text] = match
  return { filename, lineNumber, text }
}
