import { useAtom } from "jotai";
import { SyntheticEvent } from "react";
import { useMutation } from "../../convex/_generated";
import { Team } from "../../util/common";
import { claimedTeamAtom } from "../../util/jotai";

const TeamCard: React.FC<{ team: Team }> = ({ team }) => {
  const claimTeam = useMutation("claimTeam");
  const [claimedTeam, setClaimedTeam] = useAtom(claimedTeamAtom);

  const handleClaim = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log({ team });

    // Run claimTeam mutation
    claimTeam(team._id);
    // Save current team to global state and localStorage
    setClaimedTeam({ ...team, claimed: true });
  };

  return (
    <button
      disabled={team.claimed || !!claimedTeam}
      onClick={handleClaim}
      className="w-full border border-slate-200 rounded-xl p-4 px-6 flex justify-between items-center my-5 disabled:bg-slate-200 hover:bg-slate-100/50 transition"
    >
      <div className="flex-1 flex flex-col gap-y-1">
        <div className="text-left text-lg font-bold">
          Team {team.tnumber}{" "}
          {team.tnumber == claimedTeam?.tnumber ? "(you)" : ""}
        </div>
        <div className="text-left">{team.name}</div>
      </div>
      <div>
        <div
          className={`rounded-full h-[15px] w-[15px] ${
            team.claimed ? `bg-green-500` : `bg-red-500`
          }`}
        ></div>
      </div>
    </button>
  );
};

export default TeamCard;
