<template>
  <view>
    <!-- 提示框 -->
    <view class="u-margin-32">
      <u-alert-tips
        type="warning"
        :show="isShowMatchListTips"
        description="默认开启装备显示，可在 设置 关闭选项；开启可快速查看对局出装，但也会增加网络请求，流畅度可能会有所下降。"
        :show-icon="true"
        :close-able="true"
        @close="closeAlertTips"
      ></u-alert-tips>
    </view>
    <u-card
      :show-head="false"
      :show-foot="false"
      :body-style="{ background: '#f5f6fa' }"
      v-for="listsItem in lists"
      :key="listsItem.MatchID"
      @body-click="
        toPage('/pages/details/details', '?MatchID=' + listsItem.MatchID)
      "
    >
      <!-- :src="getImage(item.Hero.IconFile, 'image' + item.Hero.ID)" -->
      <view class="u-flex" slot="body">
        <view class="u-flex-3 u-relative">
          <u-image
            width="96"
            height="96"
            :src="imageUrl + listsItem.Hero.IconFile"
            shape="circle"
            :lazy-load="true"
          ></u-image>
          <view class="level u-absolute">{{ listsItem.HeroLevel }}</view>
        </view>
        <view class="u-flex-9">
          <view class="u-padding-bottom-10">
            <u-tag
              v-if="listsItem.haveFriends"
              size="mini"
              type="success"
              text="友"
              class="u-padding-right-5"
            ></u-tag>
            <u-tag
              size="mini"
              type="primary"
              mode="dark"
              class="u-padding-right-5"
              :text="
                listsItem.MatchType == 1
                  ? '竞技场'
                  : listsItem.MatchType == 15
                  ? '闪电战'
                  : listsItem.MatchType == 2
                  ? '战场'
                  : '未定义'
              "
            ></u-tag>
            <u-tag
              :type="
                listsItem.Result == 1
                  ? 'success'
                  : listsItem.Result == 2
                  ? 'error'
                  : listsItem.Result == 3
                  ? 'warning'
                  : 'default'
              "
              :text="
                listsItem.Result == 1
                  ? '胜'
                  : listsItem.Result == 2
                  ? '败'
                  : listsItem.Result == 3
                  ? '跑'
                  : '未定义'
              "
              size="mini"
              mode="dark"
              class="u-padding-right-5"
            >
            </u-tag>
            <u-tag
              size="mini"
              type="info"
              mode="dark"
              class="u-padding-right-5"
              :text="format(listsItem.MatchDate)"
            ></u-tag
          ></view>
          <view v-if="listsItem.Match">
            <view class="u-padding-bottom-10">
              <u-tag
                size="mini"
                mode="dark"
                class="u-padding-right-5"
                :text="listsItem.Match.KillCount"
              ></u-tag>
              <u-tag
                size="mini"
                mode="dark"
                class="u-padding-right-5"
                :text="listsItem.Match.DeathCount"
              ></u-tag>
              <u-tag
                size="mini"
                mode="dark"
                class="u-padding-right-5"
                :text="listsItem.Match.AssistCount"
              ></u-tag>
            </view>
            <view class="u-flex">
              <view class="u-flex u-padding-right-10">
                <u-image
                  class="u-padding-right-5"
                  width="48"
                  height="48"
                  border-radius="10"
                  :lazy-load="true"
                  v-for="(skillItem, skillIndex) in listsItem.Match.Skill"
                  :key="skillIndex"
                  :src="imageUrl + skillItem.IconFile"
                ></u-image>
              </view>
              <view class="u-flex">
                <u-image
                  class="u-padding-right-5"
                  width="48"
                  height="48"
                  border-radius="10"
                  :lazy-load="true"
                  v-for="(equipItem, euqipIndex) in listsItem.Match.Equip"
                  :key="euqipIndex"
                  :src="imageUrl + equipItem.IconFile"
                ></u-image>
              </view>
            </view>
          </view>
        </view>
      </view>
    </u-card>
    <u-loadmore v-if="!isEmpty" :status="status" @loadmore="reTry" />
    <!-- 空内容 -->
    <u-empty margin-top="300" v-if="isEmpty"></u-empty>
    <u-back-top :scroll-top="scrollTop"></u-back-top>
    <u-no-network @retry="reTry"></u-no-network>
    <u-toast ref="toast" />
  </view>
