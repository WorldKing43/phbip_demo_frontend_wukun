<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-19 19:28:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-31 11:28:07
 -->
<!--真空房查询-->
<template>
  <div id="vacuumRoominquire" class="page-detail">
    <div class="content">
      <div class="contentColor">
        <div class="top">
          <el-form ref="form" :model="form" label-width="7.5rem" size="mini">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="小区">
                  <el-autocomplete
                    class="inline-input"
                    v-model="form.districtName"
                    :fetch-suggestions="getCommunitySelectList"
                    placeholder="请输入内容"
                    :trigger-on-focus="false"
                    :clearable="true"
                    popper-class="select-option"
                    style="width: 100%"
                    @select="getHouseList(1)"
                  ></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="栋号">
                  <el-input
                    v-model="form.buildNo"
                    clearable
                    @change="getHouseList(1)"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="栋名称">
                  <el-input
                    v-model="form.buildName"
                    clearable
                    @change="getHouseList(1)"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="房号">
                  <el-input
                    v-model="form.houseNo"
                    clearable
                    @change="getHouseList(1)"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="户型">
                  <el-select
                    v-model="form.type"
                    placeholder="--请选择--"
                    class="w100"
                    clearable
                    multiple
                    @change="getHouseList(1)"
                  >
                    <el-option
                      :label="item.name"
                      :value="item.value"
                      v-for="item in typeData"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预测绘建筑面积">
                  <el-row :gutter="0">
                    <el-col :span="10">
                      <el-input
                        v-model="form.coveredAreaMin"
                        clearable
                        @change="getHouseList(1)"
                      ></el-input>
                    </el-col>
                    <el-col class="line" :span="4" style="text-align: center"
                      >-</el-col
                    >
                    <el-col :span="10">
                      <el-input
                        v-model="form.coveredAreaMax"
                        clearable
                        @change="getHouseList(1)"
                      ></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="朝向">
                  <el-select
                    v-model="form.orientation"
                    placeholder="--请选择--"
                    class="w100"
                    clearable
                    multiple
                    @change="getHouseList(1)"
                  >
                    <el-option
                      :label="item.name"
                      :value="item.value"
                      v-for="item in orientationData"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="维修状态" label-width="7rem">
                  <el-select
                    style="width: 100%"
                    v-model="form.maintainType"
                    placeholder="请选择"
                    @change="getHouseList(1)"
                    clearable
                  >
                    <el-option
                      v-for="(item, index) in stateList"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="show" class="show">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="房产来源">
                    <el-select
                      v-model="form.source"
                      placeholder="--请选择--"
                      class="w100"
                      clearable
                      multiple
                      @change="getHouseList(1)"
                    >
                      <el-option
                        :label="item.name"
                        :value="item.value"
                        v-for="item in sourceData"
                        :key="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="产权归属">
                    <el-select
                      v-model="form.propertyRight"
                      placeholder="--请选择--"
                      class="w100"
                      clearable
                      multiple
                      filterable
                      @change="getHouseList(1)"
                    >
                      <el-option
                        v-for="(item, index) in selectPropertyRightUnitOptions"
                        :label="item.value"
                        :value="item.name"
                        :key="index"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="数据运维权">
                    <el-select
                      v-model="form.operationalRight"
                      placeholder="--请选择--"
                      class="w100"
                      clearable
                      filterable
                      @change="getHouseList(1)"
                    >
                      <el-option
                        v-for="item in maintenanceUnit"
                        :label="item.name"
                        :value="item.value"
                        :key="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label="竣工建筑面积">
                    <el-row :gutter="0">
                      <el-col :span="11">
                        <el-input
                          v-model="form.completionAreabegain"
                          clearable
                          @change="getHouseList(1)"
                        ></el-input>
                      </el-col>
                      <el-col class="line" :span="2" style="text-align: center"
                        >-</el-col
                      >
                      <el-col :span="11">
                        <el-input
                          v-model="form.completionAreaEnd"
                          clearable
                          @change="getHouseList(1)"
                        ></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="可分配空房" label-width="7rem">
                    <el-select
                      v-model="form.situational"
                      placeholder="--请选择--"
                      class="w100"
                      clearable
                      @change="getHouseList(1)"
                    >
                      <el-option
                        v-for="item in options"
                        :label="item.label"
                        :value="item.value"
                        :key="item.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label="空房标注">
                    <el-select
                      v-model="form.situationalRemark"
                      placeholder="--请选择--"
                      class="w100"
                      multiple
                      clearable
                      @change="getHouseList(1)"
                    >
                      <el-option
                        v-for="item in situationalRemarkData"
                        :label="item.name"
                        :value="item.value"
                        :key="item.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="备注">
                    <el-input
                      v-model="form.specification"
                      clearable
                      @change="getHouseList(1)"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="房源性质">
                    <el-select
                      v-model="form.nature"
                      placeholder="--请选择--"
                      class="w100"
                      clearable
                      multiple
                      filterable
                      @change="getHouseList(1)"
                    >
                      <el-option
                        :label="item.name"
                        :value="item.value"
                        v-for="item in natureData"
                        :key="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="退房时间">
                    <el-row :gutter="0">
                      <el-col :span="11">
                        <el-date-picker
                          type="date"
                          v-model="form.date1"
                          clearable
                          style="width: 100%"
                          @change="getHouseList(1)"
                        ></el-date-picker>
                      </el-col>
                      <el-col :span="2" style="text-align: center">
                        <span>-</span>
                      </el-col>
                      <el-col :span="11">
                        <el-date-picker
                          type="date"
                          v-model="form.date2"
                          clearable
                          style="width: 100%"
                          @change="getHouseList(1)"
                        ></el-date-picker>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="简版房源性质">
                    <el-select
                      v-model="formDialog.simpleNature"
                      placeholder="--请选择--"
                      class="w100"
                      clearable
                      @change="getHouseList(1)"
                    >
                      <el-option
                        :label="item.name"
                        :value="item.value"
                        v-for="item in simpleNatureData"
                        :key="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <el-row :gutter="20">
              <el-col :span="24" style="text-align: right">
                <el-form-item label-width="0">
                  <el-button
                    type="primary"
                    @click="opennAllSearch()"
                    v-if="!show"
                    >展开</el-button
                  >
                  <el-button
                    type="primary"
                    @click="opennAllSearch()"
                    v-if="show"
                    >收起</el-button
                  >
                  <el-button type="primary" @click="getHouseList(1)"
                    >查询</el-button
                  >
                  <el-button type="primary" @click="reset()">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!--导出数据按钮-->
        <div class="toolbar">
          <el-button type="primary" size="mini" @click="exportList()"
            >导出</el-button
          >
          <el-button type="primary" size="mini" @click="openVaccumRoomDailog()"
            >不可分配房源标记</el-button
          >
        </div>
        <!--结果列表-->
        <div class="table-list" style="margin-top: 10px; margin-bottom: 10px">
          <el-table
            :data="VacuumRoomList"
            border
            ref="houseTable"
            size="mini"
            style="width: 100%"
            height="650"
            class="w100"
            @row-dblclick="goDetail"
            :header-cell-style="globalHeaderStyle"
            :cell-style="globalCellStyle"
          >
            <el-table-column
              type="index"
              label="序号"
              width="50"
              :index="indexMethod(0, '表格')"
              fixed
            ></el-table-column>
            <el-table-column
              prop="districtName"
              label="小区名称"
              fixed
            ></el-table-column>
            <el-table-column
              prop="buildName"
              label="栋名称"
              fixed
            ></el-table-column>
            <el-table-column
              prop="buildNo"
              label="栋号"
              fixed
            ></el-table-column>
            <el-table-column
              prop="houseNo"
              label="房号"
              fixed
            ></el-table-column>
            <el-table-column
              prop="maintainTypeName"
              label="维修状态"
            ></el-table-column>
            <el-table-column prop="maintainNo" label="办文号"></el-table-column>
            <el-table-column prop="typeName" label="户型"></el-table-column>
            <el-table-column
              prop="orientationName"
              label="朝向"
            ></el-table-column>
            <el-table-column
              prop="coveredArea"
              label="预测绘建筑面积(平方米)"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="completionArea"
              label="竣工建筑面积(平方米)"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="specification"
              label="备注"
            ></el-table-column>
            <el-table-column
              prop="stateName"
              label="房屋状态"
            ></el-table-column>
            <el-table-column
              prop="propertyRightUnit"
              label="产权归属"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="allocationRightUnit"
              label="分配权"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="signatoryRightUnit"
              label="签约权"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="emptyTime"
              label="空置时间"
            ></el-table-column>
            <el-table-column
              prop="sourceName"
              label="房产来源"
            ></el-table-column>
            <el-table-column
              prop="changeAfterNatureName"
              label="房源性质"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="situational"
              label="可分配空房"
            ></el-table-column>
            <el-table-column
              prop="situationalRemark"
              label="空房标注"
            ></el-table-column>
          </el-table>
          <!--分页-->
          <div class="page_box" style="background: white">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="vacuumRoomForm.currentPage"
              :page-sizes="vacuumRoomForm.pageSizesList"
              :page-size="vacuumRoomForm.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="vacuumRoomForm.totalNumber"
              background
            ></el-pagination>
          </div>
        </div>
      </div>
      <!--真空房弹框 -->
      <el-dialog
        title="不可分配空房标记"
        :visible.sync="VaccumRoomDailog"
        width="80%"
        :close-on-click-modal="false"
      >
        <div class="top">
          <el-form
            ref="form"
            :model="formDialog"
            label-width="7.5rem"
            size="mini"
          >
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="小区">
                  <el-autocomplete
                    class="inline-input"
                    v-model="formDialog.districtName"
                    :fetch-suggestions="getCommunitySelectListDialog"
                    placeholder="请输入内容"
                    :trigger-on-focus="false"
                    :clearable="true"
                    popper-class="select-option"
                    style="width: 100%"
                    @select="getDialogHouseList(1)"
                  ></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="栋号">
                  <el-input
                    v-model="formDialog.buildNo"
                    clearable
                    @change="getDialogHouseList(1)"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="栋名称">
                  <el-input
                    v-model="formDialog.buildName"
                    clearable
                    @change="getDialogHouseList(1)"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="房号">
                  <el-input
                    v-model="formDialog.houseNo"
                    clearable
                    @change="getDialogHouseList(1)"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="户型">
                  <el-select
                    v-model="formDialog.type"
                    placeholder="--请选择--"
                    class="w100"
                    clearable
                    multiple
                    @change="getDialogHouseList(1)"
                  >
                    <el-option
                      :label="item.name"
                      :value="item.value"
                      v-for="item in typeData"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预测绘建筑面积">
                  <el-row :gutter="0">
                    <el-col :span="10">
                      <el-input
                        v-model="formDialog.coveredAreaMin"
                        clearable
                        @change="getDialogHouseList(1)"
                      ></el-input>
                    </el-col>
                    <el-col class="line" :span="4" style="text-align: center"
                      >-</el-col
                    >
                    <el-col :span="10">
                      <el-input
                        v-model="formDialog.coveredAreaMax"
                        clearable
                        @change="getDialogHouseList(1)"
                      ></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="朝向">
                  <el-select
                    v-model="formDialog.orientation"
                    placeholder="--请选择--"
                    class="w100"
                    multiple
                    clearable
                    @change="getDialogHouseList(1)"
                  >
                    <el-option
                      :label="item.name"
                      :value="item.value"
                      v-for="item in orientationData"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="房源性质">
                  <el-select
                    v-model="formDialog.nature"
                    placeholder="--请选择--"
                    class="w100"
                    clearable
                    multiple
                    filterable
                    @change="getDialogHouseList(1)"
                  >
                    <el-option
                      :label="item.name"
                      :value="item.value"
                      v-for="item in natureData"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="VaccumRoomDailogShow" class="show">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="房产来源">
                    <el-select
                      v-model="formDialog.source"
                      placeholder="--请选择--"
                      class="w100"
                      clearable
                      multiple
                      @change="getDialogHouseList(1)"
                    >
                      <el-option
                        v-for="item in sourceData"
                        :label="item.name"
                        :value="item.value"
                        :key="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="数据运维权">
                    <el-select
                      v-model="formDialog.operationalRight"
                      placeholder="--请选择--"
                      class="w100"
                      clearable
                      filterable
                      @change="getDialogHouseList(1)"
                    >
                      <el-option
                        v-for="item in maintenanceUnit"
                        :label="item.name"
                        :value="item.value"
                        :key="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="备注" label-width="6rem">
                    <el-input
                      v-model="formDialog.specification"
                      clearable
                      @change="getDialogHouseList(1)"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="竣工建筑面积">
                    <el-row :gutter="0">
                      <el-col :span="11">
                        <el-input
                          v-model="formDialog.completionAreabegain"
                          clearable
                          @change="getDialogHouseList(1)"
                        ></el-input>
                      </el-col>
                      <el-col class="line" :span="2" style="text-align: center"
                        >-</el-col
                      >
                      <el-col :span="11">
                        <el-input
                          v-model="formDialog.completionAreaEnd"
                          clearable
                          @change="getDialogHouseList(1)"
                        ></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <el-row :gutter="20">
              <el-col :span="24" style="text-align: right">
                <el-form-item label-width="0">
                  <el-button
                    type="primary"
                    @click="openDialogAllSearch()"
                    v-if="!VaccumRoomDailogShow"
                    >展开</el-button
                  >
                  <el-button
                    type="primary"
                    @click="openDialogAllSearch()"
                    v-if="VaccumRoomDailogShow"
                    >收起</el-button
                  >
                  <el-button type="primary" @click="getDialogHouseList(1)"
                    >查询</el-button
                  >
                  <el-button type="primary" @click="resetDialog()"
                    >重置</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!--导出数据按钮-->
        <div>
          <el-button type="primary" size="mini" @click="chooseAll"
            >全选所有</el-button
          >
        </div>
        <!--结果列表-->
        <div class="table-list" style="margin-top: 10px; margin-bottom: 10px">
          <el-table
            :data="VacuumRoomListDialog"
            @selection-change="handleSelectionChange"
            border
            :header-cell-style="globalHeaderStyle"
            :cell-style="globalCellStyle"
            ref="houseTableDialog"
            size="mini"
          >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50"
              :index="indexMethod(0, '弹框')"
              fixed
            ></el-table-column>
            <el-table-column
              prop="districtName"
              label="小区名称"
              fixed
            ></el-table-column>
            <el-table-column
              prop="buildName"
              label="栋名称"
              fixed
            ></el-table-column>
            <el-table-column prop="houseNo" label="房号"></el-table-column>
            <el-table-column prop="typeName" label="户型"></el-table-column>
            <el-table-column
              prop="orientationName"
              label="朝向"
            ></el-table-column>
            <el-table-column
              prop="coveredArea"
              label="预测绘建筑面积(平方米)"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="completionArea"
              label="竣工建筑面积(平方米)"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="specification"
              label="备注"
            ></el-table-column>
            <el-table-column
              prop="stateName"
              label="房屋状态"
            ></el-table-column>
            <el-table-column
              prop="propertyRightUnit"
              label="产权归属"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="allocationRightUnit"
              label="分配权"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="signatoryRightUnit"
              label="签约权"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="sourceName"
              label="房产来源"
            ></el-table-column>
            <el-table-column
              prop="changeAfterNatureName"
              label="房源性质"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="situational"
              label="可分配空房"
            ></el-table-column>
            <el-table-column
              prop="situationalRemark"
              label="空房标注"
            ></el-table-column>
          </el-table>
          <!--分页-->
          <div class="page_box" style="background: white">
            <el-pagination
              @size-change="handleSizeChangeDialog"
              @current-change="handleCurrentChangeDialog"
              :current-page="vacuumRoomDialogForm.currentPage"
              :page-sizes="vacuumRoomDialogForm.pageSizesList"
              :page-size="vacuumRoomDialogForm.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="vacuumRoomDialogForm.totalNumber"
              background
            ></el-pagination>
          </div>
          <div class="tableStyle">
            <table :model="rightsForm">
              <tr>
                <td class="must" style="width: 20%">请填写标记原因</td>
                <td>
                  <el-select
                    v-model="rightsForm.reason"
                    clearable
                    placeholder
                    style="width: 100%"
                    size="mini"
                  >
                    <el-option
                      v-for="item in situationalRemarkData"
                      :key="item.id"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td class="must" style="width: 20%">请填写标记依据</td>
                <td>
                  <el-input
                    type="textarea"
                    v-model="rightsForm.basis"
                    size="mini"
                  ></el-input>
                </td>
              </tr>
            </table>
          </div>
          <div style="text-align: center">
            <el-button type="primary" size="mini" @click="saveVacuumTag"
              >提交</el-button
            >
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/api/vacuumRoominquire.js";
import api from "@/api/housestore.js";
import propertyRightChange from "@/api/propertyRightChange";
import axios from "dist-axios";
import { vacuumRoominquire } from "@/api/paths.js";
import { houseStore } from "@/api/paths";
import publicMethod from "@/api/publicMethod.js";

