<template>
  <view>
    <!-- 通告栏 -->
    <u-notice-bar :list="notice"></u-notice-bar>
    <!-- 基本信息 -->
    <u-card
      v-if="names.length"
      :title="names[current].name ? names[current].name : ' '"
      sub-title="查询战绩"
      title-color="#2c3e50"
      sub-title-color="#2ecc71"
      :show-foot="isCardFootShow"
      :head-style="{ background: '#f5f6fa' }"
      :body-style="{ background: '#f5f6fa' }"
      :foot-style="{ background: '#f5f6fa' }"
      @head-click="
        toPage('/pages/match/match', '?RoleName=' + names[current].name)
      "
      @foot-click="switchName"
    >
      <view slot="body" class="content">
        <u-grid
          :col="normal.Guid ? 3 : 4"
          :border="false"
          :hover-class="none"
          v-if="normal"
        >
          <u-grid-item bg-color="transparent" v-if="normal.Guid">
            <view>{{
              guid.data[normal.Guid].guidname
                ? guid.data[normal.Guid].guidname
                : "-"
            }}</view>
            <view class="info">区服</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent" v-if="normal.MasterLv">
            <view>{{ normal.MasterLv }}</view>
            <view class="info">账号等级</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent" v-if="normal.LvVIP != null">
            <view>{{ normal.LvVIP }}</view>
            <view class="info">VIP等级</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent" v-if="normal.TeamScore">
            <view>{{ normal.TeamScore }}</view>
            <view class="info">团分</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent" v-if="normal.HeroCount">
            <view>{{ normal.HeroCount ? normal.HeroCount : "-" }}</view>
            <view class="info">持有英雄</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent" v-if="normal.SkinCount">
            <view>{{ normal.SkinCount }}</view>
            <view class="info">持有皮肤</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent" v-if="normal.RoleLevel">
            <view>{{ normal.RoleLevel }}</view>
            <view class="info">等级</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent" v-if="normal.WinCount">
            <view>{{ normal.WinCount }}</view>
            <view class="info">胜场</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent" v-if="normal.MatchCount">
            <view>{{ normal.MatchCount }}</view>
            <view class="info">总场</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent" v-if="normal.MatchCount">
            <view>{{
              normal.MatchCount == 0
                ? 0
                : ((normal.WinCount / normal.MatchCount) * 100).toFixed(2) + "%"
            }}</view>
            <view class="info">胜率</view>
          </u-grid-item>
        </u-grid>
        <u-empty :show="!normal" mode="data"></u-empty>
      </view>
      <view slot="foot" style="color: #e67e22; font-size: 26rpx"
        >切换召唤师({{ current + 1 }}/{{ names.length }})</view
      >
    </u-card>
    <u-card
      v-if="normal.MatchSportsList"
      :title="
        matchType[normal.MatchSportsList[matchSportsListIndex].MID]
          ? matchType[normal.MatchSportsList[matchSportsListIndex].MID] +
            '(Max)'
          : ''
      "
      :sub-title="normal ? '切换类型' : ''"
      sub-title-color="#e67e22"
      border="false"
      :head-style="{ background: '#f5f6fa' }"
      :body-style="{ background: '#f5f6fa' }"
      @head-click="switchType"
    >
      <view slot="body" class="content">
        <u-grid :col="3" :border="false" :hover-class="none">
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports.BestKill
                ? normal.MatchSportsList[matchSportsListIndex].MatchSports
                    .BestKill
                : "-"
            }}</view>
            <view class="info">击杀</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports.BestHelp
                ? normal.MatchSportsList[matchSportsListIndex].MatchSports
                    .BestHelp
                : "-"
            }}</view>
            <view class="info">助攻</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports
                .BestKillMonster
                ? normal.MatchSportsList[matchSportsListIndex].MatchSports
                    .BestKillMonster
                : "-"
            }}</view>
            <view class="info">补兵</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports
                .BestKillTower
                ? normal.MatchSportsList[matchSportsListIndex].MatchSports
                    .BestKillTower
                : "-"
            }}</view>
            <view class="info">推塔</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports
                .BestContinueKill
                ? normal.MatchSportsList[matchSportsListIndex].MatchSports
                    .BestContinueKill
                : "-"
            }}</view>
            <view class="info">连杀</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports
                .BestContinueWin
                ? normal.MatchSportsList[matchSportsListIndex].MatchSports
                    .BestContinueWin
                : "-"
            }}</view>
            <view class="info">连胜</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports
                .BestDamage
                ? normal.MatchSportsList[matchSportsListIndex].MatchSports
                    .BestDamage
                : "-"
            }}</view>
            <view class="info">输出</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports
                .BestBeHurt
                ? normal.MatchSportsList[matchSportsListIndex].MatchSports
                    .BestBeHurt
                : "-"
            }}</view>
            <view class="info">承伤</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports
                .BestAthMoney
                ? normal.MatchSportsList[matchSportsListIndex].MatchSports
                    .BestAthMoney
                : "-"
            }}</view>
            <view class="info">经济</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports.Total
                ? normal.MatchSportsList[matchSportsListIndex].MatchSports.Total
                : "-"
            }}</view>
            <view class="info">总场</view>
          </u-grid-item>

          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports.Win
                ? normal.MatchSportsList[matchSportsListIndex].MatchSports.Win
                : "-"
            }}</view>
            <view class="info">胜场</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view
              >{{
                (normal.MatchSportsList[matchSportsListIndex].MatchSports
                  .Total == 0
                  ? 0
                  : (normal.MatchSportsList[matchSportsListIndex].MatchSports
                      .Win /
                      normal.MatchSportsList[matchSportsListIndex].MatchSports
                        .Total) *
                    100
                ).toFixed(2)
              }}%</view
            >
            <view class="info">胜率</view>
          </u-grid-item>
        </u-grid>
      </view>
    </u-card>
    <!-- 空内容 -->
    <u-empty margin-top="300" v-if="isEmpty"></u-empty>
    <!-- 无网络 -->
    <u-no-network @retry="reTry"></u-no-network>
    <!-- 提示框 -->
    <u-toast ref="toast" />
    <!-- 模态框 -->
    <u-modal
      v-model="model.show"
      :content="model.content"
      :show-cancel-button="true"
      @confirm="toPage('/pages/manager/manager')"
    ></u-modal>
  </view>
