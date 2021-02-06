<template>
  <view>
    <!-- 无网络 -->
    <u-no-network @retry="retry"></u-no-network>
    <u-card
      :title="itemUpdate.Date"
      :head-style="bgStyle"
      :body-style="bgStyle"
      title-color="#e67e22"
      v-for="(itemUpdate, indexUpdate) in update"
      :key="indexUpdate"
    >
      <view class="text" slot="body"
        ><text>{{ itemUpdate.Text }}</text></view
      >
    </u-card>
  </view>
</template>

<script>
import api from "../../utils/api";
export default {
  data() {
    return {
      update: [],
      bgStyle: {
        background: "#f5f6fa",
        color: "#34495e",
      },
    };
  },
  methods: {
    getUpdate() {
      this.request({
        url: api.UpdateUrl,
      }).then((res) => {
        this.update = res.data.Content;
      });
    },
    retry() {
      this.getUpdate();
    },
  },
  created() {
    this.getUpdate();
  },
  onLoad() {
    // this.getUpdate();
  },
};
</script>

<style>
.text {
  white-space: pre-wrap;
}
</style>