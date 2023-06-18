import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_SERVICE_KEY: process.env.GOOGLE_SERVICE_KEY,
  },
  server: {
    DATABASE_URL: z.string(),
    GOOGLE_SERVICE_KEY: z.string(),
  },
})
