<template>
  <view>
    <u-card
      title="使用说明"
      title-color="#34495e"
      :head-style="bgStyle"
      :body-style="bgStyle"
      :foot-style="bgStyle"
    >
      <view class="" slot="body">
        <view class="question">
          <u-icon name="question-circle"></u-icon
          >为什么一直显示加载中或出现界面没有数据的情况？</view
        >
        <view class="answer"
          ><u-icon name="checkmark-circle"></u-icon
          >可能由于网络环境、服务器状况等因素导致。</view
        >
        <view class="question">
          <u-icon name="question-circle"></u-icon
          >为什么输入正确的昵称提示昵称不存在？并且无法保存？</view
        >
        <view class="answer"
          ><u-icon name="checkmark-circle"></u-icon
          >300英雄不提供较早的数据。在存储之前会访问服务器检查是否存在该用户的数据，不存在则无法存储。</view
        >
        <u-gap bg-color="transparent"></u-gap>
        <view class="question"
          ><u-icon name="error-circle"></u-icon
          >数据仅供参考，请以游戏内实际数据为准。</view
        >
      </view>
      <view slot="foot">
        <!-- #ifdef MP-QQ  -->
        <u-button
          open-type="openGroupProfile"
          group-id="1157749615"
          hair-line
          ripple
          >点击添加QQ群</u-button
        >
        <!-- #endif  -->
        <!-- #ifdef MP-WEIXIN  -->
        <u-button open-type="contact" :hair-line="false" :ripple="true"
          >点击联系作者</u-button
        >
        <!-- #endif  -->
      </view>
    </u-card>
  </view>
</template>

<script>
export default {
  data() {
    return {
      bgStyle: {
        background: "#f5f6fa",
      },
    };
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