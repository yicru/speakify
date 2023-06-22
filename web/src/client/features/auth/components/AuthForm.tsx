'use client'

import { Button } from '@/client/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/client/components/ui/form'
import { Input } from '@/client/components/ui/input'
import { toast } from '@/client/lib/sonner'
import { env } from '@/shared/lib/env'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const formSchema = z.object({
  email: z.string().email(),
})

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClientComponentClient()

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    const result = await supabase.auth.signInWithOtp({
      email: values.email,
      options: {
        emailRedirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })

    if (result.error) {
      toast.error('マジックリンクの送信に失敗しました', {
        description: result.error.message,
      })
    } else {
      toast.error('マジックリンクをメールで送信しました', {
        description: 'メールを確認してログインしてください',
      })
      form.reset()
    }

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          control={form.control}
          name="email"
        />
        <Button className={'w-full mt-4'} isLoading={isLoading} type="submit">
          Send Magic Link
        </Button>
      </form>
    </Form>
  )
}
