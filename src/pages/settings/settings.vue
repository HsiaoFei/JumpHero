<template>
  <u-cell-group>
    <u-cell-item
      icon="calendar"
      title="更新日志"
      @click="toPage('/pages/update/update')"
      index="0"
    ></u-cell-item>
    <u-cell-item
      icon="question-circle"
      title="关于"
      @click="toPage('/pages/update/update')"
      index="1"
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
    toPage(path) {
      uni.navigateTo({
        url: path,
      });
    },
  },
};
</script>

<style>
</style>