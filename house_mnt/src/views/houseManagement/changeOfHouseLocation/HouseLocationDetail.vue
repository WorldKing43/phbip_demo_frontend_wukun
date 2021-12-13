<!--
 * @Author: maxq
 * @Date: 2020-07-15 11:00:26
 * @LastEditTime: 2021-04-07 20:29:30
 * @LastEditors: hongchr
 * @Description: 房屋坐落变更详情页
 * @FilePath: \frontend\house-mnt\src\views\houseManagement\changeOfHouseLocation\HouseLocationTab.vue
--> 
<template>
  <div id="house-location-detail">
    <div  class="tableStyle">
      <div class="top_btn">
        <el-button size="small" type="primary" @click="openLogDialog()">查看日志</el-button>
        <el-button size="small" type="danger" v-if="!ctrlEdit" @click="deleteProcess()">删除案件</el-button>
      </div>
      <div class="text_box">
        <title-stylex title="请选择需要变更的房屋"></title-stylex>
        <el-button class="left_btn" size="mini" type="primary" @click="chooseHouse()" :disabled="ctrlEdit">请选择</el-button>
        <el-button class="right_btn" size="mini" type="primary" @click="save()" v-if="!ctrlEdit">保存</el-button>
      </div>
      <el-table :data="tableData" :cell-style="globalCellStyle" :header-cell-style="globalHeaderStyle" border>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="小区名称" prop="districtName"></el-table-column>
        <el-table-column label="栋号" prop="buildNo"></el-table-column>
        <el-table-column label="栋名称" prop="buildName"></el-table-column>
        <el-table-column label="房号" prop="hosueNo"></el-table-column>
        <el-table-column label="朝向" prop="orientation"></el-table-column>
        <el-table-column label="户型" prop="typeName"></el-table-column>
        <el-table-column label="房屋状态" prop="state"></el-table-column>
        <el-table-column label="操作" width=150>
          <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="viewHouse(scope.row)">查看</el-button>
              <el-button size="mini" type="danger" @click="deleteHouse(scope.row)" v-if="!ctrlEdit">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page_box">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizesList"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
       <div class="text_box">
        <title-stylex title="请选择变更后的小区"></title-stylex>
        <div class="district_btn">
          <el-button size="mini" type="primary" @click="originalVillage()" :disabled="ctrlEdit">请选择小区</el-button>
          <el-button size="mini" type="primary" @click="newCommunity()" :disabled="ctrlEdit">新增小区</el-button>
        </div>
      </div>
      <el-table :data="districtData" :cell-style="globalCellStyle" :header-cell-style="globalHeaderStyle" border>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="小区号" prop="code"></el-table-column>
        <el-table-column label="小区名称" prop="name"></el-table-column>
        <el-table-column label="所在区" prop="areaName"></el-table-column>
        <el-table-column label="地址" prop="address"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="viewDistrict(scope.row)">查看</el-button>
              <el-button size="mini" type="warning" @click="editDistrict(scope.row)" :disabled="scope.row.original" v-if="!ctrlEdit">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteDistrict(scope.row)" v-if="!ctrlEdit">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="bulid_box">
        <title-stylex title="请选择变更后的栋"></title-stylex>
        <div class="bulid_btn">
          <el-button size="mini" type="primary" @click="openOriginalBuildDialog()" :disabled="ctrlEdit">请选择原有栋</el-button>
          <el-button size="mini" type="primary" @click="newBuilding()" :disabled="ctrlEdit">新增栋</el-button>
        </div>
      </div>
      <el-table :data="buildingData" :cell-style="globalCellStyle" :header-cell-style="globalHeaderStyle" border>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="小区名称" prop="districtName"></el-table-column>
        <el-table-column label="栋号" prop="code"></el-table-column>
        <el-table-column label="栋名称" prop="name"></el-table-column>
        <el-table-column label="总楼层" prop="floorCount"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="viewBuilding(scope.row)">查看</el-button>
              <el-button size="mini" type="warning" @click="editBuilding(scope.row)" :disabled="scope.row.original" v-if="!ctrlEdit">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteBuilding(scope.row)" v-if="!ctrlEdit">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="showOpinion">
        <div class="bulid_box">
          <title-stylex title="变更记录"></title-stylex>    
        </div>
        <el-table :data="changeData" :cell-style="globalCellStyle" :header-cell-style="globalHeaderStyle" border>
          <el-table-column label=" ">
            <el-table-column label="序号" type="index"></el-table-column>
          </el-table-column>
          <el-table-column label="变更前">
            <el-table-column label="小区号" prop="bgqxqh"></el-table-column>
            <el-table-column label="小区名称" prop="bgqxqmc"></el-table-column>
            <el-table-column label="栋号" prop="bgqdh"></el-table-column>
            <el-table-column label="栋名称" prop="bgqdmc"></el-table-column>
            <el-table-column label="房号" prop="fh"></el-table-column>
          </el-table-column>
          <el-table-column label="变更后">
            <el-table-column label="小区号" prop="bghxqh"></el-table-column>
            <el-table-column label="小区名称" prop="bghqmc"></el-table-column>
            <el-table-column label="栋号" prop="bghdh"></el-table-column>
            <el-table-column label="栋名称" prop="bghdmc"></el-table-column>
            <el-table-column label="房号" prop="fh"></el-table-column>
          </el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="recordSizeChange"
            @current-change="recordCurrentChange"
            :current-page="recordCurrentPage"
            :page-sizes="recordSizesList"
            :page-size="recordPageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalRecord">
          </el-pagination>
        </div>
        <!-- 审核意见 -->
        <title-stylex title="审核意见"></title-stylex>
        <ExamineOpinion
          :opinionData="opinionList"
          :opinionText="opinion"
          :currentState="activityName"
          :handleIsShow="handleIsShow"
          @handleToNext="submit"
          @hanleToPreNode="hanleToPreNode"
          @noPassProcess="unsubmit"
        ></ExamineOpinion>
      </div>
      <!-- 弹框 -->
      <!-- 请选择-房屋 弹框 -->
      <el-dialog title="请选择" :visible.sync="houseDialog" v-if="houseDialog" width=60%>
        <el-form :model="houseForm" size="mini" label-width="3rem">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="小区">
                 <el-autocomplete
                  v-model="houseForm.districtInfo"
                  :fetch-suggestions="getCommunity"
                  :trigger-on-focus="false"
                  :clearable="true"
                  @select="houseList()"
                  style="width:100%"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="栋号">
                <el-input v-model="houseForm.buildNo" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="栋名称" label-width="4rem">
                <el-input v-model="houseForm.buildName" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="房号">
                <el-input v-model="houseForm.houseNo" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button size="mini" type="primary" @click="houseList()">查询</el-button>
            </el-col>
            <el-col></el-col>
          </el-row>
        </el-form>
        <el-table :data="houseData" @selection-change="selectHouseChange" :cell-style="globalCellStyle" :header-cell-style="globalHeaderStyle" border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="小区号" prop="districtCode"></el-table-column>
          <el-table-column label="小区名称" prop="districtName"></el-table-column>
          <el-table-column label="栋号" prop="buildNo"></el-table-column>
          <el-table-column label="栋名称" prop="buildName"></el-table-column>
          <el-table-column label="房号" prop="houseNo"></el-table-column>
          <el-table-column label="朝向" prop="orientation"></el-table-column>
          <el-table-column label="户型" prop="typeName"></el-table-column>
          <el-table-column label="房屋状态" prop="state"></el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="houseSizeChange"
            @current-change="houseCurrentChange"
            :current-page="houseCurrentPage"
            :page-sizes="housePageSizesList"
            :page-size="housePageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalHouse">
          </el-pagination>
        </div>
        <div class="dialog-foot">
          <el-button size="mini" @click="houseDialog = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="addHouse()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 查看房屋弹框 -->
      <el-dialog title="房屋基本信息" :visible.sync="houseInfoDialog" v-if="houseInfoDialog" width=60%>
         <table class="detail">
              <tr>
                <td>小区编号</td>
                <td>
                  <el-input disabled v-model="form.districtNo"></el-input>
                </td>
                <td>小区名称</td>
                <td>
                  <el-input disabled v-model="form.districtName"></el-input>
                </td>
              </tr>
              <tr>
                <td>栋号</td>
                <td>
                  <el-input disabled v-model="form.buildNo"></el-input>
                </td>
                <td>栋名称</td>
                <td>
                  <el-input disabled v-model="form.buildName"></el-input>
                </td>
              </tr>
              <tr>
                <td>房号</td>
                <td>
                  <el-input disabled v-model="form.houseNo"></el-input>
                </td>
                <td>网格办编码</td>
                <td>
                  <el-input disabled v-model="form.serialNo"></el-input>
                </td>
              </tr>
              <tr>
                <td>房屋状态</td>
                <td>
                  <el-input disabled v-model="form.stateName"></el-input>
                </td>
                <td>所在单元</td>
                <td>
                  <el-input disabled v-model="form.unit"></el-input>
                </td>
              </tr>
              <tr>
                <td>所在楼层</td>
                <td>
                  <el-input disabled v-model="form.floorNo"></el-input>
                </td>
                <td>房屋来源</td>
                <td>
                  <el-select style="width: 100%;" placeholder v-model="form.source" disabled>
                    <el-option
                      v-for="(item, index) in sourceData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>房屋用途</td>
                <td>
                  <el-select style="width: 100%;" placeholder v-model="form.function" disabled>
                    <el-option
                      v-for="(item, index) in functionData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>户型</td>
                <td>
                  <el-select
                    v-model="form.houseLayout"
                    style="width: 100%"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in houseLayoutData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>朝向</td>
                <td>
                  <el-select
                    style="width: 100%;"
                    v-model="form.orientation"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in orientationData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>平台</td>
                <td>
                  <el-select v-model="form.terrace" style="width: 100%" disabled>
                    <el-option
                      v-for="(item, index) in terraceData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>是否有架空层</td>
                <td>
                  <el-select
                    style="width: 100%;"
                    v-model="form.innerFloor"
                    placeholder
                    disabled
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>(预测绘)建筑面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.coveredArea"></el-input>
                  <span style="position:absolute;top:2px;right:5px;">m²</span>
                </td>
              </tr>
              <tr>
                <td>(预测绘)分摊面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.residentialPoolArea"></el-input>
                  <span style="position:absolute;top:2px;right:5px;">m²</span>
                </td>
                <td>(预测绘)套内面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.indoorArea"></el-input>
                  <span style="position:absolute;top:2px;right:5px;">m²</span>
                </td>
              </tr>
              <tr>
                <td>竣工建筑面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.completionArea"></el-input>
                  <span style="position:absolute;top:2px;right:5px;">m²</span>
                </td>
                <td>竣工分摊面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.completionShareArea"></el-input>
                  <span style="position:absolute;top:2px;right:5px;">m²</span>
                </td>
              </tr>
              <tr>
                <td>竣工套内面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.completionIndoorArea"></el-input>
                  <span style="position:absolute;top:2px;right:5px;">m²</span>
                </td>
                <td>分摊面积说明</td>
                <td>
                  <el-input v-model="form.residentialAreaContent" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>初始房源性质</td>
                <td>
                  <el-select style="width:100%" placeholder v-model="form.startNature" disabled>
                    <el-option
                      v-for="(item, index) in changeAfterNatureData"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td>当前房源性质</td>
                <td>
                  <el-select style="width:100%" v-model="form.changeAfterNature" disabled>
                    <el-option
                      v-for="(item, index) in changeAfterNatureData"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>初始属性</td>
                <td>
                  <el-select style="width:100%" v-model="form.originalProperty" disabled>
                    <el-option
                      v-for="(item, index) in currentPropertyData"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td>当前属性</td>
                <td>
                  <el-select style="width:100%" v-model="form.currentProperty" disabled>
                    <el-option
                      v-for="(item, index) in originalPropertyData"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>开工时间</td>
                <td>
                  <el-date-picker
                    class="w100"
                    type="date"
                    v-model="form.startConstructionTime"
                    disabled
                  ></el-date-picker>
                </td>
                <td>竣工时间</td>
                <td>
                  <el-date-picker
                    class="w100"
                    type="date"
                    v-model="form.finishConstructionTime"
                    disabled
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>交付使用时间</td>
                <td>
                  <el-date-picker class="w100" type="date" v-model="form.deliveryTime" disabled></el-date-picker>
                </td>
                <td>装修标准</td>
                <td>
                  <el-input disabled v-model="form.decorationType"></el-input>
                </td>
              </tr>
              <tr>
                <td>装修标准说明</td>
                <td colspan="3">
                  <el-tooltip class="item" effect="dark" content="此处利用鼠标可拖动" placement="right-end">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 4 }"
                      disabled
                      v-model="form.decorationTypeDescription"
                    ></el-input>
                  </el-tooltip>
                </td>
              </tr>
              <tr>
                <td>是否样板房</td>
                <td>
                  <el-select
                    style="width: 100%;"
                    v-model="form.modelHouses"
                    disabled
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>是否代售</td>
                <td>
                  <el-select
                    style="width: 100%;"
                    v-model="form.helpSell"
                    disabled
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
                <td>是否查封冻结</td>
                <td>
                  <el-select style="width: 100%;" v-model="form.closed" disabled>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>资产库状态</td>
                <td>
                  <el-input disabled v-model="form.assetStateName"></el-input>
                </td>
              </tr>
              <tr>
                <td>空房标注</td>
                <td>
                  <el-input disabled v-model="form.situationalRemark"></el-input>
                </td>
                <td>是否被二次分配</td>
                <td>
                  <el-select style="width: 100%;" placeholder v-model="form.secondDistribution" disabled>
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
                <td>备注</td>
                <td colspan="3">
                  <el-input disabled v-model="form.specification"></el-input>
                </td>
              </tr>
            </table>
      </el-dialog>
      <!-- 请选择小区弹框 -->
      <el-dialog title="选择小区" :visible.sync="originalVillageDialog" width=60%>
        <el-form  :model="originalVillageForm" size="mini">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="小区" label-width="3rem">
                <!-- <el-input v-model="originalVillageForm.districtName" @change="getOriginalVillage(1)" clearable></el-input> -->
                 <el-autocomplete
                  v-model="originalVillageForm.districtName"
                  :fetch-suggestions="getCommunitySelectList"
                  :trigger-on-focus="false"
                  :clearable="true"
                  @select="getOriginalVillage(1)"
                  style="width:100%"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所在区" label-width="4rem">
                <el-input v-model="originalVillageForm.area" @change="getOriginalVillage(1)" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" size="mini" @click="getOriginalVillage(1)">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-table :data="originalVillageList" ref="districtTable"  @select="handleRow" 
        :header-cell-style="globalHeaderStyle" :cell-style="globalCellStyle" border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="小区号" prop="districtNo"></el-table-column>
          <el-table-column label="小区名称" prop="districtName"></el-table-column>
          <el-table-column label="所在区" prop="areaName"></el-table-column>
          <el-table-column label="地址" prop="address"></el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @current-change="originalVillageCurrentChange"
            @size-change="originalVillageSizeChange"
            :current-page="originalVillageCurrentPage"
            :page-sizes="originalVillagePageSizesList"
            :page-size="originalVillagePageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalOriginalVillage"
            background
          ></el-pagination>
        </div>
        <div class="dialog-foot">
          <el-button size="mini" @click="originalVillageDialog = false">取 消</el-button>
          <el-button type="primary" size="mini" @click="addOriginalDistrict()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 请选择原有栋 -->
      <el-dialog title="请选择原有栋" :visible.sync="originalBuildDialog" width="70%" :close-on-click-modal="false" v-dialogDrag>
        <el-form size="mini" label-position="right" :model="originalBuildForm" label-width="6rem">
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
                    v-for="item in elevatorList"
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
        <div class="dialog-foot">
          <el-button size="mini" @click="originalBuildDialog = false">取消</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="addOriginalBuild"
          >确定</el-button>
        </div>
      </el-dialog>
       <!-- 新增、查看、编辑小区/栋/房信息 -->
      <el-dialog :title="title"  :visible.sync="DialogVisible" v-if="DialogVisible" width="60%" :close-on-click-modal="false" v-dialogDrag>
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
          <div style="text-align:center;margin-top:20px;" v-if="!(this.title=='查看小区信息')">
            <el-button @click="DialogVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="addDistrict()" size="mini" v-if="(this.title=='新增小区')">确 定</el-button>
            <el-button
              type="primary"
              @click="editDistrictDetail()"
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
          <div style="text-align:center;margin-top:20px;" v-if="!(this.title=='查看栋信息')">
            <el-button @click="DialogVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="addBuild" v-if="(this.title=='新增栋')" size="mini">确 定</el-button>
            <el-button
              type="primary"
              @click="editBuildDetail()"
              v-if="(this.title=='编辑栋信息')"
              size="mini"
            >确 定</el-button>
          </div>
        </div>
        <TitleStylex
          title="房源信息"
          v-if="this.title=='查看房源信息'||this.title=='编辑房源信息'"
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
          <div style="text-align:center;margin-top:20px;" v-if="!(this.title=='查看房源信息')">
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
       <!--查看日志-->
      <el-dialog :visible.sync="logDialog" width=60% title="查看日志" :close-on-click-modal="false">
        <el-table
          :data="logList"
          border
          height="300"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="processTime" label="操作日期" sortable width="150"></el-table-column>
          <el-table-column prop="subjectUnit" label="单位" width="180"></el-table-column>
          <el-table-column prop="subjectName" label="操作人" width="80"></el-table-column>
          <el-table-column prop="actionName" label="操作" width="160"></el-table-column>
          <el-table-column prop="context" label="操作详情"></el-table-column>
        </el-table>
    </el-dialog>
    </div>
  </div>
