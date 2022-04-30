import { query } from "convex-dev/server";

export default query(async ({ db }) => {
  const img = await db
    .table("meta")
    .filter((q) => q.eq(q.field("key"), "currentSlide"))
    .first();

  if (!img) return null;

  return db
    .table("slides")
    .filter((q) => q.eq(q.field("img"), img.value))
    .first();
});
