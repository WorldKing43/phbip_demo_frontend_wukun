/*
 * @Author: 杨进勇 
 */
<template>
  <div>
    <div class="publicTitle">
      <div class="display">
        <span class="publicTipS">{{title}}</span>
        <!-- 标题右侧小字 -->
        <div class="publicTitleFont">
          <slot name="publicTitleFont"></slot>
        </div>
      </div>

      <div class="publicTitleButtonStyle">
        <slot name="publicTitleButton"></slot>
        <!-- <slot name="publicTitleLeft"> -->
        <!-- 用于标题左侧 -->
        <!-- </slot> -->
        <!-- <slot name="publicTitleright"> -->
        <!--  用于标题右侧 -->
        <!-- </slot> -->
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
  padding: 0px 4px;
  .publicTipS {
    text-align: left;
    font-size: 20px;
    border-left: 4px solid #fdae2b;
    padding-left: 6px;
  }
  .publicTitleButtonStyle {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
  .publicTitleFont {
    color: #afafaf;
    margin-left: 20px;
  }
  .display {
    display: flex;
  }
}
</style>