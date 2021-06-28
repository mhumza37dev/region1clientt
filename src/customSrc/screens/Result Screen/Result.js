import React, { useEffect, useState } from "react";

import ResultHeader from "./ResultHeader";
import VotingFooter from "../../components/votingComponents/VotingFooter";

import { AppFooter, AppHeader } from "@coreui/react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

function Result(props) {
  const [candidates, setCandidates] = useState();
  const [winner, setWinner] = useState();
  const [totalVotes, setTotalVotes] = useState();
  const classes = useStyles();

  const [now, setNow] = useState(parseFloat((13 / 150) * 100).toFixed(2));

  let key = "myprivateSalt";
  const decipher = (salt) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const applySaltToChar = (code) =>
      textToChars(salt).reduce((a, b) => a ^ b, code);
    return (encoded) =>
      encoded
        .match(/.{1,2}/g)
        .map((hex) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode) => String.fromCharCode(charCode))
        .join("");
  };

  // const myCipher = Encrypt(key)
  const myDecipher = decipher(key);

  useEffect(() => {
    if (
      props.location.state.status === "started" ||
      props.location.state ||
      props.location.state !== undefined ||
      props.location.state !== null
    ) {
      fetch("https://region1server.herokuapp.com/candidates/")
        .then((res) => res.json())
        .then((res) => {
          setCandidates(res);
          const max = res.reduce(function (prev, current) {
            return myDecipher(prev.VoteCount) > myDecipher(current.VoteCount)
              ? prev
              : current;
          });
          setWinner(max);
          console.log(parseFloat(myDecipher(max.VoteCount)));
          console.log(
            (
              parseFloat((parseFloat(myDecipher(max.VoteCount)) + 1) / 150) *
              100
            ).toFixed(2)
          );
        });

      fetch("https://region1server.herokuapp.com/votes/")
        .then((res) => res.json())
        .then((res) => {
          console.log(res.length);
          setTotalVotes(res.length);
        });
    }
  }, []);

  if (
    props.location.state.status !== "ended" ||
    !props.location.state ||
    props.location.state === undefined ||
    props.location.state === null
  ) {
    return (
      <div className="body">
        <h1 className="h1">503</h1>
        <p className="p">
          Oops! Polling hasn't been ended yet in your <b>Region</b>.
        </p>
        <a className="buttonnn" href="" onClick={() => props.history.push("/")}>
          <i className="icon-home" /> Going back to HomePage, is better.
        </a>
      </div>
    );
  } else {
    return (
      <div className="">
        <AppHeader fixed>
          <ResultHeader />
        </AppHeader>
        <div
          className=""
          style={{
            background: "-webkit-linear-gradient(left, #134324, #7bf3a5)",
            height: "155vh",
          }}
        >
          <section
            class="app"
            style={{
              background: "-webkit-linear-gradient(left, #134324, #7bf3a5)",
            }}
          >
            <h2
              className="text-center"
              style={{
                textTransform: "uppercase",
                position: "absolute",
                top: "18%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Polling Results
            </h2>
            <div class="winner-wrap">
              <div class="border"></div>
              <div>
                <Avatar
                  alt="..."
                  src={winner !== undefined && winner.image}
                  className={`${classes.large} medal-box`}
                />
              </div>
              <h1>
                {winner !== undefined && winner.Fullname} <br />
              </h1>
              <span className="text-muted">Election 2021</span>
              <h2>{winner !== undefined && winner.Party.party_Id}</h2>
              <div class="winner-ribbon">WINNER</div>
              <div class="right-ribbon"></div>
              <div class="left-ribbon"></div>
            </div>
          </section>
          <div
            className="app-body"
            style={{
              // marginLeft: "50%",
              // marginRight: "50%",
              // maxWidth: "350px",
              marginTop: "-2%",
            }}
          >
            <div
              className="col-xl-12 col-md-12 col-sm-12"
              style={{ marginBottom: "1%" }}
            >
              <div className="card" style={{ borderTop: "10px solid #47cc68" }}>
                <div className="card-header border-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Summary</h3>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  {/* Projects table */}
                  <table
                    className="table align-items-center table-flush"
                    style={{ marginBottom: "2%" }}
                  >
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Percentage (%)</th>
                        <th scope="col">Votes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidates !== undefined &&
                        candidates.map((can, key) => (
                          <tr key={key}>
                            <th
                              scope="row"
                              style={{ textTransform: "uppercase" }}
                            >
                              {can.Fullname}
                            </th>
                            <td>
                              <div>
                                <ProgressBar
                                  variant="success"
                                  min={0}
                                  now={(
                                    parseFloat(
                                      parseFloat(myDecipher(can.VoteCount)) /
                                        totalVotes
                                    ) * 100
                                  ).toFixed(2)}
                                  label={`${(
                                    parseFloat(
                                      parseFloat(myDecipher(can.VoteCount)) /
                                        totalVotes
                                    ) * 100
                                  ).toFixed(2)}%`}
                                  max={100}
                                />
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="mr-2">{totalVotes}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AppFooter fixed>
          <VotingFooter />
        </AppFooter>
      </div>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // background: "transparent",
  },
}));

export default Result;
