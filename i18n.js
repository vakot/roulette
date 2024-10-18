import en from '@public/languages/en'
import ru from '@public/languages/ru'
import ua from '@public/languages/ua'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
      ua: {
        translation: ua,
      },
    },
  })

export default i18n
