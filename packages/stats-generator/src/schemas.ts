import { z } from 'zod'

export const InstallStatsSchema = z.object({
  frameworkVersion: z.string().min(1),
  avgInstallTimeMs: z.number().nonnegative(),
  minInstallTimeMs: z.number().nonnegative(),
  maxInstallTimeMs: z.number().nonnegative(),
  nodeModulesSize: z.number().nonnegative(),
  nodeModulesSizeProdOnly: z.number().nonnegative(),
})

export const BuildStatsSchema = z.object({
  coldBuildTimeMs: z.number().nonnegative(),
  warmBuildTimeMs: z.number().nonnegative(),
  buildOutputSize: z.number().nonnegative(),
})

export const SSRStatsSchema = z.object({
  ssrOpsPerSec: z.number().positive(),
  ssrAvgLatencyMs: z.number().nonnegative(),
  ssrSamples: z.number().positive(),
  ssrBodySizeKb: z.number().positive(),
  ssrDuplicationFactor: z.number().nonnegative(),
  frameworkVersion: z.string().optional(),
  timingMeasuredAt: z.string().optional(),
  runner: z.string().optional(),
})

export type InstallStats = z.infer<typeof InstallStatsSchema>
export type BuildStats = z.infer<typeof BuildStatsSchema>
export type SSRStats = z.infer<typeof SSRStatsSchema>
