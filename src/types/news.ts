import { News as PrismaNews, NewsTranslation } from "@prisma/client";

export type NewsWithTranslations = PrismaNews & {
  translations: NewsTranslation[];
};

export interface FormattedNews {
  id: number;
  title: Record<string, string>;
  description: Record<string, string>;
  content: Record<string, string>;
  published_at: string;
  image: string;
  slug: string;
}

export const formatNews = (news: NewsWithTranslations): FormattedNews => {
  const title: Record<string, string> = {};
  const description: Record<string, string> = {};
  const content: Record<string, string> = {};

  // تجميع كل اللغات المتاحة في الداتابيز ديناميكياً بدون فرض أي لغة
  news.translations.forEach((t) => {
    title[t.locale] = t.title;
    description[t.locale] = t.desc;
    content[t.locale] = t.content || "";
  });

  return {
    id: news.id,
    title,
    description,
    content,
    published_at: news.createdAt.toISOString(),
    image: news.image,
    slug: news.slug,
  };
};