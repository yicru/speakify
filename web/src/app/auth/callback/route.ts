import { prisma } from '@/server/lib/prisma'
import { User } from '@prisma/client'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  const {
    data: { user: supabaseUser },
  } = await supabase.auth.getUser()

  let user: User | null = null

  if (supabaseUser?.email) {
    user = await prisma.user.upsert({
      create: {
        email: supabaseUser.email,
        isAccessGranted: false,
      },
      update: {},
      where: {
        email: supabaseUser.email,
      },
    })
  }

  if (user?.isAccessGranted) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.redirect(new URL('/waiting', req.url))
}
