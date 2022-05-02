import { mutation } from "convex-dev/server";
import { Id } from "convex-dev/values";

export default mutation(({ db }, team: Id, slide: Id) => {
  // Create answer
  return db.insert("pounces", {
    team: team,
    slide: slide,
  });
});
