export const routing = {
  locales: ['uz', 'ru', 'en'],
  defaultLocale: 'uz',
} as const;

export type Locale = (typeof routing.locales)[number];
