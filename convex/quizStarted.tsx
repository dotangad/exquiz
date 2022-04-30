import { query } from "convex-dev/server";

export default query(({ db }) => {
  return db
    .table("meta")
    .filter((q) => q.eq(q.field("key"), "quizStarted"))
    .first();
});
