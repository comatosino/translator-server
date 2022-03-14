import db from ".";
import { User, Translation } from "./models";

const addData = async () => {
  try {
    await User.create({
      username: "Rob",
      password: "passweird",
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
    console.error("ERROR SEEDING");
    console.error(error);
  }
};

const seed = async () => {
  await db.connect();
  await addData();
  await db.disconnect();
};

seed();
