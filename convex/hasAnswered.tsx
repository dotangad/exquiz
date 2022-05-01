import { query } from "convex-dev/server";
import { Id } from "convex-dev/values";

export default query(({ db }, teamId: Id, slideId: Id) => {
  return db
    .table("answers")
    .filter((q) =>
      q.and(q.eq(q.field("team"), teamId), q.eq(q.field("slide"), slideId))
    )
    .first();
});
