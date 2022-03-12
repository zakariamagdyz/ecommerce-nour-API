module.exports = class HttpError extends Error {
  constructor(message, errorCode, auditAction) {
    super(message);
    this.statusCode = errorCode;
    this.status = `${errorCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.auditAction = auditAction;
    Error.captureStackTrace(this, this.Constructor);
  }
};
