<!--
 * @Author: hongchr
 * @Date: 2019-12-03 11:01:53
 * @Description: 带右键菜单的输入框
 * @LastAuthor: maxq
-->
<template>
  <div :class="'context-textarea i-' + el_id">
    <div @contextmenu.prevent="__openCard" @click="visible = false">
      <el-input
        @blur="handleBlur"
        @blur.prevent="__inputBlur"
        @focus="handleFocus"
        @input="handleInput"
        @change="handleInputChange"
        placeholder="点击鼠标右键可选择常用意见！" 
        type="textarea"
        :rows="4"
        v-model="aria_value">
      </el-input>
    </div>
    <el-card class="box-card" v-show="visible">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="__selectItem(item.name)"> {{item.name}}</li>
      </ul>
    </el-card>
  </div>
</template>
<script>
export default {
  props:{
    list:{
      required:true,
      type:Array
    },
    value:String
  },
  data(){
    return{
      aria_value:"",
      visible:false,
      el_id: 0,
    }
  },
  methods:{
    handleBlur(){},
    handleFocus(event){
      this.$emit('focus', event);
    },
    handleInput(val){
      this.$emit('input', val);
    },
    handleInputChange(val){
      this.value = this.aria_value;
      this.$emit('change', val);
    },
    //输入框失焦事件
    __inputBlur(event){
      //预防点击选项时，立即关闭，无法获取选项值
      setTimeout(() => {
        this.visible = false
      },200)
    },
    //打开常用语卡片
    __openCard(e){
      this.visible = true;
      const card = document.querySelector(".context-textarea.i-" + this.el_id + " .box-card");
      this.__reLocate(e,card);
    },
    //定位卡片位置
    __reLocate(event,element){
      const main = document.querySelector(".context-textarea.i-" + this.el_id + " .el-textarea");
      if(main.clientWidth > event.offsetX + 248){
        element.style.left = event.offsetX + "px";
        element.style.right = "";
      }else{
        element.style.left = "";
        element.style.right = 0;
      }
      element.style.bottom = (main.clientHeight - event.offsetY) + "px";
    },
    __selectItem(val){
      this.aria_value = val;
      this.$emit('input', this.aria_value);
    }
  },
  created(){
    this.el_id = parseInt(Math.random() * 10000);
  },
  mounted(){
    this.aria_value = this.value;
  },
  watch:{
    "value":function (newVal,oldVal) {
      this.aria_value = newVal;
    }
  }
}
</script>
<style lang='scss' scoped>
.context-textarea{
  position: relative;
  width: 99%;
  .box-card{
    width: 248px;
    max-height: 200px;
    line-height: 30px;
    overflow: auto;
    position: absolute;
    /deep/ .el-card__body{
      padding: 10px 0;
      ul li{
        padding: 1px 20px;
      }
      ul li:hover{
        cursor: pointer;
        background-color: #f5f7fa;
      }
    }
  }
  /*滚动条样式*/
  .box-card::-webkit-scrollbar {/*滚动条整体样式*/
    width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  .box-card::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(144,147,153,.3);
    background-color: rgba(144,147,153,.3);
  }
  .box-card::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.1);
    border-radius: 0;
    background: rgba(255, 255, 255,0.1);
  }
  /deep/ .el-textarea__inner::-webkit-input-placeholder {
    font-size: 16px;
  } 
}
</style>