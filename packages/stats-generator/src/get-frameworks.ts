import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { packagesDir } from './constants.ts'
import type { FrameworkConfig } from './types.ts'

export async function getFrameworks(): Promise<FrameworkConfig[]> {
  const configPath = join(packagesDir, '..', '.github', 'frameworks.json')
  const content = await readFile(configPath, 'utf-8')
  return JSON.parse(content) as FrameworkConfig[]
}
