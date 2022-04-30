import { query } from "convex-dev/server";
import { Slide } from "../util/common";

export default query(async ({ db }) => {
  const curr = await db
    .table("meta")
    .filter((q) => q.eq(q.field("key"), "currentSlide"))
    .first();
  if (!curr) return null;

  const slides = await db.table("slides").collect();

  for (let i = 0; i < slides.length; i++) {
    if (slides[i].img === curr.value && i + 1 < slides.length)
      return slides[i + 1];
  }

  return null;
});
