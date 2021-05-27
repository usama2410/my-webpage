import "./App.css";
import { Bar, Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
// require("./RoundedBars");
import { Chart } from "chart.js";
function App() {
  const [items, setitems] = useState([]);
  const [hourData, setHourData] = useState([]);
  const [dayData, setDayData] = useState([]);
  const [tablemindata, settablemindata] = useState([]);
  const [showDay, setShowDay] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  useEffect(() => {
    axios
      .get(
        "https://brightlystake.com/api/getClusterDetails/0x81c986e7b8da828b5639be6d3e44ea83b33c05a2"
      )
      .then((res) => {
        // console.log(res.data.data);
        setitems(res.data.data);

        let latestObj =
          res.data.data.length !== 0
            ? res.data.data.reduce((a, b) => (a.time > b.time ? a : b))
            : null;

        let dayData = res.data.data.filter(
          (f) => f.time.substr(0, 10) == latestObj?.time.substr(0, 10)
        );

        let hourData = res.data.data.filter(
          (f) => f.time.substr(11, 2) == latestObj?.time.substr(11, 2)
        );

        // let tablemindata = res.data.data.filter(
        //   (f) => f.time.slice(0, 5) == latestObj?.time.slice(0, 5)
        // );
        let mindata = res.data.data.filter((item, idx) => idx < 5);
        console.log(mindata);
        settablemindata(mindata);
        console.log(tablemindata);

        console.log(latestObj);

        // settablemindata(tablemindata);
        setHourData(hourData);
        setDayData(dayData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let showLatency = [];
  let formatedDates = [];
  let totalData = [];
  let viewMoreFormattedDates = [];

  if (showDay) {
    dayData.map((f) =>
      f.latency <= items.length
        ? (showLatency.push(f.latency),
          formatedDates.push(moment(f.time).format("MMM D YYYY HH:mm:ss")))
        : null
    );
  } else {
    hourData.map((f) =>
      f.latency <= items.length
        ? (showLatency.push(f.latency),
          formatedDates.push(f.time.substr(11, 8)))
        : null
    );
  }
  items.map((f) =>
    f.latency <= items.length
      ? (totalData.push(f.latency),
        viewMoreFormattedDates.push(
          moment(f.time).format("MMM D YYYY HH:mm:ss")
        ))
      : null
  );
  //   items.map((f) =>
  //   f.latency <= 10
  //     ? (totalData.push(f.latency),
  //       .push(
  //     f.time
  //       ))
  //     : null
  // );  console.log(items);
  console.log(tablemindata);
  var MyChart = new Chart({
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  const handleClose = () => setModalShow(false);
  const handleClose2 = () => setModalShow2(false);
  // console.log("formatedDates", formatedDates);
  // console.log("hourData", hourData);

  return (
    <div className="App">
      <div className="main">
        <div className="row width">
          <div className=" col-xl-7 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 center">
                <div className="card-1">
                  <div className="row">
                    <div className="col-8 padding-left-10">
                      <div className="card-name">Ticket Average</div>
                      <div className="card-number">350,897</div>
                      <div className="green-value">
                        3.48%<span className="card-date">Since last month</span>
                      </div>
                    </div>
                    <div className="col-4 btn-align padding-none">
                      <div className="payment-btn-five">payment</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 center">
                <div className="card-1">
                  <div className="row">
                    <div className="col-8 padding-left-10">
                      <div className="card-name">POND average</div>
                      <div className="card-number">924</div>
                      <div className="orange-value">
                        3.48%
                        <span className="card-date">Since last month</span>
                      </div>
                    </div>
                    <div className="col-4 btn-align padding-none">
                      <div className="payment-btn">payment</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 center">
                <div className="card-1">
                  <div className="row">
                    <div className="col-8 padding-left-10">
                      <div className="card-name">MPOND average</div>
                      <div className="card-number">2,897</div>
                      <div className="red-value">
                        3.48%
                        <span className="card-date">Since last month</span>
                      </div>
                    </div>
                    <div className="col-4 btn-align padding-none">
                      <div className="payment-btn-two">payment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 center">
                <div className="card-1">
                  <div className="row">
                    <div className="col-8 padding-left-10">
                      <div className="card-name">Ranks</div>
                      <div className="card-number">49,89%</div>
                      <div className="green-value">
                        3.48%<span className="card-date">Since last month</span>
                      </div>
                    </div>
                    <div className="col-4 btn-align padding-none">
                      <div className="payment-btn-three">payment</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 center">
                {" "}
                <div className="card-1">
                  <div className="row ">
                    <div className="col-8 padding-left-10">
                      <div className="card-name">fees</div>
                      <div className="card-number">750,897</div>
                      <div className="green-value">
                        3.48%<span className="card-date">Since last month</span>
                      </div>
                    </div>
                    <div className="col-4 btn-align padding-none">
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
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <h3 className="chart-heading-overview">overview</h3>
                  <h3 className="chart-heading">Sales value</h3>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 right">
                  <h3 className="chart-heading-right">
                    <div
                      className={
                        showDay ? "chart-btn-active" : "chart-btn-disable"
                      }
                      onClick={() => setShowDay(true)}
                    >
                      Day
                    </div>
                    <div
                      className={
                        showDay ? "chart-btn-disable" : "chart-btn-active"
                      }
                      onClick={() => setShowDay(false)}
                    >
                      Hour
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
                      labels: formatedDates ? formatedDates : null,

                      datasets: [
                        {
                          label: "Sale Value",
                          fill: false,
                          borderColor: "#626ed7",
                          backgroundColor: "#626ed7",
                          pointBackgroundColor: "#55bae7",
                          pointBorderColor: "#55bae7",
                          pointHoverBackgroundColor: "#55bae7",
                          pointHoverBorderColor: "#55bae7",
                          data: showLatency,
                          pointRadius: 0,
                        },
                      ],
                    }}
                    options={{
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
                            ticks: {
                              fontColor: "#red", // this here
                            },
                          },
                        ],
                      },
                      elements: {
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
                {/* {items.length !== 0 ? (
                  <Bar
                    height={300}
                    width={800}
                    data={{
                      labels: formatedDates ? formatedDates : null,
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
                            // barThickness: 10,
                            barPercentage: 0.3,
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
                )} */}
                {items.length !== 0 ? (
                  <table class="table table-bordered">
                    <thead className="table-header ">
                      <tr>
                        <th scope="col">Date/Time</th>
                        <th scope="col">Latency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tablemindata.map((item, key) => {
                        return (
                          <tr>
                            <th scope="row">{item.time}</th>
                            <th>{item.latency}</th>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
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
                        labels: viewMoreFormattedDates,
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
                            data: totalData,
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
                  <div className="table-scroll">
                    <table class="table table-bordered">
                      <thead className="table-header ">
                        <tr>
                          <th scope="col">Clusture Name</th>
                          <th scope="col">Latency</th>
                          <th scope="col">Relayers</th>
                          <th scope="col">Tickets</th>
                          <th scope="col">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, keys) => {
                          return (
                            <tr>
                              <th scope="row">{item.clusterName}</th>
                              <td>{item.latency}</td>
                              <td>{item.relayers}</td>
                              <td>{item.tickets}</td>
                              <td>{item.time}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* {items.length !== 0 ? (
                    <Bar
                      height={300}
                      width={1800}
                      data={{
                        labels: viewMoreFormattedDates,
                        datasets: [
                          {
                            label: "Total orders",
                            data: totalData,
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
                  )} */}
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handleClose2}>Close</Button>
                </Modal.Footer>
              </Modal>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
