import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { Container, Row, Col } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import { ThemeProvider } from "@material-ui/styles";

import VotingFooter from "../../components/votingComponents/VotingFooter";
import VotingHeader from "../../components/votingComponents/VotingHeader";
import { AppFooter, AppHeader } from "@coreui/react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Badge from "react-bootstrap/Badge";
import { useLoading, Bars } from "@agney/react-loading";
import { set } from "core-js/library/fn/dict";

// import { useModal } from "react-simple-modal-provider";

const CandidateList = (props) => {
  if (
    props.history.location.state === undefined ||
    !props.location.state ||
    props.location.state === null
  ) {
    props.history.push("eligibility");
  }

  console.log(props.location.state);
  const [spacing, setSpacing] = React.useState(10);
  const [double, setDouble] = useState(false);
  const [candidate, setCandidate] = useState([]);
  const [voterNic, setVoterNic] = useState("");
  const [candidateNic, setCandidateNic] = useState("");
  const [constituency, setConstituency] = useState("");
  const [pollingStation_Id, setPollingStation_Id] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);

  const [gif, setGif] = useState(true);
  const [notCasted, setNotCasted] = useState(false);
  const [casted, setCasted] = useState(false);

  const [electionStatus, setElectionStatus] = useState();

  //   const { open: openModal9 } = useModal("Modal9");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Bars width="100" style={{ color: "green", margin: "AUTO" }} />,
  });

  // console.log(candidate)

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

  let key = "myprivateSalt";
  const myDecipher = decipher(key);

  useEffect(() => {
    fetch("https://region1server.herokuapp.com/election/")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setElectionStatus(res);
      });
    getCandidates();
    if (
      props.history.location.state !== undefined &&
      !props.location.state &&
      props.location.state !== null
    ) {
      setVoterNic(myDecipher(props.location.state.cnic));
      setConstituency(myDecipher(props.location.state.constituency));
      setPollingStation_Id(myDecipher(props.location.state.PollingStation_Id));
      console.log("wwwww", candidate);
    }
  }, []);

  const getCandidates = async () => {
    const response = await fetch(
      "https://region1server.herokuapp.com/Candidates"
    );
    const data = await response.json();
    setCandidate(data);
    if (candidate) {
      setLoader(true);
    }
  };

  const castVOte = (nic) => {
    setGif(true);
    var nicc = nic;
    console.log("nic of candiate in castvote() ====> ", nic);
    const body = {
      voterNic: myDecipher(props.location.state.cnic),
      CandidateNic: myDecipher(nic),
      constituency: props.location.state.constituency,
      PollingStation_Id: props.location.state.PollingStation_Id,
    };
    console.log(body);
    fetch("https://region1server.herokuapp.com/votes/cast", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        voterNic: myDecipher(props.location.state.cnic),
        CandidateNic: nic,
        constituency: props.location.state.constituency,
        PollingStation_Id: props.location.state.PollingStation_Id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        fetch("https://region2server.herokuapp.com/votes/cast", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            voterNic: myDecipher(props.location.state.cnic),
            CandidateNic: nic,
            constituency: props.location.state.constituency,
            PollingStation_Id: props.location.state.PollingStation_Id,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if (res.message === "Vote Casted.!") {
              updateVoterStatus(nic);
            } else {
              setGif(false);
              setNotCasted(true);
              set(() => {
                handleClose();
              }, 3000);
            }
          })
          .catch((e) => {
            console.log("casting error region 2==>", e);
          });
      })
      .catch((e) => {
        console.log("casting error==>", e);
      });
  };

  const updateVoterStatus = (nic) => {
    fetch("https://region1server.herokuapp.com/Voters/hasVoted", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        cnic: myDecipher(props.location.state.cnic),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("voter status===>", res);
        if (res.message === "updated") {
          console.log("NIC of candidate===> ", nic);
          updatecandiateCount(nic);
        } else {
          setNotCasted(true);
          setGif(false);
          set(() => {
            handleClose();
          }, 1000);
        }
      });
  };

  const updatecandiateCount = (nic) => {
    fetch("https://region1server.herokuapp.com/candidates/updateCount", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        cnic: nic,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("candidate count===>", res);

        if (res.message === "updated") {
          setCasted(true);
          setGif(false);
          setTimeout(() => {
            props.history.push("eligibility", electionStatus);
          }, 3000);
          //   alert(res.message);
        } else {
          setNotCasted(true);
          setGif(false);
          set(() => {
            handleClose();
          }, 1000);
        }
      });
  };

  const handleCnic = (a) => {
    return new Promise((resolve) => setTimeout(() => resolve(a), 1000));
  };

  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

  if (!loader) {
    return (
      <div className="app">
        <section {...containerProps} style={{ margin: "auto" }}>
          {indicatorEl} {/* renders only while loading */}
        </section>
      </div>
    );
  }

  return (
    <div
      className="app"
      style={{
        background: "-webkit-linear-gradient(left, #134324, #7bf3a5)",
        margin: "auto",
      }}
    >
      <AppHeader fixed>
        <VotingHeader />
      </AppHeader>

      <div className="app-body">
        <div className="container animated fadeIn">
          <div
            className="row"
            style={{
              marginTop: "60px",
              marginLeft: "60px",
              marginRight: "60px",
            }}
          >
            <Modal
              show={show}
              //   onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Body style={{ height: "50vh" }}>
                {notCasted ? (
                  <i
                    className="fa fa-times-circle fa-10x text-center text-danger"
                    style={{ fontSize: "15rem", width: "100%" }}
                  ></i>
                ) : null}
                {notCasted ? (
                  <span
                    className="text-danger text-center"
                    style={{ fontSize: "1.734rem", width: "100%" }}
                  >
                    There was an error casting your Vote
                  </span>
                ) : null}
                {gif ? (
                  <img
                    src={require("../../assets/images/logo/gifs/Spinner-3.gif")}
                    style={{
                      width: "60%",
                      display: "block",
                      margin: "0 auto 0 auto",
                    }}
                  />
                ) : null}

                {casted ? (
                  <i
                    className="fa fa-check-circle fa-10x text-center text-success"
                    style={{ fontSize: "15rem", width: "100%" }}
                  ></i>
                ) : null}
                {casted ? (
                  <span
                    className="text-success text-center"
                    style={{ fontSize: "3.11rem", width: "100%" }}
                  >
                    Successfully Casted
                  </span>
                ) : null}
              </Modal.Body>
            </Modal>
            {candidate.map((candidate) => (
              <>
                <div className="col-sm-12 col-md-6 col-xl-6">
                  <div
                    className="card"
                    style={{ maxWidth: "300px", height: "400px" }}
                  >
                    <h2>
                      <Badge variant="success" style={{ float: "left" }}>
                        <strong>{candidate.Party.party_Id}</strong>
                      </Badge>
                      <Badge
                        variant="success"
                        style={{
                          float: "right",
                          background: "#fff",
                          padding: "0px",
                        }}
                      >
                        <strong>
                          <img
                            src={candidate.Party.party_flag}
                            alt=""
                            style={{ height: "25px" }}
                          />
                        </strong>
                      </Badge>
                    </h2>
                    <br />
                    <br />
                    <img
                      src={candidate.image}
                      alt="candidate"
                      className="img"
                      style={{
                        // borderRadius: "120px",
                        width: "50%",
                        margin: "auto",
                      }}
                    />
                    <br />
                    <h2 style={{ textAlign: "center" }}>
                      {candidate.Fullname}
                    </h2>
                    <p className="title" style={{ textAlign: "center" }}>
                      {candidate.Party.party_name}
                    </p>
                    <br />
                    <p>
                      <ThemeProvider theme={theme}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          disabled={double}
                          onClick={() => {
                            // alert(myDecipher(candidate.cnic));
                            //   castVOte(myDecipher(candidate.cnic));
                            // props.history.push("eligibility", electionStatus);
                            handleShow();
                            castVOte(myDecipher(candidate.cnic));
                          }}
                        >
                          Vote
                        </Button>
                      </ThemeProvider>
                    </p>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>

      <AppFooter>
        <VotingFooter />
      </AppFooter>
    </div>
  );
};

const classes = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  mask: {
    width: "100%",
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  submit: {
    margin: "4%",
  },
  root: {
    flexGrow: 1,
    margin: "auto",
  },

  control: {
    padding: theme.spacing(2),
  },
  tm_50: {
    marginTop: "50px",
  },
  card: {
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    maxWidth: "300px",
    margin: "auto",
    textAlign: "center",
    fontFamily: "arial",
  },
  title: {
    color: "grey",
    fontSize: "18px",
  },
  card_img: {
    textAlign: "center",
    width: "100%",
    left: "0",
    right: "0",
    padding: "50px 30px 10px 30px",
  },
  card_span: {
    top: "0",
    textAlign: "left",
    position: "absolute",
    backgroundColor: "#28a745",
    padding: "0px 20px",
    border: "3px solid #fff",
    color: "#fff",
    fontWeight: "700",
    marginTop: "5px",
    boxShadow: "1px 2px 8px 0px #00000075",
    borderLeft: "none",
    borderRightStyle: "none",
  },
  button: {
    border: "none",
    outline: "0",
    display: "inline-block",
    padding: "8px",
    color: "white",
    backgroundColor: "#000",
    textAlign: "center",
    cursor: "pointer",
    width: "100%",
    fontSize: "18px",
  },
  a: {
    textDecoration: "none",
    fontSize: "22px",
    color: "black",
  },
  button_hover: {
    opacity: "0.7",
  },
  a_hover: {
    opacity: "0.7",
  },
}));
export default CandidateList;
