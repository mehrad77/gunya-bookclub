import faTranslations from './fa.json';
import enTranslations from './en.json';

type TranslationKey = string;

type Translations = typeof faTranslations;

const translations: Record<string, Translations> = {
  fa: faTranslations,
  en: enTranslations,
};

// Get nested object value by dot notation path
function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
}

export function useTranslation(lang: string = 'fa') {
  const t = (key: TranslationKey): string => {
    const translation = getNestedValue(translations[lang], key);
    return translation || getNestedValue(translations.fa, key) || key;
  };

  return { t };
}

export default useTranslation;
