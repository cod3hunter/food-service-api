import { Logger } from '@nestjs/common';
import mongoose from 'mongoose';

export class DBService {
  constructor() {
    if (mongoose.connections.length === 0) {
      mongoose.connect('mongodb://localhost:27017/test');
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', () => {
        Logger.warn('open');
      });
    }
  }
}
