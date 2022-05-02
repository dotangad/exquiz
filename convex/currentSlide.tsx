import { query } from "convex-dev/server";

export default query(async ({ db }) => {
  const slide = await db
    .table("meta")
    .filter((q) => q.eq(q.field("key"), "currentSlide"))
    .first();

  if (!slide) return null;

  return db.get(slide.value);
});
