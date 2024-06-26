<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :title="title" :header-style="{ paddingBottom: '12px' }">
      <div class="content">
        <a-statistic :value="count" :show-group-separator="true" :value-from="0" animation />
        <a-typography-text class="percent-text" :type="isUp ? 'danger' : 'success'">
          {{ growth }}%
          <icon-arrow-rise v-if="isUp" />
          <icon-arrow-fall v-else />
        </a-typography-text>
      </div>
      <div class="chart">
        <Chart :option="chartOption" />
      </div>
    </a-card>
  </a-spin>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import useLoading from '@/hooks/useLoading';
import { queryDataChainGrowth, DataChainGrowth } from '@/api/visualization';
import useChartOption from '@/hooks/chart-option';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    quota: {
      type: String,
      default: '',
    },
    chartType: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { loading, setLoading } = useLoading(true);
    const count = ref(0);
    const growth = ref(100);
    const isUp = computed(() => growth.value > 50);
    const chartDatas = ref<any>([]);
    const { chartOption } = useChartOption(() => {
      return {
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        xAxis: {
          type: 'category',
          show: false,
        },
        yAxis: {
          show: false,
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          formatter: '{c}',
        },
        series: [
          {
            data: chartDatas.value,
            ...(props.chartType === 'bar'
              ? {
                  type: 'bar',
                  barWidth: 7,
                  barGap: '0',
                }
              : {
                  type: 'line',
                  showSymbol: false,
                  smooth: true,
                  lineStyle: {
                    color: '#4080FF',
                  },
                }),
          },
        ],
      };
    });
    const fetchData = async (params: DataChainGrowth) => {
      try {
        const { data } = await queryDataChainGrowth(params);
        const { chartData } = data;
        count.value = data.count;
        growth.value = data.growth;
        chartData.data.value.forEach((el, idx) => {
          if (props.chartType === 'bar') {
            chartDatas.value.push({
              value: el,
              itemStyle: {
                color: idx % 2 ? '#468DFF' : '#86DF6C',
              },
            });
          } else {
            chartDatas.value.push(el);
          }
        });
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };
    fetchData({ quota: props.quota });
    return {
      loading,
      count,
      growth,
      chartOption,
      isUp,
    };
  },
});
</script>

<style scoped lang="less">
.general-card {
  min-height: 204px;
}

.content {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
}

.percent-text {
  margin-left: 16px;
}

.chart {
  width: 100%;
  height: 80px;
  vertical-align: bottom;
}

.unit {
  padding-left: 8px;
  font-size: 12px;
}

.label {
  padding-right: 8px;
  font-size: 12px;
}
</style>
