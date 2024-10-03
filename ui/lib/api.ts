export function endpoint(endpoint: string): string {
  return import.meta.env.MODE === 'production'
    ? `/${endpoint}`
    : `http://localhost:4080/${endpoint}`
}
