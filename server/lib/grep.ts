import { spawn } from 'node:child_process'
import { EOL } from 'node:os'
import { folderArg } from '../args'

export type GrepBeginMessage = {
  type: 'begin'
  data: {
    path: { text: string }
  }
}

export type GrepMatchMessage = {
  type: 'match'
  data: {
    path: { text: string }
    lines: { text: string }
    line_number: number
    absolute_offset: number
    submatches: Array<{
      match: { text: string }
      start: number
      end: number
    }>
  }
}

export type GrepMessage = GrepBeginMessage | GrepMatchMessage

export type GrepOptions = {
  glob: string
  pattern: string
  onBegin?: (message: GrepBeginMessage) => void
  onMatch?: (message: GrepMatchMessage) => void
  onStderrData: (data: Buffer) => void
}

export async function grep({
  glob,
  pattern,
  onBegin,
  onMatch,
  onStderrData,
}: GrepOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    const rg = spawn('rg', [
      // Options
      '--multiline',
      '--multiline-dotall',
      '--json',
      '--auto-hybrid-regex',
      '--glob',
      glob,
      // Pattern
      pattern,
      // Path
      folderArg,
    ])

    rg.stdout.on('data', (data: Buffer) => {
      let lines: string[] = []
      try {
        lines = data.toString().split('\n')
      } catch (error) {
        console.log(error)
      }

      for (const line of lines) {
        if (line.trim() === '') continue

        try {
          const data: GrepMessage = JSON.parse(line)

          if (data.type === 'begin') {
            onBegin?.(data)
            continue
          }

          if (data.type === 'match') {
            onMatch?.(data)
            continue
          }
        } catch (error) {
          console.log('error:', error)
        }
      }
    })

    rg.stderr.on('data', (data: Buffer) => {
      onStderrData(data)
    })

    rg.on('close', (code) => {
      if (code === 0 || code === 1) {
        resolve()
      } else {
        reject(code)
      }
    })
  })
}
