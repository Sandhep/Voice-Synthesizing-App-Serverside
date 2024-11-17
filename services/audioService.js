// services/audioService.js
import fetch from 'node-fetch';
import * as PlayHT from 'playht';
import { supabase } from '../config/config.js';
import path from 'path';

export class AudioService {
  static async storeInputAudio(file) {
    const inputFileName = `synthesised-to-input-${Date.now()}${path.extname(file.originalname)}`;
    
    const { error } = await supabase.storage
      .from('voice-files')
      .upload(inputFileName, file.buffer, {
        contentType: file.mimetype,
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;
    return inputFileName;
  }

  static async generateAudio(text) {
    const generated = await PlayHT.generate(text);
    return generated.audioUrl;
  }

  static async downloadAndStoreGeneratedAudio(audioUrl) {
    const response = await fetch(audioUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.statusText}`);
    }
    
    const audioBuffer = await response.arrayBuffer();
    const fileName = `generated-${Date.now()}.mp3`;

    const { error } = await supabase.storage
      .from('Generated-Voice')
      .upload(fileName, Buffer.from(audioBuffer), {
        contentType: 'audio/mpeg',
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('Generated-Voice')
      .getPublicUrl(fileName);

    return publicUrl;
  }
}