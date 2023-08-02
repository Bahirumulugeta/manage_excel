
// Global App File

// Built in middlewares
// Path
import path from "path";

// Third party middlewares
// Express
import express from "express";

// App
const app = express();

// Compression
import compression from "compression";

// Helmet
import helmet from "helmet";

// Rate Limiter
import rateLimiter from "express-rate-limit";

// Cors
import cors  from "cors";

// Custom modules
// App Error
import AppError from "../utils/appError";

// Global Error Handler
import geh from "../api/geh";

// Router files
import dataRoutes from "../api/data/router";


// Use Third party middlewares
app.use(cors());
app.use(compression());
app.use(helmet());
// app.use(
//   contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       defaultSrc: ["'self'", "qa.alenplc.com"],
//     },
//     reportOnly: false,
//   })
// );
// app.use(
//   rateLimiter({
//     windowMs: 60 * 60 * 1000,
//     max: 100,
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(process.cwd(), "public")));

// Use routers
app.use("/api/v1/data", dataRoutes);

// Handle URL which don't exist
app.use("*", (req, res, next) => {
  return next(
    new AppError(
      `Unknown URL - ${req.protocol}://${req.get("host")}${req.originalUrl}`,
      404
    )
  );
});

// Use GEH
app.use(geh);

// Export App
export default app;
