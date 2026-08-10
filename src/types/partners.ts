import { Partners as PrismaPartner } from '@prisma/client';

export interface FormattedPartners {
  id: number;
  name: string;
  logo: string;
}

export const formatPartners = (partner: PrismaPartner): FormattedPartners => ({
  id: partner.id,
  name: partner.name,
  logo: partner.logo
});