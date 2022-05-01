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
  const hasAnswered = useQuery(
    "hasAnswered",
    claimedTeam._id,
    currentSlide._id
  );
  const pounce = useMutation("pounce");

  const handlePounce = async (e: SyntheticEvent) => {
    e.preventDefault();
    await pounce(claimedTeam._id, currentSlide._id);
  };

  return (
    <div className="flex items-center justify-center">
      <button className="btn" onClick={handlePounce} disabled={hasAnswered}>
        Pounce
      </button>
    </div>
  );
}
