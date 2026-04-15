import type { EChartsOption } from 'echarts';

export function getRadarChartOptions(
  scores: number[],
  dimensions: string[]
): EChartsOption {
  return {
    radar: {
      indicator: dimensions.map(name => ({
        name,
        max: 10
      })),
      shape: 'polygon',
      splitNumber: 5,
      axisName: {
        color: '#666',
        fontSize: 11,
        distance: 15
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 99, 132, 0.2)'
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(255, 99, 132, 0.02)', 'rgba(255, 99, 132, 0.05)']
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 99, 132, 0.2)'
        }
      }
    },
    series: [{
      type: 'radar',
      data: [{
        value: scores,
        name: '人格维度得分',
        areaStyle: {
          color: 'rgba(255, 99, 132, 0.25)'
        },
        lineStyle: {
          color: 'rgb(255, 99, 132)',
          width: 2
        },
        itemStyle: {
          color: 'rgb(255, 99, 132)'
        },
        emphasis: {
          lineStyle: {
            width: 3
          },
          areaStyle: {
            color: 'rgba(255, 99, 132, 0.4)'
          }
        }
      }]
    }],
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 99, 132, 0.9)',
      textStyle: {
        color: '#fff',
        fontSize: 12
      }
    }
  };
}