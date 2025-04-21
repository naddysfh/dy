const { MongoClient } = require('mongodb');

const drivers = [
  { name: 'John Doe', rating: 4.6, available: true },
  { name: 'Jane Smith', rating: 4.8, available: false },
  { name: 'Alice Johnson', rating: 4.2, available: true }
];

// Display driver names
drivers.forEach(driver => console.log("Driver Name:", driver.name));

// Add a new driver
drivers.push({ name: 'Bob Marley', rating: 4.9, available: true });

const uri = 'mongodb://localhost:27017'; // Update if using MongoDB Atlas
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('ride_hailing');
    const collection = db.collection('drivers');

    // INSERT
    await collection.insertMany(drivers);
    console.log("✅ Drivers inserted");

    // QUERY
    const highRatedDrivers = await collection.find({
      available: true,
      rating: { $gte: 4.5 }
    }).toArray();
    console.log("🚗 Available High Rated Drivers:", highRatedDrivers);

    // UPDATE
    await collection.updateOne(
      { name: 'John Doe' },
      { $inc: { rating: 0.1 } }
    );
    console.log("🛠️ John Doe's rating updated by +0.1");

    // DELETE
    await collection.deleteOne({ available: false });
    console.log("🗑️ One unavailable driver deleted");

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔌 MongoDB connection closed");
  }
}

run();
