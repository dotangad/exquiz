import { SyntheticEvent } from "react";
import { useQuery, useMutation } from "../../convex/_generated";
import { Team, Slide } from "../../util/common";

export default function PounceBtn({
  claimedTeam,
  currentSlide,
}: {
  claimedTeam: Team;
  currentSlide: Slide;
}) {
  // @ts-ignore
  const hasPounced = useQuery("hasPounced", currentSlide._id, claimedTeam._id);
  const { pounceWindowOpen } = useQuery("pounceWindow") || {
    pounceWindowOpen: false,
  };
  const pounce = useMutation("pounce");

  return (
    <div className="flex items-center justify-center">
      {hasPounced ? (
        <div>You have pounced</div>
      ) : pounceWindowOpen ? (
        <button
          className="btn"
          disabled={!pounceWindowOpen || hasPounced}
          onClick={() => pounce(claimedTeam._id, currentSlide._id)}
        >
          Pounce
        </button>
      ) : (
        <div>Pounce window is closed</div>
      )}
    </div>
  );
}
