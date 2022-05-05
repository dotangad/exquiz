import { Team } from "../../util/common";

const TeamCard: React.FC<{ team: Team }> = ({ team }) => {
  return (
    <div className="w-full border border-slate-200 rounded-xl py-8 px-10 flex justify-between items-center transition">
      <div className="flex-1 flex flex-col gap-y-2 text-slate-700">
        <div className="text-left text-4xl font-bold">Team {team.tnumber}</div>
        <div className="text-left text-2xl font-semibold text-slate-400">
          {team.name}
        </div>
      </div>
      <div>
        <div
          className={`rounded-full h-[30px] w-[30px] ${
            team.claimed ? `bg-green-500` : `bg-red-500`
          } transition`}
        ></div>
      </div>
    </div>
  );
};

export default TeamCard;
