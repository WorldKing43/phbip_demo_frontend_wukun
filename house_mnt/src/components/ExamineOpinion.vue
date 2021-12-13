<!--
 * @Author: yangwj
 * @Date: 2019-07-31 15:27:34
 * @LastEditors: Please set LastEditors
 * @Description: 增加常用意见
 -->
<template>
  <!-- 审核意见 -->
  <div>
    <el-table
      v-if="opinionData.length"
      :data="opinionData"
      border
      :header-cell-style="globalHeaderStyle"
      :cell-style="globalCellStyle"
      style="margin-bottom:10px;"
    >
      <el-table-column prop="activitySource" label="环节"></el-table-column>
      <el-table-column prop="dealer" label="办理人"></el-table-column>
      <el-table-column prop="dealTime" label="办理时间"></el-table-column>
      <el-table-column prop="remark" label="办理意见"></el-table-column>
    </el-table>
    <div  v-if="handleIsShow">
      <div style="padding: 10px 0 10px 24px"  class="process_p">当前环节：{{currentState}}</div>
      <div>
        <div class="makeopinion">
          <div style="width:86px;margin-left:24px;">办理意见：</div>
            <ContextTextarea v-model="opinion" :list="commonWords"></ContextTextarea>
        </div>
        <div style="text-align:center;padding-top:30px; padding-bottom: 60px">
          <el-button
            type="primary"
            size="mini"
            v-if="currentState!='受理' && currentState!='已下达'"
            @click="toPreNode(opinion)"
            :disabled="isCheck"
          >退回上一环节</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="noPassProcess()"
            v-if="currentState!='受理' && currentState!='已下达'"
            :disabled="isCheck"
          >审核不通过</el-button>
          <el-button
            type="primary"
            size="mini"
            v-if="currentState!='已下达'"
            @click="toNextNode(opinion)"
            :disabled="isCheck"
          >提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/api/housestore.js";
import ContextTextarea from "@/components/ContextTextarea" //常用意见组件
export default {
  name: 'examineOpinion',
  components: {
    ContextTextarea
  },
  props: {
    opinionData:{ //审核意见列表
      type: Array,
      default: () => {
        return []
      }
    },
    handleIsShow: { //办理和查看控制是否编辑
      type: Boolean,
      default: () => {
        return true
      }
    },
    currentState: { //当前环节
      type: String,
      default: ''
    },
    opinionText:{ //审核意见
      type: String,
      default: ''
    },
   
  },
  data() {
    return {
      opinion: this.opinionText, // 办理意见
      commonWords:[],//办理意见常用语
      isCheck: false,
    };
  },
  created() {
    if (this.$route.params.state == "check") {
      //限制按钮和输入框置灰
      this.isCheck = true;
    }
  },
  methods: {
    // 提交到下一个环节
    toNextNode(opinion) {
      if (!this.opinion) {
        this.$alert("请填写办理意见", "提示", {
          confirmButtonText: "确定"
        });
      } else {
        this.$emit("handleToNext", opinion);
      }
    },
    // 回退到上一个环节
    toPreNode(opinion) {
      if (!this.opinion) {
        this.$alert("请填写办理意见", "提示", {
          confirmButtonText: "确定"
        });
      } else {
        this.$emit("hanleToPreNode", opinion);
      }
    },
    //审核不通过
    noPassProcess(opinion) {
      if (!this.opinion) {
        this.$alert("请填写办理意见", "提示", {
          confirmButtonText: "确定"
        });
      } else {
        this.$emit("noPassProcess", opinion);
      }
    },
     //获取字典
    getDictionaryByName() {
      let nameList = ['办理意见常用语']
      let params = {
        names: nameList.toString()
      }
      http.getDictionary(params).then(res => {
        res = JSON.parse(res)
        this.commonWords = this.$dictionaryChange(res.办理意见常用语, this.commonWords, '房源分配常用意见')
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.getDictionaryByName() //获取字典
  },
  watch: {
    //监听父组件传入值的变化
    opinionText: function(newValue, oldValue) {
      this.opinion = newValue;
    }
  }
};
</script>

<style lang="scss" scoped>
.makeopinion {
  display: flex;
  justify-content: flex-start;
}
.process_p {
  color: #fdae2b;
 
}
</style>
