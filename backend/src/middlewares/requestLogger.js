import logger from "../utils/logger.js";

export function requestLogger(req, res, next) {
  const start = Date.now();

  const { method, originalUrl } = req;

  const requestBody = req.body;

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info({
      type: "API_REQUEST",
      method,
      url: originalUrl,
      statusCode: res.statusCode,
      requestBody,
      duration: `${duration}ms`,
    });
  });

  next();
}
