import React, { useState, useEffect } from "react";
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
  const [faceID1, setFaceID1] = useState("");
  const [faceID2, setFaceID2] = useState("");
  const [isIdentical, SetIsIdentical] = useState();
  const [isVerified, setIsVerified] = useState(true);
  const [isFace2, setIsFace2] = useState(false);

  const [faceMatched, setFaceMatched] = useState(0);

  const [alertType, setAlertType] = useState();
  const [show, setShow] = useState();
  const detectFirstImage = async () => {
    if (isVerified == true) {
      //console.log("propsssssss=========> ", props.location.state);
      const a = await fetch(
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
      )
        .then((response) => response.json())
        .then((response) => {
          //console.log(response[0].faceId, "FACE1 saved");
          setFaceID1(response[0].faceId); //here is the face ID of
          setIsVerified(false);
        })
        .catch((e) => console.log("detect first image eror", e));
    }
  };

  useEffect(() => {
    detectFirstImage();
  }, []);

  const gotoCandidates = () => {
    if (isIdentical) {
      //console.log("matched");
      props.history.push("candidates", voter);
    }
  };

  useEffect(() => {
    if (setIsFace2) {
      Verify();
      //console.log("voter state ==> ", voter);
    } else {
      setIsFace2(false);
    }
  }, [faceID2, isFace2, isIdentical]);

  useEffect(() => {
    // Verify();
  }, [faceMatched]);
  const UploadImageToCLoud = async (e) => {
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
    Detect(imageUrl.url);
  };

  const Detect = async (url) => {
    console.log("IN DETECT", url);
    const a = await fetch(
      "https://fypprojectapi.cognitiveservices.azure.com/face/v1.0/detect",
      {
        method: "POST",
        // mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": "40844b73a3bd4d0da7ce744e48a817d6",
        },
        body: JSON.stringify({
          url: url,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        //console.log("FACEID1 ==> ", faceID1);
        console.log("response===>", response);
        setIsFace2(true);
        setFaceID2(response[0].faceId);
        //here is the face ID of
        //console.log(response[0].faceId, "FACE2 saved");
      })
      .catch((e) => console.log("detect 2nd image eror ", e));
  };

  const Verify = async () => {
    console.log("FACEID ==> ", faceID1);
    console.log("FACEID2 ==> ", faceID2);
    const a = await fetch(
      "https://fypprojectapi.cognitiveservices.azure.com/face/v1.0/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": "40844b73a3bd4d0da7ce744e48a817d6",
        },
        body: JSON.stringify({
          faceId1: faceID1,
          faceId2: faceID2,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log(response); //here is the face ID of
        SetIsIdentical(response.isIdentical);
        console.log(response.isIdentical);
        SetVoter(props.location.state);
        if (voter) {
          gotoCandidates();
        } else {
          setAlertType("info");
          setShow(true);
          console.log("yhn masla hai....");
        }
      })
      .catch((e) => console.log("Verify error", e));
  };

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    //console.log(imageSrc);
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

      <div className="app-body" style={{ marginTop: "10px" }}>
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
                variant={alertType}
                onClose={() => setShow(false)}
                dismissible
              >
                <Alert.Heading>
                  Click twice nothing when happens !
                </Alert.Heading>
                <p>
                  {
                    "Sometimes the server is busy it takes time to process your request Thankyou."
                  }
                </p>
              </Alert>
            ) : null}

            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                // fullWidth
                onClick={() => {
                  capture();
                  setFaceMatched(1);
                }}
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
                Recognize
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
