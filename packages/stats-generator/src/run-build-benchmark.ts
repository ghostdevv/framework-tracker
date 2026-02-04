import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { packagesDir } from './constants.ts'
import { getDirectorySize, writeJsonFile, getFrameworkByPackage, parseArgs } from './utils.ts'
import type { BuildStats } from './types.ts'

function measureBuildTime(cwd: string): number {
  const start = performance.now()
  execSync('pnpm build', { cwd, encoding: 'utf-8', stdio: 'inherit' })
  const end = performance.now()
  return Math.round(end - start)
}

async function main() {
  const { packageName } = parseArgs(
    'Usage: run-build-benchmark <package-name>\nExample: run-build-benchmark starter-astro'
  )

  const framework = await getFrameworkByPackage(packageName)

  if (!framework.buildOutputDir) {
    console.error(`No buildOutputDir defined for ${packageName}`)
    process.exit(1)
  }

  console.info(`Running build benchmark for ${framework.displayName} (${packageName})...\n`)

  const packageDir = join(packagesDir, packageName)

  console.info('Cold build...')
  const coldBuildTimeMs = measureBuildTime(packageDir)
  console.info(`  Cold build time: ${coldBuildTimeMs}ms`)

  console.info('\nWarm build...')
  const warmBuildTimeMs = measureBuildTime(packageDir)
  console.info(`  Warm build time: ${warmBuildTimeMs}ms`)

  const buildOutputPath = join(packageDir, framework.buildOutputDir)
  const buildOutputSize = getDirectorySize(buildOutputPath)
  console.info(`\nBuild output size: ${buildOutputSize} bytes`)

  const stats: BuildStats = {
    coldBuildTimeMs,
    warmBuildTimeMs,
    buildOutputSize,
  }

  const outputPath = join(packagesDir, packageName, 'build-stats.json')
  writeJsonFile(outputPath, stats)

  console.info(`\n✓ Saved build stats to ${outputPath}`)
}

main().catch((error) => {
  console.error('Build benchmark failed:', error)
  process.exit(1)
})
