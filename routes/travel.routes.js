import express from "express";
import { fetchCountryCode, insertCountry } from "../controller/travel.controller.js";
const router = express.Router();

router.route("/").get(fetchCountryCode);
router.route("/add").post(insertCountry)

export default router