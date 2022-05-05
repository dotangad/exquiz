import { useQuery } from "../../convex/_generated";
import { Slide, Team } from "../../util/common";

export default function TeamColumn({
  team: { points, tnumber, _id },
  maxPoints,
  currentSlide,
}: {
  team: Team;
  maxPoints: number;
  currentSlide: Slide;
}) {
  const pounces = useQuery("pounces", currentSlide._id);
  const { bounce, direct } = useQuery("bounceDirect") || {
    bounce: null,
    direct: null,
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex-1 h-full flex flex-col justify-end">
        <div
          className="bg-exun rounded-xl w-[130px]"
          style={{
            height: String((points / maxPoints) * 100) + `%`,
            transition: "height 300ms ease",
          }}
        ></div>
      </div>
      <div className="p-5 flex flex-col gap-y-1 items-center justify-center">
        <div className="text-3xl font-bold text-slate-600">Team {tnumber}</div>
        <div className="text-2xl font-semibold text-slate-400">{points}</div>
        <div className="flex gap-x-2 flex-wrap justify-center items-center h-[15px]">
          {bounce?.value.equals(_id) && (
            <div className="font-bold text-amber-500">(BOUNCE)</div>
          )}
          {direct?.value.equals(_id) && (
            <div className="font-bold text-red-500">(DIRECT)</div>
          )}
          {pounces?.some(({ team }) => team.equals(_id)) && (
            <div className="font-bold text-lime-500">(POUNCE)</div>
          )}
        </div>
      </div>
    </div>
  );
}
