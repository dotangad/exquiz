import { query } from "convex-dev/server";

export default query(async ({ db }) => {
  const bounce = await db
    .table("meta")
    .filter((q) => q.eq(q.field("key"), "currentBounce"))
    .first();
  const direct = await db
    .table("meta")
    .filter((q) => q.eq(q.field("key"), "currentDirect"))
    .first();

  return { bounce, direct };
});