</template>

<script>
import api from "@/utils/api";

export default {
  data() {
    return {
      notice: [], //公告
      current: 0,
      guid: "", //区服列表
      names: [],
      normal: "",
      isCardFootShow: true,
      matchSportsListIndex: 0,
      imageUrl: api.ImageUrl,
      isEmpty: false,
      matchType: { 254: "竞技场", 252: "战场", 273: "排位赛", 356: "闪电战" },
      model: {
        show: false,
        content: "",
      },
    };
  },
  methods: {
    //获取服务器列表
    getGuid() {
      this.request({
        url: api.GuidUrl,
      })
        .then((res) => {
          this.guid = res.data;
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
    //获取英雄数据
    searchNormal(name) {
      this.request({
        url: api.NormalUrl,
        data: { RoleName: name },
        method: "POST",
      })
        .then((res) => {
          console.log(res.data.data);
          if (res.data.data) {
            this.normal = res.data.data;
            uni.setStorageSync("MYROLEID", res.data.data.RoleID);
          } else {
            this.normal = "";
            this.getRole(name);
          }
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
    getRole(name) {
      this.request({
        url: api.RoleUrl,
        data: { name },
        method: "POST",
      })
        .then((res) => {
          console.log("RoleUrl", res);
          if (res.data.Role) {
            this.normal = res.data.Role;
            uni.setStorageSync("MYROLEID", res.data.Role.RoleID);
          } else {
            this.normal = "";
            this.$refs.toast.show({
              title: "啊哦~查询不到数据",
              type: "error",
            });
          }
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
    // 获取公告类信息
    getJumpheroProfile() {
      this.request({
        url: api.JumpheroProfile,
      })
        .then((res) => {
          this.notice.push(res.data.notice);
          uni.setStorageSync("PROFILE", res.data);
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
    //跳转
    toPage(path, value) {
      if (value)
        uni.navigateTo({
          url: path + value,
        });
      else
        uni.navigateTo({
          url: path,
        });
    },
    //类型切换
    switchType() {
      if (this.normal) {
        if (this.matchSportsListIndex < this.normal.MatchSportsList.length - 1)
          this.matchSportsListIndex++;
        else this.matchSportsListIndex = 0;
      }
    },
    //用户切换
    switchName() {
      if (this.current < this.names.length - 1) this.current++;
      else this.current = 0;
      this.searchNormal(this.names[this.current].name);
    },
    //重新获取
    reTry() {
      this.getGuid();
      this.getJumpheroProfile();
      this.onShow();
    },
  },
  onLoad() {
    this.getGuid();
    this.getJumpheroProfile();
    // #ifdef MP-QQ
    qq.showShareMenu({
      showShareItems: ["qq", "qzone", "wechatFriends", "wechatMoment"],
    });
    // #endif
  },
  onShow() {
    let names = uni.getStorageSync("NAMES") || [];
    this.names = names;
    if (names.length) {
      this.searchNormal(names[this.current].name);
      if (names.length == 1) this.isCardFootShow = false;
      else this.isCardFootShow = true;
      // this.$forceUpdate();
    } else {
      this.model.content = "未检测到本地有数据，是否前往召唤师管理界面？";
      this.model.show = true;
      this.isEmpty = true;
      this.normal = "";
    }
  },
};
</script>

<style lang="scss" scoped>
.content {
  font-size: 30rpx;
  color: $u-type-primary;
  .info {
    font-size: 22rpx;
    color: $u-light-color;
  }
}
</style>
