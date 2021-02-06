<template>
  <view>
    <u-sticky>
      <u-tabs
        v-if="names.length"
        name="name"
        :list="names"
        :current="current"
        @change="subsectionChange"
        active-color="#27ae60"
        bg-color="#ecf0f1"
        :bold="false"
        inactive-color="#34495e"
      ></u-tabs>
    </u-sticky>
    <!-- 通告栏 -->
    <u-notice-bar :list="notice"> </u-notice-bar>
    <!-- 无网络 -->
    <u-no-network @retry="retry"></u-no-network>
    <!-- 下拉框 -->
    <u-popup v-model="showPopup" mode="top" :z-index="100">
      <u-gap bg-color="transparent"></u-gap>
      <u-search
        class="search"
        v-model="inputValue"
        shape="round"
        bg-color="#f5f6fa"
        :show-action="false"
        placeholder="请输入召唤师昵称"
        @search="addName"
        @clear="clearInputValue"
      ></u-search>
      <u-gap bg-color="transparent"></u-gap>
      <u-tag
        class="u-margin-10"
        v-for="(itemNames, indexNames) in names"
        :key="indexNames"
        :text="itemNames.name"
        closeable
        shape="circle"
        @close="deleteName(indexNames)"
        type="success"
      />
      <u-gap bg-color="transparent"></u-gap>
    </u-popup>

    <u-card
      v-if="normal"
      title="基本信息"
      sub-title="查询战绩"
      title-color="#2c3e50"
      sub-title-color="#2ecc71"
      :head-style="bgStyle"
      :body-style="bgStyle"
      @head-click="toMatch"
    >
      <view slot="body" class="content">
        <u-grid :col="3" :border="false" :hover-class="none">
          <u-grid-item bg-color="transparent">
            <view>{{ guid.data[normal.Guid].guidname }}</view>
            <view class="info">区服</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{ normal.MasterLv }}</view>
            <view class="info">账号等级</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>VIP{{ normal.LvVIP }}</view>
            <view class="info">VIP等级</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{ normal.TeamScore }}</view>
            <view class="info">团分</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{ normal.HeroCount }}</view>
            <view class="info">持有英雄</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{ normal.SkinCount }}</view>
            <view class="info">持有皮肤</view>
          </u-grid-item>
        </u-grid>
      </view>
    </u-card>
    <u-card
      v-if="normal"
      :title="
        matchType[normal.MatchSportsList[matchSportsListIndex].MID] + '(Max)'
      "
      sub-title="切换类型"
      sub-title-color="#e67e22"
      border="false"
      :head-style="bgStyle"
      :body-style="bgStyle"
      @head-click="switchType"
    >
      <view slot="body" class="content">
        <u-grid :col="3" :border="false">
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports.BestKill
            }}</view>
            <view class="info">击杀</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports.BestHelp
            }}</view>
            <view class="info">助攻</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports
                .BestKillMonster
            }}</view>
            <view class="info">补兵</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports
                .BestKillTower
            }}</view>
            <view class="info">推塔</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports
                .BestContinueKill
            }}</view>
            <view class="info">连杀</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports
                .BestContinueWin
            }}</view>
            <view class="info">连胜</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports
                .BestDamage
            }}</view>
            <view class="info">输出</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports
                .BestBeHurt
            }}</view>
            <view class="info">承伤</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports
                .BestAthMoney
            }}</view>
            <view class="info">经济</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports.Total
            }}</view>
            <view class="info">总场</view>
          </u-grid-item>

          <u-grid-item bg-color="transparent">
            <view>{{
              normal.MatchSportsList[matchSportsListIndex].MatchSports.Win
            }}</view>
            <view class="info">胜场</view>
          </u-grid-item>
          <u-grid-item bg-color="transparent">
            <view v-if="normal"
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
    <u-empty
      margin-top="300"
      v-if="!names.length"
      text="没有发现数据，可下拉添加哦~"
    ></u-empty>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
import api from "../../utils/api";

