import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertServiceSchema } from "@shared/schema";
import { generatePDF } from "./services/pdf-generator";
import { sendTelegramNotification } from "./services/telegram-bot";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Service routes
  app.post("/api/services", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "غير مصرح" });
    }

    try {
      const serviceData = insertServiceSchema.parse({
        ...req.body,
        userId: req.user!.id,
      });

      const service = await storage.createService(serviceData);
      
      // Generate PDF contract
      const contractPath = await generatePDF(service, req.user!);
      await storage.updateService(service.id, { 
        contractGenerated: true, 
        contractPath 
      });

      // Send Telegram notification
      await sendTelegramNotification(service, req.user!);

      res.json(service);
    } catch (error) {
      console.error("Error creating service:", error);
      res.status(400).json({ message: "خطأ في إنشاء الخدمة" });
    }
  });

  app.get("/api/services", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "غير مصرح" });
    }

    try {
      const services = await storage.getServicesByUserId(req.user!.id);
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "خطأ في جلب الخدمات" });
    }
  });

  app.get("/api/services/:id/contract", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "غير مصرح" });
    }

    try {
      const service = await storage.getService(parseInt(req.params.id));
      if (!service || service.userId !== req.user!.id) {
        return res.status(404).json({ message: "الخدمة غير موجودة" });
      }

      if (!service.contractPath) {
        return res.status(404).json({ message: "العقد غير متاح" });
      }

      res.sendFile(service.contractPath);
    } catch (error) {
      console.error("Error downloading contract:", error);
      res.status(500).json({ message: "خطأ في تحميل العقد" });
    }
  });

  // Admin routes
  app.get("/api/admin/services", async (req, res) => {
    if (!req.isAuthenticated() || !req.user!.isAdmin) {
      return res.status(403).json({ message: "غير مصرح" });
    }

    try {
      const services = await storage.getServicesWithUsers();
      res.json(services);
    } catch (error) {
      console.error("Error fetching all services:", error);
      res.status(500).json({ message: "خطأ في جلب الخدمات" });
    }
  });

  app.patch("/api/admin/services/:id", async (req, res) => {
    if (!req.isAuthenticated() || !req.user!.isAdmin) {
      return res.status(403).json({ message: "غير مصرح" });
    }

    try {
      const { status } = req.body;
      const service = await storage.updateService(parseInt(req.params.id), { status });
      res.json(service);
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({ message: "خطأ في تحديث الخدمة" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
