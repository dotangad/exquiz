import { useQuery } from "../../convex/_generated";
import { Team } from "../../util/common";

export default function ScoreTable({ className }: { className?: string }) {
  const teams: Team[] | undefined = useQuery("allTeams");
  const { bounce, direct } = useQuery("bounceDirect") || {
    bounce: null,
    direct: null,
  };

  return (
    <table className={`tbl ${className}`}>
      <thead>
        <tr>
          <th>Team</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {teams?.map((team, i) => (
          <tr key={i}>
            <td>
              <div>Team {team.tnumber}</div>
              <div className="text-sm text-amber-500">
                {bounce?.value.equals(team._id) && "(BOUNCE)"}
              </div>
              <div className="text-sm text-red-500">
                {direct?.value.equals(team._id) && "(DIRECT)"}
              </div>
            </td>
            <td>{team.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
