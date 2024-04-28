/* eslint-disable no-console */
import mongoose from 'mongoose';
import config from '../config.ts';

const uri = config.databaseUri;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log('Sucessfully connected to database');
  } catch (error) {
    console.error(error);
  }
}

export default { connect, db: mongoose.connection };
