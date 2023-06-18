import { env } from '@/lib/env'
import { TextToSpeechClient } from '@google-cloud/text-to-speech'

const credentials = JSON.parse(
  Buffer.from(env.GOOGLE_SERVICE_KEY, 'base64').toString()
)

export const textToSpeechClient = new TextToSpeechClient({ credentials })
