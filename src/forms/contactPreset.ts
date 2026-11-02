import type { RequiredDataFromCollectionSlug } from 'payload'

export const contactForm: RequiredDataFromCollectionSlug<'forms'> = {
  setupKey: 'general-contact',
  title: '联系表单',
  submitButtonLabel: '提交留言',
  fields: [
    { name: 'name', blockType: 'text', label: '姓名', required: true, width: 50 },
    { name: 'email', blockType: 'email', label: '邮箱', required: true, width: 50 },
    { name: 'phone', blockType: 'text', label: '电话', required: true, width: 50 },
    { name: 'company', blockType: 'text', label: '公司名称', required: false, width: 50 },
    { name: 'subject', blockType: 'text', label: '咨询主题', required: false, width: 50 },
    { name: 'country-region', blockType: 'text', label: '国家／地区', required: false, width: 50 },
    { name: 'message', blockType: 'textarea', label: '留言内容', required: true, width: 100 },
  ],
  confirmationType: 'message',
  confirmationMessage: richText('已收到您的留言，我们会尽快联系您。'),
  emails: [
    {
      emailFrom: 'unconfigured@example.invalid',
      emailTo: 'unconfigured@example.invalid',
      subject: '网站收到新的联系留言',
      message: richText('{{*}}'),
    },
  ],
}

function richText(text: string) {
  return {
    root: {
      type: 'root' as const,
      version: 1,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      children: [
        {
          type: 'paragraph' as const,
          version: 1,
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          textFormat: 0,
          textStyle: '',
          children: [
            {
              type: 'text' as const,
              version: 1,
              text,
              detail: 0,
              format: 0,
              mode: 'normal' as const,
              style: '',
            },
          ],
        },
      ],
    },
  }
}
