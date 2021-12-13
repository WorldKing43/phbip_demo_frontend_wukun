<template>
  <div class="dist-tabs">
    <el-row>
      <ul class="dist-tabs-headers">
        <li
          v-for="tab in tabs"
          :class="{'tab-active':tab.id === activeName}"
          @click.stop.prevent="__handleClick(tab)"
          :key="tab.id"
        >
          <span>{{tab.label}}</span>
          <i
            class="el-icon-close"
            v-show="tab.closable && tabs.length>1"
            title="关闭标签"
            @click.stop.prevent="__handleRemove(tab)"
          ></i>
        </li>
      </ul>
    </el-row>
    <el-row class="dist-tabs-panels">
      <DistTabPanel
        v-for="tab in tabs"
        :component="tab.component"
        :params="params"
        :meta="tab.meta"
        :id="tab.id"
        :tabs="__this"
        :key="tab.id"
        v-show="tab.id==activeName"
      ></DistTabPanel>
    </el-row>
  </div>
</template>

<script>
import DistTabPanel from "./DistTabPanel.vue";

export default {
  components: { DistTabPanel },
  data() {
    return {
      activeName: "",
      __this: {}
    };
  },
  props: {
    tabs: {
      type: Array,
      default: () => {
        return [];
      }
    },
    params: {
      type: Object,
      default: () => {
        return {};
      }
    },
    onTabClick: Function,
    onTabClose: Function,
    onTabChange: Function
  },
  methods: {
    openTab(tab) {
      let itab = this.__findTab(tab.id);
      if (!itab) {
        this.tabs = this.tabs || [];
        /*二级页签--控制页签的数量不超过两个--金雅蓓 */
        // if (this.tabs.length < 2) {
        this.tabs.push(tab);
        // } else {
        //   this.$alert("同级页面不允许打开超过两个");
        //   return;
        // }
        /*控制页签的数量不超过两个--金雅蓓 */
      }
      tab = itab || tab;
      let oldTab = this.__findTab(this.activeName);
      this.activeName = tab.id;
      if (this.onTabChange) this.onTabChange(tab, oldTab);
      this.$emit("onTabChange", tab, oldTab);
    },
    closeTab(tabId) {
      if (typeof tabId === "object") tabId = tabId.id;
      let tab = this.__findTab(tabId);
      if (tab) {
        let idx = this.tabs.indexOf(tab);
        this.tabs.splice(idx, 1);
        if (tab.id == this.activeName) {
          idx = this.tabs.length > idx ? idx : idx - 1;
          let newTab = null;
          if (idx != -1) {
            newTab = this.tabs[idx];
          }
          if (this.onTabChange) this.onTabChange(newTab, tab);
          this.$emit("onTabChange", newTab, tab);
          this.activeName = newTab ? newTab.id : "";
        }
        if (this.onTabClose) this.onTabClose(tab);
      } else {
        console.warn("未找到Tab选项卡");
        console.warn(tabId);
      }
    },
    findTab(tabId) {
      if (typeof tabId === "object") tabId = tab.id;
      if (!tabId) tabId = this.activeName;
      return this.__findTab(tabName);
    },
    __handleClick(tab) {
      this.openTab(tab);
      if (this.onTabClick) this.onTabClick(tab);
    },
    __handleRemove(tab) {
      this.closeTab(tab);
    },
    __findTab(tabName) {
      let tabs = this.tabs || [],
        tab;
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].id == tabName) {
          tab = tabs[i];
          break;
        }
      }
      return tab;
    }
  },
  mounted() {
    this.__this = this;
  }
};
</script>

<style lang="scss">
.dist-tabs {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  .dist-tabs-headers {
    padding: 0;
    margin: 0;
    height: 40px;
    background-color: #f5f7fa;
    border: 1px solid #e4e7ed;
    border-left: 0;
    border-right: 0;
    box-sizing: border-box;
    .tab-active {
      color: #409eff;
    }
    li {
      float: left;
      position: relative;
      border-top: 2px solid #409eff;
      border-left: 1px solid #e4e7ed;
      padding: 0 1px 0 20px;
      margin-right: 30px;
      background: #fff;
      height: 40px;
      line-height: 40px;
      list-style: none;
      cursor: pointer;
    }
    li::before {
      content: ""; //用伪元素来生成一个矩形
      position: absolute;
      top: 0;
      right: -31px;
      bottom: 0;
      width: 0;
      height: 0;
      border-bottom: 37px solid #fff;
      border-right: 32px solid transparent;
    }
  }
}
</style>