</template>

<script>
import api from "@/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh";
export default {
  data() {
    return {
      scrollTop: 0,
      lists: [], //战绩列表
      index: 0, //分页
      name: "", //召唤师昵称
      myid: "", //个人roleid
      isShowEquip: true, //显示装备
      isShowMatchListTips: true,
      status: "loading", //在家状态
      imageUrl: api.ImageUrl,
      friends: {}, //好友集合
      isEmpty: false,
    };
  },
  methods: {
    //格式化时间
    format(date) {
      dayjs.extend(relativeTime);
      return dayjs(date).locale("zh").fromNow();
    },
    //获取比赛列表
    getList(name, index) {
      // if (index) index = 0;
      this.request({
        url: api.ListUrl,
        data: { name, index },
        method: "POST",
      })
        .then((res) => {
          console.log("ListUrl", res);
          let list = res.data.List;
          if (list.length != 10) this.status = "nomore";
          else {
            this.index += 10;
            if (this.isShowEquip) {
              this.getMatch(list);
            } else {
              this.lists = this.lists.concat(list);
            }
          }
          if (!this.lists.length) this.isEmpty = true;
          // console.log(!this.lists.);
        })
        .catch((err) => {
          console.log(err);
          if (err.errMsg == "request:fail timeout") this.status = "loadmore";
          this.$refs.toast.show({
            title: "请求超时",
            type: "warning",
          });
        });
    },
    //获取比赛数据
    getMatch(list) {
      for (let i in list) {
        this.request({
          url: api.MatchUrl,
          data: { id: list[i].MatchID },
          method: "POST",
        })
          .then((res) => {
            let matchs = res.data.Match.WinSide.concat(res.data.Match.LoseSide);
            for (let j in matchs) {
              if (matchs[j].RoleID == this.myid) list[i].Match = matchs[j];
              if (this.friends[matchs[j].RoleID]) list[i].haveFriends = true;
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
      }
      console.log(list);
      this.lists = this.lists.concat(list);
      setTimeout(() => {
        this.$forceUpdate(); //更新视图 装备/技能/KDA等信息无法显示
      }, 800);
    },
    //页面跳转
    toPage(path, value) {
      uni.navigateTo({
        url: path + value,
      });
    },
    //关闭提示
    closeAlertTips() {
      let settings = uni.getStorageSync("SETTINGS");
      this.isShowMatchListTips = false;
      settings.isShowMatchListTips = false;
      uni.setStorageSync("SETTINGS", settings);
      this.$refs.toast.show({
        title: "关闭成功！可在 设置 中再次开启",
        type: "success",
      });
    },
    reTry() {
      if (this.status != "nomore") this.getList(this.name, this.index);
    },
  },
  onLoad(option) {
    let myid = uni.getStorageSync("MYROLEID");
    let settings = uni.getStorageSync("SETTINGS");
    let friends = uni.getStorageSync("FRIENDS" + myid);
    this.friends = friends;
    this.myid = myid;
    this.name = option.RoleName;
    this.isShowEquip = settings.isShowEquip;
    this.isShowMatchListTips = settings.isShowMatchListTips;
    this.getList(option.RoleName);
    uni.setNavigationBarTitle({
      title: option.RoleName,
    });
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  onReachBottom() {
    if (this.status != "nomore") this.getList(this.name, this.index);
  },
  onShareAppMessage() {
    let title = `300英雄战绩 ${this.name} 比赛列表`;
    let path = `/pages/match/match?RoleName=${this.name}`;
    return {
      title,
      path,
    };
  },
  onShareTimeline() {},
};
</script>

<style lang="scss" scoped>
.level {
  height: 36rpx;
  width: 36rpx;
  top: 68rpx;
  left: 68rpx;
  font-size: 22rpx;
  line-height: 22rpx;
  text-align: center;
  color: $u-type-primary-light;
  background-color: $u-main-color;
  padding: 7rpx;
  border-radius: 50%;
}
.result {
  font-size: 36rpx;
}
.win {
  color: $u-type-success;
}
.lose {
  color: $u-type-error;
}
.run {
  color: $u-type-warning;
}
.type {
  color: $u-main-color;
}
.info {
  font-size: 22rpx;
  color: $u-light-color;
}
</style>
