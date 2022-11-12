import { fileURLToPath } from 'node:url'

console.log(fileURLToPath(new URL('.', import.meta.url)))