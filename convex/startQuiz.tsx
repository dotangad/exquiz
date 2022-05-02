import { mutation } from "convex-dev/server";
import { SLIDES } from "../util/config";

export default mutation(async ({ db }) => {
  for (let slide of SLIDES) {
    db.insert("slides", slide);
  }

  const team = await db.table("teams").first();
  const slide = await db.table("slides").first();

  db.insert("meta", { key: "quizStarted", value: true });
  db.insert("meta", { key: "currentSlide", value: slide._id });
  db.insert("meta", { key: "currentDirect", value: team._id });
  db.insert("meta", { key: "currentBounce", value: team._id });
  db.insert("meta", { key: "pounceWindowOpen", value: false });
});
