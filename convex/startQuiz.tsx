import { mutation } from "convex-dev/server";

export default mutation(async ({ db }) => {
  const id = (
    await db
      .table("meta")
      .filter((q) => q.eq(q.field("key"), "quizStarted"))
      .first()
  )?._id;

  return id
    ? db.update(id, { value: true })
    : db.insert("meta", { key: "quizStarted", value: true });
});
