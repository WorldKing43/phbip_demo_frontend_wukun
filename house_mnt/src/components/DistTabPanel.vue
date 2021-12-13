<template>
  <div class="dist-tab-panel">
    <component :is="component"></component>
  </div>
</template>

<script>
export default {
  name: "DistTabPage",
  props: {
    id: String,
    tabs: Object,
    component: Function,
    params: {
      type: Object,
      default: () => {
        return {};
      }
    },
    meta: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    openTab(tab) {
      this.tabs.openTab(tab);
    },
    closeTab(tabId) {
      if (this.typev(tabId) == "array") {
        for (let i = 0; i < tabId.length; i++) {
          this.tabs.closeTab(tabId[i]);
        }
      } else {
        this.tabs.closeTab(tabId);
      }
    },
    close() {
      this.closeTab(this.id);
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
</style>