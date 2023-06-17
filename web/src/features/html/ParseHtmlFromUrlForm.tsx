'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { graphql } from '@/lib/gql'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from 'urql'
import * as z from 'zod'

const ParseHtmlFromUrlMutation = graphql(/* GraphQL */ `
  mutation ParseHtmlFromUrlMutation($url: String!) {
    parseHtmlFromUrl(url: $url)
  }
`)

const formSchema = z.object({
  url: z.string().url(),
})

export const ParseHtmlFromUrlForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      url: '',
    },
    resolver: zodResolver(formSchema),
  })

  const [{ data, fetching }, execute] = useMutation(ParseHtmlFromUrlMutation)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await execute({
      url: values.url,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={'flex space-x-4 items-center'}>
          <FormField
            render={({ field }) => (
              <FormItem className={'flex-1'}>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            control={form.control}
            name="url"
          />
          <Button disabled={fetching} size={'sm'} type="submit">
            Submit
          </Button>
        </div>
      </form>

      {data && (
        <div className={'mt-4 space-y-2 bg-gray-50 p-4 rounded'}>
          <p className={'font-medium text-gray-900'}>Result</p>
          <p className={'text-gray-600 text-xs whitespace-pre-wrap break-all'}>
            {data.parseHtmlFromUrl}
          </p>
        </div>
      )}
    </Form>
  )
}
