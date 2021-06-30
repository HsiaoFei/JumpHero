<template>
  <view>
    <!-- 默认 文字样式 -->
    <u-card
      v-if="match"
      :title="
        match.MatchType == 1
          ? '竞技场' + '(' + format(match.UsedTime) + ')'
          : match.MatchType == 15
          ? '闪电战' + '(' + (match.UsedTime / 60).toFixed(0) + 'min)'
          : match.MatchType == 2
          ? '战场' + '(' + (match.UsedTime / 60).toFixed(0) + 'min)'
          : '未知' + '(' + (match.UsedTime / 60).toFixed(0) + 'min)'
      "
      :sub-title="format(match.MatchDate)"
      title-color="#2c3e50"
      :head-style="{ background: '#f5f6fa' }"
      :body-style="{ background: '#f5f6fa' }"
    >
      <view slot="body">
        <view class="u-flex u-text-center">
          <u-count-to
            :duration="700"
            :start-val="0"
            :end-val="match.WinSideKill"
            color="#27ae60"
            class="u-flex-5"
          ></u-count-to>
          <view class="u-flex-2 u-font-50">VS</view>
          <u-count-to
            :duration="700"
            :start-val="0"
            :end-val="match.LoseSideKill"
            color="#c0392b"
            class="u-flex-5"
          ></u-count-to
        ></view>
      </view>
    </u-card>
    <view class="u-margin-32">
      <u-alert-tips
        v-if="isFindFriends"
        type="warning"
        :show="isShowFindFriendsTips"
        description="现在你可以在本界面点击召唤师昵称标记好友啦！此功能为测试功能，敬请谅解。"
        :show-icon="true"
        :close-able="true"
        @close="closeAlertTips"
      ></u-alert-tips>
    </view>
    <view>
      <info-list :match="match.WinSide" result="win" :myid="myid"></info-list>
      <info-list :match="match.LoseSide" result="lose" :myid="myid"></info-list>
    </view>
    <!-- 空内容 -->
    <u-empty margin-top="300" v-if="isEmpty"></u-empty>
    <!-- 返回顶部 -->
    <u-back-top :scroll-top="scrollTop"></u-back-top>
    <u-toast ref="toast" />
  </view>
</template>

<script>
import api from "@/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh";
import infoList from "@/components/infoList/infoList";

export default {
  components: {
    infoList,
  },
  data() {
    return {
      current: 0,
      scrollTop: 0,
      match: "",
      matchID: "",
      myid: "",
      isShowFindFriendsTips: false,
      isFindFriends: false,
      isEmpty: false,
    };
  },
  methods: {
    //格式化时间
    format(date) {
      if (typeof date == "string") {
        dayjs.extend(relativeTime);
        return dayjs(date).locale("zh").fromNow();
      } else {
        return dayjs(date * 1000).format("mm分ss秒");
      }
    },
    //获取数据
    getMatch(id) {
      this.request({
        url: api.MatchUrl,
        data: { id: id },
        method: "POST",
      })
        .then((res) => {
          let match = res.data.Match;
          this.match = match;
          // console.log(res.data.Match);
          if (!match.WinSide.length && !match.LoseSide.length)
            this.isEmpty = true;
        })
        .catch((err) => {
          console.log(err);
          if (err.errMsg == "request:fail timeout")
            this.$refs.toast.show({
              title: "请求超时",
              type: "warning",
            });
        });
    },
    //关闭提示
    closeAlertTips() {
      let settings = uni.getStorageSync("SETTINGS");
      this.isShowFindFriendsTips = false;
      settings.isShowFindFriendsTips = false;
      uni.setStorageSync("SETTINGS", settings);
      this.$refs.toast.show({
        title: "关闭成功！可在 设置 中再次开启",
        type: "success",
      });
    },
    reTry() {
      this.getMatch(this.matchID);
    },
  },

  onLoad(option) {
    this.myid = uni.getStorageSync("MYROLEID");
    let settings = uni.getStorageSync("SETTINGS");
    this.matchID = option.MatchID;
    this.isShowFindFriendsTips = settings.isShowFindFriendsTips;
    this.isFindFriends = settings.isFindFriends;
    this.getMatch(this.matchID);
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
