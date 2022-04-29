import React from "react";
import { ONBOARDING } from "../../util/config";

const Rules: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-stretch gap-y-5">
      <div>
        <h1 className="font-bold text-6xl text-center">
          Quiz {ONBOARDING.QUIZNAME}
        </h1>
        <p className="text-2xl font-semibold text-slate-500 text-center mt-2">
          {ONBOARDING.SUBTITLE}
        </p>
      </div>
      <ul className="text-md list-disc pl-[20px] max-w-[500px] mx-auto flex flex-col gap-y-2">
        {ONBOARDING.RULES.map((rule, i) => (
          <li dangerouslySetInnerHTML={{ __html: rule }} key={i}></li>
        ))}
      </ul>
    </div>
  );
};

export default Rules;
