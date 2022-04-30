import { useQuery } from "../../convex/_generated";
import { Team } from "../../util/common";

export default function ScoreTable({ className }: { className?: string }) {
  const teams: Team[] | undefined = useQuery("allTeams");

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
            <td>Team {team.tnumber}</td>
            <td>{team.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
