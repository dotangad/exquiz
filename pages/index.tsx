/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import Rules from "../components/onboarding/Rules";
import { useQuery } from "../convex/_generated";
import TeamCard from "../components/onboarding/TeamCard";
import Onboarding from "../components/onboarding/Onboarding";
import { Slide } from "../util/common";
import { PLAY } from "../util/config";
import { useAtom } from "jotai";
import { claimedTeamAtom } from "../util/jotai";
import Sidebar from "../components/play/Sidebar";

const Home: NextPage = () => {
  const teams = useQuery("allTeams") || [];
  const quizStarted = useQuery("quizStarted");
  const currentSlide: Slide | undefined = useQuery("currentSlide");
  const [claimedTeam] = useAtom(claimedTeamAtom);

  return (
    <div>
      <Head>
        <title>ExQuiz</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {quizStarted &&
        (quizStarted?.value === true && claimedTeam ? (
          <div className="h-screen w-screen p-10 flex flex-col items-center justify-center overflow-none">
            <div className="mb-5">
              <h1 className="text-3xl font-bold text-center text-slate-700 mb-1">
                {PLAY.QUIZNAME}
              </h1>
              <div className="text-xl font-semibold text-center text-slate-500">
                {PLAY.SUBTITLE}
              </div>
            </div>
            <div className="flex w-full flex-1 items-center gap-x-5 divide-x-2 divide-slate-200">
              <div>
                <div className="h-[70vh]">
                  <img
                    src={"/slides/" + currentSlide?.img}
                    alt="Slide"
                    className="h-full w-auto"
                  />
                </div>
              </div>

              <Sidebar />
            </div>
          </div>
        ) : (
          <Onboarding />
        ))}
    </div>
  );
};

export default Home;
