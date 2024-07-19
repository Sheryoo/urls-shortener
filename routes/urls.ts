import { Router } from "express";
import { shortenUrl, getOriginalUrl } from "../controllers/urls";

const router = Router();

router.post("/shorten", shortenUrl);
router.get("/:shortUrl", getOriginalUrl);

export default router;
