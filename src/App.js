import "./App.css";
import { Bar, Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
// require("./RoundedBars");
function App() {
  const [items, setitems] = useState([]);
  const [time, settime] = useState([]);
  const [days, setDays] = useState([]);
  const [showDays, setShowDays] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  useEffect(() => {
    axios
      .get(
        "https://brightlystake.com/api/getClusterDetails/0x81c986e7b8da828b5639be6d3e44ea83b33c05a2"
      )
      .then((res) => {
        console.log(res.data.data);
        setitems(res.data.data);

        res.data.data.map((f) => days.push(moment(f.time).format("dddd")));

        res.data.data.map((f) => time.push(f.time.substr(11, 2)));

        settime(time);
        setDays(days);
        console.log("days", days);
        console.log("time", time);
        console.log(items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(items);
  let showLatency = [];
  items.map((f) =>
    f.latency <= items.length ? showLatency.push(f.latency) : null
  );
  const handleClose = () => setModalShow(false);
  const handleClose2 = () => setModalShow2(false);
  // items.map((f) => f.time === showdate.push(f.time));
  // console.log("dateeee", showdate);

  // ----------------

  // ----------------

  var mydate = "2021-05-25 05:40:02";
  var weekDayName = moment(mydate).format("dddd");
  console.log(weekDayName);
  return (
    <div className="App">
      <div className="main">
        <div className="row width">
          <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 center">
                <div className="card-1">
                  <div className="row">
                    <div className="col-8">
                      <div className="card-name">Ticket Average</div>
                      <div className="card-number">350,897</div>
                      <div className="green-value">
                        3.48%<span className="card-date">Since last month</span>
                      </div>
                    </div>
                    <div className="col-4 btn-align">
                      <div className="payment-btn-five">payment</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 center">
                <div className="card-1">
                  <div className="row">
                    <div className="col-8">
                      <div className="card-name">POND average</div>
                      <div className="card-number">924</div>
                      <div className="orange-value">
                        3.48%
                        <span className="card-date">Since last month</span>
                      </div>
                    </div>
                    <div className="col-4 btn-align">
                      <div className="payment-btn">payment</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 center">
                <div className="card-1">
                  <div className="row">
                    <div className="col-8">
                      <div className="card-name">MPOND average</div>
                      <div className="card-number">2,897</div>
                      <div className="red-value">
                        3.48%
                        <span className="card-date">Since last month</span>
                      </div>
                    </div>
                    <div className="col-4 btn-align">
                      <div className="payment-btn-two">payment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-6 col-sm-12 col-xs-12">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 center">
                <div className="card-1">
                  <div className="row">
                    <div className="col-8">
                      <div className="card-name">Ranks</div>
                      <div className="card-number">49,89%</div>
                      <div className="green-value">
                        3.48%<span className="card-date">Since last month</span>
                      </div>
                    </div>
                    <div className="col-4 btn-align">
                      <div className="payment-btn-three">payment</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 center pt-20">
                {" "}
                <div className="card-1">
                  <div className="row">
                    <div className="col-8">
                      <div className="card-name">fees</div>
                      <div className="card-number">750,897</div>
                      <div className="green-value">
                        3.48%<span className="card-date">Since last month</span>
                      </div>
                    </div>
                    <div className="col-4 btn-align">
                      <div className="payment-btn-four">payment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="graph-main ">
        <div className="row width postion">
          <div className="col-lg-8 col-md-6 col-sm-12 col-xs-12 ">
            <div className="Chart-card-line ">
              <div className="row">
                <div className="col-6">
                  <h3 className="chart-heading-overview">overview</h3>
                  <h3 className="chart-heading">Sales value</h3>
                </div>
                <div className="col-6 right">
                  <h3 className="chart-heading-right">
                    <div
                      className="chart-btn-active"
                      onClick={() => setShowDays(true)}
                    >
                      Days
                    </div>
                    <div
                      className="chart-btn-disable"
                      onClick={() => setShowDays(false)}
                    >
                      Hours
                    </div>
                    <div
                      className="chart-btn-view"
                      onClick={() => setModalShow(true)}
                    >
                      View More
                    </div>
                  </h3>
                </div>
              </div>
              <div>
                {items.length !== 0 ? (
                  <Line
                    height={300}
                    width={1990}
                    data={{
                      labels: showDays ? days : time,
                      // labels: ["feb", "dec", "gen"],
                      datasets: [
                        {
                          label: "Sale value",
                          lineTension: 0,
                          fill: false,
                          borderColor: "#626ed7",
                          backgroundColor: "#626ed7",
                          pointBackgroundColor: "#55bae7",
                          pointBorderColor: "#55bae7",
                          pointHoverBackgroundColor: "#55bae7",
                          pointHoverBorderColor: "#55bae7",
                          data: showLatency,
                          // data: [22, 66, 88, 99],
                          pointRadius: 0,
                        },
                      ],
                    }}
                    options={{
                      bezierCurve: false,
                      line: {
                        tension: 0, // disables bezier curves
                      },
                      tooltips: {
                        callbacks: {
                          label: function (tooltipItem) {
                            return tooltipItem.yLabel;
                          },
                        },
                      },
                      legend: {
                        display: false,
                      },

                      cornerRadius: 20,
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              // callback: function (value) {
                              //   return "$ " + numeral(value).format("0.0a");
                              // },
                              stepSize: 5,
                              beginAtZero: true,
                              fontColor: "red",
                            },
                            gridLines: {
                              borderDash: [2],
                              zeroLineColor: "transparent",
                              zeroLineWidth: 0,
                              tickMarkLength: 15,
                            },
                          },
                        ],
                        xAxes: [
                          {
                            // barThickness: 10,
                            barPercentage: 0.7,
                            gridLines: {
                              // lineWidth: 0,
                              // zeroLineColor: "transparent",
                              display: false,
                            },
                          },
                        ],
                      },
                      elements: {
                        line: {
                          tension: 0,
                        },
                        point: {
                          radius: 0,
                        },
                      },
                    }}
                    legend={{
                      display: false,
                      position: "bottom",
                      labels: {
                        usePointStyle: true,
                        boxWidth: 50,
                        font: {
                          size: 17,
                        },
                      },
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <div className="Chart-card-line-2 ">
              <div className="row">
                <div className="col-6">
                  <h3 className="chart-heading-overview">performance</h3>
                  <h3 className="chart-heading">Total orders</h3>
                </div>
                <div className="col-6 right">
                  <h3 className="chart-heading-right">
                    <div
                      className="chart-btn-view-total-orders "
                      onClick={() => setModalShow2(true)}
                    >
                      View More
                    </div>
                  </h3>
                </div>
              </div>
              <div>
                {items.length !== 0 ? (
                  <Bar
                    height={300}
                    width={800}
                    data={{
                      // labels: showDays ? days : time,
                      labels: ["feb", "MAr", "feb", "MAr"],
                      datasets: [
                        {
                          label: "Total orders",
                          data: showLatency,
                          backgroundColor: "#FC7E09",
                          borderRadius: 12,
                        },

                        // {
                        //   label: "Lima Forecast",
                        //   data: [200, 400],
                        //   backgroundColor: "#707070",
                        // },
                        // {
                        //   label: "EBIT",
                        //   data: [100, 300],
                        //   backgroundColor: "#9891AF",
                        // },
                      ],
                    }}
                    options={{
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              beginAtZero: true,
                            },
                          },
                        ],
                        xAxes: [
                          {
                            // Change here
                            barPercentage: 0.2,
                          },
                        ],
                      },
                      tooltips: {
                        callbacks: {
                          title: function (tooltipItem, data) {
                            return data["labels"][tooltipItem[0]["index"]];
                          },
                          label: function (tooltipItem, data) {
                            let value;
                            data["datasets"].forEach((d) => {
                              // console.log(d['data'][tooltipItem['index']], tooltipItem);
                              if (
                                d["data"][tooltipItem["index"]] ===
                                Number(tooltipItem.value)
                              ) {
                                value =
                                  "$ " +
                                  d["data"][tooltipItem["index"]].toFixed(2);
                              }
                            });
                            // console.log(value);
                            return value;
                          },
                          afterLabel: function (tooltipItem, data) {},
                        },
                        backgroundColor: "#FFF",
                        borderWidth: 2,
                        xPadding: 15,
                        yPadding: 15,
                        borderColor: "#ddd",
                        titleFontSize: 16,
                        titleFontColor: "#0066ff",
                        bodyFontColor: "#000",
                        bodyFontSize: 14,
                        // displayColors: false,
                      },
                      cornerRadius: 20,
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                    legend={{
                      display: true,
                      position: "bottom",
                      labels: {
                        usePointStyle: true,
                        boxWidth: 50,
                      },
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="xd"
        // aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="my-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Sales Value
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {items.length !== 0 ? (
            <Line
              height={300}
              width={1990}
              data={{
                labels: showDays ? days : time,
                // labels: ["feb", "dec", "gen"],
                datasets: [
                  {
                    label: "Sale value",
                    lineTension: 0,
                    fill: false,
                    borderColor: "#626ed7",
                    backgroundColor: "#626ed7",
                    pointBackgroundColor: "#55bae7",
                    pointBorderColor: "#55bae7",
                    pointHoverBackgroundColor: "#55bae7",
                    pointHoverBorderColor: "#55bae7",
                    data: showLatency,
                    // data: [22, 66, 88, 99],
                    pointRadius: 0,
                  },
                ],
              }}
              options={{
                bezierCurve: false,
                line: {
                  tension: 0, // disables bezier curves
                },
                tooltips: {
                  callbacks: {
                    label: function (tooltipItem) {
                      return tooltipItem.yLabel;
                    },
                  },
                },
                legend: {
                  display: false,
                },

                cornerRadius: 20,
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        // callback: function (value) {
                        //   return "$ " + numeral(value).format("0.0a");
                        // },
                        stepSize: 5,
                        beginAtZero: true,
                        fontColor: "red",
                      },
                      gridLines: {
                        borderDash: [2],
                        zeroLineColor: "transparent",
                        zeroLineWidth: 0,
                        tickMarkLength: 15,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      // barThickness: 10,
                      barPercentage: 0.7,
                      gridLines: {
                        // lineWidth: 0,
                        // zeroLineColor: "transparent",
                        display: false,
                      },
                    },
                  ],
                },
                elements: {
                  line: {
                    tension: 0,
                  },
                  point: {
                    radius: 0,
                  },
                },
              }}
              legend={{
                display: false,
                position: "bottom",
                labels: {
                  usePointStyle: true,
                  boxWidth: 50,
                  font: {
                    size: 17,
                  },
                },
              }}
            />
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Total pop up */}
      <Modal
        show={modalShow2}
        onHide={() => setModalShow2(false)}
        size="xd"
        // aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="my-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Total orders
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {items.length !== 0 ? (
            <Bar
              height={300}
              width={1800}
              data={{
                labels: showDays ? days : time,
                // labels: [
                //   "feb",
                //   "MAr",
                //   "feb",
                //   "MAr",
                //   "feb",
                //   "MAr",
                //   "feb",
                //   "MAr",
                //   "feb",

                //   "MAr",
                // ],
                datasets: [
                  {
                    label: "Total orders",
                    data: showLatency,
                    backgroundColor: "#FC7E09",
                    borderRadius: 12,
                  },

                  // {
                  //   label: "Lima Forecast",
                  //   data: [200, 400],
                  //   backgroundColor: "#707070",
                  // },
                  // {
                  //   label: "EBIT",
                  //   data: [100, 300],
                  //   backgroundColor: "#9891AF",
                  // },
                ],
              }}
              options={{
                tooltips: {
                  callbacks: {
                    title: function (tooltipItem, data) {
                      return data["labels"][tooltipItem[0]["index"]];
                    },
                    label: function (tooltipItem, data) {
                      let value;
                      data["datasets"].forEach((d) => {
                        // console.log(d['data'][tooltipItem['index']], tooltipItem);
                        if (
                          d["data"][tooltipItem["index"]] ===
                          Number(tooltipItem.value)
                        ) {
                          value =
                            "$ " + d["data"][tooltipItem["index"]].toFixed(2);
                        }
                      });
                      // console.log(value);
                      return value;
                    },
                    afterLabel: function (tooltipItem, data) {},
                  },
                  backgroundColor: "#FFF",
                  borderWidth: 2,
                  xPadding: 15,
                  yPadding: 15,
                  borderColor: "#ddd",
                  titleFontSize: 16,
                  titleFontColor: "#0066ff",
                  bodyFontColor: "#000",
                  bodyFontSize: 14,
                  // displayColors: false,
                },
                cornerRadius: 20,
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        // callback: function (value) {
                        //   return "$ " + numeral(value).format("0.0a");
                        // },
                        stepSize: 250,
                        beginAtZero: true,
                      },
                      gridLines: {
                        borderDash: [2],
                        zeroLineColor: "transparent",
                        zeroLineWidth: 0,
                        tickMarkLength: 15,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      maxBarThickness: 40.9,
                      barPercentage: 0.4,
                      categoryPercentage: 0.4,
                      // barThickness: 10,
                      // barPercentage: 1,
                      gridLines: {
                        lineWidth: 0,
                        zeroLineColor: "transparent",
                      },
                    },
                  ],
                },
              }}
              legend={{
                display: true,
                position: "bottom",
                labels: {
                  usePointStyle: true,
                  boxWidth: 50,
                },
              }}
            />
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose2}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
