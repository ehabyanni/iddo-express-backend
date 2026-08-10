import { News as PrismaNews } from '@prisma/client';

export interface FormattedNews {
  id: number;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  },
  published_at: string;
  image: string;
  slug: string;
}

export const formatNews = (news: PrismaNews): FormattedNews => ({
  id: news.id,
  title: {
    en: news.titleEn,
    ar: news.titleAr,
  },
  description: {
    en: news.descEn,
    ar: news.descAr,
  },
  published_at: news.createdAt.toISOString(),
  image: news.image,
  slug: news.slug,
});