import db from ".";
import { User, Translation } from "./models";

const addData = async () => {
  try {
    await User.create({
      username: "demo",
      password: "password",
      translations: [
        await Translation.create({
          srcLang: "en-US",
          srcText: "hello",
          trgLang: "es-US",
          trgText: "hola",
        }),
      ],
    });
  } catch (error) {
    console.error(error);
  }
};

const seed = async () => {
  const connection = await db.connect();
  if (connection) {
    await connection?.dropDatabase();
    await addData();
    await db.disconnect();
  }
};

seed();
