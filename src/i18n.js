import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import footer_en from './utils/i18n/english/footer.json'
import footer_vi from './utils/i18n/vietnamese/footer.json'

import header_en from './utils/i18n/english/header.json'
import header_vi from './utils/i18n/vietnamese/header.json'



const resources = {
    en:{
        footer: footer_en,
        header: header_en,

    },
    vi:{
        footer:footer_vi,
        header: header_vi,

    }
};

i18n.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;