// middleware/errorHandler.js
import multer from 'multer';

export const errorHandler = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size limit exceeded (5MB maximum)' });
    }
    return res.status(400).json({ error: 'File upload error' });
  }
  
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
};
