<template>
  <div class="dist-tabs2">
    <el-tabs
      v-model="activeName"
      type="card"
      border
      @tab-click="__handleClick"
      @tab-remove="__handleRemove"
    >
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.id"
        :name="tab.id"
        :label="tab.label"
        :id="tab.id"
        :tabs="$data.__this"
        :closable="tab.closable"
        :lazy="tab.lazy"
      >
        <DistTabPanel :component="tab.component" :params="params" :meta="tab.meta"></DistTabPanel>
      </el-tab-pane>
    </el-tabs>
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
        this.tabs.push(tab);
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
          idx = this.tabs.length> idx ? idx : idx - 1;
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
    __handleClick(tab, event) {
      tab = this.__findTab(tab.name);
      this.activeName = tab.id;
      if (this.onTabClick) this.onTabClick(tab);
    },
    __handleRemove(tabName) {
      let tab = this.__findTab(tabName);
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
.dist-tabs2 {
  width: 100%;
}
</style>