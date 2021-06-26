<template>
  <view>
    <!-- 无网络 -->
    <!-- <u-no-network @retry="reTry"></u-no-network> -->
    <u-card
      :title="item.date"
      :head-style="{ background: '#f5f6fa', color: '#34495e' }"
      :body-style="{ background: '#f5f6fa', color: '#34495e' }"
      title-color="#e67e22"
      v-for="(item, index) in profile.update"
      :key="index"
    >
      <view class="text" slot="body"
        ><text>{{ item.content }}</text></view
      >
    </u-card>
    <u-modal
      title="提示"
      :title-style="{ 'font-weight': 700 }"
      v-model="modal"
      content="暂无内容"
      @confirm="toBack(1)"
    ></u-modal>
  </view>
</template>

<script>
import api from "@/utils/api";
export default {
  data() {
    return {
      profile: uni.getStorageSync("PROFILE"),
      modal: false,
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
        .catch((res) => {
          console.log(res);
        });
    },
    // reTry() {
    //   this.getJumpheroProfile();
    // },
    toBack(value) {
      uni.navigateBack(value);
    },
  },
  onShow() {
    if (!this.profile) {
      this.getJumpheroProfile();
    }
  },
};
</script>

<style>
.text {
  white-space: pre-wrap;
}
</style>