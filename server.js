
// server.js
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import config from './config/config.js';
import { upload } from './middleware/upload.js';
import { errorHandler } from './middleware/errorHandler.js';
import { SynthesizeController } from './controllers/synthesizeController.js';

// ES module equivalents for __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors(config.server.cors));
app.use(express.json());

//Routes
app.post('/api/synthesize', 
  upload.single('file'), 
  SynthesizeController.synthesize
); 

app.get('/api/ping', (req, res) => {
  res.send('This is to Monitor the server uptime');
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.server.port, () => {
  console.log(`Server running at http://localhost:${config.server.port}`);
});