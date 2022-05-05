import type { NextPage } from "next";
import Head from "next/head";
import Rules from "../components/onboarding/Rules";
import { useQuery } from "../convex/_generated";
import Onboarding from "../components/onboarding/Onboarding";
import { Slide, Team } from "../util/common";
import { SCOREBOARD } from "../util/config";
import { useEffect, useState } from "react";

const TeamCard: React.FC<{ team: Team }> = ({ team }) => {
  return (
    <div className="w-full border border-slate-200 rounded-xl py-8 px-10 flex justify-between items-center transition">
      <div className="flex-1 flex flex-col gap-y-2 text-slate-700">
        <div className="text-left text-4xl font-bold">Team {team.tnumber}</div>
        <div className="text-left text-2xl font-semibold text-slate-400">
          {team.name}
        </div>
      </div>
      <div>
        <div
          className={`rounded-full h-[30px] w-[30px] ${
            team.claimed ? `bg-green-500` : `bg-red-500`
          } transition`}
        ></div>
      </div>
    </div>
  );
};

const Pounces = ({
  currentSlide,
  teams,
}: {
  currentSlide: Slide;
  teams: Team[];
}) => {
  const pounces = useQuery("pounces", currentSlide._id);
  const { pounceWindowOpen } = useQuery("pounceWindow") || {
    pounceWindowOpen: false,
  };

  return (
    <div className="flex-1 px-5 h-full w-full flex flex-col items-center justify-center gap-y-10">
      {pounceWindowOpen ? (
        <div className="text-4xl font-bold text-green-500 text-center">
          Pounce Window Open
        </div>
      ) : (
        <div className="text-4xl font-bold text-red-500 text-center">
          Pounce Window Closed
        </div>
      )}
      <div className="w-full">
        <div className="text-slate-500 font-bold uppercase tracking-widek">
          Pounces
        </div>
        {teams
          .filter(({ _id }) => pounces?.some(({ team }) => team.equals(_id)))
          .map((team, i) => (
            <div key={i} className="text-2xl text-slate-700">
              Team {team.tnumber}
            </div>
          ))}
      </div>
    </div>
  );
};

const Scoreboard: NextPage = () => {
  const teams: Team[] | undefined = useQuery("allTeams");
  const quizStarted = useQuery("quizStarted");
  const currentSlide: Slide | undefined = useQuery("currentSlide");
  const { bounce, direct } = useQuery("bounceDirect") || {
    bounce: null,
    direct: null,
  };
  const [maxPoints, setMaxPoints] = useState(0);

  useEffect(() => {
    setMaxPoints(
      (teams?.length ?? 0) > 1
        ? teams?.sort((a, b) => b.points - a.points)[0].points ?? 0
        : 0
    );
  }, [teams]);

  return (
    <div>
      <Head>
        <title>Score | ExQuiz</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen w-screen p-10 flex flex-col items-center justify-center">
        <div className="mb-10">
          <h1 className="text-6xl font-bold text-center text-slate-700 mb-1">
            {SCOREBOARD.QUIZNAME}
          </h1>
          <div className="text-3xl font-semibold text-center text-slate-500">
            Scoreboard
          </div>
        </div>

        {quizStarted?.value === true ? (
          <div className="flex divide-x-2 divide-slate-300 h-full w-full pt-10">
            <div
              className={`max-w-5xl w-full h-full mx-auto flex justify-center gap-x-[80px]`}
            >
              {teams
                // ?.sort((a, b) => b.points - a.points)
                ?.sort((a, b) => a.tnumber - b.tnumber)
                .map(({ points, tnumber, _id }, i) => (
                  <div key={i} className="flex flex-col items-center">
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
                      <div className="text-3xl font-bold text-slate-600">
                        Team {tnumber}
                      </div>
                      <div className="text-2xl font-semibold text-slate-400">
                        {points}
                      </div>
                      <div
                        className={`font-bold text-lg ${
                          bounce?.value.equals(_id)
                            ? "text-amber-500"
                            : "text-white"
                        }`}
                      >
                        (BOUNCE)
                      </div>
                      <div
                        className={`font-bold text-lg ${
                          direct?.value.equals(_id)
                            ? "text-red-500"
                            : "text-white"
                        }`}
                      >
                        (DIRECT)
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {currentSlide && teams && (
              <Pounces teams={teams} currentSlide={currentSlide} />
            )}
          </div>
        ) : (
          <div className="max-w-6xl w-full mx-auto grid grid-cols-2 gap-3">
            {teams?.map((team, i) => (
              <TeamCard team={team} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Scoreboard;
