import { nanoid } from "nanoid";
import { Request, Response } from "express";
import Urls from "../models/urls";
import { validateUrl } from "../utils/validateUrls";

export const shortenUrl = async (req: Request, res: Response) => {
  try {
    const shortenedUrl = nanoid(10);
    const originalUrl = req.body.originalUrl;

    if (!originalUrl) {
      return res.status(400).json({
        status: false,
        message: "originalUrl is required to shorten url",
        data: null,
      });
    }

    if (!validateUrl(originalUrl)) {
      return res.status(400).json({
        status: false,
        message: "Invalid originalUrl format",
        data: null,
      });
    }

    const existingUrl = await Urls.findOne({ where: { originalUrl } });

    if (existingUrl) {
      return res.status(409).json({
        status: false,
        message: "Url already exists. Please use a different URL",
        data: existingUrl,
      });
    }
    const url = new Urls({
      originalUrl,
      shortUrl: shortenedUrl,
    });
    await url.save();
    res
      .status(200)
      .json({ status: true, message: "Url shortened successfully", data: url });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, message: "Failed to shorten url", data: null });
  }
};

export const getOriginalUrl = async (req: Request, res: Response) => {
  try {
    const shortUrl = req.params.shortUrl;
    const url = await Urls.findOne({ where: { shortUrl } });
    if (!url) {
      return res
        .status(404)
        .json({ status: false, message: "Url not found", data: null });
    }

    await url.update({ visits: url?.toJSON().visits + 1 });

    return res.redirect(url.toJSON().originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Failed to get original url",
      data: null,
    });
  }
};

export default { shortenUrl, getOriginalUrl };
