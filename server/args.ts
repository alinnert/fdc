import { config } from 'dotenv'
import mri from 'mri'
import { argv, cwd, env } from 'process'

config()

export const args = mri(argv.slice(2))
export const portArg: string = args.port ?? env.PORT ?? '4080'
export const folderArg: string = args.folder ?? env.FOLDER ?? cwd()
