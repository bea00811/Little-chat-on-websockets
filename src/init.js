import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Texts from './Components/Texts';
import App from './App';

export default function Init() {
  const i18nextInstance = i18n.createInstance();
  i18nextInstance.use(initReactI18next).init({
    lng: 'ru',
    fallbackLng: 'ru',
    resources: {
      ru: Texts,
    },
    interpolation: {
      escapeValue: false,
    },
  });

  return <App />;
}
