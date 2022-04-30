import { mutation } from "convex-dev/server";
import { SLIDES } from "../util/config";

export default mutation(async ({ db }) => {
  for (let slide of SLIDES) {
    db.insert("slides", slide);
  }

  const quizStartedId = (
    await db
      .table("meta")
      .filter((q) => q.eq(q.field("key"), "quizStarted"))
      .first()
  )?._id;

  quizStartedId
    ? db.update(quizStartedId, { value: true })
    : db.insert("meta", { key: "quizStarted", value: true });

  const currentSlideId = (
    await db
      .table("meta")
      .filter((q) => q.eq(q.field("key"), "currentSlide"))
      .first()
  )?._id;

  currentSlideId
    ? db.update(currentSlideId, { value: SLIDES[0].img })
    : db.insert("meta", { key: "currentSlide", value: SLIDES[0].img });
});
