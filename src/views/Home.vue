<template>
  <div class="home">
    <v-container>
      <v-dialog v-model="modal">
        <v-card class="pa-10">
          <v-form>
            Title:
            <v-text-field v-model="newChart.title" required placeholder="Title" />Content:
            <v-select :items="contentTypes" v-model="newChart.content" placeholder="Content" />Color:
            <v-color-picker class="my-4" v-model="newChart.color"></v-color-picker>
            <v-btn @click="addChart()" class="white--text" color="#2B78F7">Add</v-btn>
          </v-form>
        </v-card>
      </v-dialog>
      <div class="title mb-5">
        Analytics Dashboard
        <v-btn @click="modal = !modal" class="white--text" x-small color="#2B78F7">Add</v-btn>
      </div>
      <ChartCard content="playedCount" title="Daily Active Users (DAU)" />
      <v-layout wrap>
        <v-flex v-for="(chart, index) in charts" :key="index" s12 md12 lg6>
          <ChartCard
            :content="chart.content"
            :title="chart.title"
            :color="chart.color"
            :removeChart="removeChart"
            :id="chart.id"
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
        "playedCountry",
        "playedDailyCheck",
        "playedCashShop",
        "playedKrombieIsland"
      ],
      newChart: {
        id: Date.now(),
        title: "",
        content: "",
        color: ""
      }
    };
  },
  created() {
    const storedCharts = localStorage.getItem("charts");
    storedCharts ? (this.charts = JSON.parse(storedCharts)) : "";
  },
  mounted() {},
  methods: {
    addChart() {
      localStorage.setItem(
        "charts",
        JSON.stringify([...this.charts, this.newChart])
      );
      this.charts = [...this.charts, this.newChart];
      this.modal = false;
    },
    removeChart(id) {
      const filtered = this.charts.filter(chart => chart.id !== id);
      localStorage.setItem('charts', JSON.stringify(filtered))
      this.charts = filtered
      console.log(filtered);
    }
  }
};
</script>

<style lang="less">
.home {
  margin-top: 100px;
  background: #f6f7fb;
}
</style>
          