'use client'

import { Select } from 'antd'
import { useTranslation } from 'react-i18next'

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
  }

  return (
    <Select
      placeholder="Language"
      value={i18n.language}
      style={{ width: 120 }}
      onChange={changeLanguage}
      options={[
        { value: 'en', label: 'English' },
        { value: 'ru', label: 'Русский' },
        { value: 'ua', label: 'Українська' },
      ]}
    />
  )
}
