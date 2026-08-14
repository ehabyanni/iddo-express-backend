import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { ApiResponse } from "../types/common.js";
import { formatPartners, FormattedPartners } from "../types/partners.js";

const router = Router();

router.get(
  "/",
  async (req: Request, res: Response<ApiResponse<FormattedPartners[]>>) => {
    try {
      const partnersList = await prisma.partners.findMany({
        orderBy: { createdAt: "desc" },
      });

      // Formation of data to match Frontend ProjectItem type
      const formattedPartners = partnersList.map(formatPartners);

      return res.status(200).json({
        success: true,
        data: formattedPartners,
      });
    } catch (error) {
      // console.error("Error fetching partners:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  },
);

export default router;
