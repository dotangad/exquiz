import { Id } from "convex-dev/values";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Team, TeamUnserialized } from "./common";

// Essentially the team that's currently logged in
export const claimedTeamAtomUnserialized =
  atomWithStorage<TeamUnserialized | null>("claimedTeam", null);

export const claimedTeamAtom = atom((get) => {
  const team = get(claimedTeamAtomUnserialized);
  if (!team) {
    return null;
  }
  return { ...team, _id: Id.fromString(team._id) };
});
