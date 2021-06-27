import React, { useState, useEffect, useMemo } from "react";
import Grid from "@material-ui/core/Grid";
import VotingFooter from "../../components/votingComponents/VotingFooter";
import VotingHeader from "../../components/votingComponents/VotingHeader";
import { AppFooter, AppHeader } from "@coreui/react";
import { useLoading, Bars } from "@agney/react-loading";
import Webcam from "react-webcam";
import { ThemeProvider } from "@material-ui/styles";

import { Button } from "@material-ui/core";

import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { SettingsPhoneTwoTone } from "@material-ui/icons";
import { Alert } from "react-bootstrap";

function FacialRecognition(props) {
  if (props.history.location.state == undefined || !props.location.state) {
    props.history.push("eligibility");
    //console.log("debugerrrrrrr");
  }

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Bars width="100" style={{ color: "green", margin: "AUTO" }} />,
  });

  const [capturedImage, SetCapturedImage] = useState("");
  const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: "user",
  };
  const [voter, SetVoter] = useState();
  const [faceID1, setFaceID1] = useState();
  const [faceID2, setFaceID2] = useState();
  const [issIdentical, SetIsIdentical] = useState();
  const [isVerified, setIsVerified] = useState(true);
  const [isFace2, setIsFace2] = useState(false);

  const [faceMatched, setFaceMatched] = useState(0);

  const [alertType, setAlertType] = useState();
  const [alertMessage, setAlertMessage] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    SetVoter(props.location.state);
    console.log(voter);
  }, [voter]);

  const gotoCandidates = () => {
    props.history.push("candidates", props.location.state);
  };

  const UploadImageToCLoud = async (e) => {
    setLoading(true);
    //console.log("UPLOADDDDD", capturedImage);
    const formData = new FormData();
    formData.append("upload_preset", "FypVoters");
    formData.append("file", e);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/mhumza37/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const imageUrl = await res.json();
    DetectandVerify(imageUrl.url);
  };

  const DetectandVerify = async (url) => {
    const detect1 = await fetch(
      "https://fypprojectapi.cognitiveservices.azure.com/face/v1.0/detect",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": "40844b73a3bd4d0da7ce744e48a817d6",
        },
        body: JSON.stringify({
          url: props.location.state.image,
        }),
      }
    );

    const detect1Res = await detect1.json();
    console.log("first detect===>", detect1Res);
    if (detect1Res.length > 0) {
      const detect2 = await fetch(
        "https://fypprojectapi.cognitiveservices.azure.com/face/v1.0/detect",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": "40844b73a3bd4d0da7ce744e48a817d6",
          },
          body: JSON.stringify({
            url: url,
          }),
        }
      );
      const detect2Res = await detect2.json();
      console.log("2nd detect===>", detect2Res);
      if (detect2Res.length > 0) {
        const verify = await fetch(
          "https://fypprojectapi.cognitiveservices.azure.com/face/v1.0/verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Ocp-Apim-Subscription-Key": "40844b73a3bd4d0da7ce744e48a817d6",
            },
            body: JSON.stringify({
              faceId1: detect1Res[0].faceId,
              faceId2: detect2Res[0].faceId,
            }),
          }
        );
        if (detect2Res.length > 0 && detect1Res.length > 0) {
          const verifyRes = await verify.json();
          console.log("verify==>", verifyRes);
          if (verifyRes.isIdentical === true) {
            props.history.push("candidates", props.location.state);
          } else {
            setLoading(false);
            setAlertType("danger");
            setAlertMessage("Problem recognizing your face, Please try again.");
            setShow(true);
          }
        } else {
          setLoading(false);
          setAlertType("warning");
          setAlertMessage("Server busy.");
          setShow(true);
        }
      } else {
        setLoading(false);
        setAlertType("warning");
        setAlertMessage("Please face towards the camera.");
        setShow(true);
      }
    } else {
      setLoading(false);
      setAlertType("danger");
      setAlertMessage("Image recieved from DB is corrupted");
      setShow(true);
    }
  };

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    UploadImageToCLoud(imageSrc);
  }, [webcamRef]);

  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

  return (
    <div
      className="app"
      style={{ background: "-webkit-linear-gradient(left, #134324, #7bf3a5)" }}
    >
      <AppHeader fixed>
        <VotingHeader />
      </AppHeader>

      <div className="app-body animated fadeIn" style={{ marginTop: "10px" }}>
        <Grid container spacing={2} style={{ margin: "auto" }}>
          <Grid
            item
            xs={6}
            style={{ position: "fixed", top: "78px", left: "100px" }}
          >
            <Webcam
              ref={webcamRef}
              videoConstraints={videoConstraints}
              mirrored={true}
              screenshotFormat="image/jpeg"
            />
          </Grid>
          <Grid
            item
            xs={3}
            style={{ position: "fixed", right: "120px", top: "180px" }}
          >
            {show ? (
              <Alert
                open={show}
                variant={alertType}
                onClose={() => setShow(false)}
                dismissible
              >
                <Alert.Heading>Error!</Alert.Heading>
                <p>{alertMessage}</p>
              </Alert>
            ) : null}

            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                // fullWidth
                disabled={loading}
                onClick={capture}
                style={{
                  position: "fixed",
                  width: "23%",
                  height: "11%",
                  fontSize: "1.9rem",
                  fontFamily: "Raleway",
                  bottom: "204px",
                  right: "131px",
                }}
              >
                {loading && (
                  <i
                    className="fa fa-refresh fa-spin"
                    style={{ marginRight: "5px" }}
                  />
                )}
                {loading && <span>Please Wait</span>}
                {!loading && <span>Recognize</span>}
              </Button>
            </ThemeProvider>
          </Grid>
        </Grid>
      </div>

      <AppFooter fixed>
        <VotingFooter />
      </AppFooter>
    </div>
  );
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
  },
  mask: {
    width: "100%", // Fix IE 11 issue.
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  submit: {
    margin: "4%",
    height: "100%",
    // width: '50%'
  },
}));

export default FacialRecognition;
