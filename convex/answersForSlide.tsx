import { query } from "convex-dev/server";

export default query(({ db }, slide: string) => {
  return db
    .table("answers")
    .filter((q) => q.eq(q.field("slide"), slide))
    .collect();
});
