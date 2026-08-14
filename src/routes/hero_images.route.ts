import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { ApiResponse } from "../types/common.js";
import { formatImages, FormattedImages } from "../types/imageAccordion.js";

const router = Router();

router.get(
  "/",
  async (req: Request, res: Response<ApiResponse<FormattedImages[]>>) => {
    try {
      const images = await prisma.imageAccordion.findMany({
        orderBy: { createdAt: "desc" },
      });

      // Formation of data to match Frontend ProjectItem type
      const formattedImages = images.map(formatImages);

      return res.status(200).json({
        success: true,
        data: formattedImages,
      });
    } catch (error) {
      // console.error("Error fetching images:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  },
);

export default router;
