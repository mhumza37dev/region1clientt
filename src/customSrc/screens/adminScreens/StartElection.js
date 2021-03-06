import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";

function StartElection(props) {
  const [election, setElection] = useState();

  useEffect(() => {
    fetch("https://region1server.herokuapp.com/election")
      .then((res) => res.json())
      .then((res) => setElection(res));
  }, [election]);

  const startElection = async () => {
    const response = await fetch(
      "https://region1server.herokuapp.com/election/start",
      {
        method: "PUT",
      }
    );
    const data = await response.json();

    console.log(data);
  };

  return (
    <div className="animated fadeIn">
      {!election ? (
        <h1>loading.......</h1>
      ) : (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="animated fadeIn"
        >
          {election.status === "started" ? (
            <h2 className="animated fadeIn">Election already Started.</h2>
          ) : (
            <div className="animated fadeIn">
              <h2>Start Election.</h2>
              <Button onClick={startElection}>Start Election</Button>
            </div>
          )}
          <br />
        </div>
      )}
    </div>
  );
}

export default StartElection;
