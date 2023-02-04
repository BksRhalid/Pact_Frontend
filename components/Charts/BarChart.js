import React, { Component } from "react";
import BarChart from "components/charts/BarChart";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    const { barChartData, barChartOptions } = this.props;

    this.setState({
      chartData: barChartData,
      chartOptions: barChartOptions,
    });
  }

  render() {
    return (
      <BarChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        width="100%"
        height="100%"
      />
    );
  }
}

export default Chart;
