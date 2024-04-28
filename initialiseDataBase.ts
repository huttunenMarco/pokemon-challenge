/* eslint-disable no-console */
import mongoose from 'mongoose';
import fs from 'fs';
import config from './config.ts';
import PokemonModel from './models/pokemon.ts';

const uri = config.databaseUri;

await mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

async function loadDataFromJson(jsonFilePath) {
  try {
    const data = fs.readFileSync(jsonFilePath).toString();
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error('Error reading JSON file:', err);
    throw err;
  }
}

async function clearDatabase() {
  try {
    await PokemonModel.deleteMany({});
    console.log('Database cleared successfully');
  } catch (err) {
    console.error('Error clearing database:', err);
    throw err;
  }
}

async function insertDataIntoDatabase(jsonFilePath) {
  try {
    await clearDatabase();
    const jsonData = await loadDataFromJson(jsonFilePath);
    await PokemonModel.insertMany(jsonData);
    console.log('Data inserted into database successfully');
  } catch (err) {
    console.error('Error inserting data into database:', err);
    throw err;
  }
}

await insertDataIntoDatabase('./pokemons.json');
process.exit();
