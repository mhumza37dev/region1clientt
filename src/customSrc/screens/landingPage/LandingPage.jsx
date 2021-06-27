import React, { Component, useEffect, useState, useMemo } from "react";
import logo from "../../assets/N2.png";
import banner from "./images/votingBanner.jpg";
import "./Pinko.css";
var haversine = require("haversine-distance");

function LandingPage(props) {
  const [validLocation, setValidLocation] = useState(null);
  const [fetchedPoints, setFetchedPoints] = useState({ lat: null, lng: null });
  const [distance, setDistance] = useState();
  const [pollingCoords, setPollingCoords] = useState();
  const [electionStatus, setElectionStatus] = useState();

  useMemo(() => {}, [pollingCoords]);
  //First point in your haversine calculation
  var point1 = { lat: 24.922149604133335, lng: 67.02731167895583 };

  //Second point in your haversine calculation
  var point2 = { lat: 6.1352, lng: 106.8133 };

  useEffect(() => {
    fetch("https://region1server.herokuapp.com/election/")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setElectionStatus(res);
      });
  }, []);

  return (
    <div>
      <header className="header-area header-sticky animated fadeIn">
        <div className="container animated fadeIn">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <a onClick={() => props.history.push("/")} className="logo">
                  <img
                    className="landing-logo"
                    src={logo}
                    alt="DevS"
                    style={{
                      width: "75px",
                      height: "75px",
                      position: "fixed",
                      top: "34px",
                    }}
                  />
                </a>
                <ul className="nav">
                  <li>
                    <a onClick={() => props.history.push("admin/login")}>
                      Admin
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        // localStorage.clear();
                        props.history.push("eligibility", electionStatus);
                      }}
                    >
                      Voter
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        // localStorage.clear();
                        props.history.push("results", electionStatus);
                      }}
                    >
                      Result
                    </a>
                  </li>
                </ul>
                <a className="menu-trigger">
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <div
        className="welcome-area animated fadeIn"
        id="welcome"
        style={{
          background: `url(${banner})center center`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          animation: "fadeIn 5s ease",
        }}
      >
        <div className="header-text animated fadeIn">
          <div className="container">
            <div className="row">
              <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12 animated fadeIn"></div>
              <h1 style={{ color: "white" }}>
                "We have the <strong style={{ color: "#1f9b6b" }}>power</strong>{" "}
                to make a difference. But we need to{" "}
                <strong style={{ color: "#1f9b6b" }}>VOTE</strong>."
              </h1>
            </div>
          </div>
        </div>
      </div>
      <section className="section home-feature animated fadeIn">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-12 col-md-12 col-sm-12 align-self-center mobile-top-fix"
              style={{ padding: "15px" }}
            >
              <div style={{ padding: "10px" }} className="animated fadeIn">
                <h2 className="section-title">
                  Let’s discuss about our project
                </h2>
              </div>
              <div style={{ padding: "10px" }} className="animated fadeIn">
                <p>Simple and Easy Steps to participate.</p>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 col-sm-6 col-12"
              data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s"
            >
              <div className="features-small-item">
                <div className="icon">
                  <i>
                    <img src="" alt="" />
                  </i>
                </div>
                <h5 className="features-title">Check Your Eligilibilty</h5>
                <p>
                  Simply enter your Fullname and <strong>CNIC</strong> to check
                  if you are eligible to cast vote.
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 col-sm-12 col-12"
              data-scroll-reveal="enter bottom move 50px over 0.6s after 0.4s"
            >
              <div className="features-small-item animated fadeIn">
                <div className="icon">
                  <i>
                    <img src="assets/images/featured-item-01.png" alt="" />
                  </i>
                </div>
                <h5 className="features-title">Facial Recognition</h5>
                <p>
                  Verify Your Face to authenticate yourself in order to order
                  proceed
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 col-sm-12 col-12 animated fadeIn"
              data-scroll-reveal="enter bottom move 50px over 0.6s after 0.6s"
            >
              <div className="features-small-item animated fadeIn">
                <div className="icon">
                  <i>
                    <img src="assets/images/featured-item-01.png" alt="" />
                  </i>
                </div>
                <h5 className="features-title">Select Candidate</h5>
                <p>Choose whom ever you want to vote and cast vote.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section animated fadeIn" id="testimonials">
        <div className="container animated fadeIn">
          <div className="row animated fadeIn">
            <div className="col-lg-12">
              <div className="center-heading animated fadeIn">
                <h2 className="section-title">Our Team</h2>
              </div>
            </div>
            <div className="offset-lg-3 col-lg-6">
              <div className="center-text">
                <p></p>
              </div>
            </div>
          </div>
          <div className="row animated fadeIn">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="team-item">
                <div className="team-content">
                  <i>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhT6UPQNGiZhyeSkPmB7MGgzbCQHmBSfqYBVfynqrlekEtTMCdeZMQ2-C5U3FzZlPFArQ&usqp=CAU"
                      alt=""
                    />
                  </i>
                  <div className="user-image">
                    <img src="http://placehold.it/60x60" alt="" />
                  </div>
                  <div className="team-info animated fadeIn">
                    <h3 className="user-name">Muhammad Humza</h3>
                    <span>Developer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 animated fadeIn">
              <div className="team-item">
                <div className="team-content">
                  <i>
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/000/242/494/original/vector-female-developer.jpg"
                      alt=""
                      style={{ width: "70%" }}
                    />
                  </i>
                  <p></p>
                  <div className="user-image">
                    <img src="http://placehold.it/60x60" alt="" />
                  </div>
                  <div className="team-info">
                    <h3 className="user-name">Adeena Hussain</h3>
                    <span>Designer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="team-item">
                <div className="team-content">
                  <i>
                    <img
                      src="https://media.istockphoto.com/vectors/software-language-programmer-avatar-vector-id861345414?k=6&m=861345414&s=612x612&w=0&h=TGR08ptSslwknq5Wi5xoxjiUXgrijnXQHFKdQuGKfts="
                      alt=""
                      style={{ width: "70%" }}
                    />
                  </i>
                  <p></p>
                  <div className="user-image">
                    <img src="http://placehold.it/60x60" alt="" />
                  </div>
                  <div className="team-info">
                    <h3 className="user-name">Muntaha Taimuri</h3>
                    <span>Prioject Manager</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section colored animated fadeIn" id="contact-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="center-heading animated fadeIn">
                <h2 className="section-title">Help Us Improve</h2>
              </div>
            </div>
            <div className="offset-lg-3 col-lg-6">
              <div className="center-text">
                <p>
                  “We make improvements, not excuses. Seek respect, not
                  attention.”
                </p>
              </div>
            </div>
          </div>
          <div className="row animated fadeIn">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <h5 className="margin-bottom-30">
                Enlighten us with your Suggestion.
              </h5>
              <div className="contact-text">
                <p>
                  We welcome your suggestion <br />
                  We will surely take your suggestion in consideration
                </p>
                <p>
                  You are <b>NOT</b> allowed to re-distribute,
                  <br /> <b>DEV-System </b>
                  template on any template collection websites. Thank you.
                </p>
              </div>
            </div>
            <div className="col-lg-8 col-md-6 col-sm-12 animated fadeIn">
              <div className="contact-form">
                <form id="">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <input
                          name="name"
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Full Name"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <input
                          name="email"
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="E-Mail Address"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <textarea
                          name="message"
                          rows={6}
                          className="form-control"
                          id="message"
                          placeholder="Your Suggestion"
                          required
                          defaultValue={""}
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <button
                          type="sumit"
                          id="form-submit"
                          className="main-button"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          Submit
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <ul className="social">
                <li>
                  <a href="#">
                    <i className="fa fa-facebook" style={{ color: "black" }} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-twitter" style={{ color: "black" }} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-linkedin" style={{ color: "black" }} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <p className="copyright">
                Copyright © 2021 GroupSeven ~ Decentralized.E.V-Systems
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
