import { Slide } from "./common";

export const ONBOARDING = Object.freeze({
  QUIZNAME: "something in the way",
  SUBTITLE: "hmmmmmmmmmmmmmmmmm",
  RULES: Array.from(
    { length: 6 },
    () =>
      `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime tempore commodi <strong>possimus</strong> deleniti rerum. Id numquam <em>impedit</em>`
  ),
});

export const SLIDES: readonly Omit<Slide, "_id">[] = Object.freeze(
  Array.from({ length: 22 * 2 }, (_, i) => ({
    type: i % 2 === 0 ? "question" : "answer",
    img: `${String(Math.floor((i + 2) / 2)).padStart(2, "0")}_${
      i % 2 === 0 ? "q" : "a"
    }.png`,
  }))
);

export const SCOREBOARD = Object.freeze({
  QUIZNAME: ONBOARDING.QUIZNAME,
});

export const PLAY = Object.freeze({
  QUIZNAME: ONBOARDING.QUIZNAME,
  SUBTITLE: ONBOARDING.SUBTITLE,
});

export const ADMIN = Object.freeze({
  QUIZNAME: ONBOARDING.QUIZNAME,
  SUBTITLE: ONBOARDING.SUBTITLE,
});

export const POINTS = Object.freeze({
  POUNCE: { CORRECT: 10, INCORRECT: 15 },
  BOUNCE: { CORRECT: 10, INCORRECT: 0 },
  DIRECT: { CORRECT: 5, INCORRECT: 0 },
});
