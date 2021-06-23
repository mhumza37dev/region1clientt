import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";

function EndElection(props) {
  const [election, setElection] = useState();

  useEffect(() => {
    fetch("https://region1server.herokuapp.com/election")
      .then((res) => res.json())
      .then((res) => setElection(res));
  }, [election]);

  const endElection = async () => {
    const response = await fetch(
      "https://region1server.herokuapp.com/election/end",
      {
        method: "PUT",
      }
    );
    const data = await response.json();
    console.log(data);
  };
  return (
    <div>
      {!election ? (
        <h1>Loading.....</h1>
      ) : (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {election.status !== "ended" ? (
            <div>
              <h2>End Election.</h2>
              <Button onClick={endElection}>End Election</Button>
              <br />
            </div>
          ) : (
            <h2>First Start an Election.</h2>
          )}
        </div>
      )}
    </div>
  );
}

export default EndElection;
