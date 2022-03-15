import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://localhost/translatordb";

const db = {
  connect: async function () {
    try {
      await mongoose.connect(uri);
      console.log(`db connected on ${uri}`);
    } catch (error) {
      console.error(error);
      this.disconnect();
    }
  },
  disconnect: async function () {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.error(error);
    }
  },
};

export default db;
