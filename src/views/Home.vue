<template>
  <div class="home">
    <v-container>
      
      <div class="title mb-5">
        Analytics Dashboard
        <!-- <v-btn @click="modal = !modal" class="white--text" x-small color="#2B78F7">Add</v-btn> -->
      </div>
      <ChartCard content="playedCount" title="Daily Active Users (DAU)" />
      <v-layout wrap>
        <v-flex v-for="(chart, index) in contentTypes" :key="index" s12 md12 lg6>
          <ChartCard
            :content="chart"
            :title="chart"
            :removeChart="removeChart"
            :id="index"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ChartCard from "@/components/home/ChartCard";
export default {
  name: "home",
  components: {
    ChartCard
  },
  data() {
    return {
      charts: [],
      modal: false,
      contentTypes: [
        "playedTime",
        "playedExperience",
        "playedDojo",
        "playedQuests",
        "playedCount",
        "playedDig",
        "playedFestival",
        "playedKills",
        "playedRegister",
        "playedEsia",
        "playedDailyCheck",
        "playedCashShop",
        "playedKrombieIsland"
      ],
      newChart: {
        id: Date.now(),
        title: "",
        content: "",
        color: ""
      },
      feedback: ""
    };
  },
  created() {
    const storedCharts = localStorage.getItem("charts");
    storedCharts ? (this.charts = JSON.parse(storedCharts)) : "";
  },
  mounted() {},
  methods: {
    addChart() {
      if (this.newChart.title && this.newChart.content && this.newChart.color) {
        this.feedback = ''
        localStorage.setItem(
          "charts",
          JSON.stringify([...this.charts, this.newChart])
        );
        this.charts = [...this.charts, this.newChart];
        this.modal = false;
        this.newChart = {
          id: Date.now(),
          title: "",
          content: "",
          color: ""
        }; 
      } else {
        this.feedback = "All fields must be filled"
      }
    },
    removeChart(id) {
      const filtered = this.charts.filter(chart => chart.id !== id);
      localStorage.setItem("charts", JSON.stringify(filtered));
      this.charts = filtered;
      console.log(filtered);
    }
  }
};
</script>

<style lang="less">
.home {
  // margin-top: 70px;
  background: #f6f7fb;
  height: 100%;
}
</style>
          