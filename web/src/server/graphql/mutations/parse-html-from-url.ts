import { builder } from '@/server/graphql/builder'
import { convert } from 'html-to-text'
import { ofetch } from 'ofetch'

builder.mutationField('parseHtmlFromUrl', (t) =>
  t.string({
    args: {
      url: t.arg.string({ required: true }),
    },
    resolve: async (parent, { url }) => {
      const html = await ofetch(url)
      return convert(html, { wordwrap: false })
    },
  })
)
