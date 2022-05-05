import React, { SyntheticEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "../../convex/_generated";

const AddTeamForm: React.FC = () => {
  const [tnumber, setTnumber] = useState(1);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const createTeam = useMutation("createTeam");
  const cleanDB = useMutation("cleanDB");

  const teams = useQuery("allTeams");

  useEffect(() => {
    setTnumber(
      (teams?.sort((a, b) => b.tnumber - a.tnumber)[0]?.tnumber ?? 0) + 1
    );
  }, [teams]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");

    if (tnumber < 1) {
      setError("Team number must be > 0");
      return;
    }

    if (name === "") {
      setError(
        "Team name cannot be empty, eg: 'Vinayak Pachnanda, Angad Singh'"
      );
      return;
    }

    setTnumber(1); // reset text entry box
    setName("");

    await createTeam(tnumber, name);
    setError("Team Created");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
        <div className="flex items-center gap-x-5">
          <label htmlFor="tnumber">Team Number</label>
          <input
            name="tnumber"
            type="number"
            value={tnumber}
            onChange={(e) => setTnumber(Number(e.target.value))}
            disabled={true}
          />
        </div>
        <div className="flex items-center gap-x-5">
          <label htmlFor="name">Team Name</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="text-red-500">{error}</div>
        <div>
          <button type="submit" className="btn">
            Create
          </button>
        </div>
      </form>
      <button className="btn mt-5" onClick={() => cleanDB()}>
        Clear DB
      </button>
    </>
  );
};

export default AddTeamForm;
