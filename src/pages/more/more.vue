<template>
  <u-cell-group>
    <u-cell-item
      icon="account"
      title="召唤师管理"
      @click="toPage('/pages/manager/manager')"
    ></u-cell-item>
    <u-cell-item
      icon="setting"
      title="设置"
      @click="toPage('/pages/settings/settings')"
    ></u-cell-item>
    <u-cell-item
      icon="calendar"
      title="更新日志"
      @click="toPage('/pages/update/update')"
    ></u-cell-item>
    <u-cell-item
      icon="question-circle"
      title="关于"
      @click="toPage('/pages/about/about')"
    ></u-cell-item>
  </u-cell-group>
</template>
<script>
export default {
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