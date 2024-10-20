import en from '@public/languages/en.json'
import ru from '@public/languages/ru.json'
import ua from '@public/languages/ua.json'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const dev = process.env.NODE_ENV !== 'production'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: dev,
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      ua: { translation: ua },
    },
  })

export default i18n
