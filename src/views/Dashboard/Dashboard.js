import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import Clock from "react-digital-clock";
import Avatar from "@material-ui/core/Avatar";
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from "reactstrap";
import Widget03 from "../../views/Widgets/Widget03";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import {
  getStyle,
  hexToRgba,
} from "@coreui/coreui-pro/dist/js/coreui-utilities";

const brandPrimary = getStyle("--primary");
const brandSuccess = getStyle("--success");
const brandInfo = getStyle("--info");
const brandWarning = getStyle("--warning");
const brandDanger = getStyle("--danger");

// Card Chart 1
const cardChartData1 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandPrimary,
      borderColor: "rgba(255,255,255,.55)",
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent",
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent",
        },
      },
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      },
    ],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 2
const cardChartData2 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandInfo,
      borderColor: "rgba(255,255,255,.55)",
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent",
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent",
        },
      },
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      },
    ],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,255,255,.2)",
      borderColor: "rgba(255,255,255,.55)",
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
    "April",
  ],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,255,255,.3)",
      borderColor: "transparent",
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: "facebook" },
  { data: [1, 13, 9, 17, 34, 41, 38], label: "twitter" },
  { data: [78, 81, 80, 45, 34, 12, 40], label: "linkedin" },
  { data: [35, 23, 56, 22, 97, 23, 64], label: "google" },
];

const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        backgroundColor: "rgba(255,255,255,.1)",
        borderColor: "rgba(255,255,255,.55)",
        pointHoverBackgroundColor: "#fff",
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: "New Clients",
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: "Recurring Clients",
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: "Pageviews",
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: "Organic",
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: "CTR",
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: "Bounce Rate",
  },
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        backgroundColor: "transparent",
        borderColor: variant ? variant : "#c2cfd6",
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
};

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: ["1997", "2001", "2005", "2009", "2013", "2017"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      data: data1,
    },
    {
      label: "My Second dataset",
      backgroundColor: "transparent",
      borderColor: brandSuccess,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      data: data2,
    },
    {
      label: "My Third dataset",
      backgroundColor: "transparent",
      borderColor: brandDanger,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: "index",
    position: "nearest",
    callbacks: {
      labelColor: function (tooltipItem, chart) {
        return {
          backgroundColor:
            chart.data.datasets[tooltipItem.datasetIndex].borderColor,
        };
      },
    },
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      },
    ],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      electionStatus: undefined,
      totalVoters: undefined,
      totalCandidates: undefined,
      voters: undefined,
      candidates: undefined,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  componentDidMount() {
    fetch("https://region1server.herokuapp.com/election")
      .then((res) => res.json())
      .then((res) => this.setState({ electionStatus: res.status }));

    fetch("https://region1server.herokuapp.com/voters")
      .then((res) => res.json())
      .then((res) => this.setState({ totalVoters: res.length, voters: res }));

    fetch("https://region1server.herokuapp.com/candidates")
      .then((res) => res.json())
      .then((res) =>
        this.setState({ totalCandidates: res.length, candidates: res })
      );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div class="row">
          <div class="col-md-3">
            <div class="card-counter primary">
              <i class="fa fa-clock-o"></i>
              <span class="count-numbers">
                <Clock />
              </span>
              <span class="count-name">Time</span>
            </div>
          </div>

          <div class="col-md-3">
            <div class="card-counter danger">
              <i class="fa fa-code-fork"></i>
              <span class="count-numbers">{this.state.electionStatus}</span>
              <span class="count-name">Status</span>
            </div>
          </div>

          <div class="col-md-3">
            <div class="card-counter success">
              <i class="fa fa-user"></i>
              <span class="count-numbers">{this.state.totalCandidates}</span>
              <span class="count-name">Candidates</span>
            </div>
          </div>

          <div class="col-md-3">
            <div class="card-counter info">
              <i class="fa fa-users"></i>
              <span class="count-numbers">{this.state.totalVoters}</span>
              <span class="count-name">Voters</span>
            </div>
          </div>
        </div>

        <Row>
          <Col>
            <Card>
              <CardBody>
                <Table
                  hover
                  responsive
                  className="table-outline mb-0 d-none d-sm-table"
                >
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center">
                        <i className="icon-people"></i>
                      </th>
                      <th>Candidate</th>
                      <th className="text-center">Region</th>
                      <th>Party</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.candidates !== undefined &&
                      this.state.candidates.slice(0, 3).map((voter) => (
                        <tr>
                          <td className="text-center">
                            <Avatar
                              alt={voter.Fulname}
                              src={voter.image}
                              style={{ margin: "0 auto" }}
                            />
                          </td>
                          <td>
                            <div>{voter.Fullname}</div>
                          </td>

                          <td className="text-center">
                            <div className="clearfix">
                              <div className="">
                                <strong>{voter.constituency}</strong>
                              </div>
                            </div>
                          </td>

                          <td>
                            <strong>{voter.Party.party_Id}</strong>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardBody>
                <Table
                  hover
                  responsive
                  className="table-outline mb-0 d-none d-sm-table"
                >
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center">
                        <i className="icon-people"></i>
                      </th>
                      <th>Voter</th>
                      <th className="text-center">Region</th>
                      <th>Polling station</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.voters !== undefined &&
                      this.state.voters.slice(0, 3).map((voter) => (
                        <tr>
                          <td className="text-center">
                            <Avatar
                              alt={voter.Fulname}
                              src={voter.image}
                              style={{ margin: "0 auto" }}
                            />
                          </td>
                          <td>
                            <div>{voter.Fullname}</div>
                          </td>

                          <td>
                            <div className="text-center">
                              <strong>{voter.constituency}</strong>
                            </div>
                          </td>

                          <td>
                            <strong>{voter.PollingStation_Id}</strong>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
