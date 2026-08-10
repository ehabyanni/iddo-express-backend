import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { ApiResponse } from "../types/common.js";
import { formatProject, FormattedProject } from "../types/project.js";

const router = Router();

// Get All Projects
router.get(
  "/",
  async (req: Request, res: Response<ApiResponse<FormattedProject[]>>) => {
    try {
      const projects = await prisma.projects.findMany({
        orderBy: { createdAt: "desc" },
      });

      const formattedProjects = projects.map(formatProject);

      res.status(200).json({
        success: true,
        data: formattedProjects,
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// Get Single Project by Slug
router.get(
  "/:slug",
  async (req: Request, res: Response<ApiResponse<FormattedProject>>) => {
    try {
      const { slug } = req.params;

      if (typeof slug !== "string") {
        return res.status(400).json({
          success: false,
          message: "Invalid slug parameter",
        });
      }

      const project = await prisma.projects.findUnique({
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
  }
);

export default router;