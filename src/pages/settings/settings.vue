<template>
  <view>
    <u-cell-group title="常规">
      <u-cell-item
        title="显示出装"
        label="战绩列表显示该局出装"
        :arrow="false"
        hover-class="none"
        ><u-switch
          v-model="settings.isShowEquip"
          :vibrate-short="true"
          size="40"
          @change="change"
        ></u-switch
      ></u-cell-item>
      <u-cell-item
        title="在线验证"
        label="打开可验证召唤师是否有效"
        :arrow="false"
        hover-class="none"
        ><u-switch
          v-model="settings.isManagerOnline"
          :vibrate-short="true"
          size="40"
          @change="change"
        ></u-switch
      ></u-cell-item>
      <u-cell-item title="召唤师管理提示" :arrow="false" hover-class="none"
        ><u-switch
          v-model="settings.isShowManagerTips"
          :vibrate-short="true"
          size="40"
          @change="change"
        ></u-switch
      ></u-cell-item>
      <u-cell-item title="对战列表提示" :arrow="false" hover-class="none"
        ><u-switch
          v-model="settings.isShowMatchListTips"
          :vibrate-short="true"
          size="40"
          @change="change"
        ></u-switch
      ></u-cell-item>
    </u-cell-group>
    <u-cell-group title="测试功能">
      <u-cell-item
        title="网络请求超时"
        label="默认6秒 详情前往 关于 查看"
        :required="true"
        :arrow="false"
        hover-class="none"
      >
        <u-number-box
          v-model="settings.timeout"
          min="3"
          max="20"
          @change="change"
        ></u-number-box>
      </u-cell-item>
      <u-cell-item
        title="标记好友"
        :required="true"
        :arrow="false"
        hover-class="none"
        ><u-switch
          v-model="settings.isFindFriends"
          :vibrate-short="true"
          size="40"
          @change="change"
        ></u-switch
      ></u-cell-item>
      <u-cell-item
        v-if="settings.isFindFriends"
        title="标记好友提示"
        :required="true"
        :arrow="false"
        hover-class="none"
        ><u-switch
          v-model="settings.isShowFindFriendsTips"
          :vibrate-short="true"
          size="40"
          @change="change"
        ></u-switch
      ></u-cell-item>
    </u-cell-group>
  </view>
</template>
<script>
export default {
  data() {
    return {
      settings: uni.getStorageSync("SETTINGS"),
      model: { show: false, content: "" }, //模态框
    };
  },
  methods: {
    //改变选项
    change() {
      uni.setStorageSync("SETTINGS", this.settings);
    },
  },
  onLoad() {
    if (!this.settings) {
      let settings = {
        isShowEquip: true,
        isManagerOnline: false,
        isShowManagerTips: true,
        isFindFriends: false,
        timeout: 6,
      };
      uni.setStorageSync("SETTINGS", settings);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>