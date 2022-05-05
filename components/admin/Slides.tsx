import { SyntheticEvent, useEffect, useState } from "react";
import { useQuery, useMutation } from "../../convex/_generated";
import { Slide } from "../../util/common";
import PounceWindow from "./PounceWindow";

export default function Slides() {
  const currentSlide: Slide | undefined = useQuery("currentSlide");
  const nextSlide: Slide | undefined = useQuery("nextSlide");
  const goToNextSlide = useMutation("goToNextSlide");

  const handleNext = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (
      !window.confirm(
        "Are you sure you want to go to the next slide? This action can not be undone."
      )
    )
      return;

    nextSlide && goToNextSlide(nextSlide?.img);
  };

  return (
    <div className="flex">
      <div className="w-[40vw]">
        <img
          src={"/slides/" + currentSlide?.img}
          alt="Slide"
          className="h-auto w-full"
        />

        <div className="mt-5 flex gap-x-3">
          <div className="flex-1 flex justify-between items-start">
            <div>
              <div>
                <div className="uppercase text-sm text-slate-400 font-bold mt-2">
                  Current Slide
                </div>
                <div className="text-lg">
                  {currentSlide?.img} - {currentSlide?.type}
                </div>
              </div>
              <div className="mt-5">
                <button
                  className="btn"
                  onClick={handleNext}
                  disabled={!nextSlide}
                >
                  Next Slide
                </button>
              </div>
            </div>
            <PounceWindow />
          </div>
          <div>
            <img
              src={"/slides/" + nextSlide?.img}
              alt="Slide"
              className="h-auto w-[15vw] block"
            />
            <div>
              <div className="uppercase text-xs text-slate-400 font-bold mt-2">
                Next Slide
              </div>
              <div className="text-sm">
                {nextSlide?.img} - {nextSlide?.type}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
