import db from ".";
import { User, Translation } from "./models";

const addData = async () => {
  try {
    await User.create({
      username: "demo",
      password: "password",
      translations: [
        await Translation.create({
          source: "en-US",
          sourceText: "hello",
          target: "es-US",
          targetText: "hola",
        }),
      ],
    });
  } catch (error) {
    console.error(error);
  }
};

const seed = async () => {
  try {
    const connection = await db.connect();
    if (connection) {
      await connection?.dropDatabase();
      await addData();
    }
    console.log("db seeded successfully!");
  } catch (error) {
    console.log("error seeding database!");
    console.error(error);
  } finally {
    await db.disconnect();
  }
};

seed();
