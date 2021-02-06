<template>
  <u-cell-group>
    <u-cell-item
      icon="calendar"
      title="更新日志"
      @click="clickCell"
      index="0"
    ></u-cell-item>
    <u-cell-item
      icon="clock"
      title="清除缓存"
      @click="clickCell"
      index="1"
    ></u-cell-item>
    <u-cell-item
      icon="question-circle"
      title="关于"
      @click="clickCell"
      index="2"
    ></u-cell-item>
  </u-cell-group>
</template>
<script>
export default {
  // props:['index'],
  data() {
    return {};
  },
  methods: {
    clickCell(index) {
      if (index == 0) {
        uni.navigateTo({
          url: "/pages/update/update",
        });
      } else if (index == 1) {
        uni.showModal({
          title: "警告",
          content: "是否清除全部缓存？此操作无法恢复",
          success(res) {
            if (res.confirm) {
              uni.clearStorageSync();
            }
          },
        });
        this.$forceUpdate();
      } else if (index == 2) {
        uni.navigateTo({
          url: "/pages/about/about",
        });
      }
    },
  },
};
</script>

<style>
</style>