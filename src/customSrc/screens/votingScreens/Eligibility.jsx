import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import InputMask from "react-input-mask";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";
import { Alert, AlertTitle } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import voteBox from "../../assets/vote.png";
import VotingFooter from "../../components/votingComponents/VotingFooter";
import VotingHeader from "../../components/votingComponents/VotingHeader";
import { AppFooter, AppHeader } from "@coreui/react";
import { useLoading, Bars } from "@agney/react-loading";
import Page404 from "../../../views/Pages/Page404/Page404.js";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// 9/may/2021

function Eligibility(props) {
  console.log(localStorage.getItem("distance"));
  const [CurrentCoordinates, setCurrentCoordinates] = useState({
    latitude: "",
    longitude: "",
  });

  const [state, setState] = useState({
    name: "",
    cnic: "",
  });

  const [fetchedVoter, setFetchedVoter] = useState();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Bars width="100" style={{ color: "green", margin: "AUTO" }} />,
  });

  const approxeq = (v1, v2, epsilon = 0.001) => Math.abs(v1 - v2) <= epsilon;

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
  };

  const fetchData = async (name, cnic) => {
    const body = {
      Fullname: name,
      cnic: cnic,
    };
    console.log("body ==> ", body);
    await fetch("https://region1server.herokuapp.com/Voters/check", {
      method: "POST",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        Fullname: name,
        cnic: cnic,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        console.log("resps set ", resp);
        if (!resp) {
          console.log("!resp....");
          setTimeout(() => {
            setError("User Not Found Check Your NIC");
            setOpen(true);
            setLoading(false);
            setLoading(false);
          }, 1000);
        } else {
          if (resp.PollingStation_Id !== "P1") {
            setTimeout(() => {
              setLoading(false);
              setOpen2(true);
            }, 1000);
          } else if (myDecipher(resp.hasVoted) === "true") {
            setError("You have Already Voted.");
            setOpen(true);
            setLoading(false);
            setLoading(false);
          } else {
            setTimeout(() => {
              setLoading(false);
              props.history.push("recognition", resp);
            }, 1000);
          }
        }
        setFetchedVoter(resp);
        return true;
      })
      .catch((error) => {
        setError("Network Error...");
        setTimeout(function () {
          setOpen(true);
          setLoading(false);
          setLoading(false);
        }, 2000);
      });
  };
  console.log("OUT FETCH", fetchedVoter);

  // validate()
  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

  const checker = async () => {
    if (state.name == "" || state.cnic == "") {
      setError("Please Fill Complete Form");
      setOpen(true);
    } else {
      setLoading(true);
      console.log("checker in working");
      await fetchData(state.name, state.cnic).catch((error) =>
        console.log(error)
      );
    }
  };
  // console.log(props);

  if (
    props.location.state.status === "ended" ||
    !props.location.state ||
    props.location.state === undefined ||
    props.location.state === null
  ) {
    return (
      <div className="body">
        <h1 className="h1">503</h1>
        <p className="p">
          Oops! Polling hasn't been started yet in your <b>Region</b>.
        </p>
        <a className="buttonnn" href="" onClick={() => props.history.push("/")}>
          <i className="icon-home" /> Going back to HomePage, is better.
        </a>
      </div>
    );
  } else {
    return (
      <div
        className="app"
        style={{
          background: "-webkit-linear-gradient(left, #134324, #7bf3a5)",
        }}
      >
        <AppHeader fixed>
          <VotingHeader />
        </AppHeader>

        <div className="app-body">
          <Snackbar open={open2} autoHideDuration={3000} onClose={handleClose}>
            <Alertt onClose={handleClose} severity="info">
              Your are not allowed to cast in this polling Station,Please vist
              your respective Polling Station, Thankyou.
            </Alertt>
          </Snackbar>
          <div className="container register flag">
            <div className="row pakistan">
              <div className="col-md-3 register-left">
                <img src={voteBox} alt="" />
                <h3>Welcome</h3>
                <p>
                  <b>
                    Your Vote is the key.
                    <br /> Respect Your Vote.{" "}
                  </b>{" "}
                </p>
              </div>
              <div className="col-md-9 register-right">
                <div className="tab-content transparent" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <h3 className="register-heading">
                      <strong> Check Your Eligibilty</strong>
                    </h3>

                    <div className="row register-form">
                      <div className="col-md-8 center">
                        <div>
                          <Collapse in={open}>
                            <Alert
                              severity="error"
                              action={
                                <IconButton
                                  aria-label="close"
                                  color="inherit"
                                  size="small"
                                  onClick={() => {
                                    setOpen(false);
                                  }}
                                >
                                  <CloseIcon fontSize="inherit" />
                                </IconButton>
                              }
                            >
                              {error}
                            </Alert>
                          </Collapse>
                          <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <div className={classes.paper}>
                              <ThemeProvider theme={theme}>
                                <TextField
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="name"
                                  label="Enter Your Full Name"
                                  name="name"
                                  autoComplete="name"
                                  autoFocus
                                  onChange={(e) => {
                                    setState({ name: e.target.value });
                                  }}
                                />
                                <InputMask
                                  mask="99999-9999999-9"
                                  className={classes.mask}
                                  //   value={this.state.cnic}
                                  disabled={false}
                                  maskChar="*"
                                  //   alwaysShowMask
                                  placeholder="42101-1234567-1"
                                  onChange={(e) => {
                                    setState({
                                      ...state,
                                      cnic: e.target.value,
                                    });
                                    console.log(state);
                                  }}
                                  required
                                >
                                  {() => (
                                    <TextField
                                      label="Enter Your CNIC"
                                      variant="outlined"
                                      fullWidth
                                      required={true}
                                    />
                                  )}
                                </InputMask>
                              </ThemeProvider>{" "}
                              <br />
                              <br />
                              <Button
                                style={{
                                  backgroundColor: "#527960",
                                  color: "white",
                                }}
                                type="bbb"
                                variant="contained"
                                fullWidth
                                disabled={loading}
                                onClick={() => {
                                  checker();
                                }}
                                className={classes.submit}
                              >
                                {loading && (
                                  <i
                                    className="fa fa-refresh fa-spin"
                                    style={{ marginRight: "5px" }}
                                  />
                                )}
                                {loading && <span>Please Wait</span>}
                                {!loading && <strong>Check</strong>}
                              </Button>
                            </div>
                          </Container>
                        </div>
                      </div>
                    </div>
                  </div>
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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
  },
  mask: {
    width: "100%", // Fix IE 11 issue.
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  submit: {
    margin: "4%",
    "&:hover": {
      background: "#F2F2F2",
    },
  },
}));

const Alertt = (props) => {
  return <MuiAlert elevation={8} variant="filled" {...props} />;
};

export default Eligibility;
