<template>
  <div class="chart-card">
    <v-card class="card pa-5 ma-5">
      <div class="title">
        {{this.title}}
        <v-btn @click="removeChart(id)" v-if="color" x-small class="red white--text">delete</v-btn>
      </div>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        max-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Picker in menu"
            prepend-icon="mdi-event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker @change="getData()" v-model="date" type="month" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
      <Chart :height="150"  v-if="data" :chartData="data" :options="chartOptions" />
    </v-card>
  </div>
</template>

<script>
import Chart from "@/components/analytics/Chart";
import axios from "axios";
export default {
  name: "chart-card",
  components: {
    Chart
  },
  props: ["content", "title", "color", "id", 'removeChart'],
  data() {
    return {
      data: null,
      date: new Date().toISOString().substr(0, 7),
      menu: false,
      modal: false,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true
      }
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      const month = parseInt(this.date.split("-")[1], 10);
      axios.get("https://darkstory2d.com/assets/2020.json").then(res => {
        const data = res.data[month - 1];
        this.data = {
          labels: data.Month.Day.map(el => el.dateName),
          datasets: [
            {
              label: this.title,
              backgroundColor: this.color || "rgba(43,120,247, 0.4)",
              data: data.Month.Day.map(el => el[this.content])
            }
          ]
        };
      });
    }
  }
};
</script>

<style lang="less">
</style>
