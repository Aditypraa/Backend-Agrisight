import express from "express";
import ArtikelController from "../controllers/Artikel.controller.js";

const router = express.Router();

router.get("/", ArtikelController.all);
router.post("/", ArtikelController.create);
router.get("/:id", ArtikelController.find);
router.put("/:id", ArtikelController.update);
router.delete("/:id", ArtikelController.destroy);

export default router;
