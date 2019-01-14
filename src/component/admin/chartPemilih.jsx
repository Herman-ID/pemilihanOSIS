import React, { Component } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";

Charts(FusionCharts);

class ChartPemilih extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sudah: 0,
      belum: 0
    };
    this.chartConfigs = {
      type: "pie2d",
      width: 600,
      height: 400,
      dataFormat: "json",
      dataSource: {
        chart: {
          caption: "Jumlah Pemilih",
          subCaption: "Jumlah pemilih yang sudah melakukan vote",
          xAxisName: "Keterangan",
          yAxisName: "Jumlah",
          numberSuffix: "",
          theme: "candy",
          showPercentInToolTip: "1",
          enableSmartLabels: "1",
          paletteColors: "#0075c2,#1aaf5d,#f2c500",
          captionFontSize: "14",
          subCaptionFontSize: "12",
          captionFontBold: "1",
          subCaptionFontBold: "0",
          showHoverEffect: "1",
          placeValuesInside: "0"
        },
        // Chart Data
        data: [
          {
            label: "Sudah Memilih",
            value: this.props.sudah
          },
          {
            label: "Belum Memilih",
            value: this.props.belum
          }
        ]
      }
    };
  }
  render() {
    return (
      <div>
        {(this.props.sudah === 0) & (this.props.belum === 0)
          ? "Loading charts..."
          : this.loadData()}
      </div>
    );
  }
  loadData() {
    this.chartConfigs.dataSource.data[0].value = this.props.sudah;
    this.chartConfigs.dataSource.data[1].value = this.props.belum;
    return <ReactFC {...this.chartConfigs} />;
  }
}

export default ChartPemilih;
