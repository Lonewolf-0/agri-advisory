import logger from "../utils/logger.js";

// eslint-disable-next-line no-unused-vars
export function errorLogger(err, req, res, next) {
  logger.error({
    type: "API_ERROR",
    method: req.method,
    url: req.originalUrl,
    message: err.message,
    stack: err.stack,
  });

  res.status(500).json({
    error: "Internal Server Error",
  });
}
