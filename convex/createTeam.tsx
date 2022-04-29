import { mutation } from "convex-dev/server";

// Creates a team
export default mutation(({ db }, tnumber: number, name: string) => {
  db.insert("teams", { tnumber, name, claimed: false, points: 0 });
});
