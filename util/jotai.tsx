import { Id } from "convex-dev/values";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Team } from "./common";

// Essentially the team that's currently logged in
export const claimedTeamAtom = atomWithStorage<Omit<Team, "_id"> & {_id: string} | null>(
  "claimedTeam",
  null
);

export const claimedTeamAtom2 = atom(
  (get) => {
    const team = get(claimedTeamAtom);
    if (!team) { return null }
    return { ...team, _id: Id.fromString(team._id) };
  }
)
