<template>
  <div>
    <apexchart :options="options" :series="series" type="heatmap"></apexchart>
  </div>
</template>

<script>
import fetch from "@/mixins/fetch";
import { getNewsInsights } from "@/services/localNewsApi";
export default {
  name: "app-insights",
  mixins: [fetch],
  data() {
    return {
      series: [],
      options: {
        colors: ["#000000"],
        plotOptions: {
          heatmap: {
            enableShades: true,
            distributed: false,
            useFillColorAsStroke: false,
          },
        },
      },
    };
  },
  created() {
    this.getSeriesData();
  },
  methods: {
    getSeriesData() {
      const callback = (series) => {
        this.series = series;
        this.series.sort((a, b) => b.data.length - a.data.length);
      };

      this._fetch(getNewsInsights, [], callback);
    },
  },
};
</script>

<style scoped></style>
