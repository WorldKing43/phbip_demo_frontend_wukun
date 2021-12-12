<!--宗地信息列表-->
<template>
  <div class="GroundInformation">
    <div>
      <!--查询栏-->
      <div class="top">
        <el-form ref="form" :model="form" label-width="5rem" size="mini">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="宗地号">
                <el-input v-model="form.landNo" clearable @blur="searchGroundInfo()"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item>
                <div>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="searchGroundInfo"
                    v-if="hasPerm('fygl_rksp_zdxx_cx')"
                    style="margin-right:10px"
                  >查询</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="reset"
                    v-if="hasPerm('fygl_rksp_zdxx_cz')"
                  >重置</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div>
        <el-button
          type="primary"
          size="mini"
          @click="newGroundInformation"
          :disabled="!(this.$parent.params.activityName == '资产运维部初审')&&this.$route.query.itemName == '原有小区入库'"
          v-if="!(this.$route.params.state =='done') && hasPerm('fygl_rksp_zdxx_xz')"
        >新增</el-button>
      </div>
      <!--结果列表-->
      <div class="table-list" style="margin-top: 10px;margin-bottom:10px;">
        <el-table
          :data="groundList"
          border
          ref="houseTable"
          size="mini"
          style="width: 100%"
          class="w100"
          :header-cell-style="{
            'background': '#E6F0FC',
            'color': '#606266',
            'text-align':'center',
            'border-color': '#DBDBDB',
          }"
          :cell-style="{
              'text-align':'center',
              'border-color': '#DBDBDB',
          }"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="landNo" label="宗地号"></el-table-column>
          <el-table-column prop="contractNo" label="合同号"></el-table-column>
          <el-table-column prop="landArea" label="土地面积"></el-table-column>
          <el-table-column prop="landUsed" label="土地用途"></el-table-column>
          <el-table-column label="使用期始">
            <template slot-scope="scope">
              {{
              scope.row.useStart | dateFormat
              }}
            </template>
          </el-table-column>
          <el-table-column label="使用期止">
            <template slot-scope="scope">{{scope.row.useEnd| dateFormat}}</template>
          </el-table-column>
          <el-table-column prop="arerName" label="所在区"></el-table-column>
          <el-table-column
            label="操作"
            width="240px"
            v-if="(this.$route.params.state =='todo'&&this.$parent.params.activityName == '资产运维部初审')&&this.$route.query.itemName != '原有小区入库'"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="checkGroundInfo(scope.row)"
                v-if="hasPerm('fygl_rksp_zdxx_ck')"
              >查看</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="editGroundInfo(scope.row)"
                v-if="hasPerm('fygl_rksp_zdxx_bj')"
              >编辑</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="deleteGroundInfo(scope.row)"
                v-if="hasPerm('fygl_rksp_zdxx_sc')"
              >删除</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100px"
            v-if="!(this.$route.params.state =='todo'&&this.$parent.params.activityName == '资产运维部初审')||this.$route.query.itemName == '原有小区入库'"
          >
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="checkGroundInfo(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/api/houseApproval";
export default {
  name: "buildinginfo",
  data() {
    return {
      districtGuid: "", //小区的guid
      form: {}, //查询条件
      groundList: [], //宗地号列表
      options: [
        { value: true, label: "是", name: "是" },
        { value: false, label: "否", name: "否" }
      ],
      buildingData: [{}], //栋列表信息
      selectedData: [] //选中的数据
    };
  },
  methods: {
    //查询宗地信息列表
    searchGroundInfo() {
      let params = {
        districtGuid: this.districtGuid,
        landNo: this.form.landNo
      };
      api
        .getLandList(params)
        .then(res => {
          this.groundList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //重置
    reset() {
      this.form = {};
    },
    //查看宗地信息详情
    checkGroundInfo(val) {
      val.state = "check";
      val.guids = "查看" + val.guid;
      val.landNos = "查看" + val.landNo;
      this.openDetail(val);
    },
    //新增宗地信息列表
    newGroundInformation() {
      let val = {};
      val.guid = "new";
      val.guids = "新增" + val.guid;
      val.landNos = "新增宗地";
      val.state = "new";
      this.openDetail(val);
    },
    //编辑宗地信息详情
    editGroundInfo(val) {
      val.state = "edit";
      val.guids = "编辑" + val.guid;
      val.landNos = "编辑" + val.landNo;
      this.openDetail(val);
    },
    //删除宗地信息详情
    deleteGroundInfo(val) {
      let params = {
        landGuid: val.guid,
        operate: "delete"
      };
      let data = {};
      api
        .editLand(params, data)
        .then(res => {
          if (res) {
            this.searchGroundInfo();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.Event.$emit("CommunityInformation", "getNeighbourhoodDetail");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    openDetail(val) {
      this.$parent.openTab({
        id: val.guids,
        label: val.landNos || "宗地详情",
        closable: true,
        meta: {
          landGuid: val.guid,
          state: val.state,
          menuId: "3"
        },
        component: () =>
          import(
            "@/views/houseManagement/houseapproval/approvalDetails/GroundDetail"
          )
      });
    }
  },
  created() {
    this.districtGuid = this.$parent.params.districtGuid;
    if (this.districtGuid) {
      this.searchGroundInfo();
    }
  },
  mounted() {
    this.Event.$on("GroundInformation", data => {
      if (data == "searchGroundInfo") {
        this.searchGroundInfo();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
