<template>
  <view>
    <u-search
      :placeholder="placeholder"
      v-model="roleName"
      shape="square"
      :show-action="false"
      margin="32rpx"
      :animation="true"
      @search="add"
      @custom="add"
    ></u-search>
    <!-- 提示框 -->
    <view class="u-margin-32">
      <u-alert-tips
        type="warning"
        :show="isShowManagerTips"
        description="默认不开启在线验证，可在 设置 开启选项；开启可保证召唤师名称有效，但也会增加网络请求。"
        :show-icon="true"
        :close-able="true"
        @close="closeAlertTips"
      ></u-alert-tips>
    </view>
    <!-- 名字 -->
    <u-card
      :show-head="false"
      :show-foot="false"
      :border="false"
      v-for="(item, index) in nameList"
      :key="index"
      :body-style="{ background: '#f5f6fa' }"
      @click="openActionSheet(item.name, index)"
    >
      <view slot="body">
        {{ item.name }}
      </view>
    </u-card>
    <!-- 数据为空 -->
    <u-empty margin-top="300" v-if="!nameList.length"></u-empty>
    <!-- 菜单 -->
    <u-action-sheet
      v-model="sheet.show"
      :tips="sheet.tips"
      :list="sheet.list"
      border-radius="10"
      :safe-area-inset-bottom="true"
      @click="actionSheet"
    ></u-action-sheet>
    <!-- 模态框 -->
    <u-modal
      v-model="model.show"
      :content="model.content"
      :show-cancel-button="true"
      @confirm="del"
    ></u-modal>
    <!-- 提示框 -->
    <u-toast ref="toast" />
  </view>
</template>

<script>
import api from "@/utils/api";
export default {
  data() {
    return {
      placeholder: "召唤师名称", //输入框提示
      isShowManagerTips: true, //
      isManagerOnline: false,
      roleName: "", //输入框内容
      nameList: [], //召唤师列表
      nameIndex: "",
      model: { show: false, content: "" }, //模态框
      sheet: {
        //菜单
        list: [
          { text: "置顶", color: "#19be6b" },
          { text: "删除", color: "#fa3534" },
        ],
        show: false,
        tips: { text: "", color: "#303133" },
      },
    };
  },
  methods: {
    //打开菜单
    openActionSheet(name, index) {
      this.nameIndex = index;
      this.sheet.tips.text = name;
      this.sheet.show = true;
    },
    //选择菜单
    actionSheet(index) {
      let idx = this.nameIndex;
      // console.log(index);
      switch (index) {
        case 0: //置顶
          if (idx == 0) {
            this.$refs.toast.show({
              title: "已经在顶上啦",
              type: "success",
            });
          } else {
            this.nameList.unshift(this.nameList[idx]);
            this.nameList.splice(idx + 1, 1);
            uni.setStorageSync("NAMES", this.nameList);
            this.$refs.toast.show({
              title: "置顶成功",
              type: "success",
            });
          }
          break;
        case 1: //删除
          this.model.content = `是否要删除“${this.nameList[idx].name}”？`;
          this.model.show = true;
          break;
      }
    },
    //在线验证
    async getOnline() {
      let online1 = await this.request({
        url: api.NormalUrl,
        data: { RoleName: this.roleName },
        method: "POST",
      });
      if (online1.data.data) return true;
      let online2 = await this.request({
        url: api.RoleUrl,
        data: { name: this.roleName },
        method: "POST",
      });
      console.log("online2", online2);
      if (online2.data.Role) return true;
      // else return false;
    },
    //添加
    async add(value) {
      if (value) {
        let list = this.nameList || [];
        for (let i in list) {
          if (value == list[i].name) {
            this.$refs.toast.show({
              title: `${value} 已存在`,
              type: "warning",
            });
            this.roleName = "";
            return;
          }
        }
        if (this.isManagerOnline) {
          console.log(await this.getOnline());
          if (!(await this.getOnline())) {
            this.$refs.toast.show({
              title: `${value} 不存在`,
              type: "error",
            });
            return;
          }
        }
        list.push({ name: value });
        this.$refs.toast.show({
          title: `${value} 已保存`,
          type: "success",
        });

        uni.setStorageSync("NAMES", list);
        this.nameList = list;
        this.roleName = "";
      } else {
        this.$refs.toast.show({
          title: "请输入召唤师名称",
          type: "error",
        });
      }
    },
    //删除
    del() {
      this.nameList.splice(this.nameIndex, 1);
      uni.setStorageSync("NAMES", this.nameList);
      this.$refs.toast.show({
        title: "删除成功",
        type: "success",
      });
    },
    //关闭提示
    closeAlertTips() {
      let settings = uni.getStorageSync("SETTINGS");
      this.isShowManagerTips = false;
      settings.isShowManagerTips = false;
      uni.setStorageSync("SETTINGS", settings);
      this.$refs.toast.show({
        title: "关闭成功！可在 设置 中再次开启",
        type: "success",
      });
    },
  },
  onLoad() {
    this.nameList = uni.getStorageSync("NAMES");
    let settings = uni.getStorageSync("SETTINGS");
    this.isShowManagerTips = settings.isShowManagerTips;
    this.isManagerOnline = settings.isManagerOnline;
    if (this.isManagerOnline) this.placeholder += "[已开启在线验证]";
  },
};
</script>

<style lang="scss" scoped>
.title {
  text-align: left;
  font-size: 28rpx;
  color: $u-content-color;
  margin: 20rpx;
}
</style>