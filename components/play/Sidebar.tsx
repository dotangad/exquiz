import { Id } from "convex-dev/values";
import { useAtom } from "jotai";
import { SyntheticEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "../../convex/_generated";
import { Answer, Slide, Team } from "../../util/common";
import { POINTS } from "../../util/config";
import { claimedTeamAtom } from "../../util/jotai";
import PounceBtn from "./PounceBtn";
import ScoreTable from "./ScoreTable";

export default function Sidebar() {
  const currentSlide: Slide | undefined = useQuery("currentSlide");
  const [claimedTeam] = useAtom(claimedTeamAtom);

  return (
    <div className="flex-1 h-full p-5">
      <div className="text-center font-bold text-xl text-slate-400 uppercase tracking-widest">
        Team {claimedTeam?.tnumber}
      </div>

      {currentSlide && claimedTeam && (
        <div className="mt-5 flex flex-col gap-y-6">
          {currentSlide?.type === "question" && (
            <PounceBtn currentSlide={currentSlide} claimedTeam={claimedTeam} />
          )}

          <ScoreTable className="w-full" />
        </div>
      )}

      <div></div>
    </div>
  );
}
