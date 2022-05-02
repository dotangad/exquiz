import { SyntheticEvent, useState } from "react";
import { useMutation } from "../../convex/_generated";
import { Team, Answer } from "../../util/common";
import { POINTS } from "../../util/config";

export default function DirectRow({
  team,
  answer,
}: {
  team: Team;
  answer: Answer;
}) {
  const [points, setPoints] = useState(0);
  const gradeAnswer = useMutation("gradeAnswer");
  const confText = `Are you sure? This will award Team ${team.tnumber} ${points} points`;
  const bounce = useMutation("bounce");

  const handleGrade = async (e: SyntheticEvent) => {
    if (!window.confirm(confText)) return;

    // gradeAnswer(answer._id, team._id, points);

    // Set currentBounce to currentBounce + 1
    console.log(await bounce());
    // Change currentDirect on nextSlide
    // Have some sort of component in the admin which shows the next direct
  };

  return (
    <tr>
      <td>
        <div>Team {team.tnumber}</div>
        <div className="text-xs uppercase font-bold text-red-500">(direct)</div>
      </td>
      <td>{team.points}</td>
      <td>
        <div className="flex gap-x-3 w-full items-center justify-center">
          <button
            className="btn text-xs !p-2 font-mono"
            onClick={() => setPoints((p) => p - 1)}
          >
            -
          </button>
          <div className="font-mono text-sm">{points}</div>
          <button
            className="btn text-xs !p-2 font-mono"
            onClick={() => setPoints((p) => p + 1)}
          >
            +
          </button>
          <button className="btn text-xs !p-2" onClick={handleGrade}>
            Grade
          </button>
        </div>
      </td>
    </tr>
  );
}
