<template>
  <view>
    <u-card
      :show-head="false"
      :show-foot="false"
      :body-style="bgStyle"
      v-for="(item, index) in lists"
      :key="index"
      @body-click="toPage('/pages/details/details', item.MatchID)"
    >
      <view class="u-flex" slot="body">
        <!-- 头像、等级 -->
        <view class="u-relative">
          <u-image
            width="96rpx"
            height="96rpx"
            :src="imageUrl + item.Hero.IconFile"
            shape="circle"
          ></u-image>
          <view class="level u-absolute">{{ item.HeroLevel }}</view>
        </view>

        <view class="u-flex-1" style="padding-left: 20rpx">
          <view
            ><text
              class="result"
              :class="[
                item.Result == 1
                  ? 'win'
                  : item.Result == 2
                  ? 'lose'
                  : item.Result == 3
                  ? 'run'
                  : '',
              ]"
              >{{
                item.Result == 1
                  ? "胜利"
                  : item.Result == 2
                  ? "失败"
                  : item.Result == 3
                  ? "逃跑"
                  : "未定义"
              }}</text
            >
            <text class="type">{{
              item.MatchType == 1
                ? "竞技场"
                : item.MatchType == 15
                ? "闪电战"
                : item.MatchType == 2
                ? "战场"
                : "未定义"
            }}</text></view
          >
          <view class="info" v-if="item.Match"
            >{{ item.Match.KillCount }} / {{ item.Match.DeathCount }} /
            {{ item.Match.AssistCount }}</view
          >
          <view class="u-flex" v-if="item.Match">
            <!-- 技能 -->
            <view class="skill u-flex">
              <u-image
                v-for="(itemSkill, indexSkill) in item.Match.Skill"
                :key="indexSkill"
                width="40rpx"
                height="48rpx"
                :src="imageUrl + itemSkill.IconFile"
                :lazy-load="true"
              ></u-image>
            </view>
            <!-- 装备 -->
            <view class="equip u-flex">
              <u-image
                v-for="(itemEquip, indexEquip) in item.Match.Equip"
                :key="indexEquip"
                width="48rpx"
                height="48rpx"
                :src="imageUrl + itemEquip.IconFile"
                :lazy-load="true"
              ></u-image>
            </view>
          </view>
        </view>
        <view>
          <view class="info">{{ item.MatchDate.substring(5, 16) }}</view>
        </view>
      </view>
    </u-card>
    <u-loadmore :status="status" />
    <u-back-top :scroll-top="scrollTop"></u-back-top>
  </view>
</template>

<script>
import api from "../../utils/api";
export default {
  data() {
    return {
      scrollTop: 0,
      lists: [], //比赛列表
      // alists: [], //每次请求得到的比赛列表
      matchs: [], //比赛信息
      // amatchs: [], //每次请求得到的比赛信息
      index: 0,
      name: "",
      id: "",
      status: "loading",
      imageUrl: api.ImageUrl,
      bgStyle: {
        background: "#f5f6fa",
      },
    };
  },
  methods: {
    getList(name, index) {
      this.request({
        url: api.ListUrl,
        data: { name: name, index: index },
      }).then((res) => {
        this.getMatch(res.data.List);
        if (res.data.List.length < 10) {
          this.status = "nomore";
        }
      });
    },
    getMatch(alists) {
      for (let i in alists) {
        setTimeout(() => {
          this.request({
            url: api.MatchUrl,
            data: { id: alists[i].MatchID },
          }).then((res) => {
            let matchs = res.data.Match.WinSide.concat(res.data.Match.LoseSide);
            let id = this.id;
            let func = function (matchs) {
              for (let j in matchs) {
                if (matchs[j].RoleID == id) {
                  return matchs[j];
                }
              }
            };
            alists[i].Match = func(matchs);
          });
        }, 200);
      }
      console.log(alists);
      this.lists = this.lists.concat(alists);
    },
    toPage(path, id) {
      uni.navigateTo({
        url: path + "?id=" + id,
      });
    },
  },
  onLoad(option) {
    this.getList(option.name);
    this.name = option.name;
    this.id = option.id;
    uni.setNavigationBarTitle({
      title: option.name,
    });
  },
  onShow() {
    clearTimeout();
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  onReachBottom() {
    this.index += 10;
    this.getList(this.name, this.index);
  },
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
  display: inline-block;
  padding: 0 10rpx;
  color: $u-main-color;
}
.info {
  font-size: 22rpx;
  color: $u-light-color;
}
.skill {
  padding: 10rpx 0;
}
.equip {
  padding: 10rpx;
}
</style>
