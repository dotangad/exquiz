import { mutation } from "convex-dev/server";
import { Id } from "convex-dev/values";

// Claim a team
export default mutation(({ db }, id: Id) => {
  db.update(id, { claimed: true });
});
