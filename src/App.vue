<script>
export default {
  globalData: {},
  onLaunch() {
    if (!uni.getStorageSync("SETTINGS")) {
      //初始化设置
      let settings = {
        isShowEquip: true, //显示装备
        isShowManagerTips: true, //显示召唤师管理提示
        isShowMatchListTips: true, //对局列表显示提示
        isManagerOnline: false, //在线验证
        isFindFriends: true, //标记好友
        isShowFindFriendsTips: true, //标记好友提示
        timeout: 6, //超时时间
      };
      uni.setStorageSync("SETTINGS", settings);
    }
  },
  onShow() {},
  onHide() {},
};
</script>

<style lang="scss">
@import "uview-ui/index.scss";
</style>