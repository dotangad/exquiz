import { query } from "convex-dev/server";
import { Team } from "../util/common";

// List all teams.
export default query(async ({ db }): Promise<Team[]> => {
  return await db.table("teams").collect();
});
