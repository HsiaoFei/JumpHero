<template>
  <view>
    <u-card
      v-if="profile.about"
      title="使用说明"
      title-color="#34495e"
      :head-style="{ background: '#f5f6fa' }"
      :body-style="{ background: '#f5f6fa' }"
      :foot-style="{ background: '#f5f6fa' }"
    >
      <view slot="body">
        <view v-for="(item, index) in profile.about.content" :key="index">
          <view class="question">
            <u-icon name="question-circle" class="u-margin-right-15"></u-icon
            >{{ item.question }}</view
          >
          <view class="answer"
            ><u-icon name="checkmark-circle" class="u-margin-right-15"></u-icon
            >{{ item.answer }}</view
          >
        </view>
        <u-gap bg-color="transparent"></u-gap>
        <view class="question" v-if="profile.about.tip"
          ><u-icon name="error-circle" class="u-margin-right-15"></u-icon
          >{{ profile.about.tip }}</view
        >
      </view>
      <view slot="foot">
        <!-- #ifdef MP-QQ  -->
        <u-button open-type="openGroupProfile" group-id="1157749615"
          >点击添加QQ群</u-button
        >
        <!-- #endif  -->
        <!-- #ifdef MP-WEIXIN  -->
        <u-button open-type="contact" type="success">点击联系作者</u-button>
        <!-- #endif  -->
      </view>
    </u-card>
    <u-empty margin-top="300" v-if="!profile.about"></u-empty>
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
    if (!this.profile) {
      this.getJumpheroProfile();
    }
  },
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