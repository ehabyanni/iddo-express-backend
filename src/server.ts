import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "./lib/prisma.js";
import {
  ApiResponse,
  formatProject,
  FormattedProject,
} from "./types/project.js";
import { formatNews, FormattedNews } from "./types/news.js";
import { formatImages, FormattedImages } from "./types/imageAccordion.js";
import { formatPartners, FormattedPartners } from "./types/partners.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ----------------------------------------------------
// PROJECTS ENDPOINTS
// ----------------------------------------------------

// 1. Get All Projects
app.get(
  "/api/projects",
  async (req: Request, res: Response<ApiResponse<FormattedProject[]>>) => {
    try {
      const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
      });

      // Formation of data to match Frontend ProjectItem type
      const formattedProjects = projects.map(formatProject);

      res.status(200).json({
        success: true,
        data: formattedProjects,
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
);

// 2. Get Single Project by Slug
app.get(
  "/api/projects/:slug",
  async (req: Request, res: Response<ApiResponse<FormattedProject>>) => {
    try {
      const { slug } = req.params;

      // تأكد إن الـ slug موجود وهو عباره عن string
      if (typeof slug !== "string") {
        return res.status(400).json({
          success: false,
          message: "Invalid slug parameter",
        });
      }

      const project = await prisma.project.findUnique({
        where: { slug },
      });

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      res.status(200).json({
        success: true,
        data: formatProject(project),
      });
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
);

// ----------------------------------------------------
// NEWS ENDPOINTS
// ----------------------------------------------------

// 3. Get All News List
app.get(
  "/api/news",
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

// 4. Get Single News Item by Slug
app.get(
  "/api/news/:slug",
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

// ----------------------------------------------------
// HERO SECTION ENDPOINTS
// ----------------------------------------------------

// 5. Get All Images accordion List
app.get(
  "/api/hero_images",
  async (req: Request, res: Response<ApiResponse<FormattedImages[]>>) => {
    try {
      const images = await prisma.imageAccordion.findMany({
        orderBy: { createdAt: "desc" },
      });

      // Formation of data to match Frontend ProjectItem type
      const formattedImages = images.map(formatImages);

      res.status(200).json({
        success: true,
        data: formattedImages,
      });
    } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
);

// ----------------------------------------------------
// PARTNERS ENDPOINTS
// ----------------------------------------------------

// 6. Get All Partners List
app.get(
  "/api/partners",
  async (req: Request, res: Response<ApiResponse<FormattedPartners[]>>) => {
    try {
      const partnersList = await prisma.partner.findMany({
        orderBy: { createdAt: "desc" },
      });

      // Formation of data to match Frontend ProjectItem type
      const formattedPartners = partnersList.map(formatPartners);

      res.status(200).json({
        success: true,
        data: formattedPartners,
      });
    } catch (error) {
      console.error("Error fetching partners:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
);

// app.listen(PORT, () => {
//   console.log(`🚀 Iddo Backend is running on http://localhost:${PORT}`);
// });

export default app;
