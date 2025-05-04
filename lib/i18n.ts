import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// Переводы
const resources = {
  ru: {
    translation: {
      main: "Главная",
      archive: "Архив",
      "archive.empty": "В архиве пока нет элементов",
      notifications: "Уведомления",
      "notifications.empty": "У вас нет новых уведомлений",
      cabinet: "Личный кабинет",
      "cabinet.empty": "Информация о вашем аккаунте будет здесь",
      partner: "Партнерская программа",
      "partner.empty": "Информация о партнерской программе будет здесь",
      feedback: "Отзыв",
      "feedback.empty": "Здесь вы можете оставить отзыв о нашем сервисе",
      greeting: "Здравствуйте, Ерлан!",
      "product.analysis": "Анализ карточки товара",
      "product.analysis.desc": "Проверьте качество SEO и тексты ваших карточек товаров",
      "product.description": "Описание карточки товара",
      "product.description.desc": "Качественные SEO-тексты для ваших товаров на основе промптов",
      processing: "В обработке...",
      start: "Перейти",
    },
  },
  kz: {
    translation: {
      main: "Басты",
      archive: "Мұрағат",
      "archive.empty": "Мұрағатта әзірге элементтер жоқ",
      notifications: "Хабарландырулар",
      "notifications.empty": "Сізде жаңа хабарландырулар жоқ",
      cabinet: "Жеке кабинет",
      "cabinet.empty": "Сіздің аккаунтыңыз туралы ақпарат осы жерде болады",
      partner: "Серіктестік бағдарлама",
      "partner.empty": "Серіктестік бағдарлама туралы ақпарат осы жерде болады",
      feedback: "Пікір",
      "feedback.empty": "Мұнда сіз біздің қызмет туралы пікір қалдыра аласыз",
      greeting: "Сәлеметсіз бе, Ерлан!",
      "product.analysis": "Тауар карточкасын талдау",
      "product.analysis.desc": "Тауар карточкаларыңыздың SEO сапасын және мәтіндерін тексеріңіз",
      "product.description": "Тауар карточкасының сипаттамасы",
      "product.description.desc": "Промпттарға негізделген тауарларыңызға арналған сапалы SEO мәтіндері",
      processing: "Өңделуде...",
      start: "Өту",
    },
  },
  en: {
    translation: {
      main: "Main",
      archive: "Archive",
      "archive.empty": "There are no items in the archive yet",
      notifications: "Notifications",
      "notifications.empty": "You have no new notifications",
      cabinet: "Personal Cabinet",
      "cabinet.empty": "Your account information will be here",
      partner: "Partner Program",
      "partner.empty": "Partner program information will be here",
      feedback: "Feedback",
      "feedback.empty": "Here you can leave feedback about our service",
      greeting: "Hello, Erlan!",
      "product.analysis": "Product Card Analysis",
      "product.analysis.desc": "Check the SEO quality and texts of your product cards",
      "product.description": "Product Card Description",
      "product.description.desc": "Quality SEO texts for your products based on prompts",
      processing: "Processing...",
      start: "Go",
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