export default {
  name: "inquire",
  data() {
    return {
      propertyRightGuidDilalog: "", //弹框下拉框选中的产权单位的guid
      form: {
        isVacuumHouse: "",
        districtNo: "",
        districtName: "",
        buildName: "",
        buildNo: "",
        houseNo: "",
        type: "",
        state: "",
        situational: 0,
        signatoryRight: "",
        operationalRight: "",
        situationalRemark: "",
        closed: "",
        currentProperty: "",
        source: "",
        propertyRight: "",
        orientation: "",
        specification: "",
        coveredAreaMin: "",
        coveredAreaMax: "",
        completionAreabegain: "",
        completionAreaEnd: "",
        nature: "",
        maintainType: "",
      }, //表单
      sourceData: [], //来源下拉
      typeData: [], //类型下拉
      orientationData: [], //朝向下拉
      oldOptions: [], // 用来储存上一次的数据
      natureData: [], //房屋性质下拉
      stateData: [], //房屋状态下拉
      currentPropertyData: [], //当前属性下拉
      divisionUnit: [], //分配权归属单位;
      signingUnit: [], //签约权归属单位;
      maintenanceUnit: [], //数据维护权归属;
      operations: [], //运维权归属;
      selectPropertyRightUnitOptions: [], //产权单位下拉
      situationalRemarkData: [], //房源标注下拉
      VacuumRoomList: [], //真空房列表数据
      tableData: [],
      simpleNatureData: [], //房屋性质下拉（简版）
      //分页需要的数据
      vacuumRoomForm: {
        currentPage: 1,
        pageSize: 10,
        pageSizesList: [10, 20, 50, 100, 500],
        totalNumber: 0, //数据的总数
      },
      formDialog: {
        isVacuumHouse: "",
        districtNo: "",
        districtName: "",
        buildName: "",
        buildNo: "",
        houseNo: "",
        type: "",
        state: "",
        signatoryRight: "",
        operationalRight: "",
        situationalRemark: "",
        closed: "",
        currentProperty: "",
        source: "",
        propertyRight: "",
        orientation: "",
        specification: "",
        coveredAreaMin: "",
        coveredAreaMax: "",
        completionAreaEnd: "",
        completionAreabegain: "",
        nature: "",
        simpleNature: "",
      }, //弹框表单
      VacuumRoomListDialog: [], //真空房列表数据
      vacuumRoomDialogForm: {
        currentPage: 1,
        pageSize: 50,
        pageSizesList: [50, 100, 200, 500, 1000],
        totalNumber: 0, //数据的总数
      },
      options: [
        { value: 0, label: "是" },
        { value: 1, label: "否" },
      ],
      show: false, //搜索条件是否显示完全
      VaccumRoomDailog: false, //弹框是否打开
      VaccumRoomDailogShow: false, //弹框里面的搜索条件是否显示完全
      chooseAllData: false,
      rulesx: [{ required: true }], //必填规则
      rightsForm: {
        reason: "",
        basis: "",
      },
      selectCommunityOptions: [], //选中的小区
      stateList: [
        { name: "退房待维修", value: 1 },
        { name: "已申报维修", value: 2 },
        { name: "已完成维修", value: 3 },
        { name: "空", value: "null" },
      ],
    };
  },
  methods: {
    //小区模糊查询
    getCommunitySelectList(str, cb) {
      let params = {
        searchContent: this.form.districtName,
      };
      publicMethod
        .getCommunityList(params)
        .then((res) => {
          for (let i of res) {
            i.value = i.districtNameNo;
          }
          this.selectCommunityOptions = res; //将结果存入下拉小区数据中
          if (this.selectCommunityOptions.length === 0) {
            this.selectCommunityOptions = [{ value: "暂无数据" }];
          }
          cb(this.selectCommunityOptions);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //小区模糊查询
    getCommunitySelectListDialog(str, cb) {
      let params = {
        searchContent: this.formDialog.districtName,
      };
      publicMethod
        .getCommunityList(params)
        .then((res) => {
          for (let i of res) {
            i.value = i.districtNameNo;
          }
          this.selectCommunityOptions = res; //将结果存入下拉小区数据中
          if (this.selectCommunityOptions.length === 0) {
            this.selectCommunityOptions = [{ value: "暂无数据" }];
          }
          cb(this.selectCommunityOptions);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //得到每页的编号
    indexMethod(index, name) {
      if (name == "表格") {
        return (
          index +
          (this.vacuumRoomForm.currentPage - 1) * this.vacuumRoomForm.pageSize +
          1
        );
      } else if (name == "弹框") {
        return (
          index +
          (this.vacuumRoomDialogForm.currentPage - 1) *
            this.vacuumRoomDialogForm.pageSize +
          1
        );
      }
    },
    //获取产权单位
    getPropertyRightUnit() {
      let params = {};
      publicMethod
        .propertyList(params)
        .then((res) => {
          this.selectPropertyRightUnitOptions = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取真空房列表
    getHouseList(index) {
      if (index) {
        this.vacuumRoomForm.currentPage = index;
      }
      //朝向可为多选

      let situationalRemarkList = [];
      if (
        this.form.situationalRemark &&
        this.form.situationalRemark.length > 0
      ) {
        this.form.situationalRemark.forEach((item) => {
          situationalRemarkList.push(item);
        });
      }

      let params = {
        pageIndex: this.vacuumRoomForm.currentPage,
        pageSize: this.vacuumRoomForm.pageSize,
      };
      if (this.form.date1) {
        this.form.date1 = new Date(this.form.date1)
          .format("yyyy-MM-dd")
          .toString();
      }
      if (this.form.date2) {
        this.form.date2 = new Date(this.form.date2)
          .format("yyyy-MM-dd")
          .toString();
      }
      let nature = this.setSimpleNature(this.formDialog.simpleNature);

      this.deleteParmas();
      let data = {
        districtName: this.form.districtName,
        buildName: this.form.buildName,
        houseNo: this.form.houseNo,
        coveredAreaMax: this.form.coveredAreaMax,
        coveredAreaMin: this.form.coveredAreaMin,
        completionAreabegain: this.form.completionAreabegain,
        situationalRemark: situationalRemarkList,
        completionAreaEnd: this.form.completionAreaEnd,
        situational: this.form.situational,
        propertyRight: this.form.propertyRight,
        districtNo: this.form.districtNo,
        buildNo: this.form.buildNo,
        signatoryRight: this.form.signatoryRight,
        operationalRight: this.form.operationalRight,
        isVacuumHouse: this.form.isVacuumHouse,
        closed: this.form.closed,
        currentProperty: this.form.currentProperty,
        specification: this.form.specification,
        maintainType: this.form.maintainType,
        checkOutStartDate: this.form.date1,
        checkOutEndDate: this.form.date2,
        simpleNature: nature.simple,
        notSimpleNature: nature.notSimple,
        orientationList: this.form.orientation,
        source: this.form.source,
        nature: this.form.nature,
        state: this.form.state,
        type: this.form.type,
      };
      http
        .getVacuumRoomList(params, data)
        .then((res) => {
          this.VacuumRoomList = res.content;
          this.vacuumRoomForm.totalNumber = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteParmas() {
      if (!this.form.orientation || !this.form.orientation.length) {
        delete this.form.orientation;
      }
      if (!this.form.source || !this.form.source.length) {
        delete this.form.source;
      }
      if (!this.form.nature || !this.form.nature.length) {
        delete this.form.nature;
      }
      if (!this.form.state || !this.form.state.length) {
        delete this.form.state;
      }
      if (!this.form.type || !this.form.type.length) {
        delete this.form.type;
      }
      if (!this.form.propertyRight || !this.form.propertyRight.length) {
        delete this.form.propertyRight;
      }
    },
    //改变页面显示条数
    handleSizeChange(val) {
      this.vacuumRoomForm.currentPage = 1;
      this.vacuumRoomForm.pageSize = val;
      this.getHouseList();
    },
    //改变当前页码
    handleCurrentChange(val) {
      this.vacuumRoomForm.currentPage = val;
      this.getHouseList();
    },
    //展开功能
    opennAllSearch() {
      this.show = !this.show;
    },
    //重置
    reset() {
      this.form = {
        isVacuumHouse: "",
        districtNo: "",
        districtName: "",
        buildName: "",
        buildNo: "",
        houseNo: "",
        type: "",
        state: "",
        situational: "",
        signatoryRight: "",
        operationalRight: "",
        situationalRemark: "",
        closed: "",
        currentProperty: "",
        source: "",
        propertyRight: "",
        orientation: "",
        specification: "",
        coveredAreaMin: "",
        coveredAreaMax: "",
        completionAreabegain: "",
        completionAreaEnd: "",
        nature: "",
        checkOutStartDate: "",
        checkOutEndDate: "",
        simpleNature: "",
        notSimpleNature: "",
      };
    },
    //导出数据
    exportList() {
      let data = {
        districtNo: this.form.districtNo,
        districtName: this.form.districtName,
        buildName: this.form.buildName,
        buildNo: this.form.buildNo,
        houseNo: this.form.houseNo,
        type: this.form.type,
        state: this.form.state,
        signatoryRight: this.form.signatoryRight,
        operationalRight: this.form.operationalRight,
        situationalRemark: this.form.situationalRemark,
        closed: this.form.closed,
        currentProperty: this.form.currentProperty,
        source: this.form.source,
        propertyRight: this.form.propertyRight,
        orientation: this.form.orientation,
        specification: this.form.specification,
        coveredAreaMin: this.form.coveredAreaMin,
        coveredAreaMax: this.form.coveredAreaMax,
        nature: this.form.nature,
        completionAreabegain: this.form.completionAreabegain,
        situational: this.form.situational,
        completionAreaEnd: this.form.completionAreaEnd,
        maintainType: this.form.maintainType,
      };

      let url = "";
      url = process.env.API + vacuumRoominquire.export;
      let form = this.createForm();
      form.attr("action", url);
      form.attr("method", "get");
      form.append(this.processParam("mapJson", JSON.stringify(data)));
      form.submit();
    },
    processParam(name, value) {
      let getdata = $("<input>");
      getdata.attr("type", "hidden");
      getdata.attr("name", name);
      getdata.attr("value", value);
      return getdata;
    },
    createForm() {
      let form = $("<form>"); //定义一个form表单
      form.attr("style", "display:none");
      form.attr("target", "_top");
      form.attr("method", "get");
      $("body").append(form); //将表单放置在web中
      return form;
    },
    //获取字典
    getDictionary() {
      let namesArr = [
        "房产来源",
        "户型",
        "朝向",
        "房屋性质",
        "房屋状态",
        "当前属性",
        "分配权归属单位",
        "签约权归属单位",
        "数据维护权归属",
        "运维权归属",
        "房源标注",
      ];
      let params = {
        names: namesArr.toString(),
      };
      api
        .getDictionary(params)
        .then((res) => {
          res = JSON.parse(res);
          this.natureData = this.$dictionaryChange(
            res.房屋性质,
            this.natureData,
            "通用"
          );
          this.sourceData = res.房产来源;
          this.typeData = res.户型;
          this.orientationData = this.$dictionaryChange(
            res.朝向,
            this.orientationData,
            "通用"
          );
          this.stateData = res.房屋状态;
          this.currentPropertyData = res.当前属性;
          this.divisionUnit = res.分配权归属单位;
          this.signingUnit = res.签约权归属单位;
          this.maintenanceUnit = res.数据维护权归属;
          this.operations = res.运维权归属;
          this.situationalRemarkData = res.房源标注;

          this.simpleNatureData = this.getSimpleNatureData(this.natureData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //给简版房源性质组装下拉数据
    getSimpleNatureData(data) {
      let nt1;
      data.forEach((item) => {
        if (item.name === "安居型商品房") {
          nt1 = item;
        }
      });
      let nt2 = { name: "不包含安居型商品房", value: "-" + nt1.value };
      return [{ name: "全部", value: "0" }].concat([nt1, nt2]);
    },
    //给简版房源性质整理查询值
    setSimpleNature(data) {
      let res = { simple: "", notSimple: "" };
      if (parseInt(data) > 0) {
        res.simple = data;
      }
      if (parseInt(data) < 0) {
        res.notSimple = Math.abs(parseInt(data)) + "";
      }
      return res;
    },
    //打开详情
    goDetail(val) {
      let tab = {
        route: "/vacuumRoomDetail/" + val.guid,
        name: val.districtName,
        type: "single",
        query: {
          childtitle: "可分配房源查询",
        },
      };
      this.openTopTab(tab);
    },
    //打开真空房弹框
    openVaccumRoomDailog() {
      this.VaccumRoomDailog = true;
      this.rightsForm = {};
      this.getDialogHouseList();
    },
    //获取弹框真空房列表
    getDialogHouseList(index) {
      this.chooseAllData = false;
      if (!this.formDialog.propertyRight) {
        this.propertyRightGuidDilalog = "";
      }
      if (index) {
        this.vacuumRoomDialogForm.currentPage = index;
      }
      let params = {
        pageIndex: this.vacuumRoomDialogForm.currentPage,
        pageSize: this.vacuumRoomDialogForm.pageSize,
        orientationList: this.formDialog.orientation.toString(),
        type: this.formDialog.type.toString(),
        source: this.formDialog.source.toString(),
        nature: this.formDialog.nature.toString(),
        state: this.formDialog.state.toString(),
      };
      let data = {
        districtName: this.formDialog.districtName,
        buildName: this.formDialog.buildName,
        situationalRemark: this.formDialog.situationalRemark.toString(),
        houseNo: this.formDialog.houseNo,
        coveredAreaMax: this.formDialog.coveredAreaMax,
        coveredAreaMin: this.formDialog.coveredAreaMin,
        situational: this.formDialog.situational,
        propertyRight: this.propertyRightGuidDilalog,
        // situational: this.formDialog.situational,
        districtNo: this.formDialog.districtNo,
        buildNo: this.formDialog.buildNo,
        signatoryRight: this.formDialog.signatoryRight,
        operationalRight: this.formDialog.operationalRight,
        closed: this.formDialog.closed,
        currentProperty: this.formDialog.currentProperty,
        specification: this.formDialog.specification,
        completionAreabegain: this.formDialog.completionAreabegain,
        completionAreaEnd: this.formDialog.completionAreaEnd,
      };
      http
        .getVacuumRoomDilogList(params, data)
        .then((res) => {
          this.VacuumRoomListDialog = res.content;
          this.vacuumRoomDialogForm.totalNumber = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //弹框查询改变页面显示条数
    handleSizeChangeDialog(val) {
      this.vacuumRoomDialogForm.pageSize = val;
      this.getDialogHouseList(1);
    },
    //弹框查询改变当前页码
    handleCurrentChangeDialog(val) {
      this.vacuumRoomDialogForm.currentPage = val;
      this.getDialogHouseList();
    },
    //重置
    resetDialog() {
      this.formDialog = {
        isVacuumHouse: "",
        districtNo: "",
        districtName: "",
        buildName: "",
        buildNo: "",
        houseNo: "",
        type: "",
        state: "",
        signatoryRight: "",
        operationalRight: "",
        situationalRemark: "",
        closed: "",
        currentProperty: "",
        source: "",
        propertyRight: "",
        orientation: "",
        specification: "",
        coveredAreaMin: "",
        coveredAreaMax: "",
        completionAreaEnd: "",
        completionAreabegain: "",
        nature: "",
      };
    },
    //是否打开全部的查询条件
    openDialogAllSearch() {
      this.VaccumRoomDailogShow = !this.VaccumRoomDailogShow;
    },
    //全选
    chooseAll() {
      this.chooseAllData = true;
      if (this.chooseAllData) {
        for (var i = 0; i < this.VacuumRoomListDialog.length; i++) {
          this.$refs.houseTableDialog.toggleRowSelection(
            this.VacuumRoomListDialog[i],
            true
          );
        }
      }
    },
    //选择改变时
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //保存真空房标记
    saveVacuumTag() {
      if (!this.rightsForm.reason) {
        this.$message("请填写标记原因");
      } else if (!this.rightsForm.basis) {
        this.$message("请填写标记依据");
      } else {
        this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let that = this;
            let situationalRemarkList = [];
            if (
              this.formDialog.situationalRemark &&
              this.formDialog.situationalRemark.length > 0
            ) {
              this.formDialog.situationalRemark.forEach((item) => {
                situationalRemarkList.push(item);
              });
            }
            if (!this.formDialog.propertyRight) {
              this.propertyRightGuidDilalog = "";
            }
            let params = {
              isChooseAll: this.chooseAllData,
              pageIndex: this.vacuumRoomDialogForm.currentPage,
              pageSize: this.vacuumRoomDialogForm.pageSize,
              orientationList: this.form.orientation.toString(),
              districtName: this.formDialog.districtName,
              buildName: this.formDialog.buildName,
              houseNo: this.formDialog.houseNo,
              type: this.formDialog.type.toString(),
              coveredAreaMax: this.formDialog.coveredAreaMax,
              coveredAreaMin: this.formDialog.coveredAreaMin,
              situational: this.formDialog.situational,
              source: this.formDialog.source.toString(),
              state: this.formDialog.state.toString(),
              nature: this.formDialog.nature.toString(),
              propertyRight: this.propertyRightGuidDilalog,
              districtNo: this.formDialog.districtNo,
              buildNo: this.formDialog.buildNo,
              signatoryRight: this.formDialog.signatoryRight,
              orientation: this.formDialog.orientation.toString(),
              operationalRight: this.formDialog.operationalRight,
              situationalRemark: situationalRemarkList.toString(),
              closed: this.formDialog.closed,
              currentProperty: this.formDialog.currentProperty,
              specification: this.formDialog.specification,
              reason: this.rightsForm.reason,
              changeBasis: this.rightsForm.basis,
            };
            let data = [];
            console.log("===", this.chooseAllData);
            if (this.chooseAllData) {
            } else {
              let arr = [];
              if (this.multipleSelection) {
                this.multipleSelection.forEach((item) => {
                  arr.push(item.guid);
                });
              }
              data = arr;
            }
            if (data.length == 0) {
              this.$message("请选择房之后,再进行提交");
            } else {
              http
                .saveVacuumTag(params, data)
                .then((res) => {
                  if (res) {
                    this.$message({
                      message: "保存成功",
                      type: "success",
                    });
                    this.VaccumRoomDailog = false;
                    this.getHouseList();
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消保存",
            });
          });
      }
    },
  },
  mounted() {
    this.getDictionary();
    this.getHouseList();
    this.getPropertyRightUnit();
  },
};
</script>

<style lang="scss" scoped>
#vacuumRoominquire {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

