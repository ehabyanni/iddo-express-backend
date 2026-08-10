import { Projects as PrismaProject } from '@prisma/client';

// الـ Response Structure للمشروع الواحد اللي راجع للـ Frontend
export interface FormattedProject {
  id: number;
  title: {
    en: string;
    ar: string;
  };
  image: string;
  slug: string;
}

// الـ Standard API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// دالة مساعدة لتحويل كائن Prisma لكائن الـ Frontend
export const formatProject = (project: PrismaProject): FormattedProject => ({
  id: project.id,
  title: {
    en: project.titleEn,
    ar: project.titleAr,
  },
  image: project.image,
  slug: project.slug,
});