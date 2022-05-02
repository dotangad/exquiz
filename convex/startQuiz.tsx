import { mutation } from "convex-dev/server";
import { SLIDES } from "../util/config";

export default mutation(async ({ db }) => {
  for (let slide of SLIDES) {
    db.insert("slides", slide);
  }

  const team = await db.table("teams").first();
  const slide = await db.table("slides").first();

  db.insert("meta", { key: "quizStarted", value: true });
  db.insert("meta", { key: "currentSlide", value: SLIDES[0].img });
  db.insert("meta", { key: "currentDirect", value: team._id });
  db.insert("meta", { key: "currentBounce", value: team._id });
  db.insert("meta", { key: "bounceDirection", value: +1 });

  db.insert("answers", {
    team: team._id,
    slide: slide._id,
    pounced: false,
    bounced: false,
    direct: true,
    answered: false,
    pointsAwarded: 0,
  });
});
