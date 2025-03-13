// src/i18n/index.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Taro from '@tarojs/taro';
import zh from './zh';
import en from './en';

i18n
  .use(LanguageDetector) // H5 端自动检测语言
  .use(initReactI18next)
  .init({
    resources: {
      zh: { translation: zh },
      en: { translation: en }
    },
    lng: Taro.getStorageSync('lang') || 'zh', // 优先读取本地存储
    fallbackLng: 'zh', // 默认回退语言
    interpolation: {
      escapeValue: false // 允许插值变量（如 {{name}}）
    },
    react: {
      useSuspense: false // Taro 暂不支持 Suspense
    }
  });

export default i18n;