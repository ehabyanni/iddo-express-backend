import { AboutItem as PrismaAboutItem, AboutItemTranslation, AboutType } from "@prisma/client";

export type AboutItemWithTranslations = PrismaAboutItem & {
  translations: AboutItemTranslation[];
};

export interface FormattedAboutItem {
  id: number;
  key: AboutType;
  content: {
    en: string;
    ar: string;
  };
}

export const formatAboutItem = (item: AboutItemWithTranslations): FormattedAboutItem => {
  const translations = item.translations || [];

  const contentMap = translations.reduce((acc, t) => {
    acc[t.locale] = t.content || "";
    return acc;
  }, {} as Record<string, string>);

  return {
    id: item.id,
    key: item.key,
    content: {
      en: contentMap.en || "",
      ar: contentMap.ar || "",
    },
  };
};