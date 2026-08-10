import { ImageAccordion as PrismaImg } from "@prisma/client";

export interface FormattedImages {
  id: number;
  url: string;
  title: string;
}

export const formatImages = (img: PrismaImg): FormattedImages => ({
  id: img.id,
  url: img.url,
  title: img.title,
});
