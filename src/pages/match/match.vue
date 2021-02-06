<template>
  <view>
    <u-card
      :show-head="false"
      :show-foot="false"
      :body-style="bgStyle"
      v-for="(itemList, indexList) in lists"
      :key="indexList"
      @body-click="toDetails(indexList)"
    >
      <view class="u-flex" slot="body">
        <view class="u-flex-3 u-relative">
          <u-image
            width="96rpx"
            height="96rpx"
            :src="imageUrl + itemList.Hero.IconFile"
            shape="circle"
            :lazy-load="true"
          ></u-image>
          <view class="level u-absolute">{{ itemList.HeroLevel }}</view>
        </view>
        <view class="u-flex-6">
          <view
            class="result"
            :class="[
              itemList.Result == 1
                ? 'win'
                : itemList.Result == 2
                ? 'lose'
                : itemList.Result == 3
                ? 'run'
                : '',
            ]"
            >{{
              itemList.Result == 1
                ? "胜利"
                : itemList.Result == 2
                ? "失败"
                : itemList.Result == 3
                ? "逃跑"
                : "未定义"
            }}</view
          >
          <view class="type">{{
            itemList.MatchType == 1
              ? "竞技场"
              : itemList.MatchType == 15
              ? "闪电战"
              : itemList.MatchType == 2
              ? "战场"
              : "未定义"
          }}</view>
        </view>
        <view class="u-flex-3">
          <view class="info">{{ itemList.MatchDate.substring(5, 16) }}</view>
        </view>
      </view>
    </u-card>
    <u-loadmore :status="status" />
    <u-back-top :scroll-top="scrollTop"></u-back-top>
  </view>
</template>

<script>
import api from "../../utils/api";
var _self;
export default {
  data() {
    return {
      scrollTop: 0,
      lists: [],
      matchs: [],
      index: 0,
      name: "",
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
        var listsBefore = this.lists;
        this.lists = listsBefore.concat(res.data.List);
        if (res.data.List.length < 10) {
          this.status = "nomore";
        }
      });
    },
    toDetails(index) {
      uni.navigateTo({
        url: "/pages/details/details?MatchID=" + this.lists[index].MatchID,
      });
    },
  },
  onLoad(option) {
    this.getList(option.RoleName);
    this.name = option.RoleName;
    uni.setNavigationBarTitle({
      title: option.RoleName,
    });
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
  color: $u-main-color;
}
.info {
  font-size: 22rpx;
  color: $u-light-color;
}
</style>
