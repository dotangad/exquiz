import { SyntheticEvent } from "react";
import { useMutation } from "../../convex/_generated";
import { Team, Answer } from "../../util/common";
import { POINTS } from "../../util/config";

export default function PounceRow({
  team,
  answer,
}: {
  team: Team;
  answer: Answer;
}) {
  const gradeAnswer = useMutation("gradeAnswer");
  const confText = (correct: boolean) =>
    `Are you sure? This will award Team ${team.tnumber} ${
      correct ? `+${POINTS.POUNCE.CORRECT}` : `-${POINTS.POUNCE.INCORRECT}`
    } points`;

  const handleGrade = (correct: boolean) => (e: SyntheticEvent) => {
    if (!window.confirm(confText(correct))) return;

    gradeAnswer(
      answer._id,
      team._id,
      correct ? POINTS.POUNCE.CORRECT : POINTS.POUNCE.INCORRECT
    );
  };

  return (
    <tr>
      <td>
        <div>Team {team.tnumber}</div>
        <div className="text-xs uppercase font-bold text-amber-500">
          (pounced)
        </div>
      </td>
      <td>{team.points}</td>
      <td>
        <div className="flex gap-x-3 w-full items-center justify-center">
          <button className="btn text-xs !p-2" onClick={handleGrade(true)}>
            Correct (+{POINTS.POUNCE.CORRECT})
          </button>
          <button className="btn text-xs !p-2" onClick={handleGrade(false)}>
            Incorrect (-{POINTS.POUNCE.INCORRECT})
          </button>
        </div>
      </td>
    </tr>
  );
}
