<template>
  <view v-if="match.length">
    <u-cell-item
      :title="result == 'win' ? '胜利方' : result == 'lose' ? '失败方' : ''"
      hover-class="none"
      :arrow="false"
      :title-style="
        result == 'win' ? winStyle : result == 'lose' ? loseStyle : ''
      "
    ></u-cell-item>
    <canvas
      :canvas-id="result"
      :id="result"
      disable-scroll="true"
      @touchstart="touchStart"
      @touchmove="moveChart"
      @touchend="touchEnd"
      class="charts"
    ></canvas>
  </view>
</template>

<script>
import uCharts from "../../utils/u-charts";
var _self;
var chart = {};
export default {
  props: ["match", "result"],
  data() {
    return {
      HeroName: [],
      KillCount: [],
      DeathCount: [],
      AssistCount: [],
      KillUnitCount: [],
      TowerDestroy: [], //建筑
      TotalMoney: [], //金钱
      ELO: [],
      KDA: [],
      type: "column",
      cWidth: "",
      cHeight: "",
      pixelRatio: 1,
      winStyle: { color: "#27ae60" },
      loseStyle: { color: "#c0392b" },
    };
  },
  computed: {
    info() {
      switch (this.type) {
        case "column":
          return [
            { name: "击杀", data: this.KillCount },
            { name: "死亡", data: this.DeathCount },
            { name: "助攻", data: this.AssistCount },
            // { name: "补兵", data: this.KillUnitCount },
            // { name: "经济", data: this.TotalMoney },
          ];
      }
    },
  },
  methods: {
    copeData(data) {
      for (var i in data) {
        this.HeroName.push(data[i].Hero.Name); //姓名
        this.KillCount.push(data[i].KillCount); //K
        this.DeathCount.push(data[i].DeathCount); //D
        this.AssistCount.push(data[i].AssistCount); //A
        this.KillUnitCount.push(data[i].KillUnitCount); //兵
        this.TowerDestroy.push(data[i].TowerDestroy); //建筑
        this.TotalMoney.push(data[i].TotalMoney); //钱
        this.ELO.push(data[i].ELO); //团分
        this.KDA.push(data[i].KDA); //
      }
    },

    chartsShow(canvasId, categories, data) {
      chart[canvasId] = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: "column",
        legend: { show: true },
        fontSize: 11,
        background: "#FFFFFF",
        pixelRatio: _self.pixelRatio,
        animation: true,
        categories: categories,
        series: data,
        enableScroll: true,
        colors: ["#27ae60", "#c0392b", "#f39c12"],
        xAxis: {
          type: "grid",
          gridType: "dash",
          itemCount: 5, //x轴单屏显示数据的数量，默认为5个
          scrollShow: true, //新增是否显示滚动条，默认false
          scrollAlign: "left", //滚动条初始位置
          scrollBackgroundColor: "#F7F7FF", //默认为 #EFEBEF
          scrollColor: "#DEE7F7", //默认为 #A6A6A6
        },
        yAxis: {
          disabled:true
        },
        dataLabel: true,
        width: _self.cWidth * _self.pixelRatio,
        height: _self.cHeight * _self.pixelRatio,
        extra: {
          column: {
            type: "group",
            width: (_self.cWidth * _self.pixelRatio * 0.45) / categories.length,
          },
        },
      });
    },
    touchStart(e) {
      chart[e.mp.target.id].scrollStart(e);
    },
    moveChart(e) {
      chart[e.mp.target.id].scroll(e);
    },
    touchEnd(e) {
      chart[e.mp.target.id].scrollEnd(e);
      chart[e.mp.target.id].showToolTip(e, {
        format: function (item, category) {
          if (typeof item.data === "object") {
            return category + " " + item.name + ":" + item.data.value;
          } else {
            return category + " " + item.name + ":" + item.data;
          }
        },
      });
    },
  },

  created() {
    this.copeData(this.$props.match);
  },
  mounted() {
    _self = this;
    this.cWidth = uni.upx2px(750);
    this.cHeight = uni.upx2px(500);
    this.chartsShow(this.$props.result, this.HeroName, this.info);
  },
};
</script>
<style>
.charts {
  width: 100%;
  height: 500upx;
  background-color: #ffffff;
}
</style>