import { useMemo } from 'react'

export type usePathSegmentsResult = {
  segments: string[]
  readonly path: string
  readonly filename: string
}

export function usePathSegments(filePath: string): usePathSegmentsResult {
  const separator = useMemo<'/' | '\\'>(
    () => (filePath.indexOf('/') !== -1 ? '/' : '\\'),
    [filePath],
  )

  const segments = useMemo<string[]>(
    () => filePath.split(separator),
    [filePath, separator],
  )

  const path = useMemo<string>(
    () => segments.slice(0, segments.length - 1).join(separator),
    [segments, separator],
  )

  const filename = useMemo<string>(
    () => segments[segments.length - 1],
    [segments],
  )

  return {
    segments,
    get path() {
      return path
    },
    get filename() {
      return filename
    },
  }
}
