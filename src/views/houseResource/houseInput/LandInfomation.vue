<!--
 * @Description: 房源录入-宗地信息新建
 * @Version: 1.0
 * @Autor: wangyue
 * @Date: 2019-11-26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-27 09:58:16
 -->
<template>
  <div class="landInfomation">
    <el-form size="mini" class="margin-top-15" label-position="left" @submit.native.prevent>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="宗地号" label-width="4rem">
            <el-input v-model="content" placeholder="请输入内容" clearable @keyup.enter.native="queryFunc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" size="mini" @click="queryFunc">查询</el-button>
          <el-button type="primary" size="mini" @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-button type="primary" size="mini" @click="newAdd" :disabled="ban">新增</el-button>
    <el-table class="margin-top-15" :data="LandData" border size="mini" :header-cell-style="{
        'background': '#E6F0FC',
        'color': '#606266',
        'text-align':'center',
        'border-color': '#DBDBDB',
        }" :cell-style="{
        'text-align':'center',
        'border-color': '#DBDBDB',
        }">
      <el-table-column label="序号">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="宗地号" prop="landNo">
      </el-table-column>
      <el-table-column label="合同号" prop="contractNo">
      </el-table-column>
      <el-table-column label="土地面积" prop="landArea">
      </el-table-column>
      <el-table-column label="土地用途" prop="landUsed">
      </el-table-column>
      <el-table-column label="使用期始" prop="useStart">
      </el-table-column>
      <el-table-column label="使用期止" prop="useEnd">
      </el-table-column>
      <el-table-column label="所在区" prop="area">
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="check(scope.row)">查看</el-button>
          <el-button type="primary" size="mini" @click="edit(scope.row)"
            :disabled="(!scope.row.createSelf&&scope.row.createSelf!=null)|| ban">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteLine(scope.row)"
            :disabled="(!scope.row.createSelf&&scope.row.createSelf!=null)|| ban">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import http from "@/api/common(bj).js";
export default {
  data() {
    return {
      content: "",
      LandData: [],
      ban: false
    };
  },
  methods: {
    queryFunc() {
      if (this.$parent.params.projectGuid != null) {
        // 查询
        let params;
        params = {
          landNo: this.content,
          districtGuid: this.$parent.params.projectGuid,
          landNoGuid: ""
        };
        if (this.$parent.params.source == "原有小区入库") {
          http
            .houseLandNo(params)
            .then(res => {
              if (res.length != undefined && res.length > 0) {
                res.forEach(item => {
                  item.useStart = this.$getDate(item.useStart);
                  item.useEnd = this.$getDate(item.useEnd);
                });
                this.LandData = res;
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          http
            .getlandNoList(params)
            .then(res => {
              if (res) {
                this.LandData = res;
                res.forEach(item => {
                  item.useStart = this.$getDate(item.useStart);
                  item.useEnd = this.$getDate(item.useEnd);
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    reset() {
      this.content = "";
    },
    //新增
    newAdd() {
      //判断是否保存小区
      if (this.$parent.params.projectGuid == "newguid") {
        this.$alert("请先创建小区！", "提示");
        return;
      }
      //打开新的tab页
      this.$parent.openTab({
        id: "LandInfomationEdit",
        label: "新增宗地",
        closable: true,
        meta: {
          state: "2", //1可编辑 0 查看 2新增
          menuId: "landInfomation"
        },
        component: () =>
          import("@/views/houseResource/houseInput/LandInfomationEdit")
      });
    },
    //查看
    check(val) {
      //打开新的tab页
      this.$parent.openTab({
        id: val.guid + "0",
        label: val.landNo,
        closable: true,
        meta: {
          state: "0", //1可编辑 0 查看  2新增
          landNoGuid: val.guid,
          menuId: "landInfomation"
        },
        component: () =>
          import("@/views/houseResource/houseInput/LandInfomationEdit")
      });
    },
    //编辑
    edit(val) {
      //打开新的tab页
      this.$parent.openTab({
        id: val.guid + "1",
        label: val.landNo,
        closable: true,
        meta: {
          state: "1", //1可编辑 0 查看  2新增
          landNoGuid: val.guid,
          menuId: "landInfomation"
        },
        component: () =>
          import("@/views/houseResource/houseInput/LandInfomationEdit")
      });
    },
    //删除
    deleteLine(val) {
      let params = {};
      let data = [];
      data.push(val.guid)
      http
        .landNoDelete(params, data)
        .then(res => {
          if (res) {
            this.queryFunc();
            //发送宗地信息让首页刷新
            this.Event.$emit("LandHouse", { msg: "refresh" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onLoad() {
      //判断是否栋信息进行修改
      this.Event.$on("LandInfomationEdit", data => {
        if (data.msg == "refresh") {
          this.queryFunc();
        }
      });
    }
  },
  created() {
    this.onLoad();
    this.queryFunc();
    if (this.$parent.params.edit === "2") {
      this.ban = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.landInfomation {
  .margin-top-15 {
    margin-top: 15px;
  }
  //总样式增加禁用文字居中，此处单独修改
  /deep/ .quarterMessage_box .el-input.is-disabled .el-input__inner {
    text-align: left;
  }
}
</style>
