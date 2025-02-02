import { object, string, array } from 'yup'

export const useValidation = () => {
  const schema = object({
    category: string().required('請選擇類別'),
    title: string()
      .required('請輸入標題')
      .max(30, '標題不能超過30個字符'),
    description: string()
      .required('請描述你的意見/問題')
      .max(300, '描述不能超過300個字符'),
  })

  return {
    schema
  }
}