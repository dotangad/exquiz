import { query } from "convex-dev/server";
import { Id } from "convex-dev/values";

export default query(({ db }, slide: Id) => {
  return db
    .table("answers")
    .filter((q) => q.eq(q.field("slide"), slide))
    .collect();
});
