import { mutation } from "convex-dev/server";
import { Id } from "convex-dev/values";

export default mutation(({ db }, team: string, slide: string) => {
  // Create answer
  return db.insert("answers", {
    team: team,
    slide: slide,
    pounced: true,
    bounced: false,
    // TODO: check for current direct
    direct: false,
    answered: false,
    pointsAwarded: 0,
  });
});
