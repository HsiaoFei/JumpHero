<template>
  <view>
    <official-account></official-account>
    <u-card
      title="使用说明"
      title-color="#34495e"
      :head-style="{ background: '#f5f6fa' }"
      :body-style="{ background: '#f5f6fa' }"
      :foot-style="{ background: '#f5f6fa' }"
    >
      <view slot="body">
        <view v-for="(item, index) in profile.about.content" :key="index">
          <view class="question" v-if="item.question">
            <u-icon name="question-circle" class="u-margin-right-15"></u-icon
            >{{ item.question }}</view
          >
          <view class="answer" v-if="item.answer"
            ><u-icon name="checkmark-circle" class="u-margin-right-15"></u-icon
            >{{ item.answer }}</view
          >
        </view>
        <u-gap bg-color="transparent"></u-gap>
        <view class="question" v-if="profile.about.tip"
          ><u-icon name="error-circle" class="u-margin-right-15"></u-icon
          >{{ profile.about.tip }}</view
        >
        <u-empty v-if="!profile.about"></u-empty>
      </view>
      <view slot="foot" class="u-flex">
        <!-- #ifdef MP-QQ  -->
        <u-button open-type="openGroupProfile" group-id="1157749615"
          >打开QQ群</u-button
        >
        <!-- #endif  -->
        <!-- #ifdef MP-WEIXIN  -->
        <u-button class="u-padding-right-20 u-flex-1" open-type="contact"
          >联系作者</u-button
        >
        <u-button class="u-padding-left-20 u-flex-1" open-type="feedback"
          >意见反馈</u-button
        >
        <!-- #endif  -->
      </view>
    </u-card>
  </view>
</template>

<script>
import api from "@/utils/api";
export default {
  data() {
    return {
      profile: uni.getStorageSync("PROFILE"),
    };
  },
  methods: {
    // 获取公告类信息
    getJumpheroProfile() {
      this.request({
        url: api.JumpheroProfile,
      })
        .then((res) => {
          this.profile = res.data;
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
  },
  onShow() {
    if (!this.profile) this.getJumpheroProfile();
  },
  onShareAppMessage() {
    let title = `300英雄战绩 关于`;
    let path = `/pages/about/about`;
    return {
      title,
      path,
    };
  },
  onShareTimeline() {},
};
</script>

<style lang="scss" scoped>
.question {
  color: $u-type-warning;
}
.answer {
  color: $u-content-color;
}
</style>