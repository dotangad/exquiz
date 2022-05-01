/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import React, { FormEvent, SyntheticEvent, useState } from "react";
import { useMutation, useQuery } from "../../convex/_generated";
import AddTeamForm from "../../components/admin/AddTeamForm";
import StartQuizBtn from "../../components/admin/StartQuizBtn";
import { ADMIN } from "../../util/config";
import { Slide, Team } from "../../util/common";
import Slides from "../../components/admin/Slides";
import ScoreTable from "../../components/play/ScoreTable";
import TeamsTable from "../../components/admin/TeamsTable";

// TODO: protect with basic auth middleware
// https://stackoverflow.com/questions/64316886/how-do-i-add-basic-authentication-to-nextjs-node-server

const Admin: NextPage = () => {
  const quizStarted = useQuery("quizStarted");
  const currentSlide: Slide | undefined = useQuery("currentSlide");
  const nextSlide: Slide | undefined = useQuery("nextSlide");
  const goToNextSlide = useMutation("goToNextSlide");
  const teams: Team[] | undefined = useQuery("allTeams");

  return (
    <div>
      <Head>
        <title>Admin | ExQuiz</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen w-screen p-10 flex flex-col items-center justify-center overflow-none">
        <div className="mb-5">
          <h1 className="text-3xl font-bold text-center text-slate-700 mb-1">
            {ADMIN.QUIZNAME}
          </h1>
          <div className="text-xl font-semibold text-center text-slate-500">
            {ADMIN.SUBTITLE}
          </div>
        </div>

        {quizStarted ? (
          <div className="flex gap-x-5">
            <Slides />

            <div>
              {teams && currentSlide && (
                <TeamsTable teams={teams} currentSlide={currentSlide} />
              )}
            </div>
          </div>
        ) : (
          <div className="p-10 grid grid-cols-2 gap-x-10">
            <div>
              <AddTeamForm />
            </div>
            <div>
              <StartQuizBtn />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
