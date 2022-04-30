import { useAtom } from "jotai";
import { useQuery } from "../../convex/_generated";
import { claimedTeamAtom } from "../../util/jotai";
import Rules from "./Rules";
import TeamCard from "./TeamCard";

export default function Onboarding() {
  const teams = useQuery("allTeams") || [];
  const quizStarted = useQuery("quizStarted");
  const [claimedTeam, setClaimedTeam] = useAtom(claimedTeamAtom);

  return (
    <div className="h-screen w-screen grid grid-cols-2 p-[50px] gap-x-[50px] text-slate-700">
      <Rules />
      <div className="flex flex-col justify-center items-stretch gap-y-5">
        <h1 className="text-center text-slate-600 text-3xl font-bold">Teams</h1>
        <div className="max-w-[500px] w-full mx-auto">
          {teams.map((team, i) => (
            <TeamCard team={team} key={i} />
          ))}
        </div>
        {quizStarted && quizStarted?.value === true ? (
          <div className="text-center">Quiz has begun</div>
        ) : claimedTeam ? (
          <div className="text-center">The quiz will begin shortly</div>
        ) : (
          <div className="text-center">Please choose a team</div>
        )}
      </div>
    </div>
  );
}
