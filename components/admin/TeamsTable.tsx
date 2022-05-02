import { SyntheticEvent } from "react";
import { useMutation, useQuery } from "../../convex/_generated";
import { Answer, Slide, Team } from "../../util/common";
import { POINTS } from "../../util/config";
import DirectRow from "./DirectRow";
import PounceRow from "./PounceRow";

export default function TeamsTable({
  teams,
  currentSlide,
}: {
  teams: Team[];
  currentSlide: Slide;
}) {
  const answers: Answer[] | undefined = useQuery(
    "answersForSlide",
    currentSlide._id
  );

  return (
    <table className="tbl min-w-[600px]">
      <thead>
        <tr>
          <th>Team</th>
          <th>Score</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {teams?.map((team, i) => {
          const answer = answers?.find((answer) =>
            team._id.equals(answer.team)
          );

          if (!answer) {
            return (
              <tr key={i}>
                <td>Team {team.tnumber}</td>
                <td>{team.points}</td>
                <td></td>
              </tr>
            );
          }

          if (answer.answered) {
            return (
              <tr key={i}>
                <td>Team {team.tnumber}</td>
                <td>{team.points}</td>
                <td>{answer.pointsAwarded} points</td>
              </tr>
            );
          }

          if (answer.pounced) {
            return <PounceRow team={team} answer={answer} key={i} />;
          }

          if (answer.direct) {
            return <DirectRow team={team} answer={answer} key={i} />;
          }

          return <tr key={i}></tr>;
        })}
      </tbody>
    </table>
  );
}
