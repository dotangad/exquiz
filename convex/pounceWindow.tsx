import { query } from "convex-dev/server";

export default query(async ({ db }) => {
  const isOpen = await db
    .table("meta")
    .filter((q) => q.eq(q.field("key"), "pounceWindowOpen"))
    .first();
  const openSince = await db
    .table("meta")
    .filter((q) => q.eq(q.field("key"), "pounceWindowOpenSince"))
    .first();

  return {
    pounceWindowOpen: isOpen?.value ?? false,
    pounceWindowOpenSince: openSince?.value ?? Date.now(),
  };
});
