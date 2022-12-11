import { MongoClient, MongoClientOptions } from 'mongodb';

const DB_NAME = 'meal-tracker';

interface DP_Props {
  _dbClient: MongoClient | null;
  connect: (url: string) => void;
  getConnection: () => void;
}

export const db: DP_Props = {
  _dbClient: null,
  connect: async function (url) {
    const client = await MongoClient.connect(url, {
      poolSize: 10,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as MongoClientOptions);

    if (!client) {
      console.log('Something wrong with connections!');
      process.exit(1);
    }

    this._dbClient = client;
  },
  getConnection: function () {
    if (!this._dbClient) {
      console.log('You need to call the connect() function first!');
      process.exit(1);
    }

    return this._dbClient.db(DB_NAME);
  },
};
