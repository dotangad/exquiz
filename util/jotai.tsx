import { atomWithStorage } from "jotai/utils";
import { Team } from "./common";

// Essentially the team that's currently logged in
export const claimedTeamAtom = atomWithStorage<Team | null>(
  "claimedTeam",
  null
);
