const express = require("express");
const TanamanControllerApi = require("../../controllers/apiController/tanamanApi.controller");
const router = express.Router();

router.get("/", TanamanControllerApi.getTanaman);
router.get("/:id", TanamanControllerApi.getTanamanById);

module.exports = router;
