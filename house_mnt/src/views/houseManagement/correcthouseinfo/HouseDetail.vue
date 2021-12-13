<!--房详情-->
<template>
  <div class="house-details">
    <div style="position: relative">
      <el-button
        type="warning"
        size="mini"
        @click="deleteHouse"
        :disabled="this.$route.query.activityName == '审批'"
        v-if="
          !(form.state == 0) &&
          !(this.$route.params.state == 'done') &&
          hasPerm('fygl_fyxxkw_fyxx_scfy')
        "
        >删除房源</el-button
      >
      <el-button
        type="warning"
        size="mini"
        @click="recoverHouseInfo"
        :disabled="this.$route.query.activityName == '审批'"
        v-if="
          form.state == 0 &&
          !(this.$route.params.state == 'done') &&
          hasPerm('fygl_fyxxkw_fyxx_hffy')
        "
        >恢复房源</el-button
      >
      <div style="position: absolute; top: 0px; right: 0px">
        <el-button
          type="primary"
          size="mini"
          @click="save"
          :disabled="this.$route.query.activityName == '审批'"
          v-if="
            hasPerm('fygl_fyxxkw_fyxx_bc') &&
            !(this.$route.params.state == 'done')
          "
          >保存</el-button
        >
      </div>
    </div>
    <publicTitle title="房源基本信息"></publicTitle>
    <div class="tableStyle">
      <table>
        <tr>
          <td>小区编号</td>
          <td>
            <el-input v-model="form.districtNo" disabled></el-input>
          </td>
          <td>小区名称</td>
          <td>
            <el-input v-model="form.districtName" disabled></el-input>
          </td>
        </tr>
        <tr>
          <td>栋号</td>
          <td>
            <el-input v-model="form.buildNo" disabled></el-input>
          </td>
          <td>栋名称</td>
          <td>
            <el-select
              style="width: 100%"
              v-model="form.buildName"
              placeholder="请选择"
              :class="{ input: isBuildName }"
              :disabled="editform"
              @change="changeBuildName()"
            >
              <el-option
                v-for="(item, index) in buildDataName"
                :key="index"
                :label="item.dmc"
                :value="item.guid"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>房号</td>
          <td>
            <el-input
              v-model="form.houseNo"
              :class="{ input: isHouseNo }"
              :disabled="editform"
            ></el-input>
          </td>
          <td>网格办编码</td>
          <td>
            <el-input
              v-model="form.serialNo"
              :class="{ input: isSerialNo }"
              :disabled="editform"
            >
              <el-button
                type="primary"
                @click="dinwei()"
                slot="append"
                size="mini"
                :disabled="editform"
                >定位
              </el-button></el-input
            >
          </td>
        </tr>
        <tr>
          <td>地址</td>
          <td colspan="3">
            <el-input
              v-model="form.standardAddress"
              :class="{ input: isStandardAddress }"
              :disabled="editform"
            >
              <el-button
                type="primary"
                @click="newCorrect()"
                slot="append"
                size="mini"
                >获取编码
              </el-button>
              <el-button
                type="primary"
                @click="jiuji()"
                slot="append"
                size="mini"
                >发起救济</el-button
              >
            </el-input>
          </td>
        </tr>
        <tr>
          <td>房屋状态</td>
          <td>
            <el-select
              style="width: 100%"
              v-model="form.state"
              placeholder="请选择"
              :class="{ input: isState }"
              disabled
            >
              <el-option
                v-for="(item, index) in stateDate"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
          <td>曾用房号</td>
          <td>
            <el-input
              v-model="form.usedHouseNo"
              :class="{ input: isHouseNo }"
              disabled
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>所在单元</td>
          <td>
            <el-input
              v-model="form.unit"
              placeholder="请输入内容"
              :class="{ input: isUnit }"
              :disabled="editform"
            ></el-input>
          </td>
          <td>所在楼层</td>
          <td>
            <el-input
              v-model="form.floorNo"
              placeholder="请输入内容"
              @keyup.native="proving1"
              :class="{ input: isFloorNo }"
              :disabled="editform"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>房屋来源</td>
          <td style="text-align: left">
            <el-select
              style="width: 100%"
              v-model="form.source"
              placeholder="请选择"
              :class="{ input: isSource }"
              :disabled="editform"
              clearable
            >
              <el-option
                v-for="(item, index) in sourceData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
          <td>房屋用途</td>
          <td style="text-align: left">
            <el-select
              style="width: 100%"
              v-model="form.function"
              placeholder="请选择"
              :class="{ input: isFunction }"
              :disabled="editform"
              clearable
            >
              <el-option
                v-for="(item, index) in functionData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>户型</td>
          <td style="text-align: left">
            <el-select
              style="width: 100%"
              v-model="form.houseLayout"
              placeholder="请选择"
              :class="{ input: isHouseLayout }"
              :disabled="editform"
              clearable
            >
              <el-option
                v-for="(item, index) in typeData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
          <td>朝向</td>
          <td style="text-align: left">
            <el-select
              style="width: 100%"
              v-model="form.orientation"
              placeholder="请选择"
              :class="{ input: isOrientation }"
              :disabled="editform"
              clearable
            >
              <el-option
                v-for="(item, index) in orientationData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>平台</td>
          <td style="text-align: left">
            <el-select
              style="width: 100%"
              v-model="form.terrace"
              placeholder="请选择"
              :class="{ input: isTerrace }"
              :disabled="editform"
              clearable
            >
              <el-option
                v-for="(item, index) in terraceData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
          <td>是否有架空层</td>
          <td style="text-align: left">
            <el-select
              style="width: 100%"
              v-model="form.innerFloor"
              placeholder="请选择"
              :class="{ input: isInnerFloor }"
              :disabled="editform"
              clearable
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
          <td>(预测绘)套内面积</td>
          <td style="position: relative" :class="{ input: isIndoorArea }">
            <el-input
              v-model="form.indoorArea"
              placeholder="请输入内容"
              @input="proving4()"
              ref="indoorArea"
              :disabled="editform"
            ></el-input>
            <span style="position: absolute; top: 7px; right: 5px">㎡</span>
          </td>
          <td>(预测绘)分摊面积</td>
          <td
            style="position: relative"
            :class="{ input: isResidentialPoolArea }"
          >
            <el-input
              v-model="form.residentialPoolArea"
              placeholder="请输入内容"
              @input="proving3()"
              :disabled="editform"
              ref="residentialPoolArea"
            ></el-input>
            <span style="position: absolute; top: 7px; right: 5px">㎡</span>
          </td>
        </tr>
        <tr>
          <td>(预测绘)建筑面积</td>
          <td style="position: relative" :class="{ input: isCoveredArea }">
            <el-input
              v-model="form.coveredArea"
              placeholder="请输入内容"
              @input="proving2()"
              ref="coveredAreax"
              :disabled="editform"
            ></el-input>
            <span style="position: absolute; top: 7px; right: 5px">㎡</span>
          </td>
          <td>竣工建筑面积</td>
          <td style="position: relative" :class="{ input: isCompletionArea }">
            <el-input
              v-model="form.completionArea"
              placeholder="请输入内容"
              @input="proving5()"
              ref="completionArea"
              :disabled="editform"
            ></el-input>
            <span style="position: absolute; top: 7px; right: 5px">㎡</span>
          </td>
        </tr>
        <tr>
          <td>竣工分摊面积</td>
          <td
            style="position: relative"
            :class="{ input: isCompletionShareArea }"
          >
            <el-input
              v-model="form.completionShareArea"
              placeholder="请输入内容"
              @input="proving2()"
              ref="coveredAreax"
              :disabled="editform"
            ></el-input>
            <span style="position: absolute; top: 7px; right: 5px">㎡</span>
          </td>
          <td>竣工套内面积</td>
          <td
            style="position: relative"
            :class="{ input: isCompletionIndoorArea }"
          >
            <el-input
              v-model="form.completionIndoorArea"
              placeholder="请输入内容"
              @input="proving5()"
              ref="completionArea"
              :disabled="editform"
            ></el-input>
            <span style="position: absolute; top: 7px; right: 5px">㎡</span>
          </td>
        </tr>
        <tr>
          <td>分摊面积说明</td>
          <td colspan="3">
            <el-input
              v-model="form.residentialAreaContent"
              :class="{ input: isResidentialAreaContent }"
              :disabled="editform"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>开工时间</td>
          <td style="text-align: left">
            <el-date-picker
              style="width: 100%"
              v-model="form.startConstructionTime"
              type="date"
              :class="{ input: isStartConstructionTime }"
              placeholder="选择日期"
              :disabled="editform"
            ></el-date-picker>
          </td>
          <td>竣工时间</td>
          <td style="text-align: left">
            <el-date-picker
              style="width: 100%"
              :class="{ input: isFinishConstructionTime }"
              v-model="form.finishConstructionTime"
              type="date"
              :disabled="editform"
              placeholder="选择日期"
            ></el-date-picker>
          </td>
        </tr>
        <tr>
          <td>交付使用时间</td>
          <td style="text-align: left">
            <el-date-picker
              style="width: 100%"
              :class="{ input: isDeliveryTime }"
              v-model="form.deliveryTime"
              type="date"
              :disabled="editform"
              placeholder="选择日期"
            ></el-date-picker>
          </td>
          <td>装修标准</td>
          <td style="text-align: left">
            <el-select
              style="width: 100%"
              v-model="form.decorationType"
              placeholder
              :disabled="editform"
              @change="changeDecorationType()"
              clearable
            >
              <el-option
                v-for="(item, index) in DistrictRenovationList"
                :key="index"
                :label="item.renovationCode"
                :value="item.renovationCode"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>装修标准说明</td>
          <td colspan="3">
            <el-tooltip
              class="item"
              effect="dark"
              content="此处利用鼠标可拖动"
              placement="right-end"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入内容"
                v-model="form.decorationTypeDescription"
                disabled
                @change="changeDecorationTypeDescription"
              ></el-input>
            </el-tooltip>
            <!-- <el-select
              style="width: 100%;"
              :class="{ input: isDecorationTypeDescription }"
              v-model="form.decorationTypeDescription"
              placeholder
              :disabled="editform"
              @change="changeDecorationTypeDescription"
              clearable
            >
              <el-option
                v-for="(item, index) in DistrictRenovationList"
                :key="index"
                :label="item.renovationDescription"
                :value="item.renovationDescription"
              ></el-option>
            </el-select>-->
          </td>
        </tr>
        <tr>
          <td>是否样板房</td>
          <td>
            <el-select
              style="width: 100%"
              v-model="form.modelHouses"
              placeholder="请选择"
              :class="{ input: isModelHouses }"
              :disabled="editform"
              clearable
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
              style="width: 100%"
              v-model="form.helpSell"
              placeholder="请选择"
              :class="{ input: isHelpSell }"
              :disabled="editform"
              clearable
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
          <td>初始房源性质</td>
          <td>
            <el-input v-model="form.startNatureName" disabled></el-input>
          </td>
          <td>当前房源性质</td>
          <td>
            <el-input v-model="form.changeAfterNatureName" disabled></el-input>
          </td>
        </tr>
        <tr>
          <td>当前属性</td>
          <td>
            <el-select
              style="width: 100%"
              v-model="form.currentProperty"
              :class="{ input: isCurrentProperty }"
              :disabled="editform"
            >
              <el-option
                v-for="(item, index) in originalPropertyData"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </td>
          <td>初始属性</td>
          <td>
            <el-select
              style="width: 100%"
              v-model="form.originalProperty"
              disabled
            >
              <el-option
                v-for="(item, index) in currentPropertyData"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>是否查封冻结</td>
          <td colspan="3">
            <el-select
              style="width: 100%"
              v-model="form.closed"
              placeholder="请选择"
              disabled
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="editform"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>是否锁定</td>
          <td>
            <el-select
              style="width: 100%"
              v-model="form.locked"
              placeholder="请选择"
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
          <td>房源标注</td>
          <td colspan="3">
            <el-input v-model="form.situationalRemark" disabled></el-input>
          </td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="3">
            <el-input
              type="textarea"
              v-model="form.specification"
              placeholder="请输入内容"
              :class="{ input: isSpecification }"
              :disabled="editform"
            ></el-input>
          </td>
        </tr>
      </table>
    </div>
    <publicTitle title="房源使用权信息"></publicTitle>
    <div class="tableStyle">
      <table>
        <tr>
          <td>初始分配权归属</td>
          <td>
            <el-input
              v-model="form.initialAllocationRightName"
              disabled
            ></el-input>
          </td>
          <td>当前分配权归属</td>
          <td>
            <el-input v-model="form.allocationRightUnit" disabled></el-input>
          </td>
        </tr>
        <tr>
          <td>初始签约权归属</td>
          <td>
            <el-input
              v-model="form.initialSignatoryRightName"
              disabled
            ></el-input>
          </td>
          <td>当前签约权归属</td>
          <td>
            <el-input v-model="form.signatoryRightUnit" disabled></el-input>
          </td>
        </tr>
        <tr>
          <td>初始数据维护权归属</td>
          <td>
            <el-input
              v-model="form.initialMaintainRightName"
              disabled
            ></el-input>
          </td>
          <td>当前数据维护权归属</td>
          <td>
            <el-input v-model="form.maintainRightUnit" disabled></el-input>
          </td>
        </tr>
        <tr>
          <td>初始运维权归属</td>
          <td>
            <el-input
              v-model="form.initialOperationalRightName"
              disabled
            ></el-input>
          </td>
          <td>当前运维权归属</td>
          <td>
            <el-input v-model="form.operationalRightUnit" disabled></el-input>
          </td>
        </tr>
      </table>
      <publicTitle title="房源产权信息"></publicTitle>
      <table>
        <tr>
          <td>初始产权归属</td>
          <td>
            <el-input v-model="form.propertypBelongName" disabled></el-input>
          </td>
          <td>当前产权归属</td>
          <td>
            <el-input v-model="form.propertyRightUnit" disabled></el-input>
          </td>
        </tr>
        <tr>
          <td>不动产单元号</td>
          <td>
            <el-input
              v-model="form.immovablePropertyUnitNo"
              :class="{ input: isImmovablePropertyUnitNo }"
              disabled
            ></el-input>
          </td>
          <td>共有情况</td>
          <td>
            <el-input
              v-model="form.commonalityCondition"
              :class="{ input: isCommonalityCondition }"
              disabled
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>使用开始时间</td>
          <td>
            <el-date-picker
              style="width: 100%"
              v-model="form.startUseTime"
              type="date"
              :class="{ input: isStartUseTime }"
              placeholder="选择日期"
              disabled
            ></el-date-picker>
          </td>
          <td>使用结束时间</td>
          <td>
            <el-date-picker
              style="width: 100%"
              v-model="form.endUserTime"
              type="date"
              :class="{ input: isEndUserTime }"
              placeholder="选择日期"
              disabled
            ></el-date-picker>
          </td>
        </tr>
        <tr>
          <td>登记价人民币</td>
          <td>
            <el-input
              v-model="form.registPrice"
              :class="{ input: isRegistPrice }"
              disabled
            ></el-input>
          </td>
          <td>房屋原值</td>
          <td>
            <el-input
              v-model="form.houseOriginalPrice"
              :class="{ input: isHouseOriginalPrice }"
              disabled
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>不动产证书号</td>
          <td>
            <el-input
              v-model="form.rightOverImmovablesId"
              :class="{ input: isRightOverImmovablesId }"
              disabled
            ></el-input>
          </td>
          <td>产权登记时间</td>
          <td>
            <el-date-picker
              style="width: 100%"
              v-model="form.djsj"
              :class="{ input: isDjsj }"
              type="date"
              placeholder="选择日期"
              disabled
            ></el-date-picker>
          </td>
        </tr>
      </table>
    </div>
    <publicTitle title="信息变更列表"></publicTitle>
    <div class="table">
      <el-table
        :data="changeDetailList"
        border
        size="mini"
        :header-cell-style="{
          background: '#E6F0FC',
          color: '#606266',
          'text-align': 'center',
          'border-color': '#DBDBDB',
        }"
        :cell-style="{
          'text-align': 'center',
          'border-color': '#DBDBDB',
        }"
      >
        <el-table-column
          label="序号"
          width="80"
          type="index"
          :index="indexMethod"
        ></el-table-column>
        <el-table-column prop="changeGuid" label="勘误类型"></el-table-column>
        <el-table-column prop="changeItem" label="勘误项"></el-table-column>
        <el-table-column label="勘误前">
          <template slot-scope="scope">{{
            scope.row.changeBefore | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column prop="changeAfter" label="勘误后">
          <template slot-scope="scope">{{
            scope.row.changeAfter | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column label="勘误时间">
          <template slot-scope="scope">{{
            scope.row.changeTime | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column prop="operator" label="变更人"></el-table-column>
      </el-table>
      <div class="page_box">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizesList"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNumber"
          background
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dinweiDialog"
      width="30%"
      :close-on-click-modal="false"
    >
      <div>
        <p>通过地址编码获取的地址与当前地址不一致，确认是否替换当前地址！</p>
        <span>当前地址：</span> {{ this.form.standardAddress }}
        <p><span>网格办地址：</span>{{ this.address }}</p>
      </div>
      <div slot="footer" style="text-align: center">
        <el-button @click="change()" type="primary" size="mini">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="编码信息"
      :visible.sync="newCorrectDialog"
      width="80%"
      :close-on-click-modal="false"
      ><div class="search">
        <el-form
          size="mini"
          label-position="left"
          :model="newCorrectForm"
          label-width="5rem"
        >
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="房屋地址">
                <el-input clearable v-model="newCorrectForm.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-checkbox v-model="checked" label="2">精准查询 </el-checkbox>
              <el-button
                type="primary"
                size="mini"
                @click="searchReseauDataByAddr"
                >查询</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="table">
        <el-table
          :data="newCorrectInfo"
          ref="newCorrectInfo"
          @row-click="chooseInfo"
          border
          size="mini"
          :header-cell-style="{
            background: '#E6F0FC',
            color: '#606266',
            'text-align': 'center',
            'border-color': '#DBDBDB',
          }"
          :cell-style="{
            'text-align': 'center',
            'border-color': '#DBDBDB',
          }"
        >
          <el-table-column label="#" width="50" align="center">
            <template slot-scope="scope">
              <el-radio class="radio" v-model="radio" :label="scope.$index"
                >&nbsp;</el-radio
              >
            </template>
          </el-table-column>
          <el-table-column prop="addr" label="地址"> </el-table-column>
          <el-table-column
            prop="code"
            label="网格办编码"
          ></el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="handleCorrectSizeChange"
            @current-change="handleCorrectCurrentChange"
            :current-page="newCorrectInfoPage.currentPage"
            :page-sizes="newCorrectInfoPage.pageSizesList"
            :page-size="newCorrectInfoPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="newCorrectInfoPage.totalNumber"
            background
          ></el-pagination>
        </div>
      </div>
      <div slot="footer" style="text-align: center">
        <el-button @click="newCorrectConfirm()" type="primary" size="mini"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/api/housestore.js";
import api from "@/api/houseApproval";
import publicTitle from "@/components/TitleStyle"; //标题组件
import { Differ } from "@/components/js/change";
import common from "@/api/common.js";
export default {
  name: "buildingDetails",
  components: {
    publicTitle, //标题公共组件
  },
  data() {
    return {
      houseGuid: "", //房的guid
      guid: "", //小区的guid
      PID: "", //pid
      edit: true, //禁用
      coveredAreaAsyn: "",
      residentialPoolAreaAsyn: "",
      indoorAreaAsyn: "",
      completionAreaAsyn: "",
      form: {},
      activeName: [],
      changeDetailList: [], //变更数据
      tableData: [], //信息变更列表的数据
      options: [
        { value: true, label: "是" },
        { value: false, label: "否" },
      ],
      sourceData: [], //房屋来源下拉数据
      functionData: [], //房屋用途下拉数据
      natureData: [], //房屋性质下拉数据
      typeData: [], //户型下拉数据
      orientationData: [], //朝向下拉数据
      terraceData: [], //平台下拉数据
      originalPropertyData: [], //当前属性下拉框
      currentPropertyData: [], //初始属性下拉框
      DistrictRenovationList: [], //装修列表
      buildDataName: [], //栋名称
      stateDate: [], //房屋状态
      DistrictRenovationList: [], //装修列表
      clickBtn: false, //是否点击删除按钮
      currentPage: 1,
      pageSize: 10,
      pageSizesList: [10, 20, 30, 40],
      totalNumber: 0, //数据的总数
      isHouseNo: false,
      isSerialNo: false,
      isState: false,
      isUnit: false,
      isFloorNo: false,
      isSource: false,
      isFunction: false,
      isHouseLayout: false,
      isOrientation: false,
      isTerrace: false,
      isInnerFloor: false,
      isCoveredArea: false,
      isCompletionArea: false,
      isIndoorArea: false,
      isResidentialPoolArea: false,
      isResidentialAreaContent: false,
      isStartConstructionTime: false,
      isFinishConstructionTime: false,
      isDeliveryTime: false,
      isDecorationType: false,
      isModelHouses: false,
      isHelpSell: false,
      isImmovablePropertyUnitNo: false,
      isCommonalityCondition: false,
      isStartUseTime: false,
      isEndUserTime: false,
      isRegistPrice: false,
      isHouseOriginalPrice: false,
      isRightOverImmovablesId: false,
      isDecorationTypeDescription: false,
      isDjsj: false,
      isSpecification: false,
      isSource: false,
      isFunction: false,
      isHouseLayout: false,
      isOrientation: false,
      isTerrace: false,
      isInnerFloor: false,
      isCompletionShareArea: false,
      isCompletionIndoorArea: false,
      isCurrentProperty: false,
      isBuildName: false,
      isStandardAddress: false,
      edit: "", //表示是否可以编辑
      editform: "", //是否可以编辑表单
      dinweiDialog: false,
      address: "",
      newCorrectDialog: false, //
      newCorrectForm: {
        page: 1,
        limit: 20,
        lv: 11,
        address: "",
      },
      newCorrectInfo: [], //
      newCorrectInfoPage: {
        currentPage: 1,
        pageSize: 20,
        pageSizesList: [10, 20, 30, 40],
        totalNumber: 0,
      },
      radio: false,
      checked: false,
    };
  },
  methods: {
    newCorrect() {
      this.newCorrectDialog = true;
      // this.getDictionary();
      this.$set(this.newCorrectForm, "address", this.form.standardAddress);
      this.searchReseauDataByAddr();
    },
    //当前页的大小改变
    handleCorrectSizeChange(val) {
      this.newCorrectForm.limit = val;
      this.searchReseauDataByAddr();
    },
    handleCorrectCurrentChange(val) {
      this.newCorrectForm.page = val;
      this.searchReseauDataByAddr();
    },
    newCorrectConfirm() {
      if (!this.selectedData.code) {
        this.$message("请选择对应地址再进行提交");
      } else {
        this.form.serialNo = this.selectedData.code;
        this.$set(this.form, "standardAddress", this.selectedData.addr);
        this.$set(this.form, "longitude", this.selectedData.loc.coordinates[0]);
        this.$set(this.form, "latitude", this.selectedData.loc.coordinates[1]);
      }
      this.newCorrectDialog = false;
      this.checked = true;
    },
    searchReseauDataByAddr() {
      if (
        this.newCorrectForm.address == null ||
        this.newCorrectForm.address == ""
      ) {
        return;
      }
      // this.newCorrectForm.address = this.dto1.standardAddress;
      let params = this.newCorrectForm;
      if (this.checked) {
        this.newCorrectForm.fuzzy = false;
      } else {
        this.newCorrectForm.fuzzy = true;
      }
      common
        .searchReseauDataByAddr(params)
        .then((res) => {
          this.newCorrectInfo = res;
          this.newCorrectInfoPage.totalNumber = res[0].count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //选中
    chooseInfo(val) {
      this.newCorrectInfo.forEach((item, index) => {
        if (item.guid === val.guid) {
          this.radio = index;
          this.selectedData = val;
        }
      });
    },
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //改变装修类型
    changeDecorationType() {
      this.isDecorationType = true;
      console.log(this.DistrictRenovationList);
      if (this.DistrictRenovationList) {
        for (var i = 0; i < this.DistrictRenovationList.length; i++) {
          if (
            this.DistrictRenovationList[i].renovationCode ==
            this.form.decorationType
          ) {
            this.form.decorationTypeDescription = this.DistrictRenovationList[
              i
            ].renovationDescription;
          } else {
            this.form.decorationTypeDescription = "";
          }
          this.isDecorationTypeDescription = true;
        }
      }
    },
    //改变装修标准说明
    changeDecorationTypeDescription() {
      this.isDecorationTypeDescription = true;
      if (this.DistrictRenovationList) {
        for (var i = 0; i < this.DistrictRenovationList.length; i++) {
          if (
            this.form.decorationTypeDescription ==
            this.DistrictRenovationList[i].renovationDescription
          ) {
            this.form.decorationType = this.DistrictRenovationList[
              i
            ].renovationCode;
            break;
          } else {
            this.form.decorationType = "";
          }
          this.isDecorationType = true;
        }
      }
    },
    //验证只能输入正整数
    proving1() {
      this.form.floorNo = this.form.floorNo.replace(/[^\.\d]/g, "");
      this.form.floorNo = this.form.floorNo.replace(".", "");
    },
    proving2() {
      this.coveredAreaAsyn = this.coveredAreaAsyn.replace(/[^\.\d]/g, "");
      this.coveredAreaAsyn = this.coveredAreaAsyn.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      this.coveredAreaAsyn = this.coveredAreaAsyn
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", "."); //只保留一个小数点
      this.useCompany();
    },
    proving3() {
      this.residentialPoolAreaAsyn = this.residentialPoolAreaAsyn.replace(
        /[^\.\d]/g,
        ""
      );
      this.residentialPoolAreaAsyn = this.residentialPoolAreaAsyn.replace(
        /\.{2,}/g,
        "."
      ); //只保留第一个. 清除多余的
      this.residentialPoolAreaAsyn = this.residentialPoolAreaAsyn
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", "."); //只保留一个小数点
      this.useCompany();
    },
    proving4() {
      this.indoorAreaAsyn = this.indoorAreaAsyn.replace(/[^\.\d]/g, "");
      this.indoorAreaAsyn = this.indoorAreaAsyn.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      this.indoorAreaAsyn = this.indoorAreaAsyn
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", "."); //只保留一个小数点
      this.useCompany();
    },
    proving5() {
      this.completionAreaAsyn = this.completionAreaAsyn.replace(/[^\.\d]/g, "");
      this.completionAreaAsyn = this.completionAreaAsyn.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      this.completionAreaAsyn = this.completionAreaAsyn
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", "."); //只保留一个小数点
      this.useCompany();
    },
    //深度拷贝
    deepClone(source) {
      const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
      for (let keys in source) {
        // 遍历目标
        if (source.hasOwnProperty(keys)) {
          if (source[keys] && typeof source[keys] === "object") {
            // 如果值是对象，就递归一下
            targetObj[keys] = source[keys].constructor === Array ? [] : {};
            targetObj[keys] = deepClone(source[keys]);
          } else {
            // 如果不是，就直接赋值
            targetObj[keys] = source[keys];
          }
        }
      }
      return targetObj;
    },
    //获取栋名称
    getBuildingName() {
      let params = {
        districtGuid: this.guid,
      };
      http
        .getBuildingName(params)
        .then((res) => {
          this.buildDataName = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取房屋详情
    getHouseinfo() {
      let params = {};
      if (this.$route.params.state == "done") {
        params = {
          houseGuid: this.houseGuid,
          state: 1,
        };
      } else {
        params = {
          houseGuid: this.houseGuid,
          state: 0,
        };
      }
      http
        .getHouseInfo(params)
        .then((res) => {
          this.form = res; //房源信息数据
          if (this.form.state == 0) {
            this.edit = true;
          } else {
            this.edit = false;
          }
          if (this.form.orientation) {
            this.form.orientation = this.form.orientation.toString();
          }
          this.form = res; //变更后的数据
          this.getDistrictRenovationList();
          this.changeDecorationType(); //根据装修标准获取装修标准说明
          this.copyData = this.deepClone(res); //变更前的数据
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //恢复房源
    recoverHouseInfo() {
      let params = {
        houseGuid: this.houseGuid,
        districtGuid: this.guid,
        projectId: this.PID,
      };
      http
        .restorehousing(params)
        .then((res) => {
          this.$message.success("恢复房源成功");
          this.getHouseinfo();
          this.Event.$emit("CorrectApply", "changeDetail");
          this.Event.$emit("CorrectHouse", "getHouseList");
          this.clickBtn = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //删除房源
    deleteHouse() {
      this.$confirm("是否确定删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            projectId: this.PID,
          };
          let guidList = [];
          guidList.push(this.houseGuid);
          let data = guidList;
          http
            .deleteHouse(params, data)
            .then((res) => {
              this.clickBtn = true;
              this.getHouseinfo();
              this.$message.success("删除成功");
              this.Event.$emit("CorrectApply", "changeDetail");
              this.Event.$emit("CorrectHouse", "getHouseList");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    //保存变更明细
    saveChangeDetail() {
      var cfg = {
        buildName: "栋名称",
        completionArea: "竣工建筑面积",
        completionShareArea: "竣工分摊面积",
        completionIndoorArea: "竣工套内面积",
        modelHouses: "是否样板房",
        residentialAreaContent: "分摊面积说明",
        helpSell: "是否代售",
        immovablePropertyUnitNo: "不动产权单位号",
        commonalityCondition: "共有情况",
        houseOriginalPrice: "房屋原值",
        rightOverImmovablesId: "不动产权证书号",
        stateName: "房屋性质",
        completionArea: "竣工面积",
        coveredArea: "(预测绘)建筑面积",
        decorationType: "装修标准",
        decorationTypeDescription: "装修标准说明",
        floorNo: "所在楼层",
        function: "房屋用途",
        houseNo: "房号",
        indoorArea: "(预测绘)套内面积",
        orientation: "朝向",
        residentialPoolArea: "(预测绘)分摊面积",
        serialNo: "网格办编码",
        situational: "",
        situationalRemark: "问题房源标记",
        source: "房屋来源",
        specification: "备注",
        terrace: "平台",
        startUseTime: "使用开始时间",
        endUserTime: "使用结束时间",
        registPrice: "登记价人民币",
        djsj: "产权登记时间",
        deliveryTime: "交付使用时间",
        finishConstructionTime: "竣工时间",
        houseLayout: "户型",
        innerFloor: "是否有架空层",
        startConstructionTime: "开工时间",
        unit: "所在单元",
        currentProperty: "当前属性",
        buildNo: "栋号",
        standardAddress: "地址",
        latitude: "纬度",
        longitude: "经度"
      };
      var diff = new Differ(this.copyData, this.form, cfg);
      var changeData = diff.differ();
      if (changeData.length != 0) {
        changeData.forEach((ele) => {
          ele.changeGuid = "修改房源信息";
          ele.changeTime = new Date();
        });
      }
      let params = {
        districtGuid: this.guid,
        houseInfoGuid: this.houseGuid,
        projectId: this.PID,
      };
      let data = changeData;
      http
        .saveChangeDetail(params, data)
        .then((res) => {
          this.changeDetail();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取变更明细
    changeDetail() {
      let params = {
        districtGuid: this.guid,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        projectId: this.PID,
        type: this.houseGuid,
      };
      http
        .changeDetail(params)
        .then((res) => {
          this.changeDetailList = res.changeDetailsDTOS.content;
          this.totalNumber = res.changeDetailsDTOS.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //pageIndex改变时
    handleCurrentChange(val) {
      this.currentPage = val;
      this.changeDetail();
    },
    //pageSize改变时
    handleSizeChange(val) {
      this.pageSize = val;
      this.changeDetail();
    },
    //保存接口
    save() {
      // 房源信息保存方法
      // if (!this.form.houseNo) {
      //   this.$alert("无法保存信息，请输入房号", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.floorNo) {
      //   this.$alert("无法保存信息，请输入所在楼层", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.source) {
      //   this.$alert("无法保存信息，请选择房屋来源", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.function) {
      //   this.$alert("无法保存信息，请选择房屋用途", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.houseLayout) {
      //   this.$alert("无法保存信息，请选择户型", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.orientation) {
      //   this.$alert("无法保存信息，请选择朝向", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (this.form.innerFloor == null) {
      //   this.$alert("无法保存信息，请选择是否有架空层", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else {
      let _params = {
        houseInfoGuid: this.houseGuid,
      };
      http
        .userHouseCounts(_params)
        .then((res) => {
          if (res == 0 || res.data == 0) {
            this.$confirm("此操作将进行保存, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                this.saveHouseDeatil();
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消保存",
                });
              });
          } else if (res > 0 || res.data > 0) {
            this.$confirm(
              "该小区名下有" +
                res +
                "套房正处于使用状态，请谨慎修改信息,是否继续?",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }
            )
              .then(() => {
                this.saveHouseDeatil(); //房源信息保存方法
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消",
                });
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改",
          });
        })
        .catch((err) => {
          console.log(err);
        });
      // }
    },
    //保存房源详情
    saveHouseDeatil() {
      let _params = {};
      if (this.buildDataName) {
        this.buildDataName.forEach((ele) => {
          if (ele.guid == this.form.buildName) {
            this.form.buildName = ele.dmc;
          }
        });
      }
      let _data = this.form;
      http
        .updateHouse(_params, _data)
        .then((res) => {
          //房源信息修改方法
          this.saveChangeDetail();
          this.$message({
            message: "保存成功",
            type: "success",
          });
          this.getHouseinfo();
        })
        .catch((err) => {
          this.$message({
            message: "保存失败",
            type: "warning",
          });
        });
    },
    //勘误-获取小区装修标准信息
    getDistrictRenovationList() {
      let params = {
        districtGuid: this.$parent.params.districtGuid,
      };
      api
        .getDistrictRenovationList(params)
        .then((res) => {
          this.DistrictRenovationList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取字典数据
    getDictionary() {
      let nameData = [
        "房产来源",
        "住宅类型",
        "房屋性质",
        "户型",
        "朝向",
        "平台",
        "装修标准",
        "房屋状态",
        "当前属性",
        "最初属性",
      ];
      let params = { names: nameData.toString() };
      http
        .getDictionary(params)
        .then((res) => {
          res = JSON.parse(res);
          this.sourceData = res.房产来源;
          this.functionData = res.住宅类型;
          this.natureData = this.$dictionaryChange(
            res.房屋性质,
            this.natureData,
            "通用"
          );
          this.typeData = res.户型;
          this.orientationData = this.$dictionaryChange(
            res.朝向,
            this.orientationData,
            "通用"
          );
          this.stateDate = res.房屋状态;
          this.originalPropertyData = res.当前属性;
          this.currentPropertyData = res.最初属性;
          this.terraceData = res.平台;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    useCompany() {
      //计算字符串长度
      function fontwidth(text) {
        let span = document.createElement("span");
        let result = {};
        result.width = span.offsetWidth;
        span.style.visibility = "hidden";
        span.style.display = "inline-block";
        document.body.appendChild(span);
        if (typeof span.textContent != "undefined") {
          span.textContent = text;
        } else {
          span.innerText = text;
        }
        result.width =
          parseFloat(window.getComputedStyle(span).width) - result.width;
        return result;
      }
      if (this.residentialPoolAreaAsyn.length == 0) {
        this.$refs.residentialPoolArea.style.width = "80%";
      } else {
        this.$refs.residentialPoolArea.style.width =
          fontwidth(this.residentialPoolAreaAsyn).width + "px";
      }
      if (this.completionAreaAsyn.length == 0) {
        this.$refs.completionArea.style.width = "80%";
      } else {
        this.$refs.completionArea.style.width =
          fontwidth(this.completionAreaAsyn).width + "px";
      }
      if (this.indoorAreaAsyn.length == 0) {
        this.$refs.indoorArea.style.width = "80%";
      } else {
        this.$refs.indoorArea.style.width =
          fontwidth(this.indoorAreaAsyn).width + "px";
      }
      if (this.coveredAreaAsyn.length == 0) {
        this.$refs.coveredAreax.style.width = "80%";
      } else {
        this.$refs.coveredAreax.style.width =
          fontwidth(this.coveredAreaAsyn).width + "px";
      }
    },
    //修改样式
    changeBuildName() {
      this.isBuildName = true;
      if (this.buildDataName) {
        this.buildDataName.forEach((ele) => {
          if (ele.guid == this.form.buildName) {
            this.form.buildNo = ele.dh;
          }
        });
      }
    },
    changeHouseNo() {
      this.isHouseNo = true;
    },
    changeSerialNo() {
      this.isSerialNo = true;
    },
    changeState() {
      this.isState = true;
    },
    changeUnit() {
      this.isUnit = true;
    },
    changeFloorNo() {
      this.isFloorNo = true;
    },
    changeSource() {
      this.isSource = true;
    },
    changeFunction() {
      this.isFunction = true;
    },
    changeHouseLayout() {
      this.isHouseLayout = true;
    },
    changeCurrentProperty() {
      this.isCurrentProperty = true;
    },
    changeOrientation() {
      this.isOrientation = true;
    },
    changeTerrace() {
      this.isTerrace = true;
    },
    changeInnerFloor() {
      this.isInnerFloor = true;
    },
    changeCoveredArea() {
      this.isCoveredArea = true;
    },
    changeCompletionArea() {
      this.isCompletionArea = true;
    },
    changeIndoorArea() {
      this.isIndoorArea = true;
    },
    changeResidentialPoolArea() {
      this.isResidentialPoolArea = true;
    },
    changeResidentialAreaContent() {
      this.isResidentialAreaContent = true;
    },
    changeStartConstructionTime() {
      this.isStartConstructionTime = true;
    },
    changeFinishConstructionTime() {
      this.isFinishConstructionTime = true;
    },
    changeDeliveryTime() {
      this.isDeliveryTime = true;
    },
    changeModelHouses() {
      this.isModelHouses = true;
    },
    changeHelpSell() {
      this.isHelpSell = true;
    },
    changeImmovablePropertyUnitNo() {
      this.isImmovablePropertyUnitNo = true;
    },
    changeCommonalityCondition() {
      this.isCommonalityCondition = true;
    },
    changeStartUseTime() {
      this.isStartUseTime = true;
    },
    changeEndUserTime() {
      this.isEndUserTime = true;
    },
    changeRegistPrice() {
      this.isRegistPrice = true;
    },
    changeHouseOriginalPrice() {
      this.isHouseOriginalPrice = true;
    },
    changeRightOverImmovablesId() {
      this.isRightOverImmovablesId = true;
    },
    changeDjsj() {
      this.isDjsj = true;
    },
    changeSpecification() {
      this.isSpecification = true;
    },
    changeCompletionShareArea() {
      this.isCompletionShareArea = true;
    },
    changeCompletionIndoorArea() {
      this.isCompletionIndoorArea = true;
    },
    changeStandardAddress() {
      this.isStandardAddress = true;
    },
    dinwei() {
      if (this.form.serialNo == null || this.form.serialNo == "") {
        return;
      }
      let params = {
        reseauCode: this.form.serialNo,
        page: 1,
        limit: 10,
      };
      common
        .searchReseauDataByCode(params)
        .then((res) => {
          if (res.length == 0) {
            this.$alert("没有查询到相关地址信息！");
          } else {
            if (this.form.standardAddress != res[0].addr) {
              this.dinweiDialog = true;
              this.address = res[0].addr;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    jiuji() {
      this.$confirm("此操作将进行救济服务申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (
            this.form.standardAddress == null ||
            this.form.standardAddress == ""
          ) {
            return;
          }

          var houseAddress;
          houseAddress = this.form.standardAddress;

          let params = {
            reliefId: this.form.id,
            houseAddress: houseAddress,
            districtGuid: this.form.districtGuid,
            type: 11,
          };
          let data = {};
          common
            .sentReliefService(params, data)
            .then((res) => {
              this.$message({
                message: "救济服务发送成功",
                type: "success",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "info",
            message: "已取消保存",
          });
        });
    },
  },
  mounted() {
    this.Event.$on("HouseDetail", (data) => {
      if (data == "getHouseinfo") {
        this.getHouseinfo();
      }
    });
    if (
      this.$route.params.state == "done" ||
      this.$route.query.activityName == "审批"
    ) {
      this.editform = true;
    } else {
      this.editform = false;
    }
  },
  created() {
    this.houseGuid = this.$parent.meta.houseGuid;
    this.guid = this.$parent.params.districtGuid;
    this.PID = this.$parent.params.PID1;
    this.getHouseinfo();
    this.getDictionary(); //获取字典数据
    this.getBuildingName();
    this.changeDetail();
    this.getDistrictRenovationList();
    this.Event.$on("HouseDetail", (data) => {
      if (data == "getHouseinfo") {
        this.getHouseinfo();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
//改变之后的样式
/deep/ .td {
  background: #f2dede;
}

/deep/ .input {
  background: #f2dede;
}

/deep/ .input input {
  background: #f2dede;
}

/deep/ .input textarea {
  background: #f2dede;
}
.el-input-group__append button.el-button {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
  margin-right: 5px;
}
</style>
