import { SyntheticEvent, useEffect, useState } from "react";
import { useMutation } from "../../convex/_generated";
import { Team } from "../../util/common";
import { POINTS } from "../../util/config";

export default function TeamRow({ team }: { team: Team }) {
  // TODO: Check for pounces, direct, bounce
  const [points, setPoints] = useState(team.points);

  const handleGrade = async (e: SyntheticEvent) => {
    const confText = `Are you sure? This will award Team ${team.tnumber} ${points} points`;
    if (!window.confirm(confText)) return;
  };

  useEffect(() => {
    // TODO: set points if points !== team.points
    console.log("POINTS:", points);
  }, [points]);

  return (
    <tr>
      <td>
        <div>Team {team.tnumber}</div>
        {/* <div className="text-xs uppercase font-bold text-amber-500">(pounce)</div> */}
      </td>
      <td className="!px-5">
        <div className="flex gap-x-[5px] w-full items-center justify-center">
          <button
            className="btn text-xs !p-2 font-mono"
            onClick={() => setPoints((p) => p - 5)}
          >
            -5
          </button>
          <button
            className="btn text-xs !p-2 font-mono"
            onClick={() => setPoints((p) => p - 1)}
          >
            -1
          </button>
          <div className="font-mono text-sm mx-1">{points}</div>
          <button
            className="btn text-xs !p-2 font-mono"
            onClick={() => setPoints((p) => p + 1)}
          >
            +1
          </button>
          <button
            className="btn text-xs !p-2 font-mono"
            onClick={() => setPoints((p) => p + 5)}
          >
            +5
          </button>
        </div>
      </td>
      <td>
        {/* TODO: handle setting direct */}
        <button className="btn text-xs !p-2" onClick={console.log}>
          Set Direct
        </button>
      </td>
      <td>
        {/* TODO: handle setting bounce */}
        <button className="btn text-xs !p-2" onClick={console.log}>
          Set Bounce
        </button>
      </td>
    </tr>
  );
}
