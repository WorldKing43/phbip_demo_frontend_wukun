<!--
 * @Author: jyb
 * @Date: 2020-04-29
 * @LastEditors: Please set LastEditors
 * @Description: 房改房录入详情页面
 -->
<template>
  <div style="margin:20px;overflow-y: auto" class="tableStyle">
    <!-- 小区信息 -->
    <TitleStylex title="请选择小区">
      <el-button
        slot="publicTitleLeft"
        size="mini"
        type="primary"
        @click="newCommunity"
        :disabled="this.commmunityList.length==1||(this.$route.query.state=='done')"
        v-if="hasPerm('fygl_fgflr_xzxq')"
      >新增小区</el-button>
      <el-button
        slot="publicTitleLeft"
        size="mini"
        type="primary"
        @click="openOriginalVillageDialog"
        v-if="hasPerm('fygl_fgflr_xzyyxq')"
        :disabled="this.commmunityList.length==1||(this.$route.query.state=='done')"
      >选择原有小区</el-button>
      <el-button
        slot="publicTitleLeft"
        size="mini"
        type="warning"
        @click="deleteProcess"
        :disabled="(this.$route.query.state=='done')||(this.$route.query.activityName=='审核')"
      >案件删除</el-button>
      <el-button
        slot="publicTitleRight"
        size="mini"
        type="primary"
        @click="save"
        :disabled="(this.$route.query.state=='done')||(this.$route.query.activityName=='审核')"
        v-if="hasPerm('fygl_fgflr_bc')"
      >保存</el-button>
    </TitleStylex>
    <el-table
      :data="commmunityList"
      border
      :header-cell-style="globalHeaderStyle"
      :cell-style="globalCellStyle"
    >
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="code" label="小区号"></el-table-column>
      <el-table-column prop="name" label="小区名称"></el-table-column>
      <el-table-column prop="areaName" label="所属区"></el-table-column>
      <el-table-column prop="roadName" label="路(门牌号)"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column
        label="操作"
        width="240px"
        v-if="!(this.$route.query.state=='done')&&!(this.$route.query.activityName=='审核')"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="checkCommmunity(scope.row)">查看</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="editCommmunity(scope.row)"
            :disabled="scope.row.original"
          >编辑</el-button>
          <el-button type="primary" size="mini" @click="deleteCommmunity(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100px"
        v-if="this.$route.query.state=='done'||(this.$route.query.activityName=='审核')"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="checkCommmunity(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 栋信息 -->
    <TitleStylex title="请选择栋">
      <el-button
        slot="publicTitleLeft"
        size="mini"
        type="primary"
        @click="newBuilding"
        v-if="hasPerm('fygl_fgflr_xzd')"
        :disabled="!(this.commmunityList.length==1)||(this.$route.query.state=='done')||(this.$route.query.activityName=='审核')"
      >新增栋</el-button>
      <el-button
        slot="publicTitleLeft"
        size="mini"
        type="primary"
        @click="openOriginalBuildDialog"
        v-if="hasPerm('fygl_fgflr_xzyyd')"
        :disabled="!(this.commmunityList.length==1)||(this.$route.query.state=='done')||(this.$route.query.activityName=='审核')"
      >选择原有栋</el-button>
    </TitleStylex>
    <el-table
      :data="buildList"
      border
      size="mini"
      :header-cell-style="globalHeaderStyle"
      :cell-style="globalCellStyle"
    >
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="districtName" label="小区名称"></el-table-column>
      <el-table-column prop="name" label="栋名称"></el-table-column>
      <el-table-column prop="code" label="栋号"></el-table-column>
      <el-table-column prop="floorCount" label="总楼层"></el-table-column>
      <el-table-column prop="elevator" label="是否带电梯"></el-table-column>
      <el-table-column prop="skirtFloorCount" label="裙楼层数"></el-table-column>
      <el-table-column
        label="操作"
        width="320px"
        v-if="!(this.$route.query.state=='done')&&!(this.$route.query.activityName=='审核')"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="checkBuild(scope.row)">查看</el-button>
          <el-button type="primary" size="mini" @click="newBuilding(scope.row)">复制</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="editBuild(scope.row)"
            :disabled="scope.row.original"
          >编辑</el-button>
          <el-button type="primary" size="mini" @click="deleteBuild(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100px"
        v-if="(this.$route.query.state=='done')||(this.$route.query.activityName=='审核')"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="checkBuild(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 房源信息 -->
    <TitleStylex title="请填写房源信息">
      <el-button
        slot="publicTitleLeft"
        size="mini"
        type="primary"
        @click="newHousing"
        v-if="hasPerm('fygl_fgflr_xzfy')"
        :disabled="(this.buildList.length==0)||(this.$route.query.state=='done')||(this.$route.query.activityName=='审核')"
      >新增房源</el-button>
    </TitleStylex>
    <el-table
      :data="houseList"
      border
      size="mini"
      :header-cell-style="{
          background: '#E6F0FC',
          color: '#606266',
          'text-align': 'center',
          'border-color': '#DBDBDB'
        }"
      :cell-style="{
          'text-align': 'center',
          'border-color': '#DBDBDB'
        }"
    >
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="buildName" label="栋名称"></el-table-column>
      <el-table-column prop="houseNo" label="房号"></el-table-column>
      <el-table-column prop="typeName" label="户型"></el-table-column>
      <el-table-column prop="orientationName" label="朝向"></el-table-column>
      <el-table-column prop="completionArea" label="竣工建筑面积"></el-table-column>
      <el-table-column prop="terraceName" label="平台"></el-table-column>
      <el-table-column prop="floorNo" label="所在楼层"></el-table-column>
      <el-table-column
        label="操作"
        width="320px"
        v-if="!(this.$route.query.state=='done')&&!(this.$route.query.activityName=='审核')"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="checkHouse(scope.row)">查看</el-button>
          <el-button type="primary" size="mini" @click="newHousing(scope.row)">复制</el-button>
          <el-button type="primary" size="mini" @click="editHouse(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="deleteHouse(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100px"
        v-if="(this.$route.query.state=='done')||(this.$route.query.activityName=='审核')"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="checkHouse(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 审核意见 -->
    <TitleStylex
      title="审核意见"
      v-if="this.$route.query.state=='todo'||this.$route.query.state=='done'"
    ></TitleStylex>
    <el-table
      v-if="!(this.flowData.activeName=='受理'||this.opinionList.length==0)"
      :data="opinionList"
      border
      size="mini"
      :header-cell-style="globalHeaderStyle"
      :cell-style="globalCellStyle"
    >
      <el-table-column prop="activitySource" label="环节"></el-table-column>
      <el-table-column prop="dealer" label="办理人"></el-table-column>
      <el-table-column label="办理时间">
        <template slot-scope="scope">{{scope.row.dealTime|dateFormat}}</template>
      </el-table-column>
      <el-table-column prop="remark" label="办理意见"></el-table-column>
    </el-table>
    <div class="checkBox" v-if="this.$route.query.state=='todo'">
      <el-form>
        <el-row :gutter="20">
          <el-form-item label="当前环节:" label-width="5rem">
            <span class="process_p">{{flowData.ACTIVITYNAME }}</span>
          </el-form-item>
          <el-form-item label="办理意见:" label-width="5rem">
            <ContextTextarea v-model="opinion" :list="commonWords"></ContextTextarea>
          </el-form-item>
        </el-row>
      </el-form>
      <div style="text-align:center;margin-bottom: 55px">
        <el-button
          size="mini"
          type="primary"
          v-if="!(this.flowData.ACTIVITYNAME=='受理')"
          @click="returnTask"
        >退回上一环节</el-button>
        <el-button
          size="mini"
          type="primary"
          v-if="!(this.flowData.ACTIVITYNAME=='受理')"
          @click="unsubmit"
        >审核不通过</el-button>
        <el-button size="mini" type="primary" @click="submit">提交</el-button>
      </div>
    </div>
    <!-- 新增、查看、编辑小区/栋/房信息 -->
    <el-dialog
      :title="title"
      :visible.sync="DialogVisible"
      width="60%"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <TitleStylex
        title="小区信息"
        v-if="this.title=='新增小区'||this.title=='查看小区信息'||this.title=='编辑小区信息'"
      ></TitleStylex>
      <div class="tableStyle" v-if="this.title=='新增小区'||this.title=='查看小区信息'||this.title=='编辑小区信息'">
        <table :model="communityDetail">
          <tr>
            <td class="must">小区编号</td>
            <td style="position:relative">
              <el-input size="mini" v-model="communityDetail.code" clearable disabled></el-input>
              <el-button
                size="mini"
                type="primary"
                style="position:absolute;top:5px;right:3px;"
                @click="getDistrictCode"
                v-if="(this.title=='新增小区')"
              >生成</el-button>
            </td>
            <td class="must">小区名称</td>
            <td>
              <el-input
                size="mini"
                v-model="communityDetail.name"
                clearable
                :disabled="this.title=='查看小区信息'"
                @change="createAddress"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="must">所在区</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder
                size="mini"
                clearable
                :disabled="this.title=='查看小区信息'"
                v-model="communityDetail.area"
                @change="createAddress"
              >
                <el-option
                  v-for="(item,index) in areaData"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
            <td>所在街道</td>
            <td>
              <el-input
                size="mini"
                v-model="communityDetail.street"
                clearable
                :disabled="this.title=='查看小区信息'"
                @change="createAddress"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>路（门牌号）</td>
            <td>
              <el-input
                size="mini"
                v-model="communityDetail.roadName"
                clearable
                :disabled="this.title=='查看小区信息'"
                @change="createAddress"
              ></el-input>
            </td>
            <td class="must">详细地址</td>
            <td>
              <el-input
                size="mini"
                v-model="communityDetail.address"
                clearable
                :disabled="this.title=='查看小区信息'"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>总建筑面积</td>
            <td style="position:relative">
              <el-input
                size="mini"
                v-model="communityDetail.totalCoveredArea"
                clearable
                :disabled="this.title=='查看小区信息'"
              ></el-input>
              <span style="position:absolute;top:0px;right:5px;">平方米</span>
            </td>
            <td>竣工时间</td>
            <td>
              <el-date-picker
                style="width:100%"
                size="mini"
                type="date"
                :disabled="this.title=='查看小区信息'"
                v-model="communityDetail.finishConstructionTime"
                clearable
              ></el-date-picker>
            </td>
          </tr>
          <tr>
            <td>是否自管</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder
                size="mini"
                clearable
                :disabled="this.title=='查看小区信息'"
                v-model="communityDetail.selfSupervise"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
            <td>是否自建</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder
                size="mini"
                clearable
                :disabled="this.title=='查看小区信息'"
                v-model="communityDetail.selfBuilt"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>数据维护归属权</td>
            <td>
              <el-input size="mini" v-model="districtMaintainBelongName" clearable disabled></el-input>
            </td>
            <td>小区详细说明</td>
            <td>
              <el-input
                size="mini"
                v-model="communityDetail.remark"
                clearable
                :disabled="this.title=='查看小区信息'"
              ></el-input>
            </td>
          </tr>
        </table>
        <div style="text-align:center;margin-top:5px;" v-if="!(this.title=='查看小区信息')">
          <el-button @click="DialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="addDistrict" size="mini" v-if="(this.title=='新增小区')">确 定</el-button>
          <el-button
            type="primary"
            @click="editDistrictDetail"
            size="mini"
            v-if="(this.title=='编辑小区信息')"
          >确 定</el-button>
        </div>
      </div>
      <TitleStylex title="栋信息" v-if="this.title=='新增栋'||this.title=='查看栋信息'||this.title=='编辑栋信息'"></TitleStylex>
      <div class="tableStyle" v-if="this.title=='新增栋'||this.title=='查看栋信息'||this.title=='编辑栋信息'">
        <table :model="buildDetail">
          <tr>
            <td>小区名称</td>
            <td>
              <el-input size="mini" v-model="buildDetail.districtName" clearable disabled></el-input>
            </td>
            <td class="must">栋号</td>
            <td>
              <el-input
                size="mini"
                v-model="buildDetail.code"
                clearable
                :disabled="this.title=='查看栋信息'"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="must">栋名称</td>
            <td>
              <el-input
                size="mini"
                v-model="buildDetail.name"
                clearable
                :disabled="this.title=='查看栋信息'"
              ></el-input>
            </td>
            <td class="must">是否带电梯</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder
                size="mini"
                clearable
                v-model="buildDetail.elevator"
                :disabled="this.title=='查看栋信息'"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="must">总楼层数</td>
            <td>
              <el-input
                size="mini"
                v-model="buildDetail.floorCount"
                clearable
                :disabled="this.title=='查看栋信息'"
              ></el-input>
            </td>
            <td class="must">裙楼层数</td>
            <td>
              <el-input
                size="mini"
                v-model="buildDetail.skirtFloorCount"
                clearable
                :disabled="this.title=='查看栋信息'"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>建筑面积</td>
            <td style="position:relative">
              <el-input
                size="mini"
                v-model="buildDetail.coveredArea"
                clearable
                :disabled="this.title=='查看栋信息'"
              ></el-input>
              <span style="position:absolute;top:0px;right:5px;">平方米</span>
            </td>
            <td>建筑基础</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder
                size="mini"
                clearable
                :disabled="this.title=='查看栋信息'"
                v-model="buildDetail.buildBasic"
              >
                <el-option
                  v-for="(item,index) in buildBasicData"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>建筑结构</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder
                size="mini"
                clearable
                :disabled="this.title=='查看栋信息'"
                v-model="buildDetail.construction"
              >
                <el-option
                  v-for="(item,index) in constructionData"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
            <td>竣工时间</td>
            <td>
              <el-date-picker
                size="mini"
                type="date"
                v-model="buildDetail.finishConstructionTime"
                :disabled="this.title=='查看栋信息'"
                clearable
              ></el-date-picker>
            </td>
          </tr>
          <tr>
            <td>电梯个数</td>
            <td>
              <el-input
                size="mini"
                v-model="buildDetail.countElevator"
                :disabled="this.title=='查看栋信息'"
                clearable
              ></el-input>
            </td>
            <td>每层户数</td>
            <td>
              <el-input
                size="mini"
                v-model="buildDetail.countFloor"
                :disabled="this.title=='查看栋信息'"
                clearable
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>数据维护归属权</td>
            <td>
              <el-input size="mini" v-model="buildingInfoMaintainBelongName" clearable disabled></el-input>
            </td>
            <td>栋详细说明</td>
            <td>
              <el-input
                size="mini"
                v-model="buildDetail.remark"
                clearable
                :disabled="this.title=='查看栋信息'"
              ></el-input>
            </td>
          </tr>
        </table>
        <div style="text-align:center;margin-top:5px;" v-if="!(this.title=='查看栋信息')">
          <el-button @click="DialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="addBuild" v-if="(this.title=='新增栋')" size="mini">确 定</el-button>
          <el-button
            type="primary"
            @click="editBuildDetail"
            v-if="(this.title=='编辑栋信息')"
            size="mini"
          >确 定</el-button>
        </div>
      </div>
      <TitleStylex
        title="房源信息"
        v-if="this.title=='新增房源'||this.title=='查看房源信息'||this.title=='编辑房源信息'"
      ></TitleStylex>
      <div class="tableStyle" v-if="this.title=='新增房源'||this.title=='查看房源信息'||this.title=='编辑房源信息'">
        <table :model="houseDetail">
          <tr>
            <td>小区名称</td>
            <td>
              <el-input size="mini" v-model="houseDetail.districtName" clearable disabled></el-input>
            </td>
            <td class="must">栋号</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder
                size="mini"
                clearable
                :disabled="this.title=='查看房源信息'"
                v-model="houseDetail.buildNo"
                @change="changeHouseBuildNo(houseDetail.buildNo)"
              >
                <el-option
                  v-for="(item,index) in buildSelectList"
                  :key="index"
                  :label="item.value"
                  :value="item.guid"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="must">栋名称</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder
                size="mini"
                clearable
                :disabled="this.title=='查看房源信息'"
                v-model="houseDetail.buildName"
                @change="changeHouseBuildName(houseDetail.buildName)"
              >
                <el-option
                  v-for="item in buildSelectList"
                  :key="item.guid"
                  :label="item.name"
                  :value="item.guid"
                ></el-option>
              </el-select>
            </td>

            <td class="must">房号</td>
            <td>
              <el-input
                size="mini"
                v-model="houseDetail.houseNo"
                clearable
                :disabled="this.title=='查看房源信息'"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>房产来源</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder
                size="mini"
                clearable
                :disabled="this.title=='查看房源信息'"
                v-model="houseDetail.source"
              >
                <el-option
                  v-for="(item,index) in sourceData"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
            <td>房屋用途</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder
                size="mini"
                clearable
                v-model="houseDetail.function"
                :disabled="this.title=='查看房源信息'"
              >
                <el-option
                  v-for="(item,index) in functionData"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="must">房源性质</td>
            <td>
              <el-select
                style="width: 100%;"
                size="mini"
                v-model="houseDetail.changeAfterNature"
                disabled
              >
                <el-option
                  v-for="(item,index) in changeAfterNatureData"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
            <td class="must">房屋状态</td>
            <td>
              <el-select style="width: 100%;" size="mini" v-model="houseDetail.state" disabled>
                <el-option
                  v-for="(item,index) in stateData"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="must">所在楼层</td>
            <td>
              <el-input
                size="mini"
                v-model="houseDetail.floorNo"
                clearable
                :disabled="this.title=='查看房源信息'"
              ></el-input>
            </td>
            <td class="must">户型</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder
                size="mini"
                clearable
                v-model="houseDetail.houseLayout"
                :disabled="this.title=='查看房源信息'"
              >
                <el-option
                  v-for="(item,index) in houseLayoutData"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="must">朝向</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder
                size="mini"
                clearable
                v-model="houseDetail.orientation"
                :disabled="this.title=='查看房源信息'"
              >
                <el-option
                  v-for="(item,index) in orientationData"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
            <td class="must">平台</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder
                size="mini"
                clearable
                v-model="houseDetail.terrace"
                :disabled="this.title=='查看房源信息'"
              >
                <el-option
                  v-for="(item,index) in terraceData"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="must">是否样板房</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder
                size="mini"
                clearable
                v-model="houseDetail.modelHouses"
                :disabled="this.title=='查看房源信息'"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
            <td class="must">竣工建筑面积</td>
            <td style="position:relative">
              <el-input
                size="mini"
                v-model="houseDetail.completionArea"
                clearable
                :disabled="this.title=='查看房源信息'"
              ></el-input>
              <span style="position:absolute;top:0px;right:5px;">平方米</span>
            </td>
          </tr>
          <tr>
            <td>竣工分摊面积</td>
            <td style="position:relative">
              <el-input
                size="mini"
                v-model="houseDetail.completionShareArea"
                clearable
                :disabled="this.title=='查看房源信息'"
              ></el-input>
              <span style="position:absolute;top:0px;right:5px;">平方米</span>
            </td>
            <td>竣工套内面积</td>
            <td style="position:relative">
              <el-input
                size="mini"
                v-model="houseDetail.completionIndoorArea"
                clearable
                :disabled="this.title=='查看房源信息'"
              ></el-input>
              <span style="position:absolute;top:0px;right:5px;">平方米</span>
            </td>
          </tr>
          <tr>
            <td>数据维护权归属</td>
            <td>
              <el-input size="mini" v-model="maintainRightName" clearable disabled></el-input>
            </td>
            <td>产权归属</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder="点击输入进行相关搜索"
                size="mini"
                clearable
                filterable
                v-model="houseDetail.propertypBelong"
                :disabled="this.title=='查看房源信息'"
              >
                <el-option
                  v-for="(item,index) in propertyList"
                  :key="index"
                  :label="item.value"
                  :value="item.name"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>备注</td>
            <td colspan="3">
              <el-input
                size="mini"
                v-model="houseDetail.specification"
                clearable
                :disabled="this.title=='查看房源信息'"
              ></el-input>
            </td>
          </tr>
        </table>
        <div style="text-align:center;margin-top:5px;" v-if="!(this.title=='查看房源信息')">
          <el-button @click="DialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" size="mini" @click="addHouse" v-if="(this.title=='新增房源')">确 定</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="editHouseDetail"
            v-if="(this.title=='编辑房源信息')"
          >确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 请选择原有小区 -->
    <el-dialog
      title="请选择原有小区"
      :visible.sync="originalVillageDialog"
      width="60%"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <div class="search">
        <el-form size="mini" label-position="left" :model="originalVillageForm" label-width="5rem">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="小区">
                <el-autocomplete
                  class="inline-input"
                  v-model="originalVillageForm.districtName"
                  :fetch-suggestions="getCommunitySelectList"
                  placeholder="请输入内容"
                  :trigger-on-focus="false"
                  :clearable="true"
                  popper-class="select-option"
                  @select="getOriginalVillage(1)"
                  style="width:100%"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所在区">
                <el-select
                  clearable
                  placeholder
                  style="width:100%"
                  v-model="originalVillageForm.area"
                  @change="getOriginalVillage(1)"
                >
                  <el-option
                    v-for="(item,index) in areaData"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所在街道">
                <el-input
                  clearable
                  v-model="originalVillageForm.street"
                  @change="getOriginalVillage(1)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" size="mini" @click="getOriginalVillage(1)">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="table">
        <el-table
          :data="originalVillageList"
          @cell-click="chooseVillage"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column label="#" width="50" align="center">
            <template slot-scope="scope">
              <el-radio class="radio" v-model="villageRadio" :label="scope.$index">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="districtNo" label="小区号"></el-table-column>
          <el-table-column prop="districtName" label="小区名称"></el-table-column>
          <el-table-column prop="areaName" label="所属区"></el-table-column>
          <el-table-column prop="street" label="所在街道"></el-table-column>
          <el-table-column prop="address" label="详细地址"></el-table-column>
          <el-table-column prop="houseCount" label="总套数"></el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="handleOriginalVillageSizeChange"
            @current-change="handleOriginalVillageCurrentChange"
            :current-page="originalVillageInfoPage.currentPage"
            :page-sizes="originalVillageInfoPage.pageSizesList"
            :page-size="originalVillageInfoPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="originalVillageInfoPage.totalNumber"
            background
          ></el-pagination>
        </div>
      </div>
      <div slot="footer" style="text-align:center">
        <el-button size="mini" @click="originalVillageDialog = false">取消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="addOriginalDistrict"
          :disabled="this.originalVillageList==null"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 请选择原有栋 -->
    <el-dialog
      title="请选择原有栋"
      :visible.sync="originalBuildDialog"
      width="70%"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <div class="search">
        <el-form size="mini" label-position="left" :model="originalBuildForm" label-width="6rem">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="栋号">
                <el-input
                  clearable
                  v-model="originalBuildForm.buildNo"
                  @change="getOriginalBuild(1)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="栋名称">
                <el-input
                  clearable
                  v-model="originalBuildForm.buildName"
                  @change="getOriginalBuild(1)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否带电梯">
                <el-select
                  clearable
                  placeholder
                  style="width:100%"
                  v-model="originalBuildForm.elevator"
                  @change="getOriginalBuild(1)"
                >
                  <el-option
                    v-for="item in option"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="总楼层数">
                <el-input
                  clearable
                  v-model="originalBuildForm.floorCount"
                  @change="getOriginalBuild(1)"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="裙楼层数">
                <el-input
                  clearable
                  v-model="originalBuildForm.skirtFloorCount"
                  @change="getOriginalBuild(1)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18" style="text-align:right">
              <el-button type="primary" size="mini" @click="getOriginalBuild(1)">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="table">
        <el-table
          :data="originalBuildList"
          @row-click="chooseBuild"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column label="#" width="50" align="center">
            <template slot-scope="scope">
              <el-radio class="radio" v-model="buildRadio" :label="scope.$index">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="districtName" label="小区名称"></el-table-column>
          <el-table-column prop="buildNo" label="栋号"></el-table-column>
          <el-table-column prop="buildName" label="栋名称"></el-table-column>
          <el-table-column prop="elevator" label="是否带电梯"></el-table-column>
          <el-table-column prop="floorCount" label="总楼层数"></el-table-column>
          <el-table-column prop="skirtFloorCount" label="裙楼层数"></el-table-column>
        </el-table>
        <div style="text-align:right">
          <el-pagination
            @size-change="handleOriginalBuildSizeChange"
            @current-change="handleOriginalBuildCurrentChange"
            :current-page="originalBuildInfoPage.currentPage"
            :page-sizes="originalBuildInfoPage.pageSizesList"
            :page-size="originalBuildInfoPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="originalBuildInfoPage.totalNumber"
            background
          ></el-pagination>
        </div>
      </div>
      <div slot="footer" style="text-align:center">
        <el-button size="mini" @click="originalBuildDialog = false">取消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="addOriginalBuild"
          :disabled="this.originalBuildList==null"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from "vuex";
  import TitleStylex from "@/components/TitleStylex";
  import ContextTextarea from "@/components/ContextTextarea"; //常用意见组件
  import api from "@/api/roomChangeRoomInput";
  import publicMethod from "@/api/publicMethod";
  export default {
    name: "roomChangeRoomInputDetail",
    components: {
      TitleStylex, //标题公共组件
      ContextTextarea
    },
    data() {
      return {
        DialogVisible: false, //小区、栋、房弹框的打开或者关闭
        title: "", //小区、栋、房的标题
        districtMaintainBelongName: "", //小区归属权的中文
        buildingInfoMaintainBelongName: "", //栋归属权的中文
        maintainRightName: "", //数据维护权归属
        allocationRightName: "", //分配权归属单位
        communityDetail: {
          code: "",
          name: "",
          area: "",
          street: "",
          roadName: "",
          address: "",
          totalCoveredArea: "",
          finishConstructionTime: "",
          selfSupervise: "",
          selfBuilt: "",
          districtMaintainBelong: "",
          remark: ""
        }, //小区详情
        districtGuid: "", //小区的guid
        areaData: [], //所在区下拉
        sourceData: [], //房产来源下拉
        functionData: [], //房屋用途下拉
        changeAfterNatureData: [], //房屋性质下拉
        stateData: [], //房源状态下拉
        houseLayoutData: [], //户型下拉
        terraceData: [], //平台
        commmunityList: [], //小区列表
        constructionData: [], //建筑结构下拉
        buildBasicData: [], //建筑基础下拉
        buildDetail: {
          districtName: "",
          code: "",
          name: "未填写",
          elevator: "",
          floorCount: "",
          skirtFloorCount: "",
          coveredArea: "",
          buildBasic: "",
          construction: "",
          finishConstructionTime: "",
          buildingInfoMaintainBelong: "",
          remark: "",
          countElevator: null,
          countFloor: null
        }, //栋详情
        buildList: [], //栋列表
        houseDetail: {
          districtName: "",
          buildName: "",
          buildNo: "",
          houseNo: "",
          source: "",
          function: "",
          changeAfterNature: "11",
          state: "10",
          floorNo: "",
          houseLayout: "",
          orientation: "",
          terrace: "",
          modelHouses: "",
          completionShareArea: "",
          completionIndoorArea: "",
          allocationRight: "",
          maintainRight: "",
          specification: "",
          propertypBelong: "" //产权归属
        }, //房源详情
        selectbuild: {
          buildName: "",
          buildNo: ""
        }, //选中栋下面的栋名称和栋号
        buildSelectList: [], //栋名称下拉
        houseList: [], //房源列表
        buildGuid: "", //栋的guid
        originalVillageDialog: false, //原有小区弹框
        originalVillageForm: {
          districtNo: "",
          districtName: "",
          area: "",
          street: ""
        }, //原有小区列表查询条件
        originalVillageList: [], //原有小区列表展示
        originalVillageInfoPage: {
          currentPage: 1,
          pageSize: 10,
          pageSizesList: [10, 20, 30, 40],
          totalNumber: 0 //数据的总数
        }, //原有小区分页
        villageRadio: false, //原有小区选中的样式
        selectOriginalVillage: {}, //选中的原有小区的数据
        originalBuildDialog: false, //原有栋弹框
        originalBuildForm: {
          buildNo: "",
          buildName: "",
          elevator: "",
          floorCount: "",
          skirtFloorCount: ""
        }, //原有栋列表查询条件
        originalBuildList: [], //原有栋列表展示
        originalBuildInfoPage: {
          currentPage: 1,
          pageSize: 10,
          pageSizesList: [10, 20, 30, 40],
          totalNumber: 0 //数据的总数
        }, //原有小区分页
        buildRadio: false, //原有栋选中的样式
        selectOriginalBuild: {}, //选中的原有栋的数据
        flowData: {
          ACTIVITYNAME: "",
          createUserName: "",
          pid: "",
          taskId: ""
        }, //流程数据
        opinionList: [], //办理意见列表
        options: [
          { value: true, label: "是" },
          { value: false, label: "否" }
        ], //是否下拉菜单
        option: [
          { value: 1, label: "是" },
          { value: 0, label: "否" }
        ],
        opinion: "", //意见
        commonWords: [], //办理意见常用语
        selectCommunityOptions: [], //模糊查询出的小区
        propertyList: [], //产权单位列表
        userName:""
      };
    },
    computed: {},
    methods: {
      //小区模糊查询
      getCommunitySelectList(str, cb) {
        let params = {
          searchContent: this.originalVillageForm.districtName
        };
        publicMethod
          .getCommunityList(params)
          .then(res => {
            for (let i of res) {
              i.value = i.districtNameNo;
            }
            this.selectCommunityOptions = res; //将结果存入下拉小区数据中
            if (this.selectCommunityOptions.length === 0) {
              this.selectCommunityOptions = [{ value: "暂无数据" }];
            }
            cb(this.selectCommunityOptions);
          })
          .catch(err => {
            console.log(err);
          });
      },
      //新增小区
      newCommunity() {
        this.communityDetail = {
          code: "",
          name: "",
          area: "",
          street: "",
          roadName: "",
          address: "",
          totalCoveredArea: "",
          finishConstructionTime: "",
          selfSupervise: "",
          selfBuilt: "",
          districtMaintainBelong: "",
          remark: ""
        };
        this.DialogVisible = true;
        this.title = "新增小区";
        this.getUnit();
      },
      //获取数据维护归属权
      getUnit() {
        let params = {};
        api
          .getUnit(params)
          .then(res => {
            if (this.title == "新增小区") {
              this.communityDetail.districtMaintainBelong = res.value;
              this.districtMaintainBelongName = res.name;
            } else if (this.title == "新增栋") {
              this.buildDetail.buildingInfoMaintainBelong = res.value;
              this.buildingInfoMaintainBelongName = res.name;
            } else if (this.title == "新增房源") {
              this.houseDetail.maintainRight = res.value;
              this.maintainRightName = res.name;
              this.houseDetail.allocationRight = res.value;
              this.allocationRightName = res.name;
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      //生产小区编号
      getDistrictCode() {
        let params = {};
        api
          .getDistrictCode(params)
          .then(res => {
            this.communityDetail.code = res;
          })
          .catch(err => {
            console.log(err);
          });
      },
      //自动生成地址
      createAddress() {
        let name = "";
        if (this.areaData) {
          this.areaData.forEach(ele => {
            if (ele.value == this.communityDetail.area) {
              name = ele.name;
            }
          });
        }
        this.communityDetail.address =
          name + this.communityDetail.street + this.communityDetail.roadName;
      },
      //新增小区确认
      addDistrict() {
        if (!this.communityDetail.code) {
          this.$message({
            message: "请填写小区编号",
            type: "info"
          });
        } else if (!this.communityDetail.name) {
          this.$message({
            message: "请填写小区名称",
            type: "info"
          });
        } else if (!this.communityDetail.area) {
          this.$message({
            message: "请填写所在区",
            type: "info"
          });
        } else if (!this.communityDetail.address) {
          this.$message({
            message: "请填写详细地址",
            type: "info"
          });
        } else {
          this.$confirm("此操作将进行保存, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let params = {
                batchCode: this.$route.query.code
              };
              let data = this.communityDetail;
              api
                .addDistrict(params, data)
                .then(res => {
                  if (res) {
                    this.$message({
                      message: "保存成功",
                      type: "success"
                    });
                    this.DialogVisible = false;
                    this.getInfo();
                  }
                })
                .catch(err => {
                  consoel.log(err);
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消保存"
              });
            });
        }
      },
      //获取小区详情
      getCommunityDetail(val) {
        let params = {
          districtGuid: val.guid,
          batchCode: this.$route.query.code,
          operation: ""
        };
        let data = {};
        api
          .operateDistrict(params, data)
          .then(res => {
            if (res) {
              this.DialogVisible = true;
              this.communityDetail = res;
              this.districtMaintainBelongName = res.districtMaintainBelongName;
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      //查看小区信息
      checkCommmunity(val) {
        this.title = "查看小区信息";
        this.getCommunityDetail(val);
      },
      //编辑小区信息
      editCommmunity(val) {
        this.title = "编辑小区信息";
        this.getCommunityDetail(val);
      },
      //编辑小区信息-确定
      editDistrictDetail() {
        if (!this.communityDetail.code) {
          this.$message({
            message: "请填写小区编号",
            type: "info"
          });
        } else if (!this.communityDetail.name) {
          this.$message({
            message: "请填写小区名称",
            type: "info"
          });
        } else if (!this.communityDetail.area) {
          this.$message({
            message: "请填写所在区",
            type: "info"
          });
        } else if (!this.communityDetail.address) {
          this.$message({
            message: "请填写详细地址",
            type: "info"
          });
        } else {
          this.$confirm("此操作将进行保存, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let params = {
                districtGuid: this.communityDetail.guid,
                batchCode: this.$route.query.code,
                operation: "edit"
              };
              let data = this.communityDetail;
              api
                .operateDistrict(params, data)
                .then(res => {
                  if (res) {
                    this.$message({
                      message: "保存成功",
                      type: "success"
                    });
                    this.DialogVisible = false;
                    this.getInfo();
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消保存"
              });
            });
        }
      },
      //删除小区
      deleteCommmunity(val) {
        let params = {
          districtGuid: val.guid,
          batchCode: this.$route.query.code,
          operation: "delete"
        };
        let data = {};
        api
          .operateDistrict(params, data)
          .then(res => {
            if (res) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getInfo();
              this.Event.$emit("RoomChangeRoomInputTodoBox", "getSearchListTodo");
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      //获取小区名称
      getDistrictName() {
        let params = {
          batchCode: this.$route.query.code
        };
        api
          .getDistrictName(params)
          .then(res => {
            if (this.title == "新增栋") {
              this.districtGuid = res.districtGuid;
              this.buildDetail.districtName = res.districtName;
            } else if (this.title == "新增房源") {
              this.districtGuid = res.districtGuid;
              this.houseDetail.districtName = res.districtName;
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      //新增栋
      newBuilding(val) {
        this.buildDetail = {
          districtName: "",
          code: "",
          name: "未填写",
          elevator: "",
          floorCount: "",
          skirtFloorCount: "",
          coveredArea: "",
          buildBasic: "",
          construction: "",
          finishConstructionTime: "",
          buildingInfoMaintainBelong: "",
          remark: "",
          countElevator: null,
          countFloor: null
        };

        if(val){
          var sfydt =false;
          if( val.elevator=="是"){
            sfydt =true;
          }
          this.buildDetail = {
            districtName: val.districtName,
            code: "",
            name: "",
            elevator: sfydt,
            floorCount: val.floorCount,
            skirtFloorCount: val.skirtFloorCount,
            coveredArea: val.coveredArea,
            buildBasic: val.buildBasic,
            construction: val.construction,
            finishConstructionTime: val.finishConstructionTime,
            buildingInfoMaintainBelong: val.buildingInfoMaintainBelong,
            remark: val.remark,
            countElevator: val.countElevator,
            countFloor: val.countFloor
          };
          this.buildDetail.elevator = sfydt;
        }

        this.DialogVisible = true;
        this.title = "新增栋";
        this.getDistrictName();
        this.getUnit();
      },
      //新增栋确认
      addBuild() {
        if (!this.buildDetail.code) {
          this.$message({
            message: "请填写栋号",
            type: "info"
          });
        } else if (!this.buildDetail.name) {
          this.$message({
            message: "请填写栋名称",
            type: "info"
          });
        } else if (
          (this.buildDetail.elevator === "") ||
          !(
            this.buildDetail.elevator == false ||
            this.buildDetail.elevator == true
          )
        ) {
          if(!this.buildDetail.elevator){
            this.$message({
              message: "请填写是否带电梯",
              type: "info"
            });
          }
        } else if (!this.buildDetail.floorCount) {
          this.$message({
            message: "请填写总楼层数",
            type: "info"
          });
        } else if (!this.buildDetail.skirtFloorCount) {
          this.$message({
            message: "请填写裙楼层数",
            type: "info"
          });
        } else {
          this.$confirm("此操作将进行保存, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let params = {
                batchCode: this.$route.query.code,
                districtGuid: this.districtGuid
              };
              let data = this.buildDetail;
              api
                .addBuild(params, data)
                .then(res => {
                  if (res) {
                    this.$message({
                      message: "保存成功",
                      type: "success"
                    });
                    this.DialogVisible = false;
                    this.getInfo();
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消保存"
              });
            });
        }
      },
      //获取栋详情
      getBuildDetail(val) {
        let params = {
          buildGuid: val.guid,
          batchCode: this.$route.query.code,
          operation: ""
        };
        let data = {};
        api
          .operateBuild(params, data)
          .then(res => {
            if (res) {
              this.DialogVisible = true;
              this.buildDetail = res;
              this.buildingInfoMaintainBelongName =
                res.buildingInfoMaintainBelongName;
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      //查看栋
      checkBuild(val) {
        this.title = "查看栋信息";
        this.getBuildDetail(val);
      },
      //编辑栋信息
      editBuild(val) {
        this.title = "编辑栋信息";
        this.getBuildDetail(val);
      },
      //编辑栋信息-确定
      editBuildDetail() {
        if (!this.buildDetail.code) {
          this.$message({
            message: "请填写栋号",
            type: "info"
          });
        } else if (!this.buildDetail.name) {
          this.$message({
            message: "请填写栋名称",
            type: "info"
          });
        } else if (this.buildDetail.elevator === "") {
          this.$message({
            message: "请填写是否带电梯",
            type: "info"
          });
        } else if (!this.buildDetail.floorCount) {
          this.$message({
            message: "请填写总楼层数",
            type: "info"
          });
        } else if (this.buildDetail.skirtFloorCount === "") {
          this.$message({
            message: "请填写裙楼层数",
            type: "info"
          });
        } else {
          this.$confirm("此操作将进行保存, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let params = {
                buildGuid: this.buildDetail.guid,
                batchCode: this.$route.query.code,
                operation: "edit"
              };
              let data = this.buildDetail;
              api
                .operateBuild(params, data)
                .then(res => {
                  if (res) {
                    this.$message({
                      message: "保存成功",
                      type: "success"
                    });
                    this.DialogVisible = false;
                    this.getInfo();
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消保存"
              });
            });
        }
      },
      //删除栋
      deleteBuild(val) {
        let params = {
          buildGuid: val.guid,
          batchCode: this.$route.query.code,
          operation: "delete"
        };
        let data = {};
        api
          .operateBuild(params, data)
          .then(res => {
            if (res) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getInfo();
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      //获取下拉的栋名称
      getBuildName() {
        let params = {
          batchCode: this.$route.query.code
        };
        api
          .getBuildName(params)
          .then(res => {
            this.buildSelectList = res;
            // this.buildGuid = res[0].guid;
          })
          .catch(err => {
            console.log(err);
          });
      },
      //改变房源信息栋名称
      changeHouseBuildName(val) {
        if (this.buildSelectList) {
          this.buildSelectList.forEach(ele => {
            if (ele.guid == val) {
              this.houseDetail.buildNo = ele.guid;
              this.buildGuid = ele.guid;
              this.selectbuild.buildName = ele.name;
              this.selectbuild.buildNo = ele.value;
            }
          });
        }
      },
      //改变房源信息栋号
      changeHouseBuildNo(val) {
        if (this.buildSelectList) {
          this.buildSelectList.forEach(ele => {
            if (ele.guid == val) {
              this.houseDetail.buildName = ele.guid;
              this.buildGuid = ele.guid;
              this.selectbuild.buildName = ele.name;
              this.selectbuild.buildNo = ele.value;
            }
          });
        }
      },
      //新增房源
      newHousing(val) {
        this.DialogVisible = true;
        this.houseDetail = {
          districtName: "",
          buildName: "",
          buildNo: "",
          houseNo: "",
          source: "",
          function: "",
          changeAfterNature: "11",
          state: "10",
          floorNo: "",
          houseLayout: "",
          orientation: "",
          terrace: "",
          modelHouses: "",
          completionShareArea: "",
          completionIndoorArea: "",
          allocationRight: "",
          maintainRight: "",
          specification: "",
          propertypBelong: ""
        };
        if(val){
          this.houseDetail = {
            districtName: val.districtName,
            buildName: val.buildName,
            buildNo: val.buildNo,
            houseNo: "",
            source: val.source,
            function: val.function,
            changeAfterNature: val.changeAfterNature||"11",
            state: val.state||"10",
            floorNo: val.floorNo,
            houseLayout: val.houseLayout,
            orientation: val.orientation,
            terrace: val.terrace,
            modelHouses: val.modelHouses,
            completionShareArea: val.completionShareArea,
            completionIndoorArea: val.completionIndoorArea,
            allocationRight: val.allocationRight,
            maintainRight: val.maintainRight,
            completionArea: val.completionArea,
            specification: val.specification,
            propertypBelong: val.propertypBelong
          };
        }
        this.title = "新增房源";
        this.getDistrictName();
        this.getBuildName();
        this.getUnit();
        this.getPropertyUnit(); //获取产权归属下拉框
      },
      //新增房源确认
      addHouse() {
        if (!this.selectbuild.buildNo) {
          this.$message({
            message: "请填写栋号",
            type: "info"
          });
        } else if (!this.selectbuild.buildName) {
          this.$message({
            message: "请填写栋名称",
            type: "info"
          });
        } else if (!this.houseDetail.houseNo) {
          this.$message({
            message: "请填写房号",
            type: "info"
          });
        } else if (!this.houseDetail.changeAfterNature) {
          this.$message({
            message: "请填写房源性质",
            type: "info"
          });
        } else if (!this.houseDetail.state) {
          this.$message({
            message: "请填写房屋状态",
            type: "info"
          });
        } else if (!this.houseDetail.floorNo) {
          this.$message({
            message: "请填写所在楼层",
            type: "info"
          });
        } else if (!this.houseDetail.houseLayout) {
          this.$message({
            message: "请填写户型",
            type: "info"
          });
        } else if (!this.houseDetail.orientation) {
          this.$message({
            message: "请填写朝向",
            type: "info"
          });
        } else if (!this.houseDetail.terrace) {
          this.$message({
            message: "请填写平台",
            type: "info"
          });
        } else if (
          (this.houseDetail.modelHouses === "") |
          !(
            this.houseDetail.modelHouses == false ||
            this.houseDetail.modelHouses == true
          )
        ) {
          this.$message({
            message: "请填写是否样板房",
            type: "info"
          });
        } else if (!this.houseDetail.completionArea) {
          this.$message({
            message: "请填写竣工建筑面积",
            type: "info"
          });
        } else {
          this.$confirm("此操作将进行保存, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let params = {
                districtGuid: this.districtGuid,
                batchCode: this.$route.query.code,
                buildGuid: this.buildGuid
              };
              let data = this.houseDetail;
              data.buildName = this.selectbuild.buildName;
              data.buildNo = this.selectbuild.buildNo;
              api
                .addHouse(params, data)
                .then(res => {
                  if (res) {
                    this.$message({
                      message: "保存成功",
                      type: "success"
                    });
                    this.DialogVisible = false;
                    this.getInfo();
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消保存"
              });
            });
        }
      },
      //获取房源详情
      getHouseDetail(val) {
        let params = {
          houseGuid: val.guid,
          batchCode: this.$route.query.code,
          operation: ""
        };
        let data = {};
        api
          .operateHouse(params, data)
          .then(res => {
            if (res) {
              this.DialogVisible = true;
              this.houseDetail = res;
              this.maintainRightName = res.maintainRightUnit;
              this.allocationRightName = res.allocationRightUnit;
            }
            this.getPropertyUnit(); //获取产权归属下拉框
          })
          .catch(err => {
            console.log(err);
          });
      },
      //查看房源
      checkHouse(val) {
        this.title = "查看房源信息";
        this.getHouseDetail(val);
      },
      //编辑房源
      editHouse(val) {
        this.title = "编辑房源信息";
        this.getHouseDetail(val);
      },
      //编辑房源信息确认
      editHouseDetail() {
        if (!this.houseDetail.buildNo) {
          this.$message({
            message: "请填写栋号",
            type: "info"
          });
        } else if (!this.houseDetail.buildName) {
          this.$message({
            message: "请填写栋名称",
            type: "info"
          });
        } else if (!this.houseDetail.houseNo) {
          this.$message({
            message: "请填写房号",
            type: "info"
          });
        } else if (!this.houseDetail.changeAfterNature) {
          this.$message({
            message: "请填写房源性质",
            type: "info"
          });
        } else if (!this.houseDetail.state) {
          this.$message({
            message: "请填写房屋状态",
            type: "info"
          });
        } else if (!this.houseDetail.floorNo) {
          this.$message({
            message: "请填写所在楼层",
            type: "info"
          });
        } else if (!this.houseDetail.houseLayout) {
          this.$message({
            message: "请填写户型",
            type: "info"
          });
        } else if (!this.houseDetail.orientation) {
          this.$message({
            message: "请填写朝向",
            type: "info"
          });
        } else if (!this.houseDetail.terrace) {
          this.$message({
            message: "请填写平台",
            type: "info"
          });
        } else if (
          (this.houseDetail.modelHouses === "") |
          !(
            this.houseDetail.modelHouses == false ||
            this.houseDetail.modelHouses == true
          )
        ) {
          this.$message({
            message: "请填写是否样板房",
            type: "info"
          });
        } else if (!this.houseDetail.completionArea) {
          this.$message({
            message: "请填写竣工建筑面积",
            type: "info"
          });
        } else {
          this.$confirm("此操作将进行保存, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let params = {
                houseGuid: this.houseDetail.guid,
                batchCode: this.$route.query.code,
                operation: "edit"
              };
              let data = this.houseDetail;
              data.buildName = this.selectbuild.buildName;
              data.buildNo = this.selectbuild.buildNo;
              api
                .operateHouse(params, data)
                .then(res => {
                  if (res) {
                    this.$message({
                      message: "保存成功",
                      type: "success"
                    });
                    this.DialogVisible = false;
                    this.getInfo();
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消保存"
              });
            });
        }
      },
      //删除房源
      deleteHouse(val) {
        let params = {
          houseGuid: val.guid,
          batchCode: this.$route.query.code,
          operation: "delete"
        };
        let data = {};
        api
          .operateHouse(params, data)
          .then(res => {
            if (res) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getInfo();
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      //获取小区列表、栋列表、房列表
      getInfo() {
        let params = {
          code: this.$route.query.code
        };
        api
          .getInfo(params)
          .then(res => {
            this.commmunityList = res.district;
            if (res.build) {
              res.build.forEach(ele => {
                if (ele.elevator == true) {
                  ele.elevator = "是";
                } else if (ele.elevator == false) {
                  ele.elevator = "否";
                }
              });
            }
            this.buildList = res.build;
            this.houseList = res.house;
          })
          .catch(err => {
            console.log(err);
          });
      },
      //打开选择原有小区弹框
      openOriginalVillageDialog() {
        this.originalVillageDialog = true;
        this.getOriginalVillage();
      },
      //原有小区查询
      getOriginalVillage(index) {
        this.villageRadio = false;
        if (index) {
          this.originalVillageInfoPage.currentPage = index;
        }
        let params = {
          districtNo: this.originalVillageForm.districtNo,
          districtName: this.originalVillageForm.districtName,
          area: this.originalVillageForm.area,
          street: this.originalVillageForm.street,
          pageIndex: this.originalVillageInfoPage.currentPage,
          pageSize: this.originalVillageInfoPage.pageSize
        };
        api
          .getDistrictList(params)
          .then(res => {
            console.log(res);
            this.originalVillageList = res.content;
            this.originalVillageInfoPage.totalNumber = res.totalElements;
          })
          .catch(err => {
            console.log(err);
          });
      },
      //原有小区每页大小变化
      handleOriginalVillageSizeChange(val) {
        this.originalVillageInfoPage.pageSize = val;
        this.getOriginalVillage(1);
      },
      //原有小区当前页码变化
      handleOriginalVillageCurrentChange(val) {
        this.originalVillageInfoPage.currentPage = val;
        this.getOriginalVillage();
      },
      //选中小区的数据
      chooseVillage(val) {
        if (val) {
          this.originalVillageList.forEach((item, index) => {
            if (item.guid === val.guid) {
              this.villageRadio = index;
              this.selectOriginalVillage = val;
            }
          });
        }
      },
      //保存选中的原有小区
      addOriginalDistrict() {
        this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$startLoading();
            let params = {
              batchCode: this.$route.query.code,
              districtGuid: this.selectOriginalVillage.guid
            };
            api
              .addOriginalDistrict(params)
              .then(res => {
                if (res) {
                  this.$message({
                    message: "保存成功",
                    type: "success"
                  });
                  this.originalVillageDialog = false;
                  this.villageRadio = false;
                  this.getInfo();
                  this.$endLoading()
                }
              })
              .catch(err => {
                console.log(err);
                this.$endLoading()
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消保存"
            });
          });
      },
      //打开选择原有栋弹框
      openOriginalBuildDialog() {
        this.BuildRadio = false;
        this.originalBuildDialog = true;
        this.getOriginalBuild();
      },
      //原有栋查询
      getOriginalBuild(index) {
        this.buildRadio = false;
        if (index) {
          this.originalBuildInfoPage.currentPage = index;
        }
        let params = {
          batchCode: this.$route.query.code,
          buildNo: this.originalBuildForm.buildNo,
          buildName: this.originalBuildForm.buildName,
          elevator: this.originalBuildForm.elevator,
          floorCount: this.originalBuildForm.floorCount,
          skirtFloorCount: this.originalBuildForm.skirtFloorCount,
          pageIndex: this.originalBuildInfoPage.currentPage,
          pageSize: this.originalBuildInfoPage.pageSize
        };
        api
          .getBuildList(params)
          .then(res => {
            if (res.content) {
              res.content.forEach(ele => {
                if (ele.elevator == 0) {
                  ele.elevator = "否";
                } else if (ele.elevator == 1) {
                  ele.elevator = "是";
                }
              });
            }
            this.originalBuildList = res.content;
            this.originalBuildInfoPage.totalNumber = res.totalElements;
          })
          .catch(err => {
            console.log(err);
          });
      },
      //原有栋每页大小变化
      handleOriginalBuildSizeChange(val) {
        this.originalBuildInfoPage.pageSize = val;
        this.getOriginalBuild(1);
      },
      //原有栋当前页码变化
      handleOriginalBuildCurrentChange(val) {
        this.originalBuildInfoPage.currentPage = val;
        this.getOriginalBuild();
      },
      //选中原有栋的数据
      chooseBuild(val) {
        if (val) {
          this.originalBuildList.forEach((item, index) => {
            if (item.guid === val.guid) {
              this.buildRadio = index;
              this.selectOriginalBuild = val;
            }
          });
        }
      },
      //保存选中的原有栋
      addOriginalBuild() {
        this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$startLoading()
            let params = {
              batchCode: this.$route.query.code,
              buildGuid: this.selectOriginalBuild.guid
            };
            api
              .addOriginalBuild(params)
              .then(res => {
                if (res) {
                  this.$message({
                    message: "保存成功",
                    type: "success"
                  });
                  this.originalBuildDialog = false;
                  this.BuildRadio = false;
                  this.getInfo();
                  this.$endLoading()
                }
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消保存"
            });
          });
      },
      //保存
      save() {
        this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$startLoading()
            let params = {
              batchCode: this.$route.query.code
            };
            api
              .addInfo(params)
              .then(res => {
                if (res) {
                  this.$message({
                    message: "保存成功",
                    type: "success"
                  });
                  if (res.TID) {
                    this.flowData.ACTIVITYNAME = res.activityName;
                    this.flowData.createUserName = res.loginName;
                    this.flowData.pid = res.PID;
                    this.flowData.taskId = res.TID;
                    this.closeTopTab();
                    let val = {
                      guid: res.batchCode,
                      state: "todo",
                      taskId: res.TID,
                      name: res.districtName,
                      activityName: res.activityName
                    };
                    this.openCache(res);
                    this.openDetail(val);
                  }
                  this.saveTempOpinion();
                  this.Event.$emit(
                    "RoomChangeRoomInputTodoBox",
                    "getSearchListTodo"
                  );
                  this.$endLoading()
                }
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消保存"
            });
          });
      },
      deleteProcess() {
        this.$confirm("此操作将进行案件删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let params = {
              code: this.$route.query.code
            };
            api
              .processDelete(params)
              .then(res => {
                if (res) {
                  this.$message({
                    message: "删除成功",
                    type: "success"
                  });
                }
                this.closeTopTab();
                this.Event.$emit(
                  "RoomChangeRoomInputTodoBox",
                  "getSearchListTodo"
                );
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消保存"
            });
          });
      },
      //领取任务
      openCache(val) {
        let params = {
          taskId: val.TID
        };
        api
          .openCache(params)
          .then(res => {})
          .catch(err => {
            console.log(err);
          });
      },
      //跳转页面
      openDetail(val) {
        let tab = {
          route: "/roomChangeRoomInputDetail",
          query: {
            code: val.guid,
            state: val.state,
            taskId: val.taskId,
            activityName: val.activityName
          },
          name: val.name,
          type: "single"
        };
        this.openTopTab(tab);
      },
      //获取流程数据
      getProcessInfo() {
        let params = {
          taskId: this.$route.query.taskId
        };
        publicMethod
          .getProcessInfo(params)
          .then(res => {
            this.flowData.ACTIVITYNAME = res[0].ACTIVITYNAME;
            this.flowData.createUserName = res[0].CREATEUSERNAME;
            this.flowData.pid = res[0].PID;
            this.flowData.taskId = res[0].TID;
            this.getOpionionList();
          })
          .catch(err => {
            console.log(err);
          });
      },
      //提交
      submit() {
        if (!this.opinion) {
          this.$alert("请填写办理意见", "提示");
        } else {
          let params = {
            batchCode: this.$route.query.code
          };
          this.$startLoading()

          api.addInfo(params).then(res => {
            if (res) {
              if (res.TID) {
                this.flowData.ACTIVITYNAME = res.activityName;
                this.flowData.createUserName = res.loginName;
                this.flowData.pid = res.PID;
                this.flowData.taskId = res.TID;
                this.closeTopTab();
                let val = {
                  guid: res.batchCode,
                  state: "todo",
                  taskId: res.TID,
                  name: res.districtName
                };
                this.openCache(res);
                this.openDetail(val);
              }
              this.saveTempOpinion();
              //保存之后，在进行提交--防止之前没保存，不管保存没保存，都保存之后，在提交
              let params = {
                code: this.$route.query.code,
                taskId: this.flowData.taskId,
                activityName: this.flowData.ACTIVITYNAME,
                sendSMS: false,
                recordLog: false
              };
              api
                .submit(params)
                .then(res => {
                  if (res) {
                    this.$message({
                      message: "流程提交成功",
                      type: "success"
                    });
                    this.saveOpinion();
                    this.closeTopTab();
                    //待办箱刷新广播
                    this.Event.$emit(
                      "RoomChangeRoomInputTodoBox",
                      "getSearchListTodo"
                    );
                    //已办箱刷新广播
                    this.Event.$emit("RoomChangeRoomInputDoneBox", "getSearchListDone");
                    this.$endLoading()
                  }
                })
                .catch(err => {
                  console.log(err);
                  this.$endLoading()
                });
            }
          });
        }
      },
      //流程回退
      returnTask() {
        if (!this.opinion) {
          this.$alert("请填写办理意见", "提示");
        } else {
          let params = {
            code: this.$route.query.code,
            taskId: this.flowData.taskId,
            activityName: this.flowData.ACTIVITYNAME,
            sendSMS: false,
            recordLog: false
          };
          let data = {};
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          api.returnTask(params, data).then(res => {
            if (res) {
              this.$message({
                message: "流程回退成功",
                type: "success"
              });
              this.saveOpinion();
              this.closeTopTab();
              //待办箱刷新广播
              this.Event.$emit("RoomChangeRoomInputTodoBox", "getSearchListTodo");
              //已办箱刷新广播
              this.Event.$emit("RoomChangeRoomInputDoneBox", "getSearchListDone")
              loading.close()
            }
          }).catch(err => {
            console.log(err);
            loading.close()
          });
        }
      },
      //流程不通过
      unsubmit() {
        if (!this.opinion) {
          this.$alert("请填写办理意见", "提示");
        } else {
          let params = {
            code: this.$route.query.code
          };
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          api.unsubmit(params).then(res => {
            if (res) {
              this.$message({
                message: "流程提交不通过成功",
                type: "success"
              });
              this.saveOpinion();
              this.closeTopTab();
              //待办箱刷新广播
              this.Event.$emit("RoomChangeRoomInputTodoBox", "getSearchListTodo");
              //已办箱刷新广播
              this.Event.$emit("RoomChangeRoomInputDoneBox", "getSearchListDone")
              loading.close()
            }
          }).catch(err => {
            console.log(err);
            loading.close()
          });
        }
      },
      //获取办理意见列表
      getOpionionList() {
        let params = {
          pid: this.flowData.pid
        };
        publicMethod
          .getOpinion(params)
          .then(res => {
            this.opinionList = res;
          })
          .catch(err => {
            console.log(err);
          });
      },
      //获取暂存意见
      getTempOpinion() {
        let params = {
          taskId: this.flowData.taskId
        };
        publicMethod
          .getTempOpinion(params)
          .then(res => {
            this.opinion = res.remark;
          })
          .catch(err => {
            console.log(err);
          });
      },
      //保存暂存意见
      saveTempOpinion() {
        if (
          this.flowData.taskId &&
          this.flowData.ACTIVITYNAME &&
          this.flowData.pid
        ) {
          let params = { taskId: this.flowData.taskId };
          let data = {
            activitySource: this.flowData.ACTIVITYNAME, //来源环节
            businessType: "房改房录入", //业务类型
            dealTime: new Date(), //办理时间
            dealer: this.userName, //办理人
            pid: this.flowData.pid,
            remark: this.opinion //办理意见
          };
          publicMethod
            .saveTempOpinion(params, data)
            .then(res => {
              console.log("保存暂存意见成功");
              this.getTempOpinion();
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      //提交下一环节保存办理意见
      saveOpinion() {
        let data = {
          activitySource: this.flowData.ACTIVITYNAME, //来源环节
          businessType: "房改房录入", //业务类型
          dealTime: new Date(), //办理时间
          dealer: this.userName, //办理人
          pid: this.flowData.pid,
          remark: this.opinion,
          taskId: this.flowData.taskId
        };
        let params = { taskId: this.flowData.taskId };
        publicMethod
          .saveOpinion(params, data)
          .then(res => {})
          .catch(err => {
            console.log(err);
          });
      },
      //获取全部的产权单位
      getPropertyUnit() {
        let params = {};
        publicMethod
          .getPropertyUnit(params)
          .then(res => {
            this.propertyList = res;
          })
          .catch(err => {
            console.log(err);
          });
      },     
      getUserName(){
        let params= {};
        api.getUserName(params).then(res =>{
          if(res){
            this.userName = res.userName
          }
        })
      },
      //获取字典数据
      getDictionary() {
        let nameData = [
          "所属区",
          "房产来源",
          "房屋用途",
          "房屋性质",
          "房屋状态",
          "户型",
          "朝向",
          "平台",
          "办理意见常用语",
          "建筑基础",
          "建筑结构"
        ];
        let params = { names: nameData.toString() };
        api
          .getDictionary(params)
          .then(res => {
            res = JSON.parse(res);
            this.areaData = res.所属区;
            this.sourceData = res.房产来源;
            this.functionData = res.房屋用途;
            this.stateData = res.房屋状态;
            this.houseLayoutData = res.户型;
            this.buildBasicData = res.建筑基础;
            this.constructionData = res.建筑结构;
            this.terraceData = res.平台;
            this.orientationData = this.$dictionaryChange(
              res.朝向,
              this.orientationData,
              "通用"
            );
            this.changeAfterNatureData = this.$dictionaryChange(
              res.房屋性质,
              this.changeAfterNatureData,
              "通用"
            );
            this.commonWords = this.$dictionaryChange(
              res.办理意见常用语,
              this.commonWords,
              "房源分配常用意见"
            );
          })
          .catch(err => {
            console.log(err);
          });
      },

    },
    created() {
      this.getUserName();
      this.getDictionary();
      // this.getPropertyUnit();
      if (this.$route.query.state == "new") {
      } else if (this.$route.query.state == "todo") {
        this.getProcessInfo();
        this.getInfo();
      } else if (this.$route.query.state == "done") {
        this.getProcessInfo();
        this.getInfo();
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
