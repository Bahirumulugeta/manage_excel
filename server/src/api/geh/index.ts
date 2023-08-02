// Global Error Handler

// Config
import configs from '../../configs/configs';

// App Error
import AppError from '../../utils/appError';
// Handler
import { Request, Response, NextFunction } from 'express';

// Interface for error
interface ErrorResponse {
  status: string;
  message: string;
  error?: Error;
  errorStack?: string;
}
// Send Dev Error
const sendDevError = (err:any, res:Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    errorStack: err.stack,
  });
};

// Send Prod Error
const sendProdError = (err:any, res:Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "ERROR",
      message: "Opps!! Unknown Error. Please try again",
    });
  }
};

// Global Error Handler
const geh = (err:any, req:Request, res:Response, next:NextFunction) => {
  err.status = err.status || "ERROR";
  err.statusCode = err.statusCode || 500;

  // Casting error
  if (err.name === "CastError") {
    const message = `Resource not found`;
    err = new AppError(message, 404);
  }

  // Send error for Dev Environment
  if (configs.env === "development") {
    sendDevError(err, res);
  }

  // Send error for Prod Environment
  if (configs.env === "production" || configs.env === "qa") {
    sendProdError(err, res);
  }
};

// Export GEH
export default geh;
