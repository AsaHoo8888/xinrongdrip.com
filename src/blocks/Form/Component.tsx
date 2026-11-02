'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider, type FieldValues } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: Object.fromEntries(
      (formFromProps.fields || [])
        .filter((field) => 'name' in field)
        .map((field) => [
          'name' in field ? field.name : '',
          'defaultValue' in field ? field.defaultValue : '',
        ]),
    ),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [emailPending, setEmailPending] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    async (data: FieldValues) => {
      setError(undefined)
      setIsLoading(true)
      try {
        const response = await fetch(`${getClientSideURL()}/api/form-submissions/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            form: formID,
            submissionData: Object.entries(data).map(([field, value]) => ({ field, value })),
          }),
        })
        const result = await response.json()
        if (!response.ok) {
          setError({
            message: result.errors?.[0]?.message || '提交失败，请稍后再试。',
            status: String(response.status),
          })
          return
        }
        setHasSubmitted(true)
        const pending = result.deliveryStatus === 'pending' || result.deliveryStatus === 'sending'
        setEmailPending(pending)
        if (!pending && confirmationType === 'redirect' && redirect?.url) router.push(redirect.url)
      } catch {
        setError({ message: '未能确认提交结果，请稍后再试；重复提交将受到保护。' })
      } finally {
        setIsLoading(false)
      }
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="container lg:max-w-[48rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className="p-4 lg:p-6 border border-border rounded-[0.8rem]">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && !emailPending && confirmationType === 'message' && (
            <RichText data={confirmationMessage} />
          )}
          {emailPending && <p role="status">留言已保存，通知邮件待发送。</p>}
          {isLoading && !hasSubmitted && <p role="status">正在提交，请稍候…</p>}
          {error && <div role="alert">{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={String(formID)} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </div>

              <Button disabled={isLoading} form={String(formID)} type="submit" variant="default">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
