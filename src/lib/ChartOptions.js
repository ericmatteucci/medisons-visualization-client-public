// @flow

import ChartDataModel from '../data/models/ChartDataModel';
import TimeUtilities from './TimeUtilities';
import LabelFormatter from './LabelFormatter';
import { DEFAULT_CHART_VIEW_END, DEFAULT_CHART_VIEW_START } from '../constants/ValueConstants';
import { MAIN_CHART_Y_AXIS_LABEL } from '../constants/DisplayConstants';

const getSingleChartOptions = (chartType: string, chartData: ChartDataModel): Object => ({
  title: {
    text: chartData.getName(),
    textStyle: {
      fontSize: 24,
    },
    padding: [0, 0, 0, 15],
  },
  tooltip: {
    trigger: 'axis',
    formatter: LabelFormatter.chartTooltipFormatter,
  },
  axisPointer: {
    link: {
      xAxisIndex: 'all',
    },
  },
  xAxis: [
    {
      data: chartData.getDomainValues(),
      axisLabel: {
        formatter: TimeUtilities.epochToLocalDate,
      },
    },
  ],
  yAxis: {
    name: MAIN_CHART_Y_AXIS_LABEL,
    nameRotate: 90,
    nameLocation: 'middle',
    nameTextStyle: {
      padding: 15,
      fontSize: 16,
    },
  },
  dataZoom: [
    {
      type: 'slider',
      start: DEFAULT_CHART_VIEW_START,
      end: DEFAULT_CHART_VIEW_END,
      labelFormatter: LabelFormatter.chartLabelFormatter,
    },
  ],
  series: [
    {
      type: chartType,
      data: chartData.getData(),
      name: chartData.getName(),
    },
  ],
});

const getMultiChartOptions = (chartType: string, chartDataArray: Array<ChartDataModel>): Object => {
  const grid = new Array(chartDataArray.length);
  const xAxis = new Array(chartDataArray.length);
  const yAxis = new Array(chartDataArray.length);
  const series = new Array(chartDataArray.length);
  const xAxisIndex = new Array(chartDataArray.length);

  for (let i = 0; i < chartDataArray.length; i++) {
    const top = `${5 + i * 20}%`;

    grid[i] = {
      height: '12%',
      top,
    };

    xAxis[i] = {
      gridIndex: i,
      boundaryGap: false,
      data: chartDataArray[i].getDomainValues(),
      axisLabel: {
        show: i === chartDataArray.length - 1,
        formatter: TimeUtilities.epochToLocalDate,
      },
    };

    yAxis[i] = {
      name: chartDataArray[i].getName(),
      gridIndex: i,
      nameTextStyle: {
        align: 'right',
        padding: [0, 0, 0, chartDataArray[i].getName().length * 4.5],
      },
      splitLine: {
        show: false,
      },
    };

    series[i] = {
      type: chartType,
      name: chartDataArray[i].getName(),
      xAxisIndex: i,
      yAxisIndex: i,
      data: chartDataArray[i].getData(),
    };

    xAxisIndex[i] = i;
  }

  return {
    tooltip: {
      trigger: 'axis',
      formatter: LabelFormatter.chartTooltipFormatter,
    },
    axisPointer: {
      link: {
        xAxisIndex,
      },
    },
    dataZoom: [
      {
        type: 'inside',
        zoomOnMouseWheel: false,
        start: DEFAULT_CHART_VIEW_START,
        end: DEFAULT_CHART_VIEW_END,
        xAxisIndex,
      },
    ],
    grid,
    xAxis,
    yAxis,
    series,
  };
};

const getChartOptions = (chartType: string, chartData: Array<ChartDataModel>): Object =>
  chartData.length === 1
    ? getSingleChartOptions(chartType, chartData[0])
    : getMultiChartOptions(chartType, chartData);

export default getChartOptions;
