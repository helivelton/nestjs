import { Injectable } from '@nestjs/common';
import { MongoClient, ServerApiVersion } from 'mongodb';

@Injectable()
export class DatabaseService {

  getClient() {
    const mongoUri = process.env.MONGODB_URI ?? '';

    return new MongoClient(mongoUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  async testConnection() {
    const client = this.getClient();
    try {
      console.log('Connecting to MongoDB');
      await client.connect();
      console.log('Connected to MongoDB');
      await client.db('admin').command({ ping: 1 });

      //List all databases
      const databases = await client.db().admin().listDatabases();
      console.log('Databases:', databases);

      //List all tables in admin database
      const tables = await client.db('admin').listCollections();
      console.log('Tables:', tables);

      console.log('Successfully connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    } finally {
      await client.close();
    }
  }
}
