import { query } from "convex-dev/server";
import { Id } from "convex-dev/values";

export default query(({ db }, slideId: Id) => {
  return db
    .table("pounces")
    .filter((q) => q.eq(q.field("slide"), slideId))
    .collect();
});
