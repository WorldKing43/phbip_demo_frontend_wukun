<!--房详情-->
<template>
  <div class="house-details">
    <div class="buttonGroup">
      <el-button type="primary" size="mini" @click="goback">返回</el-button>
      <el-button type="primary" size="mini" @click="openLogDialog"
        >查看日志</el-button
      >
    </div>
    <div class="tableStyle">
      <el-collapse v-model="openCollapse">
        <!-- 房源基本信息 -->
        <el-collapse-item name="1">
          <template slot="title">
            <publicTitle title="房源基本信息"></publicTitle>
          </template>
          <div>
            <table class="detail">
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
                  <el-input v-model="form.buildName" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>房号</td>
                <td>
                  <el-input v-model="form.houseNo" disabled></el-input>
                </td>
                <td>曾用房号</td>
                <td>
                  <el-input v-model="form.usedHouseNo" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>网格办编码</td>
                <td colspan="3">
                  <el-input v-model="form.serialNo" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>房屋状态</td>
                <td>
                  <el-input v-model="form.stateName" disabled></el-input>
                </td>
                <td>所在单元</td>
                <td>
                  <el-input v-model="form.unit" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>所在楼层</td>
                <td>
                  <el-input v-model="form.floorNo" disabled></el-input>
                </td>
                <td>房屋来源</td>
                <td>
                  <el-select style="width: 100%" v-model="form.source" disabled>
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
                  <el-select
                    style="width: 100%"
                    v-model="form.function"
                    disabled
                  >
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
                    placeholder="请选择"
                    style="width: 100%"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in typeData"
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
                    style="width: 100%"
                    v-model="form.orientation"
                    placeholder="请选择"
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
                  <el-select
                    v-model="form.terrace"
                    placeholder="请选择"
                    style="width: 100%"
                    disabled
                  >
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
                    style="width: 100%"
                    v-model="form.innerFloor"
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
                <td>(预测绘)建筑面积</td>
                <td style="position: relative">
                  <el-input disabled v-model="form.coveredArea"></el-input>
                  <span style="position: absolute; top: 0px; right: 4px"
                    >m²</span
                  >
                </td>
              </tr>
              <tr>
                <td>(预测绘)分摊面积</td>
                <td style="position: relative">
                  <el-input
                    disabled
                    v-model="form.residentialPoolArea"
                  ></el-input>
                  <span style="position: absolute; top: 0px; right: 4px"
                    >m²</span
                  >
                </td>
                <td>(预测绘)套内面积</td>
                <td style="position: relative">
                  <el-input disabled v-model="form.indoorArea"></el-input>
                  <span style="position: absolute; top: 0px; right: 4px"
                    >m²</span
                  >
                </td>
              </tr>
              <tr>
                <td>竣工建筑面积</td>
                <td style="position: relative">
                  <el-input disabled v-model="form.completionArea"></el-input>
                  <span style="position: absolute; top: 0px; right: 4px"
                    >m²</span
                  >
                </td>
                <td>竣工分摊面积</td>
                <td style="position: relative">
                  <el-input
                    disabled
                    v-model="form.completionShareArea"
                  ></el-input>
                  <span style="position: absolute; top: 0px; right: 4px"
                    >m²</span
                  >
                </td>
              </tr>
              <tr>
                <td>竣工套内面积</td>
                <td style="position: relative">
                  <el-input
                    disabled
                    v-model="form.completionIndoorArea"
                  ></el-input>
                  <span style="position: absolute; top: 0px; right: 4px"
                    >m²</span
                  >
                </td>
                <td>分摊面积说明</td>
                <td>
                  <el-input
                    disabled
                    v-model="form.residentialAreaContent"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td>初始房源性质</td>
                <td>
                  <el-select
                    style="width: 100%"
                    v-model="form.startNature"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in houseType"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td>当前房源性质</td>
                <td style="position: relative">
                  <el-select
                    style="width: 100%"
                    v-model="form.changeAfterNature"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in houseType"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                  <el-button
                    type="primary"
                    size="mini"
                    style="position: absolute; top: 6px; right: 2px"
                    @click="OpenNatureRecordsDialog"
                    >查看历史</el-button
                  >
                </td>
              </tr>
              <tr>
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
                <td>当前属性</td>
                <td>
                  <el-select
                    style="width: 100%"
                    v-model="form.currentProperty"
                    disabled
                  >
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
                  <el-date-picker
                    class="w100"
                    type="date"
                    v-model="form.deliveryTime"
                    disabled
                  ></el-date-picker>
                </td>
                <td>装修标准</td>
                <td>
                  <el-input v-model="form.decorationType" disabled></el-input>
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
                    ></el-input>
                  </el-tooltip>
                </td>
              </tr>
              <tr>
                <td>是否样板房</td>
                <td>
                  <el-select
                    style="width: 100%"
                    v-model="form.modelHouses"
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
                <td>是否代售</td>
                <td>
                  <el-select
                    style="width: 100%"
                    v-model="form.helpSell"
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
              </tr>
              <tr>
                <td>是否查封冻结</td>
                <td>
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
                  <el-input
                    disabled
                    v-model="form.situationalRemark"
                  ></el-input>
                </td>
                <td>是否被二次分配</td>
                <td>
                  <el-select
                    style="width: 100%"
                    v-model="form.secondDistribution"
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
              </tr>
              <tr>
                <td>维修状态</td>
                <td style="position: relative">
                  <el-select
                    style="width: 100%"
                    v-model="form.maintainType"
                    placeholder="请选择"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in stateList"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="checkHistory"
                    style="position: absolute; top: 6px; right: 2px"
                    >查看历史</el-button
                  >
                </td>
                 <td>签约模式</td>
                <td>
                   <el-select
                    style="width: 100%"
                    v-model="form.signModel"
                    placeholder="请选择"
                    disabled
                  >
                    <el-option
                      v-for="item in signModelList"
                      :key="item.value"
                      :label="item.name"
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
          </div>
        </el-collapse-item>
        <!--房源使用权信息  -->
        <el-collapse-item name="2">
          <template slot="title">
            <publicTitle title="房源使用权信息"></publicTitle>
          </template>
          <div>
            <table class="detail">
              <tr>
                <td>初始分配权归属</td>
                <td>
                  <el-select
                    v-model="form.initialAllocationRight"
                    style="width: 100%"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in divisionUnit"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td>当前分配权归属</td>
                <td style="position: relative">
                  <el-select
                    v-model="form.allocationRight"
                    style="width: 100%"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in divisionUnit"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                  <el-button
                    type="primary"
                    size="mini"
                    style="position: absolute; top: 6px; right: 2px"
                    @click="OpenAllocationRecordsDialog"
                    >查看历史</el-button
                  >
                </td>
              </tr>
              <tr>
                <td>初始签约权归属</td>
                <td>
                  <el-select
                    v-model="form.initialSignatoryRight"
                    style="width: 100%"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in signingUnit"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td>当前签约权归属</td>
                <td style="position: relative">
                  <el-select
                    v-model="form.signatoryRight"
                    style="width: 100%"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in signingUnit"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                  <el-button
                    type="primary"
                    size="mini"
                    style="position: absolute; top: 6px; right: 2px"
                    @click="OpenSignatoryRightRecordsDialog"
                    >查看历史</el-button
                  >
                </td>
              </tr>
              <tr>
                <td>初始数据维护权归属</td>
                <td>
                  <el-select
                    v-model="form.initialMaintainRight"
                    style="width: 100%"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in maintenanceUnit"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td>当前数据维护权归属</td>
                <td style="position: relative">
                  <el-select
                    v-model="form.maintainRight"
                    style="width: 100%"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in maintenanceUnit"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                  <el-button
                    type="primary"
                    size="mini"
                    style="position: absolute; top: 6px; right: 2px"
                    @click="OpenInitialMaintainRightRecordsDialog"
                    >查看历史</el-button
                  >
                </td>
              </tr>
              <tr>
                <td>初始运维权归属</td>
                <td>
                  <el-select
                    v-model="form.initialOperationalRight"
                    style="width: 100%"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in operations"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td>当前运维权归属</td>
                <td style="position: relative">
                  <el-select
                    v-model="form.operationalRight"
                    style="width: 100%"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in operations"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                  <el-button
                    type="primary"
                    size="mini"
                    style="position: absolute; top: 6px; right: 2px"
                    @click="OpenOperationalRightRecordsDialog"
                    >查看历史</el-button
                  >
                </td>
              </tr>

              <tr>
                <td>二次分配权</td>
                <td>
                  <el-select
                    v-model="form.secondAllocationRight"
                    style="width: 100%"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in divisionUnit"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td>二次签约权</td>
                <td>
                  <el-select
                    v-model="form.secondAllocationRight"
                    style="width: 100%"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in signingUnit"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td></td>
              </tr>
            </table>
          </div>
        </el-collapse-item>
        <!--房源产权信息  -->
        <el-collapse-item name="3">
          <template slot="title">
            <TitleStylex title="房源产权信息">
              <el-button
                slot="publicTitleRight"
                type="primary"
                size="mini"
                @click="OpenPropertyRightRecordsDialog"
                >查看历史产权变更记录</el-button
              >
            </TitleStylex>
          </template>
          <div>
            <table class="detail">
              <tr>
                <td>初始产权归属</td>
                <td>
                  <el-input
                    v-model="form.propertypBelongName"
                    disabled
                  ></el-input>
                </td>
                <td>当前产权归属</td>
                <td>
                  <el-input
                    v-model="form.propertyRightUnit"
                    disabled
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td>不动产单元号</td>
                <td>
                  <el-input
                    v-model="form.immovablePropertyUnitNo"
                    disabled
                  ></el-input>
                </td>
                <td>权利人</td>
                <td>
                  <el-input v-model="form.obligee" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>使用开始时间</td>
                <td>
                  <el-date-picker
                    class="w100"
                    type="date"
                    v-model="form.startUseTime"
                    disabled
                  ></el-date-picker>
                </td>
                <td>使用结束时间</td>
                <td>
                  <el-date-picker
                    class="w100"
                    type="date"
                    v-model="form.endUserTime"
                    disabled
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>登记价人民币</td>
                <td>
                  <el-input v-model="form.registPrice" disabled></el-input>
                </td>
                <td>房屋原值</td>
                <td>
                  <el-input
                    v-model="form.houseOriginalPrice"
                    disabled
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td>不动产证书号</td>
                <td>
                  <el-input
                    v-model="form.rightOverImmovablesId"
                    disabled
                  ></el-input>
                </td>
                <td>产权登记时间</td>
                <td>
                  <el-date-picker
                    class="w100"
                    type="date"
                    v-model="form.djsj"
                    disabled
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>房屋现值</td>
                <td>
                  <el-input
                    v-model="form.housePresentPrice"
                    disabled
                  ></el-input>
                </td>
                <td>共有情况</td>
                <td>
                  <el-date-picker
                    v-model="form.commonalityCondition"
                    disabled
                  ></el-date-picker>
                </td>
              </tr>
            </table>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <TitleStylex title="入住人信息"> </TitleStylex>
          </template>
          <table border="1" class="live-table">
            <tr>
              <td class="gray" colspan="4">入住人</td>
              <td class="gray" colspan="2">配偶</td>
              <td class="gray" colspan="3">家庭成员</td>
              <td class="gray" rowspan="2">操作</td>
            </tr>
            <tr>
              <td class="gray">姓名</td>
              <td class="gray">证件号码</td>
              <td class="gray">婚姻状况</td>
              <td class="gray">学历</td>

              <td class="gray">姓名</td>
              <td class="gray">证件号码</td>

              <td class="gray">姓名</td>
              <td class="gray">与入住人关系</td>
              <td class="gray">证件号码</td>
            </tr>
            <tr v-for="(item, index) in historyHouseUser" :key="index">
              <td :rowspan="item.row" v-if="item.row">
                {{ item.mainUserName }}
              </td>
              <td :rowspan="item.row" v-if="item.row">
                {{ item.mainUseIidcardNumber }}
              </td>
              <td :rowspan="item.row" v-if="item.row">
                {{ getDicName("婚姻状态", item.mainUserMarriageState) }}
              </td>
              <td :rowspan="item.row" v-if="item.row">
                {{ getDicName("学历", item.mainUserEducation) }}
              </td>
              <td :rowspan="item.row" v-if="item.row">
                {{ item.spouseName }}
              </td>
              <td :rowspan="item.row" v-if="item.row">
                {{ item.spouseIdCardNumber }}
              </td>
              <td>{{ item.name }}</td>
              <td>
                {{ getDicName("与主申请人的关系", item.relation) }}
              </td>
              <td>{{ item.iden }}</td>
              <td :rowspan="item.row" v-if="item.row">
                <el-button type="primary" size="small" @click="tosee(item)"
                  >查看</el-button
                >
              </td>
            </tr>
          </table>
        </el-collapse-item>
        <!-- 单位信息 -->
        <el-collapse-item name="5">
          <template slot="title">
            <TitleStylex title="单位信息"> </TitleStylex>
          </template>
          <div class="demand-detail-table">
            <table>
              <tr>
                <td class="must">单位名称</td>
                <td>
                  <el-input
                    v-model="proposerForm.unitName"
                    placeholder="请输入"
                    disabled
                  ></el-input>
                </td>
                <td>单位类型</td>
                <td>
                  <el-select
                    style="width: 100%"
                    v-model="proposerForm.unitType"
                    placeholder="请选择"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in unitTypeData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td class="must">单位证件号码</td>
                <td>
                  <el-input v-model="proposerForm.uscc" disabled></el-input>
                </td>
                <td class="must">单位证件类型</td>
                <td>
                  <el-select
                    style="width: 100%"
                    v-model="proposerForm.unitIdenType"
                    placeholder="请选择"
                    clearable
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in unitIdenTypeData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>单位性质</td>
                <td>
                  <el-select
                    style="width: 100%"
                    v-model="proposerForm.property"
                    placeholder="请选择"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in propertyData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>单位邮编</td>
                <td>
                  <el-input
                    v-model="proposerForm.postCode"
                    placeholder="请输入"
                    disabled
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td>单位所属行业</td>
                <td>
                  <el-select
                    v-model="proposerForm.belongIndustry"
                    style="width: 100%"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in industryTypeList"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td>单位详细地址</td>
                <td>
                  <el-input
                    v-model="proposerForm.address"
                    placeholder="请输入"
                    disabled
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td class="must">法人</td>
                <td>
                  <el-input
                    v-model="proposerForm.legalPerson"
                    placeholder="请输入"
                    disabled
                  ></el-input>
                </td>
                <td class="must">法人证件类型</td>
                <td>
                  <el-select
                    style="width: 100%"
                    v-model="proposerForm.legalIdenType"
                    placeholder="请选择"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in legalIdenTypeData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td class="must">法人证件号</td>
                <td>
                  <el-input
                    v-model="proposerForm.legalIden"
                    placeholder="请输入"
                    disabled
                  ></el-input>
                </td>
                <td>法人联系电话</td>
                <td>
                  <el-input
                    v-model="proposerForm.legalPersonPhone"
                    placeholder="请输入"
                    disabled
                    clearable
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td>住房专员</td>
                <td>
                  <el-input
                    v-model="proposerForm.houseMan"
                    placeholder="请输入"
                    disabled
                  ></el-input>
                </td>
                <td>住房专员证件类型</td>
                <td>
                  <el-select
                    style="width: 100%"
                    v-model="proposerForm.houseManIdenType"
                    placeholder="请选择"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in legalIdenTypeData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>住房专员证件号</td>
                <td>
                  <el-input
                    v-model="proposerForm.houseManIden"
                    placeholder="请输入"
                    disabled
                  ></el-input>
                </td>
                <td>住房专员联系电话</td>
                <td>
                  <el-input
                    v-model="proposerForm.houseManPhone"
                    placeholder="请输入"
                    disabled
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td>住房专员2</td>
                <td>
                  <el-input
                    v-model="proposerForm.houseMan2"
                    placeholder="请输入"
                    disabled
                  ></el-input>
                </td>
                <td>住房专员2证件类型</td>
                <td>
                  <el-select
                    style="width: 100%"
                    v-model="proposerForm.houseManIdenType2"
                    placeholder="请选择"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in legalIdenTypeData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>住房专员2证件号</td>
                <td>
                  <el-input
                    v-model="proposerForm.houseManIden2"
                    placeholder="请输入"
                    disabled
                  ></el-input>
                </td>
                <td>住房专员2联系电话</td>
                <td>
                  <el-input
                    v-model="proposerForm.houseManPhone2"
                    placeholder="请输入"
                    disabled
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td>备注</td>
                <td colspan="3">
                  <el-input
                    v-model="proposerForm.remark"
                    placeholder="请输入"
                    disabled
                  ></el-input>
                </td>
              </tr>
            </table>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 查看详情 -->
    <el-dialog
      :visible.sync="checkAttachmentDialog"
      width="60%"
      title="查看附件"
      style="margin-top: 10px"
      class="dialog"
      :close-on-click-modal="false"
    >
      <div class="table-list">
        <Material :parameter="parameter" :show="show"></Material>
      </div>
    </el-dialog>

    <!-- 查看房源性质变更情况 -->
    <el-dialog
      :visible.sync="natureRecordsDialog"
      width="80%"
      title="查看历史"
      class="dialog"
      :close-on-click-modal="false"
    >
      <publicTitle title="查看房源性质变更情况"></publicTitle>
      <div class="table">
        <el-table
          :data="natureChangeRecordsList"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="变更时间">
            <template slot-scope="scope">{{
              scope.row.changTime | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column
            prop="creatorUnit"
            label="申请部门"
          ></el-table-column>
          <el-table-column prop="creator" label="申请人"></el-table-column>
          <el-table-column prop="auditor" label="审核人"></el-table-column>
          <el-table-column
            prop="beforeChangeNatureRightName"
            label="变更前性质"
          ></el-table-column>
          <el-table-column
            prop="afterNatureRightName"
            label="变更后性质"
          ></el-table-column>
          <el-table-column label="查看变更详情">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="OpenNatureRecordsDetailDialog(scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!--查看分配权、签约权、数据维护权、运维权历史记录弹框 -->
    <el-dialog
      :visible.sync="historyRecordsDialog"
      width="80%"
      :title="title"
      class="dialog"
      :close-on-click-modal="false"
    >
      <publicTitle title="变更情况"></publicTitle>
      <div class="table" v-if="this.title == '查看分配权变更情况'">
        <el-table
          :data="allocationRecordsList"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="变更时间">
            <template slot-scope="scope">{{
              scope.row.time | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column prop="basis" label="变更依据"></el-table-column>
          <el-table-column
            prop="creatorUnit"
            label="申请部门"
          ></el-table-column>
          <el-table-column prop="creator" label="申请人"></el-table-column>
          <el-table-column
            prop="beforeAllocationRightUnit"
            label="变更前分配权"
          ></el-table-column>
          <el-table-column
            prop="afterAllocationRightUnit"
            label="变更后分配权"
          ></el-table-column>
        </el-table>
      </div>
      <div class="table" v-if="this.title == '查看签约权变更情况'">
        <el-table
          :data="signatoryRightRecordsList"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="变更时间">
            <template slot-scope="scope">{{
              scope.row.time | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column prop="basis" label="变更依据"></el-table-column>
          <el-table-column
            prop="creatorUnit"
            label="申请部门"
          ></el-table-column>
          <el-table-column prop="creator" label="申请人"></el-table-column>
          <el-table-column
            prop="beforeAllocationRightUnit"
            label="变更前签约权"
          ></el-table-column>
          <el-table-column
            prop="afterAllocationRightUnit"
            label="变更后签约权"
          ></el-table-column>
        </el-table>
      </div>
      <div class="table" v-if="this.title == '查看数据维护权变更情况'">
        <el-table
          :data="InitialMaintainRightRecordsList"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="变更时间">
            <template slot-scope="scope">{{
              scope.row.time | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column prop="basis" label="变更依据"></el-table-column>
          <el-table-column
            prop="creatorUnit"
            label="申请部门"
          ></el-table-column>
          <el-table-column prop="creator" label="申请人"></el-table-column>
          <el-table-column
            prop="beforeAllocationRightUnit"
            label="变更前数据维护权"
          ></el-table-column>
          <el-table-column
            prop="afterAllocationRightUnit"
            label="变更后数据维护权"
          ></el-table-column>
        </el-table>
      </div>
      <div class="table" v-if="this.title == '查看运维权变更情况'">
        <el-table
          :data="perationalRightRecordsList"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="变更时间">
            <template slot-scope="scope">{{
              scope.row.time | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column prop="basis" label="变更依据"></el-table-column>
          <el-table-column
            prop="creatorUnit"
            label="申请部门"
          ></el-table-column>
          <el-table-column prop="creator" label="申请人"></el-table-column>
          <el-table-column
            prop="beforeAllocationRightUnit"
            label="变更前运维权"
          ></el-table-column>
          <el-table-column
            prop="afterAllocationRightUnit"
            label="变更后运维权"
          ></el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 查看房源产权变更详情 -->
    <el-dialog
      :visible.sync="propertyRightRecordsDetailDialog"
      width="80%"
      title="查看产权详细情况"
      class="dialog"
      :close-on-click-modal="false"
    >
      <publicTitle title="产权变更申请批次信息"></publicTitle>
      <div class="tableStyle">
        <table :model="propertyRightDetailform" class="detail">
          <tr>
            <td class="must">批次名称</td>
            <td>
              <el-input
                v-model="propertyRightDetailform.name"
                clearable
                disabled
              ></el-input>
            </td>
            <td class="must">批次编号</td>
            <td>
              <el-input
                v-model="propertyRightDetailform.code"
                disabled
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="must">请选择新的产权归属单位</td>
            <td colspan="3">
              <el-input
                v-model="propertyRightDetailform.propertyRight"
                disabled
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="must">变更依据</td>
            <td colspan="3">
              <el-input
                v-model="propertyRightDetailform.changeBasis"
                disabled
                type="textarea"
              ></el-input>
            </td>
          </tr>
        </table>
      </div>
      <publicTitle title="选中房列表"></publicTitle>
      <div class="table">
        <el-table
          :data="propertyRightDetailTable"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column
            label="序号"
            width="50"
            type="index"
            :index="propertyRightIndexMethod"
          ></el-table-column>
          <el-table-column
            prop="districtName"
            label="小区名称"
          ></el-table-column>
          <el-table-column prop="buildName" label="栋号"></el-table-column>
          <el-table-column prop="houseNo" label="房号"></el-table-column>
          <el-table-column prop="typeName" label="户型"></el-table-column>
          <el-table-column
            prop="coveredArea"
            label="预测绘建筑面积"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="completionArea"
            label="竣工建筑面积"
          ></el-table-column>
          <el-table-column
            prop="natureTypeName"
            label="房源性质"
          ></el-table-column>
          <el-table-column
            prop="beforeChangepropertyRightName"
            label="产权归属单位（变更前）"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="propertyRightUnit"
            label="产权归属单位（变更后）"
            width="160"
          ></el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="propertyRightDetailSizeChange"
            @current-change="propertyRightDetailCurrentChange"
            :current-page="propertyRightDetailPage.currentPage"
            :page-sizes="propertyRightDetailPage.pageSizesList"
            :page-size="propertyRightDetailPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="propertyRightDetailPage.totalNumber"
            background
          ></el-pagination>
        </div>
      </div>
      <div>
        <publicTitle title="审核意见"></publicTitle>
        <el-table
          :data="detailOpinion"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column prop="activitySource" label="环节"></el-table-column>
          <el-table-column prop="dealer" label="办理人"></el-table-column>
          <el-table-column prop="dealTime" label="办理时间"></el-table-column>
          <el-table-column prop="remark" label="办理意见"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 查看房源性质变更详情 -->
    <el-dialog
      :visible.sync="natureRecordsDetailDialog"
      width="80%"
      title="查看性质变更详细情况"
      class="dialog"
      :close-on-click-modal="false"
    >
      <publicTitle title="性质变更申请批次信息"></publicTitle>
      <div class="tableStyle">
        <table :model="natureDetailform" class="detail">
          <tr>
            <td class="must">批次名称</td>
            <td>
              <el-input
                v-model="natureDetailform.name"
                clearable
                disabled
              ></el-input>
            </td>
            <td class="must">批次编号</td>
            <td>
              <el-input v-model="natureDetailform.code" disabled></el-input>
            </td>
          </tr>
          <tr>
            <td class="must">请选择变更后房屋性质</td>
            <td colspan="3">
              <el-select
                style="width: 100%"
                placeholder="请选择"
                v-model="natureDetailform.nature"
                disabled
              >
                <el-option
                  v-for="(item, index) in houseType"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="must">变更依据</td>
            <td colspan="3">
              <el-input
                v-model="natureDetailform.changeBasis"
                disabled
                type="textarea"
              ></el-input>
            </td>
          </tr>
        </table>
      </div>
      <publicTitle title="选中房列表"></publicTitle>
      <div class="table">
        <el-table
          :data="natureDetailTable"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column
            label="序号"
            width="50"
            type="index"
            :index="natureIndexMethod"
          ></el-table-column>
          <el-table-column
            prop="districtName"
            label="小区名称"
          ></el-table-column>
          <el-table-column prop="buildName" label="栋号"></el-table-column>
          <el-table-column prop="houseNo" label="房号"></el-table-column>
          <el-table-column prop="typeName" label="户型"></el-table-column>
          <el-table-column
            prop="coveredArea"
            label="预测绘建筑面积(平方米)"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="completionArea"
            label="竣工建筑面积(平方米)"
          ></el-table-column>
          <el-table-column prop="stateName" label="房屋状态"></el-table-column>
          <el-table-column
            prop="natureName"
            label="房屋性质（变更前）"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="changeAfterNatureName"
            label="房屋性质（变更后）"
            width="140"
          ></el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="natureDetailSizeChange"
            @current-change="natureDetailCurrentChange"
            :current-page="natureDetailPage.currentPage"
            :page-sizes="natureDetailPage.pageSizesList"
            :page-size="natureDetailPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="natureDetailPage.totalNumber"
            background
          ></el-pagination>
        </div>
      </div>
      <div>
        <publicTitle title="审核意见"></publicTitle>
        <el-table
          :data="detailOpinion"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column prop="activitySource" label="环节"></el-table-column>
          <el-table-column prop="dealer" label="办理人"></el-table-column>
          <el-table-column prop="dealTime" label="办理时间"></el-table-column>
          <el-table-column prop="remark" label="办理意见"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 查看日志 -->
    <el-dialog
      title="查看日志"
      :visible.sync="logDialog"
      v-if="logDialog"
      width="80%"
      :close-on-click-modal="false"
    >
      <el-form size="mini" :model="logForm" label-width="5rem">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="日志类型">
              <el-select v-model="logForm.auditType" clearable>
                <el-option
                  v-for="(item, index) in logType"
                  :label="item.name"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房屋状态">
              <el-select v-model="logForm.state" clearable>
                <el-option
                  v-for="(item, index) in houseState"
                  :label="item.name"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" size="mini" @click="getLog()"
              >查 询</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <div class="table-list">
        <el-table
          :data="logList"
          border
          height="300"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column
            prop="processTime"
            label="操作日期"
            sortable
            width="140"
          ></el-table-column>
          <el-table-column
            prop="subjectUnit"
            label="单位"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="subjectName"
            label="操作人"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="operationTypeName"
            label="日志类型"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="actionName"
            label="操作"
            width="160"
          ></el-table-column>
          <el-table-column prop="context" label="详情"></el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <el-dialog
      title="查看家庭信息"
      :visible.sync="familyDialog"
      v-if="familyDialog"
      width="80%"
      :close-on-click-modal="false"
    >
      <publicTitle title="入住人"></publicTitle>
      <div class="quarterMessage_box">
        <el-form
          :model="checkinfo"
          label-width="50%"
          ref="checkinfoForm"
          class="demo-ruleForm"
        >
          <el-row :gutter="0">
            <el-col :span="6">
              <el-form-item label="姓名" prop="name">
                <el-input
                  v-model="checkinfo.name"
                  placeholder="长度大于2"
                  show-word-limit
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="证件类型" prop="idenType">
                <el-input
                  v-model="checkinfo.idenType"
                  placeholder="证件类型"
                  ref="czjlx"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="证件号码" prop="iden">
                <el-input v-model="checkinfo.iden" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="身份证号码" prop="iden">
                <el-input v-model="checkinfo.iden" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="6">
              <el-form-item label="性别" prop="XB">
                <el-select v-model="checkinfo.XB" placeholder="性别" disabled>
                  <el-option
                    v-for="(item, index) in xbOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="出生日期" prop="CSRQ">
                <el-date-picker
                  v-model="checkinfo.CHUSRQ"
                  type="date"
                  placeholder="出生日期"
                  style="width: 100%"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  disabled
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="婚姻状况" prop="HYZK">
                <el-select
                  v-model="checkinfo.HUNYZT"
                  placeholder="婚姻状态"
                  disabled
                >
                  <el-option
                    v-for="(item, index) in hyztOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="社保电脑号" prop="SBDNH">
                <el-input v-model="checkinfo.SHEBDNH" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="6">
              <el-form-item label="学历" prop="XL">
                <el-select v-model="checkinfo.XL" placeholder="学历" disabled>
                  <el-option
                    v-for="(item, index) in xlOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="学位" prop="XW">
                <el-select v-model="checkinfo.XW" placeholder="学位" disabled>
                  <el-option
                    v-for="(item, index) in xwOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="职务" prop="ZW">
                <el-select v-model="checkinfo.ZW" placeholder="职务" disabled>
                  <el-option
                    v-for="(item, index) in zwOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="职称" prop="ZC">
                <el-select v-model="checkinfo.ZC" placeholder="职称" disabled>
                  <el-option
                    v-for="(item, index) in zcOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="6">
              <el-form-item label="手机号码" prop="YDDH">
                <el-input v-model="checkinfo.LIANXDH" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <publicTitle title="家庭成员"></publicTitle>
      <div class="table-list" style="margin-top: 10px; margin-bottom: 10px">
        <el-table
          :data="VacuumRoomList"
          border
          ref="houseTable"
          size="mini"
          style="width: 100%"
          class="w100"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="idenType" label="证件类型"></el-table-column>
          <el-table-column prop="iden" label="证件号码"></el-table-column>
          <el-table-column prop="iden" label="身份证号码"></el-table-column>
          <el-table-column
            prop="relationName"
            label="与同住人关系"
          ></el-table-column>
          <el-table-column prop="XBName" label="性别"></el-table-column>
          <el-table-column prop="CHUSRQ" label="出生日期"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/api/house.js";
import https from "@/api/vacuumRoominquire.js";
import api from "@/api/houseApproval";
import housestore from "@/api/housestore";
import publicTitle from "@/components/TitleStyle"; //标题组件
import TitleStylex from "@/components/TitleStylex"; //带按钮的标题组件
import publicMethod from "@/api/publicMethod";
import Material from "@/components/CorrelativeMaterial";
export default {
  name: "buildingDetails",
  components: {
    publicTitle, //标题公共组件
    TitleStylex, //带按钮的标题公共组件
    Material, //公共组件
  },
  data() {
    return {
      val: "3",
      checkinInfoList: [],
      options: [
        { value: true, label: "是" },
        { value: false, label: "否" },
      ], //是否下拉菜单
      isShow: false, //根据不同的签约类型的显隐开关
      form: {}, //基本信息
      activeName: [],
      proposerForm: {},
      typeData: [], //户型
      orientationData: [], //朝向
      terraceData: [], //平台
      divisionUnit: [], //分配权归属单位下拉框
      signingUnit: [], //签约权归属单位下拉框
      maintenanceUnit: [], //数据维护权归属单位下拉框
      operations: [], //运维权归属单位下拉框
      originalPropertyData: [], //当前属性下拉框
      currentPropertyData: [], //初始属性下拉框
      sourceData: [], //房屋来源
      functionData: [], //房屋用途
      houseType: [], //房屋性质
      outstock: {}, //核销记录
      checkAttachmentDialog: false, //附件弹框
      relieveDialog: false, //解除弹框
      situationalList: [], //问题房源标注列表
      situationalInfo: "", //问题列表的详情信息
      parameter: "", //过程材料传参
      removeBasis: "", //解除依据
      relieveList: [], //预留情况列表
      incomingAndOutgoingStatusList: [], //入库和出库情况列表
      propertyRightRecordsDialog: false, //产权记录弹框
      houseErrataDetailDialog: false, //查看勘误修改详情
      houseErrataAreaDetailDialog: false, //查看面积勘误详情
      houseErrataImportDetailDialog: false, //查看信息导入需改详情
      propertyRightRecordsList: [], //产权记录列表
      natureRecordsDialog: false, //性质变更记录弹框
      natureChangeRecordsList: [], //性质变更记录列表
      title: "", //标题
      historyRecordsDialog: false, //历史记录弹框
      allocationRecordsList: [], //性质变更记录列表
      signatoryRightRecordsList: [], //性质变更记录列表
      InitialMaintainRightRecordsList: [], //性质变更记录列表
      perationalRightRecordsList: [], //性质变更记录列表
      propertyRightRecordsDetailDialog: false, //产权记录详细情况弹框
      propertyRightDetailform: {}, //产权变更详细记录表单
      propertyRightDetailTable: [], //产权变更详细记录选中房表格
      detailOpinion: [], //产权变更详细记录选中房意见
      propertyRightDetailPage: {
        //产权变更选中房的分页的数据
        currentPage: 1,
        pageSize: 10,
        pageSizesList: [10, 20, 30, 40],
        totalNumber: 0,
      },
      propertyRightDetailCode: "", //产权变更详情code码
      natureRecordsDetailDialog: false, //性质变更记录详细情况弹框
      natureDetailform: {}, //性质变更详细记录表单
      natureDetailTable: [], //性质变更详细记录选中房表格
      natureDetailPage: {
        //性质变更选中房的分页的数据
        currentPage: 1,
        pageSize: 10,
        pageSizesList: [10, 20, 30, 40],
        totalNumber: 0,
      },
      natureDetailCode: "", //性质变更详情code码
      openCollapse: "1", //默认打开第一个
      rentSituationList: [], //出租情况列表
      rentSituationDetailDialog: false, //查看出租详情弹框是否打开
      housePlanInfoShow: false, //房源计划显示和隐藏(轮候显示，定向隐藏)
      allocationBatchInfoShow: false, //批次基本信息的显隐
      signInfoShow: false, //签约信息的显隐
      afterRentShow: false, //租后信息的显隐
      housePlanFrom: {}, //房源计划表格信息
      queueStr: "", //队列显示在input内
      groupStr: "", //分组显示在input内
      planUseData: [], //计划用途下拉
      supplyCodeOptions: [], //供应计划下拉
      planPropertyData: [], //计划属性下拉
      housePlanListForm: {}, //房源计划选中房查询条件
      housePlanList: [], //房源计划选中房列表
      housePlanListPage: {
        currentPage: 1,
        pageSize: 100,
        pageSizesList: [100, 200, 500, 1000],
        totalNumber: 0, //数据的总数
      },
      stateData: [], //房屋状态下拉列表
      planGuid: "", //计划的guid
      planPid: "", //计划的pid
      housePlanOpinion: [], //房源计划审核意见列表
      show: false,
      generalMessageDialog: false, //看分配方式、租后信息、查看签约信息的弹框是否打开
      signUpGuid: "", //签约标识
      batchCode: "", //批次代码
      distributionType: "", //分配方式
      batchInfo: {}, //批次信息
      signInfo: {}, //签约信息
      signOtherPersonalInfo: [], //签约其他人信息
      signUnitInfo: {}, //签约单位信息
      signType: "", //签约类型(区分单位还是个人)
      contractType: [], //合同类型
      rentStandard: [], //租金标准
      // signType: [], //签约方式
      distributeTypeData: [], //分配方式
      fwcslxOptions: [], //房屋初始类型
      hxOptions: [], //户型
      // zjlxOptions: [], //证件类型
      xbOptions: [], //性别
      hyztOptions: [], //婚姻状况
      znzkoptions: [], //子女状况
      xlOptions: [], //学历
      xwOptions: [], //学位
      zwOptions: [], //职务
      zcOptions: [], //职称
      hkszdOptions: [], //户口所在地
      dwxzOptions: [], //单位性质
      isPutShow: true, //入库出库情况显示开关
      ysqrgxOptions: [], //与申请人关系
      fpywlxOptions: [], //分配业务类型
      errataDetailPage: {
        currentPage: 1,
        pageSize: 10,
        pageSizesList: [10, 20, 30, 40],
        totalNumber: 0,
      },
      errataInfoPage: {
        currentPage: 1,
        pageSize: 10,
        pageSizesList: [10, 20, 30, 40],
        totalNumber: 0,
      },
      erratList: [],
      erratDetailList: [],
      erratAreaList: [],
      erratImportList: [],
      errataType: "", //勘误类型
      logList: [], //日志列表
      logForm: {
        auditType: "", //日志类型
        state: "", //房屋状态
      },
      logDialog: false, //日志弹框显隐
      logType: [], //日志类型
      houseState: [
        { name: "空房", value: "空房" },
        { name: "已预留", value: "已预留" },
        { name: "准计划", value: "准计划" },
        { name: "已计划", value: "已计划" },
        { name: "已分配未签约", value: "已分配未签约" },
        { name: "已出租", value: "已出租" },
        { name: "已签协议未签合同", value: "已签协议未签合同" },
        { name: "已出售", value: "已出售" },
        { name: "已取得全部产权", value: "已取得全部产权" },
        { name: "已拆除", value: "已拆除" },
        { name: "长租住房租赁到期", value: "长租住房租赁到期" },
        { name: "其他原因出库", value: "其他原因出库" },
        { name: "预房屋", value: "预房屋" },
      ], //房屋状态
      stateList: [], //维修类型
      historyDialog: false, //查看历史弹框显隐
      historyTable: [], //历史表格数据
      //分页数据
      total: 0, //数据总条数
      pageSize: 10, //当前页条数
      currentPage: 1, //当前页
      pageSizesList: [10, 20, 30, 50], //分页下拉框
      hisInfoDialog: false, //查看历史详情弹框
      historyInfo: {}, //维修历史详情
      legalIdenTypeData: {},
      industryTypeList: {},
      propertyData: [],
      unitTypeData: {},
      unitIdenTypeData: [],
      livePeopleList: [], //入住人
      otherPeopleNO: 0, //其他入住人数量
      familyDialog: false,
      checkinfo: {},
      VacuumRoomList: [],
      historyHouseUser: [],
      userFamilyMember: [],
      dicMap: {},
      signModelList:[]
    };
  },
  computed: {},
  methods: {
    async onload() {
      try {
        let params = {
          houseGuid: this.$route.params.houseGuid,
        };
        http.getRecordRzr(params).then((res) => {
          this.historyHouseUser = [];
          if (Array.isArray(res)) {
            for (var i = 0; i < res.length; i++) {
              var item = res[i];
              item.XINGB = item.XINGB + "";
              if (item.relation == "1") {
                this.newUser = item;
              } else {
                this.userFamilyMember.push(item);
              }
              let a = this.formatHouseUser(res[i]);
              this.historyHouseUser = this.historyHouseUser.concat(a);
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    formatHouseUser(houseUsers) {
      let results = [];
      let mainApplyUser = {};
      let spouse = {};
      houseUsers.forEach((item) => {
        if (item.relation == "1") {
          mainApplyUser = item;
        } else if (item.relation == "2") {
          spouse = item;
        } else {
          results.push(item);
        }
      });
      if (results.length == 0 && mainApplyUser.name) {
        results.push({});
      }
      results.forEach((it) => {
        it.mainUserName = mainApplyUser.name;
        it.mainUseIidcardNumber = mainApplyUser.iden;
        it.mainUserMarriageState = mainApplyUser.HUNYZT;
        it.mainUserEducation = mainApplyUser.XL;
        it.spouseName = spouse.name;
        it.spouseIdCardNumber = spouse.iden;
        it.applyNumber = mainApplyUser.sqbh;
        it.fwbz = mainApplyUser.fwbz;
        it.familyGuid = mainApplyUser.familyGuid;
      });
      if (results[0]) {
        results[0].row = results.length;
      }
      console.log(results);
      return results;
    },
    makeOne(val) {
      let partener = [{ relation: "2" }];
      let elserzr = [{ relation: "7" }];
      if (val.length != 0) {
        val.forEach((ele) => {
          // 每个家庭列表
          let a = ele.filter((item) => {
            return item.relation == "2";
          });
          if (a.length == 0) {
            ele.push(partener);
          }
          if (ele.length == 2) {
            ele.push(elserzr);
          }
        });
      }
      return val;
    },
    //返回
    goback() {
      let tab = {};
      if (this.$route.query.childtitle == "企业自有住房查询") {
        tab = {
          label: "企业自有住房查询",
          name: "enterpriseRecordHouse",
        };
      }

      this.openTopTab(tab);
    },
    //打开查看页面弹框
    openCheckPeople() {
      this.checkPeopleDialog = true;
      this.getOccupancy();
    },
    //获取字典数据
    getDictionary() {
      let nameData = [
        "户型",
        "性别",
        "子女状况",
        "学位",
        "职务",
        "最高职称",
        "户口所在地",
        "单位性质",
        "分配业务类型",
        "重点单位类型",
        "单位所属行业",
        "房产来源",
        "住宅类型",
        "房屋性质",
        "户型",
        "朝向",
        "平台",
        "房屋来源",
        "房屋用途",
        "单位分配权归属单位",
        "签约权归属单位",
        "数据维护权归属",
        "运维权归属",
        "当前属性",
        "最初属性",
        "房屋状态",
        "签约模式","单位证件类型"
      ];
      let params = { names: nameData.toString() };
      api
        .searchDictionary(params)
        .then((res) => {
          res = JSON.parse(res);
          this.industryTypeList = res.单位所属行业;
          this.propertyData = this.$dictionaryChange(
            res.单位性质,
            this.propertyData,
            "通用"
          );
          this.unitTypeData = this.$dictionaryChange(
            res.重点单位类型,
            this.unitTypeData,
            "分配"
          );
          this.unitIdenTypeData = res.单位证件类型;
          this.typeData = res.户型;
          this.orientationData = this.$dictionaryChange(
            res.朝向,
            this.orientationData,
            "通用"
          );
          this.stateList = res.维修类型;
          this.logType = res.日志操作类型;
          this.typeData = res.户型;
          this.orientationData = this.$dictionaryChange(
            res.朝向,
            this.orientationData,
            "通用"
          );
          this.terraceData = res.平台;
          this.divisionUnit = res.单位分配权归属单位;
          this.signingUnit = res.签约权归属单位;
          this.maintenanceUnit = res.数据维护权归属;
          this.operations = res.运维权归属;
          this.houseType = this.$dictionaryChange(
            res.房屋性质,
            this.houseType,
            "通用"
          );
          this.functionData = res.房屋用途;
          this.sourceData = res.房产来源;
          this.originalPropertyData = res.当前属性;
          this.currentPropertyData = res.最初属性;
          this.stateData = res.房屋状态;
          this.fwcslxOptions = res.房屋初始类型;
          this.xbOptions = res.性别;

          this.znzkoptions = this.$dictionaryChange(
            res.子女状况,
            this.znzkoptions,
            "配租"
          );
          this.xwOptions = this.$dictionaryChange(
            res.学位,
            this.xwOptions,
            "配租"
          );
          this.zwOptions = this.$dictionaryChange(
            res.职务,
            this.zwOptions,
            "局建"
          );
          this.zcOptions = this.$dictionaryChange(
            res.最高职称,
            this.zcOptions,
            "配租"
          );
          this.hkszdOptions = this.$dictionaryChange(
            res.户口所在地,
            this.hkszdOptions,
            "局建"
          );
          this.dwxzOptions = this.$dictionaryChange(
            res.单位性质,
            this.dwxzOptions,
            "配租"
          );
          this.signModelList = res.签约模式;
          console.log(this.propertyData)
          console.log( this.unitIdenTypeData)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPersonalDic() {
      let nameData = [
        "证件类型",
        "性别",
        "婚姻状态",
        "学历",
        "与主申请人的关系",
      ];
      let params = { names: nameData.toString() };
      api
        .searchDictionary(params)
        .then((res) => {
          res = JSON.parse(res);
          this.legalIdenTypeData = this.$dictionaryChange(
            res.证件类型,
            this.legalIdenTypeData,
            "分配"
          );

          this.xbOptions = res.性别;
          this.hyztOptions = this.$dictionaryChange(
            res.婚姻状态,
            this.hyztOptions,
            "局建"
          );

          this.xlOptions = this.$dictionaryChange(
            res.学历,
            this.xlOptions,
            "局建"
          );

          this.ysqrgxOptions = this.$dictionaryChange(
            res.与主申请人的关系,
            this.ysqrgxOptions,
            "通用"
          );

          this.dicMap = {
            与主申请人的关系: this.ysqrgxOptions,
            婚姻状态: this.hyztOptions,
            学历: this.xlOptions,
            证件类型: this.legalIdenTypeData,
            性别: this.xbOptions,
          };
          console.log(this.dicMap);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDicName(typeName, dicValue) {
      if (!typeName || !dicValue) {
        return "";
      }
      console.log(this.dicMap);
      let dic = this.dicMap[typeName];
      if (dic == undefined || dic == null) {
        return "";
      }
      let res = dic.filter((item) => {
        return item.value === dicValue;
      });
      if (Array.isArray(res)) {
        return res[0].name;
      } else {
        return null;
      }
    },
    getRecordUnit() {
      let params = {
        houseGuid: this.$route.params.houseGuid,
      };
      http
        .getRecordUnit(params)
        .then((res) => {
          if (res) {
            this.proposerForm = res;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取房屋详情
    getHouseinfo() {
      let params = {
        guid: this.$route.params.houseGuid,
      };
      if (this.$route.query.childtitle == "房屋综合查询(市局)") {
        http
          .getCityHouseInfo(params)
          .then((res) => {
            if (res) {
              this.form = res.houseInfo;
              console.log("房屋综合查询查市局");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        let params = {
          guid: this.$route.params.houseGuid,
        };
        http
          .getHouseInfo(params)
          .then((res) => {
            if (res) {
              this.form = res.houseInfo;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    tosee(val) {
      this.familyDialog = true;
      this.getFamilyInfo(val);
    },

    getFamilyInfo(val) {
      console.log(val);
      if (val) {
        let params = {
          familyGuid: val.familyGuid,
        };
        http
          .getFamilyInfo(params)
          .then((res) => {
            if (res) {
              this.VacuumRoomList = JSON.parse(JSON.stringify(res));
              res.forEach((element, index) => {
                if (element.relation == 1) {
                  this.VacuumRoomList.splice(index, 1);
                  this.checkinfo = element;
                }
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //问题房源标注-获取房源标记列表
    getSituationalList() {
      let params = {
        houseGuid: this.$route.params.houseGuid,
      };
      http
        .getSituationalList(params)
        .then((res) => {
          this.situationalList = res.situational;
          this.relieveList = res.busy;
          this.incomingAndOutgoingStatusList = res.inputAndOut;
          if (this.incomingAndOutgoingStatusList[0].secondReviewer == null) {
            this.isPutShow = false;
          }
          if (res.outstock[0]) {
            this.outstock = res.outstock[0];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查看附件弹框
    checkAttachment(val) {
      this.checkAttachmentDialog = true;
      this.parameter = val.materialGuid;
    },
    //打开解除弹框
    openRelieveDialog(val) {
      this.relieveDialog = true;
      this.getSituationalInfo(val);
      this.parameter = val.materialGuid;
    },
    //获取要解除的房源信息
    getSituationalInfo(val) {
      let params = {
        situationalGuid: val.guid,
      };
      http
        .getSituationalInfo(params)
        .then((res) => {
          this.situationalInfo = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //问题房源标注-解除房源标记信息
    removeSituationalInfo() {
      let params = {
        houseGuid: this.situationalInfo.houseGuid,
        situationalGuid: this.situationalInfo.guid,
        removeBasis: this.removeBasis,
      };
      http
        .removeSituationalInfo(params)
        .then((res) => {
          if (res) {
            this.$message({
              type: "success",
              message: "解除房源标记信息成功",
            });
            this.relieveDialog = false;
            this.getSituationalList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开产权记录弹框
    OpenPropertyRightRecordsDialog() {
      this.propertyRightRecordsDialog = true;
      this.getPropertyChangeInfo();
    },
    //得到历史产权变更记录
    getPropertyChangeInfo() {
      let params = {
        houseGuid: this.$route.params.houseGuid,
      };
      publicMethod
        .getPropertyChangeInfo(params)
        .then((res) => {
          this.propertyRightRecordsList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开产权变更记录详情弹框
    OpenPropertyRightRecordsDetailDialog(val) {
      this.propertyRightRecordsDetailDialog = true;
      this.propertyRightDetailCode = val.code;
      this.getPropertyRightChangeInfo();
      this.getChangeOpinon(val);
    },
    //得到产权变更详情的申请信息和选中房
    getPropertyRightChangeInfo() {
      let params = {
        code: this.propertyRightDetailCode,
        pageIndex: this.propertyRightDetailPage.currentPage,
        pageSize: this.propertyRightDetailPage.pageSize,
      };
      publicMethod
        .getPropertyRightChangeInfo(params)
        .then((res) => {
          this.propertyRightDetailform = res;
          this.propertyRightDetailCode = res.code;
          this.propertyRightDetailTable = res.houseInfoDTOPage.content;
          this.propertyRightDetailPage.totalNumber =
            res.houseInfoDTOPage.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //产权变更详情选中房列表得到每页的编号
    propertyRightIndexMethod(index) {
      return (
        index +
        (this.propertyRightDetailPage.currentPage - 1) *
          this.propertyRightDetailPage.pageSize +
        1
      );
    },
    //产权变更详情每页大小变化
    propertyRightDetailSizeChange(val) {
      this.propertyRightDetailPage.pageSize = val;
      this.getPropertyRightChangeInfo();
    },
    //产权变更详情第几页的变化
    propertyRightDetailCurrentChange(val) {
      this.propertyRightDetailPage.currentPage = val;
      this.getPropertyRightChangeInfo();
    },
    //产权变更详情意见列表或者性质变更意见列表
    getChangeOpinon(val) {
      let params = {
        pid: val.pid,
      };
      publicMethod
        .getOpinion(params)
        .then((res) => {
          this.detailOpinion = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开性质变更历史记录弹框
    OpenNatureRecordsDialog() {
      this.natureRecordsDialog = true;
      this.getNatureChangeInfo();
    },
    //得到性质变更记录
    getNatureChangeInfo() {
      let params = {
        houseGuid: this.$route.params.houseGuid,
      };
      publicMethod
        .getNatureChangeInfo(params)
        .then((res) => {
          this.natureChangeRecordsList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开性质变更记录详情弹框
    OpenNatureRecordsDetailDialog(val) {
      this.natureRecordsDetailDialog = true;
      this.natureDetailCode = val.code;
      this.getNatureChangeDetailInfo();
      this.getChangeOpinon(val);
    },
    //得到性质变更详情的申请信息和选中房
    getNatureChangeDetailInfo() {
      let params = {
        code: this.natureDetailCode,
        pageIndex: this.natureDetailPage.currentPage,
        pageSize: this.natureDetailPage.pageSize,
      };
      publicMethod
        .getNatureChangeDetailInfo(params)
        .then((res) => {
          this.natureDetailform = res;
          this.natureDetailCode = res.code;
          this.natureDetailTable = res.houseInfoDTOPage.content;
          this.natureDetailPage.totalNumber =
            res.houseInfoDTOPage.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //性质变更详情选中房列表得到每页的编号
    natureIndexMethod(index) {
      return (
        index +
        (this.natureDetailPage.currentPage - 1) *
          this.natureDetailPage.pageSize +
        1
      );
    },
    //性质变更详情每页大小变化
    natureDetailSizeChange(val) {
      this.natureDetailPage.pageSize = val;
      this.getNatureChangeDetailInfo();
    },
    //性质变更详情第几页的变化
    natureDetailCurrentChange(val) {
      this.natureDetailPage.currentPage = val;
      this.getNatureChangeDetailInfo();
    },
    //打开分配权变更弹框
    OpenAllocationRecordsDialog() {
      this.title = "查看分配权变更情况";
      this.historyRecordsDialog = true;
      this.getHistoryInfo();
    },
    //打开签约权变更弹框
    OpenSignatoryRightRecordsDialog() {
      this.title = "查看签约权变更情况";
      this.historyRecordsDialog = true;
      this.getHistoryInfo();
    },
    //打开数据维护权变更弹框
    OpenInitialMaintainRightRecordsDialog() {
      this.title = "查看数据维护权变更情况";
      this.historyRecordsDialog = true;
      this.getHistoryInfo();
    },
    //打开运维权变更弹框
    OpenOperationalRightRecordsDialog() {
      this.title = "查看运维权变更情况";
      this.historyRecordsDialog = true;
      this.getHistoryInfo();
    },
    //获取历史变更情况
    getHistoryInfo() {
      let params = {
        houseGuid: this.$route.params.houseGuid,
      };
      publicMethod
        .getHistoryInfo(params)
        .then((res) => {
          this.allocationRecordsList = res.AllocationRight;
          this.signatoryRightRecordsList = res.SignatoryRight;
          this.InitialMaintainRightRecordsList = res.MaintainRight;
          this.perationalRightRecordsList = res.OperationalRight;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取房屋出租情况
    getRentInfo() {
      let params = {
        houseGuid: this.$route.params.houseGuid,
      };
      publicMethod
        .getRentInfo(params)
        .then((res) => {
          this.rentSituationList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //出租详情查看
    openRentSituationDetailDialog(val) {
      this.rentSituationDetailDialog = true;
      this.planGuid = val.jhbs;
      this.planPid = val.jhpid;
      this.distributionType = val.fpfs;
      this.batchCode = val.pcdm;
      this.fpfs = val.fpfs;
      this.signUpGuid = val.qybz;
      this.signType = val.sfdw;
      this.openHousePlanDialog(val);
    },
    //得到计划属性
    getProperty() {
      if (this.planUseData) {
        for (let item of this.planUseData) {
          if (item.value == this.housePlanFrom.function) {
            this.planPropertyData = JSON.parse(JSON.stringify(item.children));
            break;
          }
        }
      }
    },
    //得到房源计划表格基本信息
    getHousePlanFrom() {
      let params = {
        guid: this.planGuid,
      };
      publicMethod
        .getHousePlan(params)
        .then((res) => {
          let arr = [],
            brr = [];
          this.housePlanFrom = res;
          if (res.queueInfo) {
            res.queueInfo.forEach((element) => {
              arr.push(element.name);
            });
          }
          if (res.groupInfo) {
            res.groupInfo.forEach((item) => {
              brr.push(item.name);
            });
          }
          this.queueStr = arr.toString(); //显示出来的
          this.groupStr = brr.toString(); //显示出来的
          this.getProperty();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取房源计划下选中房列表
    getHousePlanList(index) {
      if (index) {
        this.housePlanListPage.currentPage = index;
      }
      let params = {
        planGuid: this.planGuid,
        pageIndex: this.housePlanListPage.currentPage,
        pageSize: this.housePlanListPage.pageSize,
        areaMax: this.housePlanListForm.areaMax,
        areaMin: this.housePlanListForm.areaMin,
        districtName: this.housePlanListForm.districtName,
        houseNo: this.housePlanListForm.houseNo,
        state: this.housePlanListForm.state,
        type: this.housePlanListForm.type,
        buildName: this.housePlanListForm.buildName,
        completionAreabegain: this.housePlanListForm.completionAreabegain,
        completionAreaEnd: this.housePlanListForm.completionAreaEnd,
      };
      publicMethod
        .getReleasedHouseInfo(params)
        .then((res) => {
          this.housePlanList = res.content;
          this.housePlanListPage.totalNumber = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //每页的大小尺寸变化
    housePlanListSizeChange(val) {
      this.housePlanListPage.pageSize = val;
      this.getHousePlanList(1);
    },
    //当前的页码的大小改变
    housePlanListCurrentChange(val) {
      this.housePlanListPage.currentPage = val;
      this.getHousePlanList(1);
    },
    //获取审核意见列表
    gethousePlanOpinion() {
      let params = {
        pid: this.planPid,
      };
      publicMethod
        .getOpinion(params)
        .then((res) => {
          this.housePlanOpinion = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开房源计划弹框
    openHousePlanDialog() {
      this.allocationBatchInfoShow = false;
      this.signInfoShow = false;
      this.afterRentShow = false;
      if (this.planGuid) {
        this.housePlanInfoShow = true;
        this.getProperty();
        this.getHousePlanFrom();
        this.getHousePlanList();
        this.gethousePlanOpinion();
      } else {
        this.housePlanInfoShow = false;
      }
    },
    //打开分配基本信息弹框
    openAllocationBatchInfoDialog() {
      this.housePlanInfoShow = false;
      this.allocationBatchInfoShow = true;
      this.signInfoShow = false;
      this.afterRentShow = false;
      if (this.batchCode) {
        this.getBatchInfo();
      }
    },
    //获取批次信息
    getBatchInfo() {
      let params = {
        batchCode: this.batchCode,
      };
      publicMethod
        .getBatchInfo(params)
        .then((res) => {
          this.batchInfo = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开签约信息弹框
    openSignUpInfoDialog() {
      this.housePlanInfoShow = false;
      this.allocationBatchInfoShow = false;
      this.signInfoShow = true;
      this.afterRentShow = false;
      if (this.signUpGuid) {
        this.getSignInfo();
      }
    },
    //得到签约详情
    getSignInfo() {
      let params = {
        signGuid: this.signUpGuid,
      };
      publicMethod
        .getSignInfo(params)
        .then((res) => {
          if (res.sign[0]) {
            this.signInfo = res.sign[0];
          }
          this.signOtherPersonalInfo = res.otherPersonalInfo;
          if (res.unitInfo[0]) {
            this.signUnitInfo = res.unitInfo[0];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开租后信息弹框
    openAfterRentDialog() {
      this.housePlanInfoShow = false;
      this.allocationBatchInfoShow = false;
      this.signInfoShow = false;
      this.afterRentShow = true;
    },
    //房屋综合查询(市局)-查询房屋勘误
    getHouseErrataList() {
      let params = {
        houseGuid: this.$route.params.houseGuid,
        pageIndex: this.errataDetailPage.currentPage,
        pageSize: this.errataDetailPage.pageSize,
      };
      publicMethod
        .getHouseErrataList(params)
        .then((res) => {
          this.erratList = res.content;
          this.errataDetailPage.totalNumber = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //pagesize的大小改变
    handleHouseSizeChange(val) {
      this.errataDetailPage.pageSize = val;
      this.getHouseErrataList(1);
    },
    //pageIndex改变的时候
    handleHouseCurrentChange(val) {
      this.errataDetailPage.currentPage = val;
      this.getHouseErrataList();
    },
    openHouseErrataDetailDialog(val) {
      this.errataType = val.kwlx;
      if (this.errataType == "修改信息") {
        this.houseErrataDetailDialog = true;
        this.getHouseErrataDetialInfo(val);
      } else if (this.errataType == "导入面积") {
        this.houseErrataAreaDetailDialog = true;
        this.getHouseExportDetialInfo1(val);
      } else if (this.errataType == "导入修改信息") {
        this.houseErrataImportDetailDialog = true;
        this.getHouseExportDetialInfo(val);
      }
    },
    //房屋综合查询(市局)-查询房屋勘误
    getHouseErrataDetialInfo(val) {
      let params = {
        houseGuid: val.houseGuid,
        pid: val.pid,
        pageIndex: this.natureDetailPage.currentPage,
        pageSize: this.natureDetailPage.pageSize,
      };
      publicMethod
        .getHouseErrataDetialInfo(params)
        .then((res) => {
          this.erratDetailList = res.content;
          this.errataInfoPage.totalNumber = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //pagesize的大小改变
    houseSizeCurrentChange(val) {
      this.errataInfoPage.pageSize = val;
      this.getHouseErrataDetialInfo(1);
    },
    //pageIndex改变的时候
    houseIndexCurrentChange(val) {
      this.errataInfoPage.currentPage = val;
      this.getHouseErrataList();
    },
    //房屋综合查询(市局)-查询房屋勘误
    getHouseExportDetialInfo1(val) {
      let params = {
        houseGuid: val.houseGuid,
        pid: val.pid,
        exportType: "1",
      };
      publicMethod
        .getHouseExportDetialInfo(params)
        .then((res) => {
          this.erratAreaList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //房屋综合查询(市局)-查询房屋勘误
    getHouseExportDetialInfo(val) {
      let params = {
        houseGuid: val.houseGuid,
        pid: val.pid,
        exportType: "2",
      };
      publicMethod
        .getHouseExportDetialInfo(params)
        .then((res) => {
          this.erratImportList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //历史查询
    searchHistory(val) {
      let params = {
        houseGuid: this.$route.params.houseGuid,
        maintainGuid: val.guid || "",
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
      };
      console.log(this.$route.params.houseGuid);
      if (val.guid) {
        params.pageIndex = params.pageSize = 1;
      }
      https
        .getHouseMaintainLogList(params)
        .then((res) => {
          if (!params.maintainGuid) {
            this.historyTable = res.content;
            this.total = res.totalElements;
          } else {
            console.log(res.content);
            this.historyInfo = res.content[0];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //维修状态-查看历史
    checkHistory(val) {
      this.historyDialog = true;
      this.searchHistory(val);
    },
    //维修状态-查看历史详情
    checkhisInfo(val) {
      this.hisInfoDialog = true;
      this.searchHistory(val);
    },
    //当前页条数改变时
    handleSizeChange(val) {
      this.pageSize = val;
      this.searchHistory();
    },
    //当前页跳转时
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchHistory();
    },
    //打开日志弹框
    openLogDialog() {
      this.logDialog = true;
      this.getLog();
    },
    //查看日志
    getLog() {
      let guid = { houseGuid: this.$route.params.houseGuid, type: "house" };
      console.log(this.logForm);
      let params = { ...this.logForm, ...guid };
      console.log(params);
      http
        .getLog(params)
        .then((res) => {
          this.logList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getDictionary();
    this.getHouseinfo();
    this.getRecordUnit();
    this.onload();
    this.Event.$on("HouseDetails", (data) => {
      if (data == "getSituationalList") {
        this.getSituationalList();
      }
    });
  },

  created(){
    this.getPersonalDic()
  }
};
</script>

<style lang="scss" scoped>
.live-table {
  tbody {
    td {
      background-color: #fff;
    }
  }
}
.live-table tr td:nth-child(2n) {
  width: auto !important;
  margin-bottom: 20px;
}
</style>
