import React, { Component, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Alert,
} from "reactstrap";

const Login = (props) => {
  if (localStorage.getItem("admin")) {
    props.history.push("/dashboard");
  }
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState();

  const [allAdmin, setAllAdmin] = useState();

  const [visible, setVisible] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertMessage, setAlertMessage] = useState();
  const onDismiss = () => setVisible(false);

  useEffect(() => {
    fetch("https://region1server.herokuapp.com/admin", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setAllAdmin(res);
        console.log(allAdmin);
      });
  }, [allAdmin]);

  const cipher = (salt) => {
    const textToChars = (text) =>
      String(text)
        .split("")
        .map((c) => c.charCodeAt(0));
    const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code) =>
      textToChars(salt).reduce((a, b) => a ^ b, code);

    return (text) =>
      text
        .split("")
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join("");
  };

  let key = "myprivateSalt";

  const myCipher = cipher(key);

  // console.log(myCipher("false"));

  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].email === nameKey) {
        console.log(myArray[i]);
        return myArray[i];
      } else {
        return null;
      }
    }
  }

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
  const log = () => {
    // setLoading(true);

    setAdmin({ email: email, password: pass });
    console.log("clicked");
    if (email === "" || pass === "") {
      console.log(email, pass);
      // setLoading(false);
      setAlertMessage("All Fields Are Required (*)");
      setAlertType("warning");
      setVisible(true);
    } else {
      if (allAdmin !== undefined || allAdmin !== null) {
        var adminnn = search(myCipher(email), allAdmin);
        console.log("region admin===>", adminnn);
        if (adminnn !== null) {
          if (adminnn.password === myCipher(pass)) {
            localStorage.setItem("admin", JSON.stringify(adminnn));
            console.log(email, pass);
            props.history.push("/dashboard");
          } else {
            setAlertMessage("Wrong Password");
            setAlertType("danger");
            setVisible(true);
          }
        } else {
          setAlertMessage("Email Does not exist.");
          setAlertType("danger");
          setVisible(true);
        }
      } else {
        setAlertMessage("Internal Server Error ~ 500");
        setAlertType("danger");
        setVisible(true);
      }
    }
  };

  return (
    <div
      className="app flex-row align-items-center"
      style={{ background: "-webkit-linear-gradient(left, #134324, #7bf3a5)" }}
    >
      <Container className="animated fadeIn">
        <Row className="justify-content-center">
          <Col md="8">
            <Alert color={alertType} isOpen={visible} toggle={onDismiss}>
              {alertMessage}
            </Alert>
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  {/* <h1>Login</h1> */}
                  <h2 className="text-muted" style={{ textAlign: "center" }}>
                    Sign In to your account
                  </h2>
                  <br />
                  <form>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPass(e.target.value)}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="8">
                        <Button
                          color="primary"
                          className="px-4"
                          style={{ background: "#2E8B57" }}
                          onClick={() => {
                            log();
                          }}
                        >
                          {loading && (
                            <i
                              className="fa fa-refresh fa-spin"
                              style={{ marginRight: "5px" }}
                            />
                          )}
                          {loading && <span>Please Wait</span>}
                          {!loading && <strong>Login</strong>}
                        </Button>
                      </Col>

                      <Col xs="4">
                        <Button
                          color="secondary"
                          className="px-4 text-right"
                          style={{ background: "", float: "right" }}
                          onClick={() => {
                            props.history.push("/");
                          }}
                        >
                          Home
                        </Button>
                      </Col>
                    </Row>
                  </form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
