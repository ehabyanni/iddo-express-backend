import { Request, Response, NextFunction } from "express";

export const securityHeadersMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  );
  next();
};