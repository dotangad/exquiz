import { Id } from "convex-dev/values";

export type Team = {
  _id: Id;
  tnumber: number;
  name: string;
  points: number;
  claimed: boolean;
};
