'use client'

import { Button, useDocumentInfo } from '@payloadcms/ui'
import { useState } from 'react'

export function RetryEmail() {
  const { id } = useDocumentInfo()
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState('')
  if (!id) return null
  return (
    <div>
      <Button
        disabled={pending}
        onClick={async () => {
          setPending(true)
          setMessage('')
          try {
            const response = await fetch(`/api/form-submissions/${id}/retry-email`, {
              method: 'POST',
            })
            const result = await response.json()
            setMessage(
              response.ok
                ? result.deliveryStatus === 'sent'
                  ? '通知邮件已发送。'
                  : '邮件仍待发送，请检查 SMTP 配置；发送中的任务请稍后查看。'
                : '重试失败，请检查登录状态及服务器日志。',
            )
          } catch {
            setMessage('网络错误，请稍后重试。')
          } finally {
            setPending(false)
          }
        }}
      >
        {pending ? '正在重试…' : '重试通知邮件'}
      </Button>
      <p role="status">{message}</p>
    </div>
  )
}
