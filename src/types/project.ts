import { Projects as PrismaProject } from '@prisma/client';

export interface FormattedProject {
  id: number;
  title: {
    en: string;
    ar: string;
  };
  image: string;
  slug: string;
}

export const formatProject = (project: PrismaProject): FormattedProject => ({
  id: project.id,
  title: {
    en: project.titleEn,
    ar: project.titleAr,
  },
  image: project.image,
  slug: project.slug,
});