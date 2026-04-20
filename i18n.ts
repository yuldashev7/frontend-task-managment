import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './app/config/i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) || routing.defaultLocale;

  if (!routing.locales.includes(locale as any)) notFound();

  let messages;
  if (locale === 'en') {
    messages = (await import('./app/messages/en.json')).default;
  } else if (locale === 'ru') {
    messages = (await import('./app/messages/ru.json')).default;
  } else {
    messages = (await import('./app/messages/uz.json')).default;
  }

  return {
    locale,
    messages,
  };
});
