import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { ApiResponse } from "../types/common.js";
import { ContactRequestBody } from "../types/contact.js";

const router = Router();

// Request<Params, ResBody, ReqBody, ReqQuery>

router.post(
  "/",
  async (
    req: Request<{}, {}, ContactRequestBody>,
    res: Response<ApiResponse<null>>,
  ) => {
    try {
      const { name, email, phone, message, token } = req.body;

      // 1. Simple Validation of Required Fields
      if (!name || !email || !phone || !message || !token) {
        return res.status(400).json({
          success: false,
          message: "requiredFields",
        });
      }

      // 2. Email RegExp Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "emailInvalid",
        });
      }

      // 3. Sanitize input (remove spaces, hyphens, parentheses) and Validate clean string
      const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
      const phoneRegex = /^(\+?[1-9]\d{6,14}|0\d{8,10})$/;

      if (!phoneRegex.test(cleanPhone)) {
        return res.status(400).json({
          success: false,
          message: "phoneInvalid",
        });
      }

      // 4. check reCAPTCHA
      const secretKey = process.env.RECAPTCHA_SECRET_KEY;
      const verifyRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
        { method: "POST" },
      );
      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        return res
          .status(400)
          .json({ success: false, message: "recaptchaFailed" });
      }

      // 4. Save Contact Message to Database (including phone)
      await prisma.contactMessage.create({
        data: {
          name,
          email,
          phone: cleanPhone,
          message,
        },
      });

      return res.status(201).json({
        success: true,
        message: "successMessage",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "serverError",
      });
    }
  },
);

export default router;
