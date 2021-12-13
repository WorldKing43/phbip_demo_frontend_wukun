<template>
  <!-- 杨进勇标题公共组件-->
  <div style="width:100%">
    <div class="publicTitle">
      <div class="publicTitleLeftStyle">
        <div class="publicTipS">{{title}}</div>
        <div style="float:left;height:100%;margin-left:10px">
          <slot name="publicTitleLeft"></slot>
        </div>
      </div>
      <div class="publicTitleRightStyle">
        <slot name="publicTitleRight">
          <!--  用于标题右侧 -->
        </slot>
      </div>
    </div>
    <slot name="publicContent">
      <!--  用于插入内容 -->
    </slot>
  </div>
</template>
<script>
export default {
  props: ["title"], //接手title值
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.publicTitle {
  //标题样式
  position: relative;
  width: 100%;
  height: 24px;
  line-height: 24px;
  margin: 15px 0;
  .publicTitleLeftStyle {
    padding: 0px 4px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    .publicTipS {
      float: left;
      height: 100%;
      font-size: 20px;
      border-left: 4px solid #fdae2b;
      padding-left: 6px;
    }
  }
  .publicTitleRightStyle {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
}
</style>