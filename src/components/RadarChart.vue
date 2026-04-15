<template>
  <div ref="chartContainer" class="radar-chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import * as echarts from 'echarts';

const props = defineProps<{
  scores: number[];
  dimensions: string[];
}>();

const chartContainer = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

function initChart() {
  if (!chartContainer.value) return;
  
  if (chartInstance) {
    chartInstance.dispose();
  }
  
  chartInstance = echarts.init(chartContainer.value);
  
  const option = {
    radar: {
      indicator: props.dimensions.map(name => ({
        name,
        max: 10
      })),
      shape: 'polygon',
      splitNumber: 5,
      axisName: {
        color: '#666',
        fontSize: 10,
        distance: 12
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 99, 132, 0.15)'
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(255, 99, 132, 0.02)', 'rgba(255, 99, 132, 0.04)']
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 99, 132, 0.15)'
        }
      }
    },
    series: [{
      type: 'radar',
      data: [{
        value: props.scores,
        name: '人格维度',
        areaStyle: {
          color: 'rgba(255, 99, 132, 0.25)'
        },
        lineStyle: {
          color: '#ff6384',
          width: 2
        },
        itemStyle: {
          color: '#ff6384'
        },
        emphasis: {
          lineStyle: {
            width: 3
          },
          areaStyle: {
            color: 'rgba(255, 99, 132, 0.35)'
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
      },
      formatter: (params: any) => {
        const idx = props.dimensions.indexOf(params.name);
        if (idx !== -1) {
          return `${params.name}: ${props.scores[idx].toFixed(1)}`;
        }
        return `${params.name}: ${params.value}`;
      }
    }
  };
  
  chartInstance.setOption(option);
}

function handleResize() {
  if (chartInstance) {
    chartInstance.resize();
  }
}

onMounted(async () => {
  await nextTick();
  initChart();
  window.addEventListener('resize', handleResize);
});

watch(() => props.scores, async () => {
  await nextTick();
  initChart();
}, { deep: true });
</script>

<style scoped>
.radar-chart {
  width: 100%;
  height: 350px;
}
</style>