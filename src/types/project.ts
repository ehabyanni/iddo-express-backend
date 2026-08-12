import { Projects as PrismaProject, ProjectTranslation } from '@prisma/client';

// 1. النوع اللي جاي من Prisma ومعاه الترجمات
export type ProjectWithTranslations = PrismaProject & {
  translations: ProjectTranslation[];
};

// 2. الشكل النهائي (Formatted) اللي هيبعت للفرونت إند بالـ 3 لغات
export interface FormattedProject {
  id: number;
  title: {
    en: string;
    ar: string;
  };
  image: string;
  slug: string;
}

// 3. دالة التحويل (Formatter)
export const formatProject = (project: ProjectWithTranslations): FormattedProject => {
  // بنجمع الترجمات في كائن يسهل الوصول ليه باللغة
  const titleMap = project.translations.reduce((acc, t) => {
    acc[t.locale] = t.title;
    return acc;
  }, {} as Record<string, string>);

  return {
    id: project.id,
    title: {
      en: titleMap.en || '',
      ar: titleMap.ar || '',
    },
    image: project.image,
    slug: project.slug,
  };
};