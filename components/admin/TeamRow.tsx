import { SyntheticEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "../../convex/_generated";
import { Team } from "../../util/common";
import { POINTS } from "../../util/config";

export default function TeamRow({
  team,
  pounced,
}: {
  team: Team;
  pounced: boolean;
}) {
  const [points, setPoints] = useState(team.points);
  const setPointsMutation = useMutation("setPoints");
  const setBounce = useMutation("setBounce");
  const setDirect = useMutation("setDirect");
  const { bounce, direct } = useQuery("bounceDirect") || {
    bounce: null,
    direct: null,
  };

  const handleGrade = async (e: SyntheticEvent) => {
    const confText = `Are you sure? This will award Team ${team.tnumber} ${points} points`;
    if (!window.confirm(confText)) return;
  };

  useEffect(() => {
    if (points !== team.points) setPointsMutation(team._id, points);
  }, [points, team._id, setPointsMutation, team.points]);

  return (
    <tr>
      <td>
        <div>Team {team.tnumber}</div>
        {pounced && (
          <div className="text-xs uppercase font-bold text-lime-500">
            (pounce)
          </div>
        )}
        <div className="text-xs uppercase font-bold text-amber-500">
          {bounce?.value.equals(team._id) && "(BOUNCE)"}
        </div>
        <div className="text-xs uppercase font-bold text-red-500">
          {direct?.value.equals(team._id) && "(DIRECT)"}
        </div>
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
        <button
          className="btn text-xs !p-2"
          onClick={() => setDirect(team._id)}
          disabled={direct?.value.equals(team._id)}
        >
          Set Direct
        </button>
      </td>
      <td>
        <button
          className="btn text-xs !p-2"
          onClick={() => setBounce(team._id)}
          disabled={bounce?.value.equals(team._id)}
        >
          Set Bounce
        </button>
      </td>
    </tr>
  );
}
