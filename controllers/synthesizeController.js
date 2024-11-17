// controllers/synthesizeController.js
import { AudioService } from '../services/audioService.js';

export class SynthesizeController {
  static async synthesize(req, res) {
    try {
      // Validate inputs
      if (!req.file) {
        return res.status(400).json({ error: 'No input audio file uploaded' });
      }

      const text = req.body.text;
      if (!text || text.length > 500) {
        return res.status(400).json({ error: 'Invalid text input' });
      }

      // Process audio
      await AudioService.storeInputAudio(req.file);
      const audioUrl = await AudioService.generateAudio(text);
      const generatedUrl = await AudioService.downloadAndStoreGeneratedAudio(audioUrl);

      res.json({ audioUrl: generatedUrl });

    } catch (error) {
      console.error('Processing error:', error);
      res.status(500).json({ 
        error: 'Failed to process audio',
        details: error.message 
      });
    }
  }
}
