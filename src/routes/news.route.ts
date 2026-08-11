import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { ApiResponse } from "../types/common.js";
import { formatNews, FormattedNews } from "../types/news.js";

const router = Router();
// Get All News
router.get(
  "/",
  async (req: Request, res: Response<ApiResponse<FormattedNews[]>>) => {
    try {
      const news = await prisma.news.findMany({
        orderBy: { createdAt: "desc" },
      });

      // Formation of data to match Frontend ProjectItem type
      const formattedNewsList = news.map(formatNews);

      res.status(200).json({
        success: true,
        data: formattedNewsList,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
);

// Get Single News Item by Slug
router.get(
  "/:slug",
  async (req: Request, res: Response<ApiResponse<FormattedNews>>) => {
    try {
      const { slug } = req.params;

      // تأكد إن الـ slug موجود وهو عباره عن string
      if (typeof slug !== "string") {
        return res.status(400).json({
          success: false,
          message: "Invalid slug parameter",
        });
      }

      const newsItem = await prisma.news.findUnique({
        where: { slug },
      });

      if (!newsItem) {
        return res.status(404).json({
          success: false,
          message: "News not found",
        });
      }

      res.status(200).json({
        success: true,
        data: formatNews(newsItem),
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
);

export default router;
