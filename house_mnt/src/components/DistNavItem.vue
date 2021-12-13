<template>
  <el-menu-item-group v-if="data.type == 'group'" :index="data.id">
    <template slot="title">
      <i :class="data.iconCls"></i>
      <span slot="title">{{data.label}}</span>
    </template>
    <DistNavItem
      v-for="item in data.children"
      :data="item"
      :key="item.id"
      :onItemClick="onItemClick"
      :activeId="activeId"
    ></DistNavItem>
  </el-menu-item-group>
  <el-submenu
    v-else-if="data.type == 'submenu' || (data.children && data.children.length > 0)"
    :index="data.id"
  >
    <template slot="title">
      <i :class="data.iconCls"></i>
      <span slot="title">{{data.label}}</span>
    </template>
    <DistNavItem
      v-for="item in data.children"
      :data="item"
      :key="item.id"
      :onItemClick="onItemClick"
      :activeId="activeId"
    ></DistNavItem>
  </el-submenu>
  <el-menu-item
    v-else
    @click="onItemClick(data, $event)"
    v-show="data.hidden !== true"
    :class="{'dist-menu-item': true, 'active': activeId == data.id }"
  >
    <i :class="data.iconCls"></i>
    <span slot="title">{{data.label}}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: "DistNavItem",
  methods: {},
  props: {
    activeId: {
      type: String,
      default: ""
    },
    data: {
      id: String,
      label: String,
      iconCls: String,
      hidden: Boolean
    },
    onItemClick: Function
  }
};
</script>

<style lang="scss">
.dist-menu-item.active {
  color: rgb(64, 158, 255);
  background: #eaf9fe;
}
</style>
