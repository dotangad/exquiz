import { mutation } from "convex-dev/server";
import { Id } from "convex-dev/values";

export default mutation(async ({ db }, teamId: Id) => {
  const bounce = await db
    .table("meta")
    .filter((q) => q.eq(q.field("key"), "currentDirect"))
    .first();

  db.update(bounce._id, { value: teamId });
});
