export type MeasurementType =
  | 'install'
  | 'build'
  | 'test'
  | 'dependencies'
  | 'ssr'

export type FrameworkType = 'starter' | 'app'

export interface FrameworkConfig {
  name: string
  displayName: string
  type: FrameworkType
  package: string
  frameworkPackage?: string
  buildScript?: string
  buildOutputDir?: string
  testScript?: string
  measurements: MeasurementType[]
}

export interface CIStats {
  timingMeasuredAt?: string
  runner?: string
  frameworkVersion?: string
  // Install stats
  avgInstallTimeMs?: number
  minInstallTimeMs?: number
  maxInstallTimeMs?: number
  nodeModulesSize?: number
  nodeModulesSizeProdOnly?: number
  // Build stats
  coldBuildTimeMs?: number
  warmBuildTimeMs?: number
  buildOutputSize?: number
  testTimeMs?: number
  // SSR stats
  ssrOpsPerSec?: number
  ssrAvgLatencyMs?: number
  ssrSamples?: number
  ssrBodySizeKb?: number
  ssrDuplicationFactor?: number
}

export interface InstallStats {
  frameworkVersion: string
  avgInstallTimeMs: number
  minInstallTimeMs: number
  maxInstallTimeMs: number
  nodeModulesSize: number
  nodeModulesSizeProdOnly: number
}

export interface BuildStats {
  coldBuildTimeMs: number
  warmBuildTimeMs: number
  buildOutputSize: number
}

export interface FrameworkStats extends CIStats {
  name?: string
  package?: string
  type?: string
  prodDependencies?: number
  devDependencies?: number
  ssrOpsPerSec?: number
  ssrAvgLatencyMs?: number
  ssrSamples?: number
  ssrBodySizeKb?: number
  ssrDuplicationFactor?: number
}

export interface PackageJson {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}
