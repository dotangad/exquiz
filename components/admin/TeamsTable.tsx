import { useQuery } from "../../convex/_generated";
import { Answer, Slide, Team } from "../../util/common";
import { POINTS } from "../../util/config";

export default function TeamsTable({
  teams,
  currentSlide,
}: {
  teams: Team[];
  currentSlide: Slide;
}) {
  const answers: Answer[] | undefined = useQuery(
    "answersForSlide",
    currentSlide._id.toString()
  );

  console.log({ answers });

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
        {teams?.map((team, i) =>
          answers?.find((answer) => team._id.toString() === answer.team) ? (
            <tr key={i}>
              <td>
                <div>Team {team.tnumber}</div>
                <div className="text-xs uppercase font-bold text-amber-500">
                  (pounced)
                </div>
              </td>
              <td>{team.points}</td>
              <td>
                <div className="flex gap-x-3 w-full items-center justify-center">
                  <button className="btn text-xs !p-2">
                    Correct (+{POINTS.POUNCE.CORRECT})
                  </button>
                  <button className="btn text-xs !p-2">
                    Incorrect (-{POINTS.POUNCE.INCORRECT})
                  </button>
                </div>
              </td>
            </tr>
          ) : (
            <tr key={i}>
              <td>Team {team.tnumber}</td>
              <td>{team.points}</td>
              <td></td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
