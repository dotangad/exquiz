import { mutation } from "convex-dev/server";
import { Id } from "convex-dev/values";
import { SLIDES } from "../util/config";

export default mutation(async ({ db }, nextSlideImg: string) => {
  if (
    !(
      await db
        .table("meta")
        .filter((q) => q.eq(q.field("key"), "quizStarted"))
        .first()
    )?.value
  )
    return null;

  const currentSlideId = (
    await db
      .table("meta")
      .filter((q) => q.eq(q.field("key"), "currentSlide"))
      .first()
  )?._id;

  return db.update(currentSlideId, { value: nextSlideImg });
});
