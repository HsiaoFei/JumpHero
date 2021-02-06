<template>
  <view>
    <u-card
      :show-title="false"
      :show-head="false"
      :body-style="bgStyle"
      v-for="(itemMatch, indexMatch) in match"
      :key="indexMatch"
    >
      <view slot="body">
        <view class="u-flex">
          <!-- 头像 -->
          <view class="u-flex-3 u-relative">
            <u-image
              width="96rpx"
              height="96rpx"
              :src="imageUrl + itemMatch.Hero.IconFile"
              shape="circle"
              :lazy-load="true"
              @click="toMatch(itemMatch.RoleName)"
            ></u-image>
            <view class="level u-absolute">{{ itemMatch.HeroLevel }}</view>
          </view>
          <view class="u-flex-9">
            <view class="name">{{ itemMatch.RoleName }}</view>
            <view
              >{{ itemMatch.KillCount }}/{{ itemMatch.DeathCount }}/{{
                itemMatch.AssistCount
              }}</view
            >
            <view class="u-flex">
              <!-- 技能 -->
              <view class="skill u-flex">
                <u-image
                  v-for="(itemSkill, indexSkill) in itemMatch.Skill"
                  :key="indexSkill"
                  width="48rpx"
                  height="48rpx"
                  :src="imageUrl + itemSkill.IconFile"
                  :lazy-load="true"
                ></u-image>
              </view>
              <!-- 装备 -->
              <view class="equip u-flex">
                <u-image
                  v-for="(itemEquip, indexEquip) in itemMatch.Equip"
                  :key="indexEquip"
                  width="48rpx"
                  height="48rpx"
                  :src="imageUrl + itemEquip.IconFile"
                  :lazy-load="true"
                ></u-image>
              </view>
            </view>
          </view>
        </view>
        <view class="info">
          <u-grid :col="5" :border="false" :hover-class="none">
            <u-grid-item bg-color="transparent" :custom-style="{ padding: 0 }">
              <view>{{ itemMatch.Hero.Name }}</view>
            </u-grid-item>
            <u-grid-item bg-color="transparent" :custom-style="{ padding: 0 }">
              <view
                >结果:{{
                  itemMatch.Result == 1
                    ? "胜"
                    : itemMatch.Result == 2
                    ? "败"
                    : "逃"
                }}</view
              >
            </u-grid-item>
            <u-grid-item bg-color="transparent" :custom-style="{ padding: 0 }">
              <view>首胜:{{ itemMatch.IsFirstWin == 1 ? "是" : "否" }}</view>
            </u-grid-item>
            <u-grid-item bg-color="transparent" :custom-style="{ padding: 0 }">
              <view>击杀:{{ itemMatch.KillCount }}</view>
            </u-grid-item>
            <u-grid-item bg-color="transparent" :custom-style="{ padding: 0 }">
              <view>死亡:{{ itemMatch.DeathCount }}</view>
            </u-grid-item>
            <u-grid-item bg-color="transparent" :custom-style="{ padding: 0 }">
              <view>助攻:{{ itemMatch.AssistCount }}</view>
            </u-grid-item>
            <u-grid-item bg-color="transparent" :custom-style="{ padding: 0 }">
              <view>补兵:{{ itemMatch.KillUnitCount }}</view>
            </u-grid-item>
            <u-grid-item bg-color="transparent" :custom-style="{ padding: 0 }">
              <view>推塔:{{ itemMatch.TowerDestroy }}</view>
            </u-grid-item>
            <u-grid-item bg-color="transparent" :custom-style="{ padding: 0 }">
              <view>经济:{{ itemMatch.TotalMoney }}</view>
            </u-grid-item>
            <u-grid-item bg-color="transparent" :custom-style="{ padding: 0 }">
              <view>团分:{{ itemMatch.ELO }}</view>
            </u-grid-item>
          </u-grid>
        </view>
      </view>
    </u-card>
  </view>
</template>

<script>
import api from "../../utils/api";
export default {
  props: ["match", "result"],
  data() {
    return {
      imageUrl: api.ImageUrl,
    };
  },
  computed: {
    bgStyle() {
      if (this.result == "win") {
        return { background: "#71d5a1", color: "#2c3e50" };
      } else if (this.result == "lose") {
        return { background: "#c0392b", color: "#f5f6fa" };
      } else {
        return { background: "#f5f6fa" };
      }
    },
  },
  methods: {
    toMatch(roleName) {
      uni.navigateTo({
        url: "/pages/match/match?RoleName=" + roleName,
      });
    },
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