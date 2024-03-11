import { dirname } from 'node:path'

export interface ServerConfig {
  apiUrl: string
  cwd: string
  host: string
  port: string
}

const cwd = dirname(import.meta.url).replace('file://', '')

export function getServerConfig(): ServerConfig {
  const requiredEnvVars = [
    // Place any required environment variables here
  ]
  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]?.length)

  if (missingEnvVars.length > 0) {
    console.error(`Missing environment variables: ${missingEnvVars.join(', ')}`)
    process.exit(1)
  }

  const host = process.env.HOST || '0.0.0.0'
  const port = process.env.PORT || '3000'

  const apiUrl = process.env.API_URL || `http://${host}:${port}`

  return {
    apiUrl,
    cwd,
    host,
    port,
  }
}
