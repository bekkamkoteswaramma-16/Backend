export const logger = (req, res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${req.method} ${req.url} - Status: ${res.statusCode}`);
  next();
};

export const errorHandler = (err, req, res, next) => {
  res.status(500).json({ success: false, message: err.message });
};