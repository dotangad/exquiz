import { SyntheticEvent } from "react";
import { useQuery, useMutation } from "../../convex/_generated";

export default function StartQuizBtn() {
  const teams = useQuery("allTeams") ?? [];
  const quizStarted = useQuery("quizStarted");
  const startQuiz = useMutation("startQuiz");

  const handleStart = (e: SyntheticEvent) => {
    e.preventDefault();

    const confirmation = window.confirm(
      "Are you sure you want to start the quiz? This can not be undone."
    );
    if (!confirmation) return;

    startQuiz();
  };

  return (
    <div className="p-10">
      {teams != [] && teams?.every((t) => t.claimed) ? (
        <div>All teams claimed</div>
      ) : (
        <div>All teams have not been claimed, quiz cannot be started.</div>
      )}
      <button
        className="btn"
        onClick={handleStart}
        disabled={teams == [] || teams?.some((t) => !t.claimed)}
      >
        Start Quiz
      </button>
    </div>
  );
}
