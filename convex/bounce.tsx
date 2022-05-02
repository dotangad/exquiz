import { mutation } from "convex-dev/server";

export default mutation(async ({ db }) => {
  const img = await db
    .table("meta")
    .filter((q) => q.eq(q.field("key"), "currentSlide"))
    .first();

  const currentSlide = await db
    .table("slides")
    .filter((q) => q.eq(q.field("img"), img.value))
    .first();

  const answers = await db
    .table("answers")
    .filter((q) => q.eq(q.field("slide"), currentSlide._id))
    .collect();

  const teams = await db.table("teams").collect();
  const currentBounce = (
    await db
      .table("meta")
      .filter((q) => q.eq(q.field("key"), "currentBounce"))
      .first()
  ).value;
  const bounceDirection = (
    await db
      .table("meta")
      .filter((q) => q.eq(q.field("key"), "bounceDirection"))
      .first()
  ).value;

  const bounceTeamIdx = teams.findIndex((t) => t._id.equals(currentBounce));
  const notAnswered = teams
    .map((t, i) => ({ team: t, idx: i }))
    .filter(({ team }) =>
      answers
        .filter((x) => !x.answered || x.pounced)
        .some((answer) => answer._id.equals(team._id))
    );
  console.log({ bounceTeamIdx });

  return bounceTeamIdx;
});
