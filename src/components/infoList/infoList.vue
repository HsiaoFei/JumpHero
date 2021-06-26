<template>
  <view>
    <u-card
      :show-title="false"
      :show-head="false"
      :body-style="{ background: '#f5f6fa' }"
      v-for="(matchItem, matchIndex) in match"
      :key="matchIndex"
    >
      <view slot="body" class="u-flex">
        <!-- 头像 -->
        <view class="u-flex-3 u-relative">
          <u-image
            width="96"
            height="96"
            :src="imageUrl + matchItem.Hero.IconFile"
            shape="circle"
            :lazy-load="true"
            @click="toMatch(matchItem.RoleName)"
          ></u-image>
          <view class="level u-absolute">{{ matchItem.HeroLevel }}</view>
        </view>
        <view class="u-flex-9">
          <view>
            <u-tag
              v-if="friends[matchItem.RoleID]"
              size="mini"
              type="success"
              text="友"
              class="u-padding-right-5"
            ></u-tag>
            <u-tag
              size="mini"
              type="warning"
              mode="plain"
              :text="matchItem.RoleName"
              class="u-padding-right-5"
              @click="openActionSheet(matchItem.RoleName, matchItem.RoleID)"
            ></u-tag>
          </view>
          <view>
            <u-tag
              size="mini"
              :text="matchItem.Hero.Name"
              class="u-padding-right-5"
            ></u-tag>
            <u-tag
              :type="
                matchItem.Result == 1
                  ? 'success'
                  : matchItem.Result == 2
                  ? 'error'
                  : matchItem.Result == 3
                  ? 'warning'
                  : 'default'
              "
              :text="
                matchItem.Result == 1
                  ? '胜'
                  : matchItem.Result == 2
                  ? '败'
                  : matchItem.Result == 3
                  ? '跑'
                  : '未定义'
              "
              size="mini"
              mode="dark"
              class="u-padding-right-5"
            >
            </u-tag>
            <u-tag
              size="mini"
              v-if="matchItem.IsFirstWin == 1"
              text="首"
              class="u-padding-right-5"
            ></u-tag>
            <u-tag size="mini" mode="plain" :text="matchItem.ELO"></u-tag>
          </view>
          <view class="u-padding-bottom-10">
            <u-tag
              size="mini"
              mode="dark"
              class="u-padding-right-5"
              :text="matchItem.KillCount"
            ></u-tag>
            <u-tag
              size="mini"
              mode="dark"
              class="u-padding-right-5"
              :text="matchItem.DeathCount"
            ></u-tag>
            <u-tag
              size="mini"
              mode="dark"
              class="u-padding-right-5"
              :text="matchItem.AssistCount"
            ></u-tag>
            <u-tag
              size="mini"
              mode="dark"
              class="u-padding-right-5"
              :text="matchItem.KillUnitCount"
            ></u-tag>
          </view>
          <view class="u-flex">
            <!-- 技能 -->
            <view class="u-flex u-padding-right-10">
              <u-image
                class="u-padding-right-5"
                width="48"
                height="48"
                border-radius="10"
                :lazy-load="true"
                v-for="skillItem in matchItem.Skill"
                :key="skillItem.ID"
                :src="imageUrl + skillItem.IconFile"
              ></u-image>
            </view>
            <!-- 装备 -->
            <view class="u-flex">
              <u-image
                class="u-padding-right-5"
                width="48"
                height="48"
                border-radius="10"
                :lazy-load="true"
                v-for="equipItem in matchItem.Equip"
                :key="equipItem.ID"
                :src="imageUrl + equipItem.IconFile"
              ></u-image>
            </view>
          </view>
        </view>
      </view>
    </u-card>
    <u-action-sheet
      v-model="sheet.show"
      :tips="sheet.tips"
      :list="sheet.list"
      border-radius="10"
      :safe-area-inset-bottom="true"
      @click="actionSheet"
    ></u-action-sheet>
    <u-toast ref="toast" />
  </view>
</template>

<script>
import api from "@/utils/api";
export default {
  props: ["match", "result", "myid"],
  data() {
    return {
      imageUrl: api.ImageUrl,
      isFindFriends: false, //标记好友
      roleId: "", //好友识别码
      friends: {}, //好友集合
      sheet: {
        //菜单
        list: [
          { text: "设为好友", color: "#19be6b" },
          { text: "取消好友", color: "#fa3534" },
        ],
        show: false,
        tips: { text: "", color: "#303133" },
      },
    };
  },
  watch: {
    myid(myid) {
      if(uni.getStorageSync("FRIENDS" + myid))
      this.friends = uni.getStorageSync("FRIENDS" + myid);
    },
  },
  methods: {
    toMatch(roleName) {
      uni.navigateTo({
        url: "/pages/match/match?RoleName=" + roleName,
      });
    },
    openActionSheet(name, id) {
      if (this.isFindFriends) {
        this.roleId = id;
        this.sheet.tips.text = name;
        this.sheet.show = true;
      }
    },
    actionSheet(index) {
      let roleId = this.roleId;
      switch (index) {
        case 0:
          if (this.friends[roleId])
            this.$refs.toast.show({
              title: `${this.sheet.tips.text} 已经是好友啦`,
              type: "warning",
            });
          else {
            this.friends[roleId] = true;
            uni.setStorageSync("FRIENDS"+this.myid, this.friends);
            this.$refs.toast.show({
              title: `${this.sheet.tips.text} 添加成功`,
              type: "success",
            });
          }
          break;
        case 1:
          if (this.friends[roleId]) {
            delete this.friends[roleId];
            uni.setStorageSync("FRIENDS" + this.myid, this.friends);
            this.$refs.toast.show({
              title: `${this.sheet.tips.text} 删除成功`,
              type: "success",
            });
          } else
            this.$refs.toast.show({
              title: `${this.sheet.tips.text} 还不是你好友哦`,
              type: "warning",
            });

          break;
      }
    },
  },
  mounted() {
    // this.myid = uni.getStorageSync("MYROLEID");
    // console.log(this.myid);
    let settings = uni.getStorageSync("SETTINGS");
    this.isFindFriends = settings.isFindFriends;
  },
};
</script>

<style lang="scss" scoped>
.u-grid-item {
  padding: 0;
}
.level {
  height: 36rpx;
  width: 36rpx;
  top: 68rpx;
  left: 68rpx;
  font-size: 22rpx;
  line-height: 22rpx;
  text-align: center;
  color: $u-type-primary-light;
  background-color: $u-main-color;
  padding: 7rpx;
  border-radius: 50%;
}
.skill {
  padding: 20rpx 0;
}
.equip {
  padding: 20rpx;
}
.info {
  font-size: 22rpx;
}
</style>