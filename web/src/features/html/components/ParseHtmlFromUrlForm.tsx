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
import { TextToSpeechButton } from '@/features/text-to-speech/components/TextToSpeechButton'
import { graphql } from '@/lib/gql'
import { toast } from '@/lib/sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from 'urql'
import * as z from 'zod'

const ParseHtmlFromUrlMutation = graphql(/* GraphQL */ `
  mutation ParseHtmlFromUrlForm_parseHtmlFromUrl($url: String!) {
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

  const [{ data, error, fetching }, execute] = useMutation(
    ParseHtmlFromUrlMutation
  )

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error } = await execute({
      url: values.url,
    })

    if (error) {
      toast.error('エラーが発生しました', {
        description: error.message,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={'flex space-x-4 items-start'}>
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
          <Button isLoading={fetching} type="submit">
            Submit
          </Button>
        </div>
      </form>

      {(data || error) && (
        <div className={'mt-4 space-y-2 bg-gray-50 p-4 rounded'}>
          <div className={'flex justify-between'}>
            <p className={'font-medium text-gray-900'}>Result</p>
            {data && (
              <TextToSpeechButton
                render={({ fetching, onClick }) => (
                  <Button isLoading={fetching} onClick={onClick} size={'xs'}>
                    Speakify
                  </Button>
                )}
                text={data.parseHtmlFromUrl}
              />
            )}
          </div>

          {data && (
            <p
              className={'text-gray-600 text-xs whitespace-pre-wrap break-all'}
            >
              {data.parseHtmlFromUrl}
            </p>
          )}

          {error && (
            <p className={'text-red-600 text-xs whitespace-pre-wrap break-all'}>
              {error.message}
            </p>
          )}
        </div>
      )}
    </Form>
  )
}
