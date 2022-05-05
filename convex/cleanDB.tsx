import { mutation } from "convex-dev/server";

export default mutation(async ({ db }) => {
  const tables = ["teams", "slides", "meta", "pounces"];

  for (let table of tables) {
    const documents = await db.table(table).collect();

    for (let doc of documents) {
      db.delete(doc._id);
    }
  }
});
