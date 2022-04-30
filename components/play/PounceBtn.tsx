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
    // @ts-ignore
    claimedTeam._id["$id"],
    currentSlide._id.toString()
  );
  const pounce = useMutation("pounce");

  const handlePounce = async (e: SyntheticEvent) => {
    e.preventDefault();

    // @ts-ignore
    await pounce(claimedTeam._id["$id"], currentSlide._id.toString());
  };

  return (
    <div className="flex items-center justify-center">
      <button className="btn" onClick={handlePounce} disabled={hasAnswered}>
        Pounce
      </button>
    </div>
  );
}
