import { Projects as PrismaProject, ProjectTranslation } from '@prisma/client';

// 1. النوع اللي جاي من Prisma ومعاه الترجمات
export type ProjectWithTranslations = PrismaProject & {
  translations: ProjectTranslation[];
};

// 2. الشكل النهائي (Formatted) اللي هيبعت للفرونت إند بالـ 3 لغات
export interface FormattedProject {
  id: number;
    title: Record<string, string>;
  desc: Record<string, string>;
  content: Record<string, string>;
  image: string;
  slug: string;
}

// 3. دالة التحويل (Formatter)
export const formatProject = (project: ProjectWithTranslations): FormattedProject => {
  const title: Record<string, string> = {};
  const desc: Record<string, string> = {};
  const content: Record<string, string> = {};

  project.translations.forEach((t) => {
    title[t.locale] = t.title;
    desc[t.locale] = t.desc;
    content[t.locale] = t.content || "";
  });

  return {
    id: project.id,
    title,
    desc,
    content,
    image: project.image,
    slug: project.slug,
  };
};