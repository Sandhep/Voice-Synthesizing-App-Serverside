// config/config.js
import { createClient } from '@supabase/supabase-js';
import * as PlayHT from 'playht';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config = {
  server: {
    port: process.env.PORT || 4000,
    cors: {
      origin: process.env.CLIENT_ORIGIN,
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type']
    }
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY
  },
  playHT: {
    apiKey: process.env.PLAYHT_API_KEY,
    userId: process.env.PLAYHT_USER_ID
  },
  upload: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: ['audio/*']
  }
};

export const supabase = createClient(config.supabase.url, config.supabase.key);

// Initialize PlayHT
PlayHT.init({
  apiKey: config.playHT.apiKey,
  userId: config.playHT.userId,
});

export default config;
