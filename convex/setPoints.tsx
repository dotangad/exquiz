import { mutation } from "convex-dev/server";
import { Id } from "convex-dev/values";

export default mutation(({ db }, teamId: Id, points: number) => {
  return db.update(teamId, { points });
});
