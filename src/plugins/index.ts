import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { queueEmails } from '@/forms/delivery'
import { submissionOverrides } from '@/forms/submissions'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    beforeEmail: queueEmails,
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return [
          ...defaultFields.map((field) => {
            if ('name' in field && field.name === 'confirmationMessage') {
              return {
                ...field,
                editor: lexicalEditor({
                  features: ({ rootFeatures }) => {
                    return [
                      ...rootFeatures,
                      FixedToolbarFeature(),
                      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    ]
                  },
                }),
              }
            }
            return field
          }),
          {
            name: 'setupKey',
            type: 'text',
            unique: true,
            admin: { readOnly: true, position: 'sidebar' },
          },
        ]
      },
    },
    formSubmissionOverrides: {
      ...submissionOverrides,
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'deliveryStatus',
          type: 'select',
          defaultValue: 'not-requested',
          admin: { readOnly: true, position: 'sidebar' },
          options: [
            { label: '待发送', value: 'pending' },
            { label: '发送中', value: 'sending' },
            { label: '已发送', value: 'sent' },
            { label: '未配置通知', value: 'not-requested' },
          ],
          access: { create: () => false, update: () => false },
        },
        {
          name: 'emailLastAttemptAt',
          type: 'date',
          admin: { readOnly: true, position: 'sidebar' },
          access: { create: () => false, update: () => false },
        },
        {
          name: 'emailQueue',
          type: 'json',
          admin: { hidden: true },
          access: {
            read: ({ req }) => Boolean(req.user),
            create: () => false,
            update: () => false,
          },
        },
        {
          name: 'submissionFingerprint',
          type: 'text',
          index: true,
          admin: { hidden: true },
          access: {
            read: ({ req }) => Boolean(req.user),
            create: () => false,
            update: () => false,
          },
        },
        {
          name: 'submissionKey',
          type: 'text',
          unique: true,
          admin: { hidden: true },
          access: {
            read: ({ req }) => Boolean(req.user),
            create: () => false,
            update: () => false,
          },
        },
        {
          name: 'retryEmail',
          type: 'ui',
          admin: { components: { Field: '@/forms/RetryEmail#RetryEmail' }, position: 'sidebar' },
        },
      ],
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
