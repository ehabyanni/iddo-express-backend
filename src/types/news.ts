import { News as PrismaNews, NewsTranslation } from "@prisma/client";

export type NewsWithTranslations = PrismaNews & {
  translations: NewsTranslation[];
};

export interface FormattedNews {
  id: number;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  published_at: string;
  image: string;
  slug: string;
}

export const formatNews = (news: NewsWithTranslations): FormattedNews => {
  const titleMap = news.translations.reduce(
    (acc, t) => {
      acc[t.locale] = t.title;
      return acc;
    },
    {} as Record<string, string>,
  );

  const descMap = news.translations.reduce(
    (acc, t) => {
      acc[t.locale] = t.desc;
      return acc;
    },
    {} as Record<string, string>,
  );

  return {
    id: news.id,
    title: {
      en: titleMap.en || "",
      ar: titleMap.ar || "",
    },
    description: {
      en: descMap.en || "",
      ar: descMap.ar || "",
    },
    published_at: news.createdAt.toISOString(),
    image: news.image,
    slug: news.slug,
  };
};
