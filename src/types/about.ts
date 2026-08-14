import {
  AboutItem as PrismaAboutItem,
  AboutItemTranslation,
  AboutType,
} from "@prisma/client";

export type AboutItemWithTranslations = PrismaAboutItem & {
  translations: AboutItemTranslation[];
};

export interface FormattedAboutItem {
  id: number;
  key: AboutType;
  content: Record<string, string>;
}

export const formatAboutItem = (
  item: AboutItemWithTranslations,
): FormattedAboutItem => {
  const content: Record<string, string> = {};

  item.translations.forEach((t) => {
    content[t.locale] = t.content || "";
  });

  return {
    id: item.id,
    key: item.key,
    content,
  };
};
