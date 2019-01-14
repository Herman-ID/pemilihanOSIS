import React, { Component } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";

Charts(FusionCharts);

class ChartRekap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datapemilih: [],
      loaded: false,
      load: false
    };
    this.chartConfigs = {
      type: "column2d",
      width: 600,
      height: 400,
      dataFormat: "json",
      dataSource: {
        chart: {
          caption: "Real Count",
          subCaption: "Pemilihan ketua OSIS masa periode 2018/2019",
          xAxisName: "Nama Calon",
          yAxisName: "Jumlah Suara",
          numberSuffix: "",
          theme: "fusion"
        },
        // Chart Data
        data: [
          {
            label: "Sudah Memilih",
            value: 0
          },
          {
            label: "Belum Memilih",
            value: 0
          }
        ]
      },
      events: {
        dataplotRollOver: (eventObj, dataObj) => {
          this.setState({
            actualValue: dataObj.dataValue
          });
        }
      }
    };
  }

  render() {
    return <div>{this.props.data.length > 0 ? this.loadData() : ""}</div>;
  }
  loadData() {
    this.chartConfigs.dataSource.data = this.props.data;
    return <ReactFC {...this.chartConfigs} />;
  }
}

export default ChartRekap;
