<!--
 * @Date: 2024-06-13 15:33:14
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-14 09:40:16
-->
<template>
  <VCharts
    v-if="renderChart"
    :option="options"
    :autoresize="autoresize"
    :style="{ width, height }"
  />
</template>

<script setup lang="ts">
import VCharts from 'vue-echarts';
import { useAppStore } from '@/store';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
} from 'echarts/components';
import { EChartsOption } from 'echarts';

interface ChartsProps {
  options: EChartsOption;
  autoresize?: boolean;
  width?: string;
  height?: string;
}
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
]);

withDefaults(defineProps<ChartsProps>(), {
  autoresize: true,
  width: '100%',
  height: '100%',
});

const appStore = useAppStore();
const theme = computed(() => {
  if (appStore.theme === 'dark') return 'dark';
  return '';
});
const renderChart = ref(false);
// wait container expand
nextTick(() => {
  renderChart.value = true;
});
</script>
