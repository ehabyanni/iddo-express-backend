import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { ApiResponse } from "../types/common.js";
import { formatAboutItem, FormattedAboutItem } from "../types/about.js";

const router = Router();

// Get All About Us Sections
router.get(
  "/",
  async (req: Request, res: Response<ApiResponse<FormattedAboutItem[]>>) => {
    try {
      const items = await prisma.aboutItem.findMany({
        include: {
          translations: true,
        },
      });

      const formattedItems = items.map(formatAboutItem);

      res.status(200).json({
        success: true,
        data: formattedItems,
      });
    } catch (error) {
      console.error("Error fetching about section:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
);

export default router;