</template>
<script>
import TitleStylex from "@/components/TitleStylex";
import ExamineOpinion from "@/components/ExamineOpinion";
import http from '@/api/interface.js';
import common from '@/api/housestore.js';
import api from "@/api/roomChangeRoomInput";
import https from "@/api/house.js";
import publicMethod from "@/api/publicMethod";
export default {
  name: 'houseLocationDetail',
  components: {
    TitleStylex,
    ExamineOpinion
  },
  data() {
    return {
      tableData:[], //房屋表格
      //分页数据
      currentPage: 1, //当前页
      pageSizesList: [20, 50, 100, 200], //页面条数可选
      pageSize: 20, //此时当前页条数
      total: 0,//数据总数
      districtData: [],//小区表格
      buildingData: [],//栋表格
      changeData: [],//变更记录
      opinionTableData: [], // 审核意见表格数据
      opinion: "", //办理意见
      handleIsShow: true, //办理意见显隐
      activityName: "", //环节名称
      taskId: '', //
      pid: '', //
      dealer: '',//操作人
      opinion: '',//办理意见
      hasSaved: true, //是否已点保存
      houseDialog: false, //选择房屋弹框显隐
      houseForm: { //选择房屋弹框
        districtInfo: '',
        buildNo: '',
        buildName: '',
        houseNo: ''
      },
      houseData: [],//选择房屋列表
      //分页数据
      houseCurrentPage: 1, //当前页
      housePageSizesList: [10, 20,50, 100], //页面条数可选
      housePageSize: 10, //此时当前页条数
      totalHouse: 0,//数据总数
      originalVillageDialog: false, //原有小区弹框
      originalVillageForm: {  //原有小区列表查询条件
        districtNo: "",
        districtName: "",
        area: "",
      },
      originalVillageList: [], //原有小区列表展示
      //分页数据
      originalVillageCurrentPage: 1, //当前页
      originalVillagePageSizesList:[10, 20,50, 100], //页面条数可选
      originalVillagePageSize: 10, //此时当前页条数
      totalOriginalVillage: 0,//数据总数
      selectDistrict: [],//选择小区数据
      districtGuid: '',//小区标识
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
      elevatorList: [ //是否带电梯下拉
        { value: 1, label: "是" },
        { value: 0, label: "否" }
      ],
      options: [
        { value: true, label: "是" },
        { value: false, label: "否" }
      ], //是否下拉菜单
      //分页数据
      recordCurrentPage: 1, //当前页
      recordSizesList: [10, 20, 30, 40], //页面条数可选
      recordPageSize: 10, //此时当前页条数
      totalRecord: 0,//数据总数
      houseDetail: {//房源详情
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
      }, 
      communityDetail: {//小区详情
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
      }, 
      buildDetail: {//栋详情
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
      }, 
      DialogVisible: false, //小区、栋、房弹框控制
      title: "", //小区、栋、房的标题
      districtMaintainBelongName: "", //小区归属权的中文
      buildingInfoMaintainBelongName: "", //栋归属权的中文
      maintainRightName: "", //数据维护权归属
      allocationRightName: "", //分配权归属单位
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
      orientationData: [],//朝向下拉数据
      opinionList: [], //办理意见列表
      ctrlEdit: false, //按钮禁用控制
      form: {}, //查看房屋基本信息
      houseInfoDialog: false, //房屋基本信息弹框显隐
      originalPropertyData: [], //当前属性下拉框
      currentPropertyData: [], //初始属性下拉框
      logDialog: false, //日志弹框
      logList: [], //日志列表
      showOpinion: false, //是否展示审核意见模块
    }
  },
  methods: {
    //颜色标记
     tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 === 0) {
        return 'success-row';
      } else {
        return '';
      }
    },
    //生成批次代码
    createBatchCode() {
      let params = {};
      http.createBatchCode(params).then(res =>{
        this.batchCode = res
      }).catch(err =>{console.log(err)})
    },
     //小区模糊查询
    getCommunitySelectList(str, cb) {
      let params = {
        searchContent: this.originalVillageForm.districtName
      };
      publicMethod.getCommunityList(params).then(res => {
        for (let i of res) {
          i.value = i.districtNameNo;
        }
        this.selectCommunityOptions = res; //将结果存入下拉小区数据中
        if (this.selectCommunityOptions.length === 0) {
          this.selectCommunityOptions = [{ value: "暂无数据" }];
        }
        cb(this.selectCommunityOptions);
      }).catch(err => {
        console.log(err);
      });
    },
    getCommunity(str, cb) {
      let params = {
        searchContent: this.houseForm.districtInfo
      };
      publicMethod.getCommunityList(params).then(res => {
        for (let i of res) {
          i.value = i.districtNameNo;
        }
        this.selectCommunityOptions = res; //将结果存入下拉小区数据中
        if (this.selectCommunityOptions.length === 0) {
          this.selectCommunityOptions = [{ value: "暂无数据" }];
        }
        cb(this.selectCommunityOptions);
      }).catch(err => {
        console.log(err);
      });
    },
    //领取任务
    openCache(val) {
      let params = { taskId: val.TID };
      common.openCache(params).then(res => {}).catch(err => { console.log(err) });
    },
    //查询房屋+栋+小区+变更记录
    search() {
      let params = {
        batchCode: this.batchCode,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      http.getLocationInfo(params).then(res =>{
        this.tableData = res.house.content; //房屋列表
        this.districtData = res.district; //小区列表
        this.buildingData = res.build; //栋列表
        this.changeData = res.record.content; //变更记录
        this.totalRecord = res.record.totalElements;//变更记录总数
        this.total = res.house.totalElements;
      }).catch(err => {console.log(err)})
    },
    //查询房屋列表数据
    houseList() {
      let params = {
        pageIndex: this.houseCurrentPage,
        pageSize: this.housePageSize
      };
      let data = this.houseForm;
      http.getFgHouseList(params, data).then(res =>{
        this.houseData = res.content;
        this.totalHouse = res.totalElements
      }).catch(err => {console.log(err)})
    },
    //选择的房屋更改时触发
    selectHouseChange(val) {
      this.selectedHouse = val
    },
    //请选择
    chooseHouse() {
      this.houseDialog = true;
      this.houseList();
    },
    //确定选择的房屋
    addHouse() {
      let params = {batchCode: this.batchCode};
      let data = [];
      this.selectedHouse.forEach(item =>{
        data.push(item.houseGuid)
      });
      this.$confirm("此操作将进行保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$startLoading();
        http.addLocatedHouse(params, data).then(res =>{
          this.$message({
            type: 'success',
            message: '保存成功！'
          });
          this.houseDialog = false;
          this.search();
          this.$endLoading();
        }).catch(err =>{ console.log(err) })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消保存"
        });
      });
    },
    //保存
    save() {
      let params = { batchCode: this.batchCode };
      let data = [];
      this.tableData.forEach(item =>{
        data.push(item.houseGuid)
      });
      this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$startLoading();
          http.saveLocationChange(params, data).then(res =>{
            this.$message({
              message: "保存成功",
              type: "success"
            });
            if(res.TID) {
              this.openCache(res);
              this.closeTopTab();
              let tab = {
                route: "/houseLocationDetail" + "/" + this.batchCode + "/" + 'todo',
                name: '新增房屋坐落变更',
                type: "single",
                query: { taskId: res.TID }
              };
              this.openTopTab(tab);
            };
            this.Event.$emit("HouseLocationTodo", "search");
            this.showOpinion = true //展示审核意见
            this.$endLoading();
          }).catch(err =>{ console.log(err);this.$endLoading() })
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存"
          });
        });
    },
    //查看-房屋 基本信息
    viewHouse(val) {
      this.houseInfoDialog = true;
      let params = {
        guid: val.houseGuid
      };
      https.getHouseInfo(params).then(res => {
        if (res) {
          this.form = res.houseInfo;
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    //删除-房屋
    deleteHouse(val) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => { 
        let params = {
          houseGuid: val.houseGuid,
          batchCode: this.batchCode
        };
        http.deleteHouseLocated(params).then(res =>{
          this.$message({ type: 'success', message: '删除成功！' });
          this.search()
        }).catch(err =>{ console.log(err) })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消操作"
        });
      });
    },
    //请选择变更后的小区
    originalVillage() {
      this.originalVillageDialog = true;
      this.getOriginalVillage()
    },
    //原有小区查询
    getOriginalVillage(index) {
      if (index) {
        this.originalVillageCurrentPage = index;
      }
      let params = {
        districtNo: this.originalVillageForm.districtNo,
        districtName: this.originalVillageForm.districtName,
        area: this.originalVillageForm.area,
        pageIndex: this.originalVillageCurrentPage,
        pageSize: this.originalVillagePageSize
      };
      api.getDistrictList(params).then(res => {
        this.originalVillageList = res.content;
        this.totalOriginalVillage = res.totalElements;
      }).catch(err => {
        console.log(err);
      });
    },
    //选择的小区时触发
    handleRow (selection, row) {
      // 先清除所有选中的
      this.$refs.districtTable.clearSelection();
      // 当前的点击实现勾选
      this.$refs.districtTable.toggleRowSelection(row);
      this.districtGuid = row.guid;
    },
    //选择原有小区后-确定
    addOriginalDistrict() {
      let params = { 
        batchCode: this.batchCode,
        districtGuid: this.districtGuid
      };
      this.$nextTick(() =>{
        http.addLocatedDistrict(params).then(res =>{
          this.$message({
            type: 'success',
            message: '操作成功！'
          });
          this.search();
          this.originalVillageDialog = false;
        }).catch(err =>{ console.log(err) })
      })
    },
    //新增小区
     newCommunity() {
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
    //自动拼接地址
    createAddress() {
      let name = "";
      if (this.areaData) {
        this.areaData.forEach(ele => {
          if (ele.value == this.communityDetail.area) {
            name = ele.name;
          }
        });
      }
      this.communityDetail.address = name + this.communityDetail.street + this.communityDetail.roadName;
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
        }).then(() => {
          let params = { batchCode: this.batchCode };
          let data = this.communityDetail;
          http.addNewDistrict(params, data).then(res => {
            if (res) {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.DialogVisible = false;
              this.search();
            }
          }).catch(err => {
            consoel.log(err);
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存"
          });
        });
      }
    },
   
    //获取小区详情
    getCommunityDetail(val, operation) {
      this.$startLoading();
      let params = {
        districtGuid: val.guid,
        batchCode: this.batchCode,
        operation: operation
      };
      let data = {};
      if(operation == 'edit') data = this.communityDetail; 
      http.getLocatedDistrict(params, data).then(res => {
        if(operation == 'delete') { //删除
          this.$message({type: 'success', message: '删除成功！'});
          this.search();
        } else if(operation == 'edit'){ //编辑后保存
          this.$message({type: 'success', message: '保存成功！'});
          this.DialogVisible = false;
          this.search();
        }else { //查看
          this.DialogVisible = true;
          this.communityDetail = res;
          this.districtMaintainBelongName = res.districtMaintainBelongName;
        }
        this.$endLoading();
      }).catch(err => {
        console.log(err);
        this.$endLoading();
      });
    },
    //查看-小区
    viewDistrict(val) {
      this.title = "查看小区信息";
      this.getCommunityDetail(val, '');
    },
    //编辑-小区
    editDistrict(val) {
      this.title = "编辑小区信息";
      this.getCommunityDetail(val, '');
    },
    //删除-小区
    deleteDistrict(val) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.getCommunityDetail(val, 'delete');
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消操作"
        });
      });
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
        }).then(() => {
          this.getCommunityDetail(this.communityDetail, 'edit');
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存"
          });
        });
      }
    },
    //打开选择原有栋弹框
    openOriginalBuildDialog() {
      this.BuildRadio = false;
      this.originalBuildDialog = true;
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
    //原有栋查询
    getOriginalBuild(index) {
      this.buildRadio = false;
      if (index) {
        this.originalBuildInfoPage.currentPage = index;
      }
      let params = {
        batchCode: this.batchCode,
        buildNo: this.originalBuildForm.buildNo,
        buildName: this.originalBuildForm.buildName,
        elevator: this.originalBuildForm.elevator,
        floorCount: this.originalBuildForm.floorCount,
        skirtFloorCount: this.originalBuildForm.skirtFloorCount,
        pageIndex: this.originalBuildInfoPage.currentPage,
        pageSize: this.originalBuildInfoPage.pageSize
      };
      http.originalBuildList(params).then(res => {
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
      }).catch(err => {
        console.log(err);
      });
    },
    //选择原有栋后-确定
    addOriginalBuild() {
      this.$confirm("此操作将进行保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$startLoading()
        let params = {
          batchCode: this.batchCode,
          buildGuid: this.selectOriginalBuild.guid
        };
        http.addLocatedBuild(params).then(res => {
          if (res) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.originalBuildDialog = false;
            this.BuildRadio = false;
            this.search();
            this.$endLoading()
          }
        }).catch(err => {
          console.log(err);
        });
      }).catch(() => {
        this.$message({ type: "info", message: "已取消保存" });
        this.$endLoading()
      });
    },
    //获取小区名称
    getDistrictName() {
      let params = {
        batchCode: this.batchCode,
        type: 'located' //房屋坐落变更
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
    newBuilding() {
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
        (this.buildDetail.elevator === "") |
        !(
          this.buildDetail.elevator == false ||
          this.buildDetail.elevator == true
        )
      ) {
        this.$message({
          message: "请填写是否带电梯",
          type: "info"
        });
      } else if (!this.buildDetail.floorCount) {
        this.$message({
          message: "请填写总楼层数",
          type: "info"
        });
      } else if (this.buildDetail.skirtFloorCount == null) {
        this.$message({
          message: "请填写裙楼层数",
          type: "info"
        });
      } else {
        this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let params = {
            batchCode: this.batchCode,
            districtGuid: this.districtGuid
          };
          let data = this.buildDetail;
          this.$startLoading()
          http.addNewBuilding(params, data).then(res => {
            if (res) {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.DialogVisible = false;
              this.search();
              this.$endLoading()
            }
          }).catch(err => {
            console.log(err);
            this.$endLoading()
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存"
          });
        });
      }
    },
    //编辑栋号
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
        }).then(() => {
          this.getBuildDetail(this.buildDetail, 'edit');
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存"
          });
        });
      }
    },
    //获取栋详情
    getBuildDetail(val, operation) {
      let params = {
        buildGuid: val.guid,
        batchCode: this.batchCode,
        operation: operation
      };
      let data = {};
      if(operation == 'edit') data = this.buildDetail; 
      http.getLocatedBuild(params, data).then(res => {
         if(operation == 'delete') { //删除
          this.$message({type: 'success', message: '删除成功！'});
          this.search();
        } else if(operation == 'edit'){ //编辑后保存
          this.$message({type: 'success', message: '保存成功！'});
          this.DialogVisible = false;
          this.search();
        }else { //查看
          this.DialogVisible = true;
          this.buildDetail = res;
          this.buildingInfoMaintainBelongName = res.buildingInfoMaintainBelongName;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    //查看-栋
    viewBuilding(val) {
      this.title = "查看栋信息";
      this.getBuildDetail(val, '')
    },
    //编辑-栋
    editBuilding(val) {
      this.title = "编辑栋信息";
      this.getBuildDetail(val, '')
    },
    //删除-栋
    deleteBuilding(val) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.getBuildDetail(val, 'delete');
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消操作"
        });
      });
    },
    //提交下一环节
    submit(opionion) {
      this.opinion = opionion;
      let params = { batchCode: this.batchCode };
      let data = [];
      this.tableData.forEach(item =>{
        data.push(item.houseGuid)
      });
      this.$startLoading();
      this.$nextTick(() =>{
        http.saveLocationChange(params, data).then(res =>{
          if(res.TID) {
            this.activityName = res.activityName;
            this.dealer = res.loginName;
            this.pid = res.PID;
            this.taskId = res.TID;
            this.openCache(res);
          } 
          this.saveTempOpinion();
          let params = {
            batchCode: this.batchCode,
            taskId: this.taskId,
            activityName: this.activityName,
            projectId: this.pid
          };
          http.submitProcess(params).then(res => {
            this.$message({ message: "流程提交成功!", type: "success" });
            this.saveOpinion();
            this.closeTopTab();
            //待办箱刷新广播
            this.Event.$emit("HouseLocationTodo", "search");
            //已办箱刷新广播
            this.Event.$emit("HouseLocationDone", "search")
            this.$endLoading()
          }).catch(err => { 
            console.log(err);
            this.$endLoading()
          })
        }).catch(err =>{ console.log(err) })
      })
    },
    //退回上一环节
    hanleToPreNode(opionion) {
      this.opinion = opionion;
      let params = {
        batchCode: this.batchCode,
        taskId: this.taskId,
        activityName: this.activityName,
        projectId: this.pid
      };
      let data = {};
      this.$startLoading();
      http.backProcess(params, data).then(res => {
        if (res) {
          this.$message({
            message: "流程回退成功!",
            type: "success"
          });
          this.saveOpinion();
          this.closeTopTab();
          //待办箱刷新广播
          this.Event.$emit("HouseLocationTodo", "search");
          //已办箱刷新广播
          this.Event.$emit("HouseLocationDone", "search")
          this.$endLoading()
        }
      }).catch(err => {
        console.log(err);
        this.$endLoading()
      });
    },
    //流程不通过
    unsubmit() {
      let params = { batchCode: this.batchCode };
      this.$startLoading();
      http.noPassProcess(params).then(res => {
        if (res) {
          this.$message({
            message: "流程提交不通过成功",
            type: "success"
          });
          this.saveOpinion();
          this.closeTopTab();
          //待办箱刷新广播
          this.Event.$emit("HouseLocationTodo", "search");
          //已办箱刷新广播
          this.Event.$emit("HouseLocationDone", "search")
          lthis.$endLoading()
        }
      }).catch(err => {
        console.log(err);
        this.$endLoading()
      });
    },
    //保存暂存意见
    saveTempOpinion() {
      if (this.taskId && this.activityName && this.pid ) {
        let params = { taskId: this.taskId };
        let data = {
          activitySource: this.activityName, //来源环节
          businessType: "房屋坐落变更", //业务类型
          dealTime: new Date(), //办理时间
          dealer: this.dealer, //办理人
          pid: this.pid,
          remark: this.opinion //办理意见
        };
        common.saveTempOpinion(params, data).then(res => {
          console.log("保存暂存意见成功");
          this.getTempOpinion();
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
    //获取暂存意见
    getTempOpinion() {
      let params = {
        taskId: this.taskId
      };
      common.getTempOpinion(params).then(res => {
        this.opinion = res.remark;
      })
      .catch(err => {
        console.log(err);
      });
    },
    //提交下一环节保存办理意见
    saveOpinion() {
      let params = { taskId: this.taskId };
      let data = {
        activitySource: this.activityName, //来源环节
        businessType: "房屋坐落变更", //业务类型
        dealTime: new Date(), //办理时间
        dealer: this.dealer, //办理人
        pid: this.pid,
        remark: this.opinion //办理意见
      };
      common.saveOpinion(params, data).then(res => {}).catch(err => { console.log(err) });
    },
    
    //获取流程数据
    getProcessInfo() {
      let params = {
        taskId: this.$route.query.taskId
      };
      http.getProcessInfo(params).then(res => {
        this.activityName = res[0].ACTIVITYNAME;
        this.dealer = res[0].CREATEUSERNAME;
        this.pid = res[0].PID;
        this.taskId = res[0].TID;
        if(this.activityName == '审核') this.ctrlEdit = true //审核环节操作按钮都要禁用
        this.getOpionionList();
      })
      .catch(err => {
        console.log(err);
      });
    },
     //获取办理意见列表
    getOpionionList() {
      let params = { pid: this.pid };
      common.getOpinion(params).then(res => {
        this.opinionList = res;
      }).catch(err => {
        console.log(err);
      });
    },
    //案件删除
    deleteProcess() {
      this.$confirm("此操作将进行案件删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          batchCode: this.batchCode
        };
        http.deleteLocatedProcess(params).then(res => {
          if (res) {
            this.$message({
              message: "删除成功!",
              type: "success"
            });
          }
          this.closeTopTab();
          this.Event.$emit("HouseLocationTodo", "search");
        }).catch(err => {
          console.log(err);
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消保存"
        });
      });
    },
    //打开日志弹框
    openLogDialog() {
      this.logDialog = true;
      let params = {
        houseGuid: this.batchCode
      };
      https.getLog(params).then(res => {
        this.logList = res;
      }).catch(err => {
        console.log(err);
      });
    },
    //当前页的大小变化
    handleSizeChange(val) {
      this.pageSize = val;
      this.search()
    },
    //当前页的页码变化
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search()
    },
    //当前页的大小变化
    houseSizeChange(val) {
      this.housePageSize = val;
      this.houseList()
    },
    //当前页的页码变化
    houseCurrentChange(val) {
      this.houseCurrentPage = val;
      this.houseList()
    },
    //当前页的大小变化
    originalVillageCurrentChange(val) {
      this.originalVillageCurrentPage = val;
      this.getOriginalVillage()
    },
    //当前页的页码变化
    originalVillageSizeChange(val) {
      this.houseCurrentPage = val;
      this.originalVillagePageSize()
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
    //当前页的大小变化
    recordSizeChange(val) {
      this.recordPageSize = val;
      this.search()
    },
    //当前页的页码变化
    recordCurrentChange(val) {
      this.recordCurrentPage = val;
      this.search()
    },
    //获取字典数据
    getDictionary() {
      let nameData = [ "所属区","房产来源","房屋用途","房屋性质","房屋状态","户型","朝向","平台","办理意见常用语","建筑基础", "建筑结构", "当前属性", "最初属性"];
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
          this.originalPropertyData = res.当前属性;
          this.currentPropertyData = res.最初属性;
          this.orientationData = this.$dictionaryChange(res.朝向,this.orientationData,"通用");
          this.changeAfterNatureData = this.$dictionaryChange(res.房屋性质,this.changeAfterNatureData,"通用");
          // this.commonWords = this.$dictionaryChange(res.办理意见常用语,this.commonWords, "房源分配常用意见");
        }).catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getDictionary(); //数据字典
    if(this.$route.params.guid == 'new') {
      this.createBatchCode(); //新增生成批次代码
    } else{
      this.batchCode = this.$route.params.guid;
      this.getProcessInfo();
      this.showOpinion = true;//不是新增其他环节可看到审核意见
    }
    //待办箱已办箱查看进入不可编辑
    if(this.$route.params.state == 'check') {
      this.ctrlEdit = true;
      this.handleIsShow = false;//隐藏办理意见
    }
  },
  mounted() {
    if(this.batchCode) {
      this.search()
    }
  }
}
</script>
<style lang="scss" scoped>
#house-location-detail {
  /deep/ .el-radio__label {
    padding-left: 0px !important;
  }
  .top_btn{
    margin: 10px 0 30px 4px;
  }
  .text_box {
    position: relative;
    .left_btn {
      position: absolute;
      left:230px;
      top: -2px
    }
    .right_btn {
      position: absolute;
      right: 0;
      top: 0
    }
    .district_btn{
      position: absolute;
      left: 210px;
      top: -2px
    }
  }
  .bulid_box {
    position: relative;
    margin-top: 40px;
    .bulid_btn {
      position: absolute;
      left: 200px;
      top: -2px
    }
  }
  /deep/ .el-table .success-row {
    background: #f2dede;
  }
  .el-table--enable-row-hover /deep/ .el-table__body tr:hover > td {
    /*取消划过效果*/
    background-color: transparent !important;
  }
  ::-webkit-scrollbar {
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    width: 2px;
    height: 16px;
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-thumb {
    /*定义滑块 内阴影+圆角*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #e6f0fc;
  }
  /deep/ .el-dialog__wrapper .el-table__header-wrapper  .el-checkbox{//禁用全选
    display:none;
  }
}
</style>