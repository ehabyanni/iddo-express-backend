import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { securityHeadersMiddleware } from "./middlewares/securityMiddleware.js";
import projectsRouter from "./routes/projects.route.js";
import newsRouter from "./routes/news.route.js";
import heroImagesRouter from "./routes/hero_images.route.js";
import partnersRouter from "./routes/partners.route.js";
import contactRouter from "./routes/contact.route.js";

dotenv.config();

const app = express();
app.use(helmet()); // security headers
app.use(securityHeadersMiddleware); // Permissions-Policy Header
app.use(
  cors({
    origin: ["http://localhost:3000", "https://iddo-delta.vercel.app"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/projects", projectsRouter);
app.use("/api/news", newsRouter);
app.use("/api/hero_images", heroImagesRouter);
app.use("/api/partners", partnersRouter);
app.use("/api/contact", contactRouter);

// app.listen(5000, () => {
//   console.log(`🚀 Iddo Backend is running on http://localhost:${5000}`);
// });

export default app;
