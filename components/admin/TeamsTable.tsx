import { useQuery } from "../../convex/_generated";
import { Slide, Team } from "../../util/common";
import TeamRow from "./TeamRow";

export default function TeamsTable({
  teams,
  currentSlide,
}: {
  teams: Team[];
  currentSlide: Slide;
}) {
  return (
    <table className="tbl min-w-[600px]">
      <thead>
        <tr>
          <th>Team</th>
          <th>Score</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {teams?.map((team, i) => (
          <TeamRow team={team} key={i} />
        ))}
      </tbody>
    </table>
  );
}
