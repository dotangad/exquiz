import { mutation } from "convex-dev/server";

export default mutation(async ({ db }) => {
  const isOpen = await db
    .table("meta")
    .filter((q) => q.eq(q.field("key"), "pounceWindowOpen"))
    .first();
  const openSince = await db
    .table("meta")
    .filter((q) => q.eq(q.field("key"), "pounceWindowOpenSince"))
    .first();

  db.update(isOpen._id, { value: true });
  db.update(openSince._id, { value: Date.now() });
});
