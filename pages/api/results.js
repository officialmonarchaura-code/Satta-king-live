import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://officialmonarchaura_db_user:OFKQsIJA6DlFGuP3@cluster0.csyn0zh.mongodb.net/?appName=Cluster0"; 
const client = new MongoClient(uri);

export default async function handler(req, res) {
  await client.connect();
  const db = client.db('satta_db');
  const collection = db.collection('results');

  if (req.method === 'GET') {
    const results = await collection.find({}).toArray();
    return res.status(200).json(results);
  }

  if (req.method === 'POST') {
    const { gameName, number, time } = req.body;
    await collection.updateOne(
      { gameName },
      { $set: { number, time, date: new Date().toLocaleDateString() } },
      { upsert: true }
    );
    return res.status(200).json({ success: true });
  }
}

