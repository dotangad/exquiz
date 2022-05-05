import { useState, useEffect } from "react";
import { useMutation, useQuery } from "../../convex/_generated";

export default function PounceWindow() {
  const [pwCountdown, setPwCountdown] = useState(0);
  const { pounceWindowOpen, pounceWindowOpenSince } = useQuery(
    "pounceWindow"
  ) || { pounceWindowOpen: false, pounceWindowOpenSince: 0 };
  const openPW = useMutation("openPounceWindow");
  const closePW = useMutation("closePounceWindow");

  useEffect(() => {
    const interval = setInterval(() => {
      if (pounceWindowOpen)
        setPwCountdown(Math.floor((Date.now() - pounceWindowOpenSince) / 1000));
    }, 500);

    return () => clearInterval(interval);
  }, [pounceWindowOpen, pounceWindowOpenSince]);

  return (
    <div className="flex flex-col items-center my-5 gap-y-5">
      {pounceWindowOpen ? (
        <>
          <button className="btn" onClick={() => closePW()}>
            Close Pounce Window
          </button>
          <div>Pounce window open for {pwCountdown}s</div>
        </>
      ) : (
        <button className="btn" onClick={() => openPW()}>
          Open Pounce Window
        </button>
      )}
    </div>
  );
}