export default {
  data() {
    return {
      notice: [],
      current: 0,
      showPopup: false,
      showModal: false,
      contentModal: "",
      guid: "",
      names: [],
      normal: "",
      inputValue: "",
      matchSportsListIndex: 0,
      imageUrl: api.ImageUrl,
      bgStyle: {
        background: "#f5f6fa",
      },
    };
  },
  computed: {
    matchType() {
      return { 254: "竞技场", 252: "战场", 273: "排位赛", 356: "闪电战" };
    },
  },
  methods: {
    //获取服务器列表
    getGuid() {
      this.request({
        url: api.GuidUrl,
      }).then((res) => {
        this.guid = res.data;
      });
    },
    //获取英雄数据
    searchNormal(name) {
      this.request({
        url: api.NormalUrl,
        data: { RoleName: name },
        method: "POST",
      }).then((res) => {
        this.normal = res.data.data;
      });
    },
    // 获取公告
    getNotice() {
      this.request({
        url: api.NoticeUrl,
      }).then((res) => {
        this.notice.push(res.data);
      });
    },
    //添加名字
    addName(value) {
      if (uni.getStorageSync("NAMES")) {
        for (var i in uni.getStorageSync("NAMES")) {
          if (value == uni.getStorageSync("NAMES")[i].name) {
            this.showToast(value + "已存在", "warning");
            this.inputValue = "";
            return;
          }
        }
      }
      this.request({
        url: api.NormalUrl,
        data: { RoleName: value },
        method: "POST",
      }).then((res) => {
        if (res.data.success == true) {
          var list = uni.getStorageSync("NAMES") || [];
          list.push({ name: value });
          uni.setStorageSync("NAMES", list);
          this.showToast(value + "添加成功", "success");
          this.names = uni.getStorageSync("NAMES");
          this.searchNormal(this.names[this.current].name);
        } else {
          this.showToast(value + "不存在", "error");
        }
      });
      this.inputValue = "";
    },

    //显示Toast
    showToast(title, type, url) {
      this.$refs.uToast.show({
        title: title,
        type: type,
        url: url,
      });
    },

    //跳转 战绩列表
    toMatch() {
      uni.navigateTo({
        url: "/pages/match/match?RoleName=" + this.names[this.current].name,
      });
    },
    //类型切换
    switchType() {
      if (this.matchSportsListIndex < this.normal.MatchSportsList.length - 1) {
        this.matchSportsListIndex++;
      } else {
        this.matchSportsListIndex = 0;
      }
    },
    //Tabs 触发事件
    subsectionChange(index) {
      this.current = index;
      this.matchSportsListIndex = 0;
      this.searchNormal(this.names[this.current].name);
    },
    //删除名字
    deleteName(index) {
      var _self = this;
      uni.showModal({
        title: "提示",
        content: "确定要删除'" + this.names[index].name + "'吗",
        success(res) {
          if (res.confirm) {
            var arr = uni.getStorageSync("NAMES");
            arr.splice(index, 1);
            uni.setStorageSync("NAMES", arr);
            _self.names = arr;
            if (arr.length) {
              _self.searchNormal(arr[0].name);
            } else {
              _self.normal = "";
            }
          }
        },
      });
    },
    //清除输入框内容
    clearInputValue() {
      this.inputValue = "";
    },
    //重新获取
    retry() {
      this.getGuid();
      this.getNotice();
      this.onShow();
    },
  },
  onLoad() {
    this.getGuid();
    this.getNotice();
    //获取新版本
    const updateManager = uni.getUpdateManager();
    updateManager.onUpdateReady(function (res) {
      uni.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        },
      });
    });
    // #ifdef MP-QQ
    qq.showShareMenu({
      showShareItems: ["qq", "qzone", "wechatFriends", "wechatMoment"],
    });
    // #endif
  },
  onShow() {
    this.names = uni.getStorageSync("NAMES");
    if (uni.getStorageSync("NAMES").length) {
      this.searchNormal(this.names[this.current].name);
    } else {
      this.normal = "";
    }
  },
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
    this.showPopup = true;
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
