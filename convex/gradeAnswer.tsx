import { mutation } from "convex-dev/server";
import { Id } from "convex-dev/values";

export default mutation(
  async ({ db }, answerId: Id, teamId: Id, points: number) => {
    const team = await db.get(teamId);

    db.update(answerId, { answered: true, pointsAwarded: points });
    db.update(teamId, { points: team.points + points });

    return true;
  }
);
