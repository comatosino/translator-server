import mongoose, { Connection } from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://localhost/translatordb";

const db = {
  connect: async function (): Promise<Connection | void> {
    try {
      const instance = await mongoose.connect(uri);
      if (instance) {
        console.log(`db connected on ${uri}`);
      }
      return instance.connection;
    } catch (error) {
      console.error(error);
      return this.disconnect();
    }
  },

  // closes all connections
  disconnect: async function () {
    try {
      return await mongoose.disconnect();
    } catch (error) {
      console.error(error);
    } finally {
      console.log(`all db connections disconnected`);
    }
  },
};

export default db;
