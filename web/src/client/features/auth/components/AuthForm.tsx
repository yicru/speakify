'use client'

import { env } from '@/shared/lib/env'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export function AuthForm() {
  const supabase = createClientComponentClient()

  return (
    <Auth
      appearance={{ theme: ThemeSupa }}
      providers={[]}
      redirectTo={`${env.NEXT_PUBLIC_APP_URL}/auth/callback`}
      showLinks={false}
      supabaseClient={supabase}
      view="magic_link"
    />
  )
}
