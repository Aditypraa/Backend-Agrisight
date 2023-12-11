import express from "express";
import TanamanController from "../controllers/Tanaman.controller.js";

const router = express.Router();

router.get("/", TanamanController.all);
router.post("/", TanamanController.create);
router.get("/:id", TanamanController.find);
router.put("/:id", TanamanController.update);
router.delete("/:id", TanamanController.destroy);

export default router;
