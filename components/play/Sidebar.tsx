import { Id } from "convex-dev/values";
import { useAtom } from "jotai";
import { SyntheticEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "../../convex/_generated";
import { Answer, Slide, Team } from "../../util/common";
import { claimedTeamAtom } from "../../util/jotai";
import PounceBtn from "./PounceBtn";
import ScoreTable from "./ScoreTable";

function AnswerStats({ team, slide }: { team: Team; slide: Slide }) {
  const answers: Answer[] | undefined = useQuery(
    "answersForSlide",
    slide._id
  );
  const [answer, setAnswer] = useState<Answer | undefined>();

  useEffect(() => {
    // @ts-ignore
    setAnswer(answers?.find((answer) => team._id.equals(answer.team)));
  }, [answers, team]);

  return answer && answer.answered ? (
    <div>
      Answered on{" "}
      {answer.pounced ? "pounce" : answer.bounced ? "bounced" : "direct"}.{" "}
      {answer.pointsAwarded} points received.
    </div>
  ) : (
    <></>
  );
}

export default function Sidebar() {
  const currentSlide: Slide | undefined = useQuery("currentSlide");
  const [claimedTeam] = useAtom(claimedTeamAtom);

  return (
    <div className="flex-1 h-full p-5">
      <div className="text-center font-bold text-xl text-slate-400 uppercase tracking-widest">
        Team {claimedTeam?.tnumber}
      </div>

      {currentSlide &&
        claimedTeam &&
        (currentSlide?.type === "question" ? (
          <div className="mt-5 flex flex-col gap-y-6">
            <PounceBtn currentSlide={currentSlide} claimedTeam={claimedTeam} />

            <ScoreTable className="w-full" />

            <AnswerStats team={claimedTeam} slide={currentSlide} />
          </div>
        ) : (
          <div className="mt-5 flex flex-col gap-y-6">
            <ScoreTable className="w-full" />

            <div>
              <div className="uppercase font-bold text-slate-400 text-sm">
                Next Direct
              </div>
              <div>{/* TODO */} Team 1</div>
            </div>

            <AnswerStats team={claimedTeam} slide={currentSlide} />
          </div>
        ))}
      <div></div>
    </div>
  );
}
