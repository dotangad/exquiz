import { Id } from "convex-dev/values";

export type Team = {
  _id: Id;
  tnumber: number;
  name: string;
  points: number;
  claimed: boolean;
};

export type TeamUnserialized = Omit<Team, "_id"> & { _id: string };

export type Meta = {
  _id: Id;
  key: string;
  value: string;
};

export type Slide = {
  _id: Id;
  type: "question" | "answer";
  img: string;
};

export type Answer = {
  _id: Id;
  team: Id;
  slide: Id;
  pounced: boolean;
  bounced: boolean;
  direct: boolean;
  answered: boolean;
  pointsAwarded: number;
};
