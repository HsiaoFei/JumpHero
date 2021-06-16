<template>
  <view>
    <!-- 菜单 分段器 -->
    <u-sticky>
      <u-subsection
        :list="menu"
        :current="current"
        :animation="true"
        active-color="#27ae60"
        inactive-color="#2c3e50"
        bg-color="#ecf0f1"
        button-color="#ffffff"
        @change="sectionChange"
      ></u-subsection>
    </u-sticky>

    <!-- 默认 文字样式 -->
    <view v-if="current === 0">
      <u-card
        v-if="match"
        :title="
          match.MatchType == 1
            ? '竞技场'
            : match.MatchType == 15
            ? '闪电战'
            : match.MatchType == 2
            ? '战场'
            : '未知' + '(' + (match.UsedTime / 60).toFixed(0) + 'min)'
        "
        :sub-title="match.MatchDate.substring(5, 16)"
        title-color="#2c3e50"
        :head-style="bgStyle"
        :body-style="bgStyle"
      >
        <view slot="body">
          <view class="u-flex u-text-center">
            <u-count-to
              :duration="700"
              :start-val="0"
              :end-val="match.WinSideKill"
              color="#27ae60"
              bold="true"
              class="u-flex-5"
            ></u-count-to>
            <view class="u-flex-2">:</view>
            <u-count-to
              :duration="700"
              :start-val="0"
              :end-val="match.LoseSideKill"
              color="#c0392b"
              bold="true"
              class="u-flex-5"
            ></u-count-to
          ></view>
        </view>
      </u-card>
      <info-list :match="match.WinSide" :result="'win'"></info-list>
      <info-list :match="match.LoseSide" :result="'lose'"></info-list>
      <!-- 比赛信息 -->
    </view>
    <!-- 图表样式 -->
    <view v-if="current === 1">
      <info-charts :match="match.WinSide" :result="'win'"></info-charts>
      <info-charts :match="match.LoseSide" :result="'lose'"></info-charts>
      <!-- <info-charts :match="match.LoseSide"></info-charts> -->
    </view>
    <!-- 返回顶部 -->
    <u-back-top :scroll-top="scrollTop"></u-back-top>
  </view>
</template>

<script>
import api from "../../utils/api";
import infoCharts from "../../components/infoCharts/infoCharts";
import infoList from "../../components/infoList/infoList";

export default {
  components: {
    infoCharts,
    infoList,
  },
  data() {
    return {
      menu: [{ name: "默认" }, { name: "图表" }],
      current: 0,
      scrollTop: 0,
      match: "",
      bgStyle: {
        background: "#f5f6fa",
      },
    };
  },
  computed: {},
  methods: {
    sectionChange(index) {
      this.current = index;
    },

    //获取数据
    getMatch(id) {
      this.request({
        url: api.MatchUrl,
        data: { id: id },
      }).then((res) => {
        this.match = res.data.Match;
      });
    },
  },
  onLoad(option) {
    this.getMatch(option.id);
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
};
</script>

<style lang="scss" scoped>
.win {
  color: $u-type-success;
}
.lose {
  color: $u-type-error;
}
</style>
